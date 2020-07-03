/**
 * Created by razvan on 15/08/2017.
 */



/**
 *
 * ----------------------------------------------------------
 *
 * PROJECT CONFIGURATION
 *
 * ----------------------------------------------------------
 *
 */





const RELEASE = false;
const ROOT = RELEASE ? "" : "http://localhost:8888/csuite/";




/**
 *
 * ----------------------------------------------------------
 *
 * REQUEST & RESPONSE
 *
 * ----------------------------------------------------------
 *
 */



/**
 Classic responses
 */
const kResponseOk = 'response-ok';
const kResponseNegative = 'response-negative';
/**
 Variable is already in use
 */
const kResponseEmail = 'response-email';
const kResponseUsername = 'response-username';
const kCSResponseReload = 'response-reload';
const kCSResponseVisible = 'response-visible';
const kCSResponseProvider = 'response-provider';

const kCSResponseTokenExpired = 'response-token-expired';
const kCSResponseOldPassword = 'response-old-password';


class Request{

    static negative(response){
        return  (response['response'] === kResponseNegative);
    }

    static ok(response){
        return  (response['response'] === kResponseOk);
    }

    static email(response){
        return (response['response'] === kResponseEmail);
    }

    static username(response){
        return (response['response'] === kResponseUsername);
    }

    static result(response){
        return response.hasOwnProperty("result") ? response["result"] : "";
    }

    static manage(response){
        try{
            response = JSON.parse(response);
            if(Request.negative(response)){
                if(!RELEASE) console.log(response);
                console.log("Negative"); return null;
            }
            else if(Request.ok(response)) {
                return response['result'] !== null ? response['result'] : null;
            }
        }catch (e){
            if(!RELEASE) console.log(response);
            console.log(e);
        }
        return null;
    }

}





const COL_SIZE_MAX_MD = 992;
const COL_SIZE_MAX_SM = 768;


/**
 *
 * ----------------------------------------------------------
 *
 * PATHS
 *
 * ----------------------------------------------------------
 *
 */

const PATH_DEFAULT_PICTURE_PERSON = ROOT+'image/default_profile.png';
const PATH_DEFAULT_PICTURE_NETWORK = ROOT+"image/icon_default.png";
const PATH_DATA = "data/";




/**
 *
 * ----------------------------------------------------------
 *
 * PAGES
 *
 * ----------------------------------------------------------
 *
 */


const PAGE_IDENTIFIER_INDEX = 'index';
const PAGE_IDENTIFIER_DASHBOARD = 'dashboard';
const PAGE_IDENTIFIER_PROFILE  = "profile";
const PAGE_IDENTIFIER_BUSINESS_BOOK = "business_book";

const PAGE_IDENTIFIER_SECONDARY_EDIT_PROFILE = "s_edit_profile";
const PAGE_IDENTIFIER_SECONDARY_ABOUT = "s_about";
const PAGE_IDENTIFIER_SECONDARY_BADGE = "s_badge";
const PAGE_IDENTIFIER_SECONDARY_HELP = "s_help";
const PAGE_IDENTIFIER_SECONDARY_LOG_OUT = "s_log_out";

const PAGE_IDENTIFIER_SECONDARY_ADD_NETWORK =  "s_network_add";
const PAGE_IDENTIFIER_SECONDARY_EDIT_NETWORK =  "s_network_edit";

const PAGE_IDENTIFIER_SECONDARY_ADD_ARTICLE =  "s_article_add";
const PAGE_IDENTIFIER_SECONDARY_EDIT_ARTICLE =  "s_article_edit";

/**
 * PRIMARY_PAGES will appear in the left side menu
 */
const PRIMARY_PAGES = [
    {
        name : "Dashboard",
        identifier : PAGE_IDENTIFIER_DASHBOARD ,
        icon : "icon-conn-06",
        url : "content/dashboard.php"
    },
    {
        name : "Profile",
        identifier : PAGE_IDENTIFIER_PROFILE ,
        icon : "icon-conn-01",
        url : "content/profile.php"
    },
    {
        name : "Business Book",
        identifier : PAGE_IDENTIFIER_BUSINESS_BOOK ,
        icon : "icon-conn-08",
        url : "content/business-book.php"
    }
];
/**
 * SECONDARY_PAGES will be (usually) accessible from a primary page and will have (usually) a "back" option
 */
const SECONDARY_PAGES = [
    {
        menu : true,
        name : "Edit Profile",
        identifier : PAGE_IDENTIFIER_SECONDARY_EDIT_PROFILE, //for the page
        parentIdentifier : PAGE_IDENTIFIER_PROFILE, //for the parent-page = where to return to
        url : 'content/edit-profile.php'
    },
    {
        menu : true,
        name : "About",
        identifier : PAGE_IDENTIFIER_SECONDARY_ABOUT, //for the page
        parentIdentifier : PAGE_IDENTIFIER_DASHBOARD, //for the parent-page = where to return to
        url : 'content/i/about.php'
    },
    {
        menu : true,
        name : "Badge",
        identifier : PAGE_IDENTIFIER_SECONDARY_BADGE, //for the page
        parentIdentifier : PAGE_IDENTIFIER_DASHBOARD, //for the parent-page = where to return to
        url : 'content/i/badge.php'
    },
    {
        menu : true,
        name : "Help",
        identifier : PAGE_IDENTIFIER_SECONDARY_HELP, //for the page
        parentIdentifier : PAGE_IDENTIFIER_DASHBOARD, //for the parent-page = where to return to
        url : 'content/i/help.php'
    },
    {
        menu : true,
        name : "Log Out",
        identifier : PAGE_IDENTIFIER_SECONDARY_LOG_OUT, //for the page
        parentIdentifier : PAGE_IDENTIFIER_DASHBOARD, //for the parent-page = where to return to
        url : 'core/session/log-out.php'
    },
    {
        menu : false,
        name : "Add a New Network",
        identifier : PAGE_IDENTIFIER_SECONDARY_ADD_NETWORK, //for the page
        parentIdentifier : PAGE_IDENTIFIER_DASHBOARD, //for the parent-page = where to return to
        url : 'content/n/add.php'
    },
    {
        menu : false,
        name : "Edit network",
        identifier : PAGE_IDENTIFIER_SECONDARY_EDIT_NETWORK, //for the page
        parentIdentifier : PAGE_IDENTIFIER_DASHBOARD, //for the parent-page = where to return to
        url : 'content/n/edit.php'
    },
];


function findPrimaryPageByID(identifier){
    for(let i =0; i < PRIMARY_PAGES.length; i++) if(identifier === PRIMARY_PAGES[i].identifier) return PRIMARY_PAGES[i];
    return null;
}

function findSecondaryPageByID(identifier){
    for(let i =0; i < SECONDARY_PAGES.length; i++) if(identifier === SECONDARY_PAGES[i].identifier) return SECONDARY_PAGES[i];
    return null;
}


/**
 *
 * ----------------------------------------------------------
 *
 * OTHER UTILS
 *
 * ----------------------------------------------------------
 *
 */


function parseAPI(API){
    try{
        return JSON.parse(API);
    }
    catch(e){

    }
    return  "";
}


function isMobileSize(){
    return ($(window).width() <= COL_SIZE_MAX_MD);
}




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
