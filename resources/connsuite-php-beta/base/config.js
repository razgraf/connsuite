/**
 * Created by razvan on 15/08/2017.
 */



function isRelease(){
    return false; //DEVELOPMENT
    //return true; //RELEASE
}

const ROOT = "http://localhost:8888/connsuite/"; //DEVELOPMENT
//const ROOT = "https://www.connsuite.com/"; //RELEASE




/**
 Classic responses
 */
const kCSResponseOk = 'response-ok';
const kCSResponseNegative = 'response-negative';
/**
 Variable is already in use
 */
const kCSResponseEmail = 'response-email';
const kCSResponseUsername = 'response-username';
const kCSResponseReload = 'response-reload';
const kCSResponseVisible = 'response-visible';
const kCSResponseProvider = 'response-provider';

const kCSResponseTokenExpired = 'response-token-expired';
const kCSResponseOldPassword = 'response-old-password';




const NETWORK_IMAGE_TYPE=".png";

const SELF_USERNAME = 'razgraf';
const CONNSUITE_OFFICIAL_USERNAME = 'connsuite.team';
const CONNSUITE_OFFICIAL_USERID = '16';
const DEFAULT_NETWORK_ICON = 'icon_default.png';
const PROFILE_PICTURE_TYPE = '.jpg';
const PAGE_DASHBOARD =  1;
const PAGE_PUBLIC_PROFILE = 2;
const PAGE_BUSINESS_BOOK = 3;
const PAGE_MENU = 4;
const PAGE_STAR = 5;


const PAGE_DASHBOARD_MOBILE =  1;
const PAGE_PUBLIC_PROFILE_MOBILE = 2;
const PAGE_BUSINESS_BOOK_MOBILE = 3;
const PAGE_MENU_MOBILE = 4;


$(function(){
    if ( typeof String.prototype.startsWith != 'function' ) {
        String.prototype.startsWith = function( str ) {
            return this.substring( 0, str.length ) === str;
        }
    };


    if ( typeof String.prototype.endsWith != 'function' ) {
        String.prototype.endsWith = function( str ) {
            return this.substring( this.length - str.length, this.length ) === str;
        }
    };
});




const kCSNotificationTypeBusinessRequest = 1;
const kCSNotificationTypeBusinessRequestAccepted = 2;
const kCSNotificationTypeBusinessRequestSelfAccepted = 3;


const kCSNotificationTypeTutorial = 4;
const kCSNotificationTypeCustom = 5;


const kCSBusinessRequestPending = 1;
const kCSBusinessRequestAccepted = 2;


function buildHeaders(token, userID) {
    return{
            TOKEN: token,
            USER: userID
        };
}



const COL_SIZE_MAX_MD = 992;
const COL_SIZE_MAX_SM = 768;



function isMobileSize(){
    return ($(window).width() <= COL_SIZE_MAX_MD);
}


/**
 * -----------------------------------
 * LOGS
 * -----------------------------------
 */


const LOG_TYPE_DEFAULT = 0;
const LOG_TYPE_PROFILE_VISIT = 1;
const LOG_TYPE_USER_SIGN_IN = 2;
const LOG_TYPE_BADGE_ACCESSED = 3;
const LOG_TYPE_NETWORK_LINK_ACCESSED = 4;
const LOG_TYPE_REFERRER = 5;
const LOG_TYPE_USER_SIGN_UP = 6;

const LOG_STRANGER_SOURCE_ID = -5;



/**
 *
 * @param {int} type
 * @param {int} sourceID
 * @param {int} targetID
 * @param  body
 */
function addConnLog(type, sourceID,targetID,body = null){


    let data = {};
    if(type) data.type = type;
    if(sourceID) data.sourceID = sourceID;
    if(targetID) data.targetID = targetID;
    if(body) data.body = JSON.stringify(body);


    let request = $.ajax({
        url : ROOT+"core/system/add-log.php",
        type : "POST",
        data : data

    });
    console.log(data);

    request.done(function(response){
       console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            console.log("Logging failed with Negative.");
        }
        else if(response['response'] === kCSResponseOk) {
            console.log("Logging has been accomplished.");
        }
    });
    request.fail(function(e){
        console.log("Logging failed");
    });
    request.always(function(){

    })

}




function doCompleteTutorialStep(stepID,refresh = false,href = null,extra = null) {
    console.log("stepID : "+stepID);
    let data = {stepID : stepID};
    try{
        if(extra!==null && extra.hasOwnProperty('tutorialAction')){
            data.tutorialAction = extra['tutorialAction']; //for those that are not auto-solvable like add-network
        }
    }
    catch (err){}
    let reqP = $.ajax({
        url : ROOT+"core/tutorial/step-up.php",
        type : "POST",
        data : data,
        headers : buildHeaders(token, userID)
    });

    reqP.done(function(response){
        try {
            console.log(response);
            response = JSON.parse(response);
            if (response['response'] === kCSResponseNegative) {
                console.log(response);
                if(refresh) window.location.href = ROOT+'p/dashboard.php';
                else if(href) window.location.href = href;
            }
            else if (response['response'] === kCSResponseOk) {
                if(refresh) window.location.href = ROOT+'p/dashboard.php?stickyTutorial=true&stickyPassed=true';
                else if(href) window.location.href = href;
            }
        }catch(err){
            console.log(err);
            console.log(response);
        }

    });

    reqP.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


const TUTORIAL_STEP_COUNT = 8;
const TUTORIAL_STEP_WELCOME = 0;
const TUTORIAL_STEP_PROFILE_PICTURE = 1;
const TUTORIAL_STEP_NETWORK = 2;
const TUTORIAL_STEP_BUSINESS_BOOK = 3;
const TUTORIAL_STEP_PROFILE_EXAMPLE = 4;
const TUTORIAL_STEP_ARTICLE = 5;
const TUTORIAL_STEP_SHARE = 6;
const TUTORIAL_STEP_END = 7;




