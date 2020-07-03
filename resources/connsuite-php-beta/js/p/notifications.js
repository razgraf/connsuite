/**
 * Created by razvan on 27/08/2017.
 */

var notificationList = [];
var parentNotifications;
$(function(){
    ONESIGNAL(depthToRoot);
    transitionPageEnter(depthToRoot);
    parentNotifications = $("#notificationsContainer");
    doRequestNotificationList();
});


function doRequestNotificationList(){


        var req = $.ajax({
            url : doRetrieveNotificationListURL,
            type : "GET",
            data : {
                userID : userID
            },
            headers : buildHeaders(token, userID)
        });

        req.done(function(response){


            response = JSON.parse(response);
            console.log(response);

            if(response['response'] === kCSResponseNegative){
                parentNotifications.html("<span class='negativeText'>You have 0 notifications at the moment.</span>")
            }
            else if(response['response'] === kCSResponseOk) {
                var result = response['result'];
                for(var i=0; i< result.length; i++){
                    var notification = new ConnNotification(result[i]);
                    notification.type =  parseInt(notification.type);
                    if(notification.type === kCSNotificationTypeBusinessRequest)
                        buildBusinessRequestNotification(notification);
                    else if(notification.type === kCSNotificationTypeBusinessRequestAccepted)
                        buildBusinessRequestAccepted(notification);
                    else if(notification.type === kCSNotificationTypeBusinessRequestSelfAccepted)
                        buildBusinessRequestSelfAccepted(notification);
                    else if(notification.type === kCSNotificationTypeCustom)
                        buildCustom(notification);

                    notificationList.push(notification);
                    if(i < result.length-1){
                        parentNotifications.append(   '<div style="width: 100%; margin-top: 10px; margin-bottom: 10px; height: 1px; background: #eeeeee; "></div> ' );
                    }

                }

                updateNotificationCount();
            }
        });
        req.fail(function(e){
            console.log("fail");
            showToast("Server error.");
        });
}

function notificationByID(ID){
    for(var i = 0; i<notificationList.length;i++){
        if(notificationList[i].ID == ID) return notificationList[i];
    }
    return null;
}


