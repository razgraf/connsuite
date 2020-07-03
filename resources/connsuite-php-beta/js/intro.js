/**
 * Created by razvan on 08/09/2017.
 */

const INTRO_FEATURE_CARD_1 = 1;
const INTRO_FEATURE_CARD_2 = 2;
const INTRO_FEATURE_CARD_3 = 3;
const RESET_CARDS = 4;

var selected = RESET_CARDS;
var self = new ConnUser();
var networkLimit;

var REASONS = [
        { ID : 1 , name : 'Feedback', selected : false, inquiry : "offer you some feedback for ConnSuite." },
        { ID : 2 , name : 'Idea', selected : false, inquiry : "talk to you about an Idea I have for ConnSuite."  },
        { ID : 3 , name : 'Network Request', selected : false, inquiry : "point out a Network that you might want to add in your list of default Networks&Accounts on ConnSuite."  },
        { ID : 4 , name : 'Feature', selected : false, inquiry : "talk to you about a feature you might want to implement or update on ConnSuite."  },
        { ID : 5 , name : 'Business Opportunity', selected : false,inquiry : "discuss a business opportunity that you might be interested in."  },
        { ID : 6 , name : 'Say Congratulations', selected : false, inquiry : "congratulate you on building ConnSuite."  },
        { ID : 7 , name : 'Other', selected : false,inquiry : "talk to you more about ConnSuite."  }
    ];



