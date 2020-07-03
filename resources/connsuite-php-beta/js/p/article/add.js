/**
 * Created by razvan on 24/08/2017.
 */

var pictureChanged = false;
var editor = null;
var imageCount = 0;
var imageList = [];
var prePath= "";
var simplemde;




$(function(){
   for(let k=0; k<depthToRoot; k++) prePath+="../";
   transitionPageEnter(depthToRoot);
   printTopHelpers();
   setupEditor();

    $( "#chooseThumbnailButton" ).click(function() {
        $( "#customImage" ).click();
    });
    $( "#noPictureContainer" ).click(function() {
        $( "#customImage" ).click();
    });

    $("#saveArticleButton").on("click",function(){
        if(checkData()) doSaveArticle();
    });

    $("#addImageButton").on("click",function(){
        if(imageCount < 5){
            $("#customImageEnd").click();
        }
    });
});

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


function doSaveArticle(){
    let title = $("#title").val();
    let image =  $("#customImage")[0].files[0];
    if(!simplemde) {
        showToast("Looks like there\'s a problem with the editor. Reload the page.",800);
        return;
    }
    let content = simplemde.markdown(simplemde.value());
    let contentForEdit = simplemde.value();

    let data = {
        title : title,
        image : image,
        contentForEdit:JSON.stringify(contentForEdit),
        content : JSON.stringify(content),
        userID : userID,
        imageList : JSON.stringify(imageList)
    };

    let formData = new FormData();
    for(let key in data) formData.append(key, data[key]);

    let create = $.ajax({
        url : uploadArticleURL,
        type : "POST",
        data : formData,
        headers : buildHeaders(token, userID),
        cache: false,
        contentType: false,
        processData: false
    });

    create.done(function(response){
      //  console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error updating this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            showToast("A new article was uploaded");
            if(stepID === TUTORIAL_STEP_ARTICLE)
                doCompleteTutorialStep(stepID,false,ROOT+"p/dashboard.php?stickyTutorial=true&stickyPassed=true",{"tutorialAction":TUTORIAL_STEP_ARTICLE});
            else transitionPageLeave("../dashboard.php",depthToRoot);
        }
    });

    create.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });

}

function checkData(){
    var title = $("#title").val();
    if(title === null || title.trim().length < 4){
        showToast("Please add a longer title.",1000);
        $("#title").focus();
        return false;
    }


    var customImage = $("#customImage");
    if(!pictureChanged) {
        showToast("Please add a cover picture.",1000);
        $("#C_choosePictureContainer").focus();
        return false;
    }
    if(pictureChanged) {
        if (!customImage.val() ||
            customImage.val().length === 0 ||
            (customImage[0].files).length === 0) {
            showToast("Please add a valid cover picture", 1400);
            return false;
        }
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


// load image into output
var loadFile = function(event) {


    var fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1800);
        $("#noPictureContainer").show();
        $("#outputContainer").hide();
        $("#customImage").val("");
        pictureChanged = false;
        return;
    }
    else  if (event.target.files[0].size > 3500000){
        showToast("Please upload an image smaller than 3MB",1800);
        $("#customImage").val("");
        $("#outputContainer").hide();
        $("#customImage").val("");
        pictureChanged = false;
        return;
    }
    else {
        $("#outputContainer").css("height", "auto").show();
        $("#noPictureContainer").hide();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('output');
            output.src = reader.result;
        };
        pictureChanged = true;
        reader.readAsDataURL(event.target.files[0]);

    }
};


function printTopHelpers(){
   printHelper($("#profileHelperContainer"),"Write an article that will describe your actions, portfolio or skills. Showcase your talent or show everyone something worth reading about you.",true);
   //printHelper($("#profileHelperContainer2"),"To add style to the text, highlight the section you want to edit. Also, you can add images to your article to make it more beautiful. Just hit enter and start uploading/writing.",true);
    printHelper($("#profileHelperContainerEye"),'Click on the <i class="fa fa-eye"></i> icon to see what your article will look like in the end.',true);


}


function doImageAdd() {

    var image = $("#customImageEnd")[0].files[0];
    var data = {image : image};

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
       // console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){

        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            imageList.push( {'name' : result['name']} );
            var print = '<div id="uploadedImage-'+result['ID']+'" class="imageAddItemContainer">' +
                '<div style="width: 100%;flex: 1;"><img style="max-width: 100%;border-radius: 10px;" src="'+prePath+'data/article/image/'+result['name']+'" /></div>' +
                '<span  class="buttonTypeFullWhite" onclick="doImageRemove(\''+result['name']+'\',\''+result['ID']+'\')">Remove</span> ' +
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
            name : name
        },
        headers : buildHeaders(token, userID)
    });
    remove.done(function(response){
      //  console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error. Try again.");
        }
        else if(response['response'] === kCSResponseOk) {
          $("#uploadedImage-"+ID).remove();
          imageCount--;
          handleAddButton();
          if(imageList){
              for(let i = 0; i < imageList.length;i++){
                  if(imageList[i]['name'] == name) imageList.splice(i,1);
              }
          }
        }
    });

    remove.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });

}





function loadFileEnd(){


    disableButtonClick($("#chooseThumbnailButton"),$("#chooseThumbnailButton span"));

    var fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1200);
        $("#customImageEnd").val("");
        enableButtonClick($("#chooseThumbnailButton"),$("#chooseThumbnailButton span"));
        return;
    }
    else  if (event && event.target.files && event.target.files.length > 0 && event.target.files[0].size > 6000000){
        showToast("Please upload an image smaller than 5MB",1800);
        $("#customImageEnd").val("");
        enableButtonClick($("#chooseThumbnailButton"),$("#chooseThumbnailButton span"));
        return;
    }
    else {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        doImageAdd();
        enableButtonClick($("#chooseThumbnailButton"),$("#chooseThumbnailButton span"));
    }
}

function handleAddButton(){
    if(imageCount === 5){
        if($("#addImageButton").is(":visible")) $("#addImageButton").hide();
    }
    else if( imageCount < 5){
        if(!$("#addImageButton").is(":visible")) $("#addImageButton").show();
    }
}