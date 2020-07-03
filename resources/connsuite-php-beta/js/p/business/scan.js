/**
 * Created by razvan on 13/11/2017.
 */
let self = new ConnUser();
let chosen = new ConnUser();
let networkLimit;
let businessPartner = false;
let selectedUsername = null;

let selectedUserID = null;

$(function() {
    ONESIGNAL(depthToRoot);
    transitionPageEnterLoad(depthToRoot);
    retrieveSelf();
    setFunctionality();



});


function setFunctionality(){

    if($(window).width() > 970) networkLimit = 11;
    else networkLimit = 8;


    printHelperWithButton(
        1, $("#scanHelper"), "This feature will be the most useful when you will find yourself at a business event, with few or even no business card. Use ConnSuite from your phone and turn it into your online <b style='font-weight: 600'>*Business Card On Steroids*</b> ! Want to know more about how ConnSuite works? Chat with us or read more details about our StartUp.",
        {
            "title" : "Read More",
            "callback" : function(){ $("#HELPER-1").prop("href",ROOT+"intro/"); }
        }
    );



//JSON.stringify({"username":username,"ID":userID})
    var qrcodesvg = new Qrcodesvg( "https://www.connsuite.com/?username="+username+"&i="+userID , "qrcode", 220, {"ecclevel" : 1});
    qrcodesvg.draw({"method":"round", "radius" : 3, "fill-colors":["#04befe","#03A0DC"]}, {"stroke-width":1});



    if(isMobileSize()) {
        $("#scanCodeImageOverlay").css("filter", "none");
        $("#scanCodeContainer").css("border-color","#04befe");
    }


    $("#scanCodeButtonContainer").on("click",function(){
        $("#placeholder").fadeOut(250,function(){
            initVideo();
        });
    });
}


/**
 * Business Card
 */