$(function(){

    if($(window).width() > 970) networkLimit = 16;
    else networkLimit = 8;

    $(document).click(function(event) {
        if (!$(event.target).is('.introFeatureCard') && !$(event.target).parents(".introFeatureCard").is(".introFeatureCard")) {
            showCard(RESET_CARDS);
        }
    });

    $('#messageModal').on('shown.bs.modal', function (e) {
        $('#messageModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    retrieveSelf();
    printReasons();

    $(".sendButton").on("click",function(){
       if(checkMessage()) doSendMessage();
    });
    $("a.csVideo").YouTubePopUp();
    $(".playVideoButton").on("click",function(){
        $("a.csVideo").click();
    })
});

/**
 * CARDS / FEATURES
 * @param ID
 */
function showCard(ID){
    var mobile = $(window).width() < 970;
    switch (ID){
        case INTRO_FEATURE_CARD_1 :
            if(!mobile) $("#FEATURE_CARD_1").addClass("introFeatureCardSelected");
            $("#FEATURE_CARD_1  .introFeatureMainContainer  .introFeatureMainBack").addClass("introFeatureMainBackSelected");

            if(!mobile) $("#FEATURE_CARD_2").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_2  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            if(!mobile)$("#FEATURE_CARD_3").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_3  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            selected = INTRO_FEATURE_CARD_1;
            break;

        case INTRO_FEATURE_CARD_2 :
            if(!mobile)   $("#FEATURE_CARD_2").addClass("introFeatureCardSelected");
            $("#FEATURE_CARD_2  .introFeatureMainContainer  .introFeatureMainBack").addClass("introFeatureMainBackSelected");


            if(!mobile)  $("#FEATURE_CARD_1").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_1  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            if(!mobile)  $("#FEATURE_CARD_3").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_3  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");



            selected = INTRO_FEATURE_CARD_2;
            break;

        case INTRO_FEATURE_CARD_3 :
            if(!mobile) $("#FEATURE_CARD_3").addClass("introFeatureCardSelected");
            $("#FEATURE_CARD_3  .introFeatureMainContainer  .introFeatureMainBack").addClass("introFeatureMainBackSelected");


            if(!mobile)  $("#FEATURE_CARD_2").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_2  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            if(!mobile) $("#FEATURE_CARD_1").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_1  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            selected = INTRO_FEATURE_CARD_3;
            break;

        case RESET_CARDS :

            if(!mobile)  $("#FEATURE_CARD_1").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_1  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            if(!mobile)  $("#FEATURE_CARD_2").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_2  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");

            if(!mobile)  $("#FEATURE_CARD_3").removeClass().addClass("introFeatureCard");
            $("#FEATURE_CARD_3  .introFeatureMainContainer  .introFeatureMainBack").removeClass().addClass("introFeatureMainBack");


            selected = RESET_CARDS;
            break;
    }
}

/**
 * Self BUSINESS CARD / WHO
 */
function retrieveSelf(){

    var req = $.ajax({
        url : retrieveUserURL,
        type : "GET",
        data : {username : SELF_USERNAME, visible : true}
    });

    req.done(function(response){
       // console.log(response);
        response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative){
            showToast("There was an error fetching this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
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




    var networksParent = $("#businessCardSelfNetworks");


    var localLimit  = networkLimit;
    if(self.networks.length < networkLimit) localLimit = self.networks.length;
    for(var i=0; i< localLimit; i++){
        var print = ' <div class="leftNetworksTableItemContainer" > ' +
            '<div class="leftNetworksTableItemImageContainer">' +
            '<img class="leftNetworksTableItemImage" src="'+self.networks[i].image.thumbnail+'"/> ' +
            '</div>' +
            '</div>';
        networksParent.append(print);
    }

    print = ' <div data-tooltip="See more networks" class="leftNetworksTableItemContainer tool"  > ' +
        '<a  id="leftNetworksTableItemVisitContainer">' +
        '<span>...</span> ' +
        '</a>' +
        '</div>';
    networksParent.append(print);

    $("#leftNetworksTableItemVisitContainer").prop("href",ROOT+SELF_USERNAME);
    $(".businessCardRightUsername").html('<span id="businessCardRightUsernameHelper">Username : </span>'+self.username);
    $(".businessCardRightName").text(self.name);

    $("#pendingRequestsNumber").text(self.requestsCount);
    if(self.requestsCount > 0) $(".pendingRequestCounterContainer").css("color","#04BEFE").css("font-weight","400");
    if(self.requestsCount == 1){
        $("#pendingRequestsHelper").text("Pending Request");
    }
    else $("#pendingRequestsHelper").text("Pending Requests");

}

/**
 * Reasons / MESSAGE
 */


function printReasons(){

    for(var i = 0; i< REASONS.length; i++){
        var print = '<div onclick="selectReason('+REASONS[i].ID+')" class="contactReasonItem" id="REASON-'+REASONS[i].ID+'"><span>'+REASONS[i].name+'</span></div>';
        $(print).hide().appendTo("#reasonContainer").fadeIn(500);
    }
}

function selectReason(ID){
    var element = $("#REASON-"+ID);
    var helper = $("#contactHelper .HELPERFilterInfoContainer > span");
    var preText = "Example : Hi ConnSuite Team! I am George and I would like to ";
    if(element.hasClass("contactReasonItemSelected")){
        element.removeClass().addClass("contactReasonItem");
        REASONS[ID-1].selected = false;
    }
    else {
        if (element.hasClass("contactReasonItem")) {
            element.removeClass().addClass("contactReasonItemSelected");
            REASONS[ID - 1].selected = true;
            helper.text(preText + REASONS[ID - 1].inquiry);
        }
    }
}

function checkMessage(){
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    if(!name || name.length === 0 || name.trim().length === 0 || (name.replace(" ","")).length < 2){
        showToast("Please add a valid name in the contact form.",900);
        return false;
    }

    if( email===null || email.trim().length < 3 || !validateEmail(email)){
        showToast("Please add a valid email address in the contact form!",900);
        return false;
    }

    if(!message || message.length === 0 || message.trim().length === 0 || (message.replace(" ","")).length < 2){
        showToast("Please add a valid message in the contact form.",900);
        return false;
    }

    return true;
}

function doSendMessage(){
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var reasons ="[Default]";
    for(var i=0; i<REASONS.length;i++){
        if(REASONS[i].selected === true) {
            if(reasons === "[Default]") reasons = "";
            reasons+="["+REASONS[i].name+"] ";
        }
    }

    var send = $.ajax({
        url : sendMessageURL,
        type : "POST",
        data : {
            name : name,
            email : email,
            message : message,
            reason : reasons
        }
    });

    $('body').prop("disabled",true);
    send.done(function(response){
         console.log(response);
         response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative){
            showToast("There was an error sending the message. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            $('#messageModal').modal('show');
        }
    });
    send.fail(function(e){
        console.log("fail");
        showToast("Server error. Message was not sent.");
    });
    send.always(function(){
        $('body').prop("disabled",false);
    })


}