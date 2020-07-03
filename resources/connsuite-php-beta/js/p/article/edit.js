/**
 * Created by razvan on 02/09/2017.
 */
var article = new Article();
var pictureChanged = false;
var imageCount = 0;
var prePath ="";
var imageList = [];
var simplemde;
$(function() {
    for(var i = 0; i< depthToRoot; i++) prePath+="../";
    transitionPageEnterLoad(depthToRoot);
    printTopHelpers();
    setupEditor();
    doRetrieveArticle();

    $("#addImageButton").on("click",function(){
        if(imageCount < 5){
            $("#customImageEnd").click();
        }
    });


    $("#saveArticleButton").on("click",function(){
        if(checkData()) doEditArticle();
    });

});

function checkData(){
    var title = $("#title").val();
    if(title === null || title.trim().length < 4){
        showToast("Please add a longer title.",1000);
        $("#title").focus();
        return false;
    }

    if(!simplemde) {
        showToast("Looks like there\'s a problem with the editor. Reload the page.",800);
        return false;
    }

    let content = simplemde.value();
    if( (content.trim()).length < 20 ||
        ((content.trim()).replace(" ","")).length < 20 ||
        content.length > 9999999999999999){
        showToast("Please add a valid content to your article ( > 20 characters)", 1000);
        return false;
    }




    return true;
}

function doEditArticle(){
    var title = $("#title").val();
    if(!simplemde) {
        showToast("Looks like there\'s a problem with the editor. Reload the page.",800);
        return;
    }
    let content = simplemde.markdown(simplemde.value());
    let contentForEdit = simplemde.value();


    var data = {
        title : title,
        userID : userID,
        articleID : articleID,
        content :  JSON.stringify(content),
        contentForEdit :  JSON.stringify(contentForEdit),
        imageList : JSON.stringify(imageList)
    };
    if(pictureChanged) data['image'] = $("#customImage")[0].files[0];

    var formData = new FormData();
    for(var key in data) formData.append(key, data[key]);

    var create = $.ajax({
        url : doEditArticleURL,
        type : "POST",
        data : formData,
        headers : buildHeaders(token, userID),
        cache: false,
        contentType: false,
        processData: false
    });

    create.done(function(response){
        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error updating this article. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            showToast("This article was edited");
            transitionPageLeave("../dashboard.php",depthToRoot); //TODO
        }
    });

    create.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });

}