function retrieveRequestStatus(){

    if(!username || !selectedUsername || selectedUsername === username) {
        return;
    }


    var req = $.ajax({
        url : retrieveRequestStatusURL,
        type : "GET",
        data : {
            sourceName : username,
            targetName: selectedUsername
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        $("#rightRequestContainer").fadeIn(250);

        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){

            $("#rightRequestCardButton").unbind().on("click",function(){
                doBusinessRequest();
            });
        }
        else if(response['response'] == kCSResponseOk) {
            let result = response['result'];
            if(result['status'] == kCSBusinessRequestAccepted){
                $("#rightRequestCardButton span").text(selectedUsername+" is a Business Connection");
                $("#rightRequestCardButton").removeClass().addClass('profileRequestButtonUnavailable');
                businessPartner = true;
            }
            else if(result['status'] == kCSBusinessRequestPending){
                $("#rightRequestCardButton span").text("Business Request Sent");
                $("#rightRequestCardButton").removeClass().addClass('profileRequestButtonUnavailable');
            }


        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        $("#rightRequestContainer").hide();
    });

}

function doBusinessRequest(){
    if(token === null || userID === null || selectedUserID === null) return;
    var req = $.ajax({
        url : doBusinessRequestURL,
        type : "POST",
        data : {
            sourceID : userID,
            targetID: selectedUserID },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        // console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("Functionality currently unavailable");
        }
        else if(response['response'] === kCSResponseOk) {
            retrieveRequestStatus();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}







/**
 Right

 */


function viewChosenProfile(content){


    $("#rightDetailLoader").show();
    bindRightDetailWidth();
    var right =  $( '#rightDetailContainer' );
    var cover = $("#rightDetailPageCover");




    $('body').attr("disabled",true);

    cover.show();

    if( right.hasClass('fadeOutRight')) {
        right.removeClass('fadeOutRight ');
    }

    right.addClass('fadeInRight' ).show();
    retrieveChosenUser(content);



    $(".rightDetailCloseButton").unbind().on("click",function(){  closeCover();  });
    cover.unbind().on("click", function() {  closeCover();  });

}

function closeCover() {



    var right =  $( '#rightDetailContainer' );
    var cover = $("#rightDetailPageCover");
    $('body').attr("disabled",true);


    if( right.hasClass('fadeInRight')) {
        right.removeClass('fadeInRight ').addClass('fadeOutRight ');
    }

    cover.fadeOut(200);

}




function retrieveChosenUser(content){

    console.log(content);

    let contentUsername = null;
    let contentID = null;
    if(content === null){
        showToast("The QR code does match our user's codes. Please try again!",1000);
        return;
    }

    try{
        let object  = parseURLParams(content);
        console.log(object);
        contentUsername = object['username'][0];
        contentID =  object['i'][0];
    }
    catch (e){
        showToast("The QR code does match our user's codes. Please try again!",1000);
        return;
    }


    selectedUsername  = contentUsername;
    selectedUserID = contentID;
    if(!contentID || !contentUsername) return;



    retrieveRequestStatus(true);



    let req = $.ajax({
        url : retrieveUserURL,
        type : "GET",
        data : {username : contentUsername, visible : true},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error fetching this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            chosen.set(result);
            bindChosenUser();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}



function bindChosenUser(){


   // console.log(chosen);

    let print;
    $("#selfBusinessCardPicture").prop("src",chosen.imageURL);

    let networksParent = $("#businessCardSelfNetworks");
    networksParent.html("");




    let localLimit  = networkLimit;
    if(chosen.networks.length < networkLimit) localLimit = chosen.networks.length;




    for(let i=0; i< localLimit; i++){
        print = '<div class="leftNetworksTableItemContainer" > ' +
            '<div class="leftNetworksTableItemImageContainer">' +
            '<img id="leftNetworksTableItemImage-'+i+'" class="leftNetworksTableItemImage" src="' + chosen.networks[i].image.thumbnail + '"/> ' +
            '</div>' +
            '</div>';
        networksParent.append(print);
        chosen.networks[i].image.updateImage(NETWORK_IMAGE_TYPE_THUMBNAIL, "#leftNetworksTableItemImage-"+i);

    }

    print = ' <div data-tooltip="See more networks" class="leftNetworksTableItemContainer tool"  > ' +
        '<a  id="leftNetworksTableItemVisitContainer">' +
        '<span>...</span> ' +
        '</a>' +
        '</div>';
    networksParent.append(print);

    $("#leftNetworksTableItemVisitContainer").prop("href","../../"+chosen.username);
    $("#rightVisitProfileButton").prop("href",ROOT+chosen.username);
    $(".businessCardRightUsername").html('<span id="businessCardRightUsernameHelper">Username : </span>'+chosen.username);
    $(".businessCardRightName").text(chosen.name);

    if(!isMobileSize()) $("#rightDetailHeadingFirst").text(chosen.name);


    $("#rightAboutHeading").text("About "+chosen.firstname);
    $("#rightAboutYouAndHeading").text("About You & "+chosen.firstname);


    $("#rightDetailLoader").fadeOut(250);

}

/**
 * RIGHT HELPERS
 */

function measureRightDetailWidth(){
    var screenWidth = $(document).width();
    if(screenWidth > 1200){
        return  ($(".customContainer").width() -30 ) /  2 - 20;
    }
    return $(window).width() / 2 - 40;

}
function bindRightDetailWidth(){
    if ($(window).width() > 970) {
        if (measureRightDetailWidth() !== null) $("#rightDetailInnerContainer").width(measureRightDetailWidth());
    }
}










/**
 * SELF
 */
function retrieveSelf(){

    let req = $.ajax({
        url : retrieveUserURL,
        type : "GET",
        data : {username : username, visible : true},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        // console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error fetching this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            self.set(result);
            bindSelfUser();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}
function bindSelfUser(){


    transitionPageEnterLoadEnd();




    $("#scanSelfCardPicture").prop("src",self.imageURL);
    $("#scanSelfCardName").text(self.name);
    $("#scanSelfCardUsername").html("<span style='font-weight: 500; margin-right: 5px;'>@</span>"+self.username);


}

/**
 SYSTEM
 */

function initVideo(){

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview'),mirror:!isMobileSize() });
    scanner.addListener('scan', function (content) {
        viewChosenProfile(content);
        scanner.stop();
        $("#closePreview").hide('fast',function(){
            $("#placeholder").show('fast');
        });
    });
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            if (cameras.length > 1 && cameras[1]) { scanner.start(cameras[1]);}
            else  { scanner.start(cameras[0]);}



            $("#closePreview").show('slow');
            $("#closePreview").unbind().on("click",function(){
                scanner.stop();
                $("#closePreview").hide('fast',function(){
                    $("#placeholder").show('fast');
                });
            })
        } else {
            showToast("The camera is not functioning well on this device. Please try again, grant the permission or contact support.",1000);
        }
    }).catch(function (e) {
        console.error(e);
    });
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}