function doRequestAccept(ID){

    disableButtonClick($(".smallButtonOutlinePrimary"));

    var notification = notificationByID(ID);

    var req = $.ajax({
        url : doRequestAcceptURL,
        type : "POST",
        data : {
            notificationID : notification.ID,
            sourceID : notification.sourceID,
            targetID : notification.targetID,
            requestID : notification.requestID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        enableButtonClick($(".smallButtonOutlinePrimary"));
        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("Not accepted")
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            $("#businessRequestContentButtonsContainer-"+ID).fadeOut(200);
            showToast("Accepted");
            updateNotificationCount();

        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
    req.always(function(e){
        enableButtonClick($(".smallButtonOutlinePrimary"));
    })
}


function doBusinessRequest(ID,callback){
    var notification = notificationByID(ID);
    var req = $.ajax({
        url : doBusinessRequestURL,
        type : "POST",
        data : {
            sourceID : userID,
            targetID: notification.sourceID },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative){
            showToast("Functionality currently unavailable");
        }
        else if(response['response'] === kCSResponseOk) {
            if(callback)callback();
            updateNotificationCount();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}

function doAcceptAndRequest(ID){
    doRequestAccept(ID);
    doBusinessRequest(ID)
}

function doCancelRequest(ID){
    var req = $.ajax({
        url : doRequestCancelURL,
        type : "POST",
        data : {
            notificationID: ID,
            requestID : notificationByID(ID).requestID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        //console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("Functionality currently unavailable");
        }
        else if(response['response'] === kCSResponseOk) {
            $("#businessRequestContentButtonsContainer-"+ID).fadeOut(200);
            updateNotificationCount();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


function buildBusinessRequestNotification(notification){
 var print = '<div class="notificationsSingleContainer"> ' +
     '<div style="width: 100%; display: flex; flex-direction: row; align-items: center;"> ' +
     '<div class="businessRequestUserPictureOuterContainer"> ' +
     '<a href="'+ROOT+notification.source.username+'" class="businessRequestUserPictureContainer"> ' +
     '<img src="" id="businessRequestUserPicture-'+notification.ID+'" class="businessRequestUserPicture" /> ' +
     '</a> ' +
     '</div> ' +
     '<div class="businessRequestContentContainer"> ' +
     '<p class="businessRequestContent">'+notification.text+'</p> ' +
     '<div class="businessRequestContentButtonsContainer" id="businessRequestContentButtonsContainer-'+notification.ID+'"> ' +
     '<span title="Accept Request" onclick="doRequestAccept(\''+notification.ID+'\')" style="margin-right: 10px;" class="smallButtonOutlinePrimary">Accept</span> ';
     if(notification.opposite === null) print+='<span style="margin-right: 10px;" onclick="doAcceptAndRequest(\''+notification.ID+'\')" title="Accept Request and Send one too" class="smallButtonOutlineSecondary">Accept & Request</span> ';
     print+='<span onclick="doCancelRequest(\''+notification.ID+'\')" class="smallButtonOutlineGray">Deny</span> ' +
     '</div> ' +
     '</div> ' +
     '</div> ' +
     '</div>';

    parentNotifications.append(print);

    imageExists(notification.source.thumbnailURL,function(callback){
        if(!callback) notification.source.thumbnailURL = "../image/no_people_o.png";
        $("#businessRequestUserPicture-"+notification.ID).attr("src", notification.source.thumbnailURL);
    });
}


function buildBusinessRequestAccepted(notification){
    var print = '       <div class="notificationsSingleContainer"> ' +
        '<div style="width: 100%; display: flex; flex-direction: row; align-items: center;"> ' +
        '<div class="businessRequestAcceptedUserPictureOuterContainer"> ' +
        '<a class="businessRequestAcceptedUserPictureContainer" href="'+ROOT+notification.target.username+'"> ' +
        '<img id="businessRequestAcceptedUserPicture-'+notification.ID+'" class="businessRequestAcceptedUserPicture" /> ' +
        '</a> ' +
        '<div class="businessRequestAcceptedUser2PictureContainer"> ' +
        '<img class="businessRequestAcceptedUser2Picture" id="businessRequestAcceptedUser2Picture-'+notification.ID+'" /> ' +
        '</div> ' +
        '</div> ' +
        '<div class="businessRequestAcceptedContentContainer"> ' +
        '<p class="businessRequestAcceptedContent">'+notification.text+'</p> ' +
        '</div> ' +
        '</div> ' +
        '</div>';

    parentNotifications.append(print);

    imageExists(notification.target.thumbnailURL,function(callback){
        if(!callback) notification.target.thumbnailURL = "../image/no_people_o.png";
        $("#businessRequestAcceptedUserPicture-"+notification.ID).attr("src", notification.target.thumbnailURL);
    });

    imageExists(thumbnailURL,function(callback){
        var url = thumbnailURL;
        if(!callback) url = "../image/no_people_o.png";
        $("#businessRequestAcceptedUser2Picture-"+notification.ID).attr("src", url);
    });

}



function buildBusinessRequestSelfAccepted(notification){
    var print = '<div class="notificationsSingleContainer"> ' +
        '<div style="width: 100%; display: flex; flex-direction: row; align-items: center;"> ' +
        '<div class="businessRequestSelfAcceptedUserPictureOuterContainer"> ' +
        '<a class="businessRequestSelfAcceptedUserPictureContainer" href="'+ROOT+notification.source.username+'"> ' +
        '<img  id="businessRequestSelfAcceptedUserPicture-'+notification.ID+'" class="businessRequestSelfAcceptedUserPicture" /> ' +
        '</a> ' +
        '<div class="businessRequestSelfAcceptedUser2PictureContainer"> ' +
        '<img  class="businessRequestSelfAcceptedUser2Picture" id="businessRequestSelfAcceptedUser2Picture-'+notification.ID+'" /> ' +
        '</div> ' +
        '</div> ' +
        '<div class="businessRequestSelfAcceptedContentContainer"> ' +
        '<p class="businessRequestSelfAcceptedContent"> ' + notification.text+
        '</p> ' +
        '</div> ' +
        '</div> ' +
        '</div>';

    parentNotifications.append(print);

    imageExists(notification.source.thumbnailURL,function(callback){
        if(!callback) notification.source.thumbnailURL = "../image/no_people_o.png";
        $("#businessRequestSelfAcceptedUserPicture-"+notification.ID).attr("src", notification.source.thumbnailURL);
    });

    imageExists(thumbnailURL,function(callback){
        var url = thumbnailURL;
        if(!callback) url = "../image/no_people_o.png";
        $("#businessRequestSelfAcceptedUser2Picture-"+notification.ID).attr("src", url);
    });

}




function buildCustom(notification){
    var print = '<div class="notificationsSingleContainer"> ' +
        '<div style="width: 100%; display: flex; flex-direction: row; align-items: center;"> ' +
        '<div class="businessRequestSelfAcceptedUserPictureOuterContainer"> ' +
        '<a class="businessRequestSelfAcceptedUserPictureContainer"> ' +
        '<img src="'+ROOT+'image/logo_bw.png" class="businessRequestSelfAcceptedUserPicture" /> ' +
        '</a> ' +
        '</div> ' +
        '<div class="businessRequestSelfAcceptedContentContainer"> ' +
        '<p class="businessRequestSelfAcceptedContent"> ' + notification.text +
        '</p> ' +
        '</div> ' +
        '</div> ' +
        '</div>';

    parentNotifications.append(print);

}



function updateNotificationCount(){
    var req = $.ajax({
        url : doRetrieveNotificationCountURL,
        type : "GET",
        data : {
            userID : userID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        if(response['response'] === kCSResponseNegative){

        }
        else if(response['response'] === kCSResponseOk) {
            let count = response['result']['count'];
            if(count === '0' || count === 0){
                $(".toolbarNotificationsBubble").css("color","#eeeeee");
                $(".toolbarNotificationsBadge").fadeOut(200);
                $("#toolbarButtonNotificationsM p span").text("Notifications");
                $(".toolbarNotificationsBubble").css("background-color","#ffffff");
            }
            else{
                $(".toolbarNotificationsBadge span").text(count);
                $(".toolbarNotificationsBadge").fadeIn(100).css("display","flex");
                $(".toolbarNotificationsBubble").css("background-color","#F44336");
                $("#toolbarButtonNotificationsM p span").text("Notifications ( "+count+" New )");
            }
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}