function doRetrieveArticle(){
    var req = $.ajax({
        url : retrieveArticleURL,
        type : "GET",
        data : {
            articleID : articleID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error updating this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            transitionPageEnterLoadEnd();
            let result = response['result']['article'];
            article =  new Article();
            article.set(result);
            bindArticle();
        }
    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


function bindArticle(){
    $("#title").val(article.title);

    simplemde.value(article.contentForEdit);

    imageExists(article.imageURL,function(callback){
        if(!callback) article.imageURL = "../../image/network/normal/icon_default.png";
        $("#output").prop("src",article.imageURL);
    });


    if(article.imageList && article.imageList.length > 0){
        imageCount = article.imageList.length;
        for(var i = 0; i < imageCount; i++) {
            var print = '<div id="uploadedImage-'+article.imageList[i]['ID']+'" style="max-width: 100%; display: flex; flex-direction: row ">' +
                '<div style="width: 100%;flex: 1;"><img style="max-width: 100%;border-radius: 10px;" src="'+prePath+"data/article/image/"+article.imageList[i]['name']+'" /></div>' +
                '<span style="margin-left: 20px;" class="buttonTypeFullWhite" onclick="doImageRemove(\''+article.imageList[i]['name']+'\',\''+article.imageList[i]['ID']+'\')">Remove</span> ' +
                '</div>' +
                '<div style="width: 100%; background: #eeeeee; margin-top: 20px; margin-bottom: 20px;"></div>';
            $("#uploadedImages").append(print);
            imageList.push(article.imageList[i]);
        }
    }

    handleAddButton();

}

function doImageAdd() {

    var image = $("#customImageEnd")[0].files[0];
    var data = {image : image,  articleID : articleID, userID : userID};

    var formData = new FormData();
    for(var key in data) formData.append(key, data[key]);

    disableButtonClick($("#addImageButton"),$("#addImageButton span"));
    disableButtonClick($("#saveArticleButton"));
    disableButtonClick($("#chooseThumbnailButton"));

    showToast("Uploading Image...",50000);

    var upload = $.ajax({
        url : uploadArticleImageURL,
        type : "POST",
        data : formData,
        headers : buildHeaders(token, userID),
        cache: false,
        contentType: false,
        processData: false
    });
    upload.done(function(response){

        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){

        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            imageList.push( {'name' : result['name']});
            var print = '<div id="uploadedImage-'+result['ID']+'" class="imageAddItemContainer">' +
                '<div style="width: 100%;flex: 1;"><img style="max-width: 100%;border-radius: 10px;" src="'+prePath+"data/article/image/"+result['name']+'" /></div>' +
                '<span class="buttonTypeFullWhite" onclick="doImageRemove(\''+result['name']+'\',\''+result['ID']+'\')">Remove</span> ' +
                '</div>' +
                '<div style="width: 100%; background: #eeeeee; margin-top: 20px; margin-bottom: 20px;"></div>';
            $("#uploadedImages").append(print);
            imageCount++;
            handleAddButton();
        }
    });

    upload.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
    upload.always(function(){
        enableButtonClick($("#addImageButton"),$("#addImageButton span"));
        enableButtonClick($("#saveArticleButton"));
        enableButtonClick($("#chooseThumbnailButton"));
        $("#customImageEnd").val("");
        hideToast();
    })

}

function doImageRemove(name,ID) {
    console.log(name);
    var remove = $.ajax({
        url : removeArticleImageURL,
        type : "POST",
        data : {
            name : name,
            articleID : articleID,
            userID : userID
        },
        headers : buildHeaders(token, userID)
    });
    remove.done(function(response){

        response = JSON.parse(response);
          console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error. Try again.");
        }
        else if(response['response'] === kCSResponseOk) {
            $("#uploadedImage-"+ID).remove();
            imageCount--;
            handleAddButton();
            if(imageList){
                for(var i = 0; i < imageList.length;i++){
                    if(imageList[i]['name'] == name) imageList.splice(i,1);
                }
            }
            if(imageCount === 0) $("#uploadedImages").html("");
        }
    });

    remove.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });

}


function handleAddButton(){
    if(imageCount === 5){
        if($("#addImageButton").is(":visible")) $("#addImageButton").hide();
    }
    else if( imageCount < 5){
        if(!$("#addImageButton").is(":visible")) $("#addImageButton").show();
    }
}

function setupEditor(){

    simplemde = new SimpleMDE({
        element: document.getElementById("customMDE"),
        hideIcons: ["fullscreen","guide","side-by-side","heading-1"],
        placeholder: "Type something here...",
        spellChecker: false,
        styleSelectedText:false,
        renderingConfig: {
            singleLineBreaks: true,
            codeSyntaxHighlighting: false,
        },
        showIcons:["horizontal-rule","code","heading-2","heading-3"],
    });


}



// load cover image into output
var loadFile = function(event) {


    var fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1800);
        $("#customImage").val("");
        pictureChanged = false;
        return;
    }
    else  if (event.target.files[0].size > 3500000){
        showToast("Please upload an image smaller than 3MB",1800);
        $("#customImage").val("");
        pictureChanged = false;
        return;
    }
    else {
        $("#outputContainer").css("height", "auto").show();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('output');
            output.src = reader.result;
        };
        pictureChanged = true;
        reader.readAsDataURL(event.target.files[0]);

    }
};

/**
 * ------------------------
 */

function loadFileEnd(){


    var fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1200);
        $("#customImageEnd").val("");
        return;
    }
    else  if (event.target.files[0].size > 6000000){
        showToast("Please upload an image smaller than 5MB",1800);
        $("#customImageEnd").val("");
        return;
    }
    else {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        doImageAdd();
    }
}


function printTopHelpers(){
    printHelper($("#profileHelperContainer"),"Write an article that will describe your actions, portfolio or skills. Showcase your talent or show everyone something worth reading about you.",true);
    printHelper($("#profileHelperContainer2"),"To add style to the text, highlight the section you want to edit. Also, you can add images to your article to make it more beautiful. Just hit enter and start uploading/writing.",true);
}