/**
 * Created by Razvan on 08-Feb-17.
 */



/**
 * Function used for determining when user has scrolled close to bottom of page
 * Great for "Load More" tricks
 */
function lazyLoadNewsFeed(nearToBottom, element, parent){

    console.log("DocHeight : "+ $(document).height());
    console.log("E Scroll Top : "+ element.scrollTop());
    console.log("E Height : "+ element.height() );
    console.log("W InnerHeight : "+ parent.height());
    return (element.scrollTop() >= (parent.height() - nearToBottom));
}


function lazyLoadElement(nearToBottom, element, parent){
    return (element.height()+ element.scrollTop() >= (parent.height() - nearToBottom));
}

function lazyLoadDocument(nearToBottom){
    return (window.innerHeight+ $(window).scrollTop() >= ($(document).height() - nearToBottom));
}
/**
 console.log("DocHeight : "+ $(document).height());
 console.log("W Scroll Top : "+ $(window).scrollTop());
 console.log("W Height : "+ $(window).height());
 console.log("W InnerHeight : "+ window.innerHeight);
 */


/**
 * Function used for determining if an image is or not on the server
 */
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
}

const options = { year: 'numeric', month: 'long', day: 'numeric' };


function convertDate(date){
    date = date.toDate("dd/mm/yyyy");
    var day = date.getDate(); if(day <= 9) day = "0"+day;
    var month = date.getMonth()+1; if(month <= 9) month = "0"+month;
    var year = date.getFullYear();
    date = year+"-"+month+"-"+day;
    return date;
}



String.prototype.toDate = function(format)
{


    var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
    var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    var formatItems     = normalizedFormat.split('-');
    var dateItems       = normalized.split('-');

    var monthIndex  = formatItems.indexOf("mm");
    var dayIndex    = formatItems.indexOf("dd");
    var yearIndex   = formatItems.indexOf("yyyy");
    var hourIndex     = formatItems.indexOf("hh");
    var minutesIndex  = formatItems.indexOf("ii");
    var secondsIndex  = formatItems.indexOf("ss");

    var today = new Date();

    var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
    var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
    var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

    var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
    var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
    var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

    return new Date(year,month,day,hour,minute,second);
};



/**
 Global PRINTS
 printHelper()helps show the blue info-box with custom text inside.
 */

function printHelper(parent, content, html){

    let print = '<div class="HELPERContentContainer doNotSelect"> ' +
        '<div class="HELPERFilterInfoContainer"> ';
    if(html) print+='<span>'+content+'</span>';
    else print+=content;
    print+='</div>';
    parent.append(print);
}



function printHelperWithButton(ID,parent, content, button = {"title" : "Click me!", "callback" : function(){ showToast("Button click!",600); }}){


    let print =
        '<div class="connSuiteHelperContainer"> ' +
        '<div class="connSuiteHelperContent"> '+
        '<span>'+content+'</span>'+
        '</div>'+
        '<a id="HELPER-'+ID+'" class="connSuiteHelperButton"><span>'+button.title+'</span></a>'+
        '</div>';
    parent.append(print);

    if(button['callback']){
        let callback = button['callback'];
        $("#HELPER-"+ID).on("click",function(){
            callback();
        })
    }

}


function labelThis(parent, text){
    var print = '<div style="height: 100%; display: flex; align-items: center;"><span>' + text + '</span></div>';
    parent.append(print);
}

function getFirstWord(str) {
    if (str.indexOf(' ') === -1)
        return str;
    else
        return str.substr(0, str.indexOf(' '));
}



function showToast(text, timeout){
    $(function(){
        var container = $("#toast");
        if(!container.length) {
            var toast = '<div id="toast"> ' +
                '<div  id="toastInnerContainer"> ' +
                '<span  style="color: #04befe" id="toast-text"></span> ' +
                '</div> ' +
                '</div>';

            $("body").append(toast)
        }
        $("#toast-text").text(text);
        container.show();
        if(timeout!== null && timeout!=false)
            setTimeout(function () {
                $("#toast").fadeOut('slow');}, timeout);
    });
}

function hideToast(){
    var container = $("#toast");
    container.fadeOut(50);
}


function compareDates(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA,"YYYY/MM/DD");
    var momentB = moment(dateTimeB,"YYYY/MM/DD");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}


function favicon(depthToRoot){

    var prePath="";
    for (var i = 0; i < depthToRoot; i++) prePath += "../";
    prePath+="image/favicon";
    var print = '';

    // $('head').append(print);
}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phone){
    re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if(re.test(phone)){
        if(phone.trim().length < 10) return false;
    }
    else return false;
    return true;
}


function validateString(str){
    return !(str == null || str.length == 0 || str.trim().length == 0 || str === '');

}


function validateURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
        return false;
    } else {
        return true;
    }
}


/**
 * FAVICON
 */

$(function(){
    var favRoot = ROOT + "image/favicon";
    var printFav = '<link rel="apple-touch-icon" sizes="57x57" href="'+favRoot+'/apple-icon-57x57.png"> ' +
        '<link rel="apple-touch-icon" sizes="60x60" href="'+favRoot+'/apple-icon-60x60.png"> ' +
        '<link rel="apple-touch-icon" sizes="72x72" href="'+favRoot+'/apple-icon-72x72.png"> ' +
        '<link rel="apple-touch-icon" sizes="76x76" href="'+favRoot+'/apple-icon-76x76.png"> ' +
        '<link rel="apple-touch-icon" sizes="114x114" href="'+favRoot+'/apple-icon-114x114.png"> ' +
        '<link rel="apple-touch-icon" sizes="120x120" href="'+favRoot+'/apple-icon-120x120.png"> ' +
        '<link rel="apple-touch-icon" sizes="144x144" href="'+favRoot+'/apple-icon-144x144.png"> ' +
        '<link rel="apple-touch-icon" sizes="152x152" href="'+favRoot+'/apple-icon-152x152.png"> ' +
        '<link rel="apple-touch-icon" sizes="180x180" href="'+favRoot+'/apple-icon-180x180.png"> ' +
        '<link rel="icon" type="image/png" sizes="192x192"  href="'+favRoot+'/android-icon-192x192.png"> ' +
        '<link rel="icon" type="image/png" sizes="32x32" href="'+favRoot+'/favicon-32x32.png"> ' +
        '<link rel="icon" type="image/png" sizes="96x96" href="'+favRoot+'/favicon-96x96.png"> ' +
        '<link rel="icon" type="image/png" sizes="16x16" href="'+favRoot+'/favicon-16x16.png"> ' +
        '<link rel="manifest" href="'+favRoot+'/manifest.json"> ' +
        '<meta name="msapplication-TileColor" content="#ffffff"> ' +
        '<meta name="msapplication-TileImage" content="'+favRoot+'/ms-icon-144x144.png"> ' +
        '<meta name="theme-color" content="#ffffff">';
    $("head").append(printFav);
});


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


function transitionPageLeave(newLocation = null){
    setTimeout(function(){window.location.href = newLocation }, 100);
}




function transitionPageEnter(){
    setTimeout(function(){  $(".transitionContainer").fadeOut(200); }, 100);
}

function transitionPageEnterLoad(depthToRoot){
    //no more
}

function transitionPageEnterLoadEnd(){
    $(".transitionContainer").fadeOut(200);
}

$(function () {
    updatePlaceholders();
});


function updatePlaceholders(){
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
        }
    }).blur();
}


$(function(){
    var analytics = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
        "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
        "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
        "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" +
        "ga('create', 'UA-106029257-1', 'auto');" +
        "ga('send', 'pageview');</script>"

    $("body").prepend(analytics);
});



const MODAL_HEADER_TYPE_DELETE = 1;
const MODAL_HEADER_TYPE_COMPLEMENTARY = 2;
const MODAL_HEADER_TYPE_DONE = 3;

const MODAL_BUTTON_COLOR_TYPE_DELETE = "#F44336";

function showBootstrapModal(headerType = 2, title, content, buttons = null, closable = true){

    let modal = $("#utilCustomModal");
    /** If modal code was not yet printed, check and print */
    if(!modal.length) {
        let print = '<div class="modal fade" id="utilCustomModal"  tabindex="-1" role="dialog" aria-labelledby="utilCustomModalTitle"> ' +
            '<div class="modal-dialog" role="document" > ' +
            '<div class="modal-content" > ' +
            '<div class="modal-header" id="utilCustomModalHeader"> ' +
            '<div  style="-webkit-appearance: none" href="#"  class="close" data-dismiss="modal"  aria-label="Close"> <span aria-hidden="true">&times;</span></div> ' +
            '<h4 class="modal-title" id="utilCustomModalTitle"></h4> ' +
            '</div> ' +
            '<div class="modal-body"> ' +
            '<span id="utilCustomModalContent" ></span> ' +
            '</div> ' +
            '<div class="modal-footer" id="utilCustomModalButtons"> ' +

            '</div> ' +
            '</div> ' +
            '</div> ' +
            '</div>';

        $("body").append(print);
    }

    if(!closable) $("#utilCustomModal").attr("data-keyboard","false").attr("data-backdrop","static");
    $("#utilCustomModalTitle").html(title);
    $("#utilCustomModalContent").html(content);

    switch (headerType){
        case MODAL_HEADER_TYPE_DELETE : $("#utilCustomModalHeader").addClass("modal-headerDelete"); break;
        case MODAL_HEADER_TYPE_COMPLEMENTARY : $("#utilCustomModalHeader").addClass("modal-headerComplementary"); break;
        case MODAL_HEADER_TYPE_DONE : break; //default
    }

    $("#utilCustomModalButtons").html("");
    if(!buttons || closable) $("#utilCustomModalButtons").append('<div data-dismiss="modal" class="modalButtonCancel" >Close</div>');
    if(buttons){
        for(let i = 0; i < buttons.length; i++){
            let title = buttons[i]['title'];
            let callback = buttons[i]['callback'];
            let color = buttons[i].hasOwnProperty('color') ? buttons[i]['color'] : "#4ebefe";
            $("#utilCustomModalButtons").append('<div style="color: '+color+' ;" id="utilCustomModalButton-'+i+'" class="modalButtonCancel" >'+title+'</div>');
            if(callback) $("#utilCustomModalButton-"+i).unbind().on("click",function(){callback('#utilCustomModalButton-'+i);});
        }
    }



    $("#utilCustomModal").modal('show');



}





