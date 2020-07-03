/**
 * Created by razvan on 24/08/2017.
 */
let article = new Article();

$(function(){
   transitionPageEnterLoad(depthToRoot);
    doRetrieveArticle();



   initBlur();



});

function doRetrieveArticle(){



    let req = $.ajax({
        url : retrieveArticleURL,
        type : "GET",
        data : {
            articleID : articleID,
            identifier : identifier
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            window.location.href = ROOT+"p/dashboard.php";
            showToast("There was an error updating this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {

            articleID = response['result']['articleID'];

            transitionPageEnterLoadEnd();
            let result = response['result']['article'];
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
    console.log(article);
    if(article.identifier.length > 0) identifier = article.identifier[article.identifier.length-1];
    if(isRelease()) window.history.replaceState('article', "ConnSuite", ROOT+"a/"+identifier);

    document.title = article.title +" | @"+article.user.username + " | ConnSuite";
    $("meta[property='og:title']").attr("content", article.title +" | @"+article.user.username + " | ConnSuite");


    var prePath="";
    for(var i=0;i < depthToRoot; i++) prePath+="../"

    $(".secondaryToolbarTitle").html(article.user.username+"'s Article");
    $(".articleCoverImage").css("background-image","url('"+article.imageURL+"')");
    $("#articleTitle").text(article.title);


    $("#content").html(article.content);


    if(article.imageList && article.imageList.length > 0){
        for(var i = 0; i <article.imageList.length; i++) {
            var imagePrint =
                '<div class="articleImageContainer">' +
                '<img class="articleImageElement" src="'+prePath+"data/article/image/"+ article.imageList[i]['name'] + '"  />' +
                '</div>';

            $("#content").append(imagePrint);
        }
    }



    imageExists(article.imageURL,function(callback){
        if(!callback) article.imageURL = "../../image/network/normal/icon_default.png";
        $(".articleCoverImage").css("background-image","url('"+article.imageURL+"')");
    });


    imageExists(article.user.imageURL,function(callback){
        if(!callback) article.user.imageURL = "../../image/network/normal/icon_default.png";
        $("#topProfilePictureOutput").prop("src",article.user.imageURL);
    });


    $("#baseProfileUsername").text(article.user.username);
    $("#baseProfileTagline").text(article.user.tagline);

    $("#viewProfileBottomButton").prop("href","../../index.php?username="+article.user.username);
}

function initBlur(){
    $(window).scroll(function() {
        var oVal;
        oVal = $(window).scrollTop() / 240 * 10;
        var filterVal = 'blur('+oVal+'px)';
        $('.articleCoverImage')
            .css('filter',filterVal)
            .css('webkitFilter',filterVal)
            .css('mozFilter',filterVal)
            .css('oFilter',filterVal)
            .css('msFilter',filterVal);
    });
}