function DRIFT(){
    !function() {
        var t;
        if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
            t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
            t.factory = function(e) {
                return function() {
                    var n;
                    return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
                };
            }, t.methods.forEach(function(e) {
            t[e] = t.factory(e);
        }), t.load = function(t) {
            var e, n, o, i;
            e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
        });
    }();
    drift.SNIPPET_VERSION = '0.3.1';
    drift.load('2kt7vwbtvspm');
}

function buildPrePath(depthToRoot){
    let prePath=""; for (let i = 0; i < depthToRoot; i++) prePath += "../";
    return prePath;
}





function ONESIGNAL(depthToRoot){
    if( !isRelease()) return;

    try{
        if(!(window.Notification)) return;
    }catch(err) {return;}



    buildNotificationsPrompt();
    let prePath = buildPrePath(depthToRoot);

    let OneSignal = window.OneSignal || [];
    OneSignal.push(["init", {
        appId: "ad860974-d73d-419d-8b1e-f1a6cd5cf3c2",
        safari_web_id: "web.onesignal.auto.47c70ae7-2660-4f5d-88d3-857f7dfd7254",
        autoRegister: true,
        notifyButton: {enable: false},
        welcomeNotification: {
            "title": "Welcome to ConnSuite!",
            "message": "Thanks for subscribing!",
        }
    }]);
    OneSignal.push(function () {
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("subscriptionChange");
            if (isSubscribed) {
                OneSignal.getUserId(function (playerID) {
                    let send = $.ajax({
                        url: "https://www.connsuite.com/core/p/notification/onesignal/register-player.php",
                        type: "POST",
                        data: {
                            playerID: playerID,
                            userID: userID
                        }
                    });
                    send.done(function (msg) {
                        console.log(msg);
                        if ($("#notificationsPermissionFooter").length) $("#notificationsPermissionFooter").hide();
                    });
                });
            }
        });
    });

}


function buildNotificationsPrompt(){

    if (Notification.permission !== "granted") {
        let print =
            '<div id="notificationsPermissionFooter" style="width: 100%; min-height: 50px; padding: 15px; background: #04befe; cursor: pointer; display: flex; -webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none; justify-content: center; align-items: center; text-align: center;">' +
            '<span style="font-size: 10pt;color: #ffffff; font-family: Quicksand_Book, Source Sans Pro, Arial">Make use of the power of notifications! Click here to enable ConnSuite to send you notifications when someone interacts with your account. (e.g. business requests)</span>' +
            '</div>';
        $('body').append(print);

        $("#notificationsPermissionFooter").unbind().on("click",function(){
            checkNotificationsFromPromptClick();
        })
    }
}


function checkNotificationsFromPromptClick(){


    Notification.requestPermission().then(function(result) {
        if (Notification.permission === "granted") {
            if($("#notificationsPermissionFooter").length) $("#notificationsPermissionFooter").hide();
            console.log("granted");

            let OneSignal = window.OneSignal || [];
            OneSignal.push(["registerForPushNotifications"]);
            console.log(OneSignal);


        }
        else if (Notification.permission !== "granted") {
            showBootstrapModal(MODAL_HEADER_TYPE_COMPLEMENTARY,
                "It looks like you've disabled notifications on ConnSuite 😥",
                "In order for you to take advantage of the power of notifications, you have to go into your settings and enable the notifications for ConnSuite. Once you do that, you will be able to receive notifications from us on important occasions such as when someone requests your business card 😎."
            )
        }
    });
}




function disableButtonClick(element, loader = false){
    element.addClass("disableClick");
    if(loader) loader.show(150);
}

function enableButtonClick(element,loader = false){
    element.removeClass("disableClick");
    if(loader) loader.hide(150);
}

