<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 08-Feb-17
 * Time: 11:34 PM
 */

function isRelease(){
    return false; //DEVELOPMENT
   // return true; //RELEASE
}

/**The root of the website*/
const ROOT = 'http://localhost:8888/connsuite/'; //DEVELOPMENT
//const ROOT = 'https://www.connsuite.com/'; //RELEASE

/**The depth difference between base of server and root folder of website*/
$depthToBase = 0; //DEVELOPMENT
//$depthToBase = 1; //RELEASE

/*The keys used here will be used on the entire website*/
/* NAMES=KEYS cannot be changed as this would cause damage to website */


const PAGE_WELCOME_KEY = 'welcome';
const PAGE_PROFILE_KEY = 'index';



const SYSTEM_PAGE_CONFIG = 'config';
const SYSTEM_PAGE_LIBS_CORE = 'core';
const SYSTEM_PAGE_LIBS_CONSTANT = 'constant';
const SYSTEM_PAGE_LIBS_IMAGE_RESIZE = 'image-resize';

const SYSTEM_CLASS_USER = 'user';

const SYSTEM_PAGE_SESSION_CHECK_KEY = 'session-check';
const SYSTEM_PAGE_LOG_IN_KEY = 'log-in';
const SYSTEM_PAGE_LOG_OUT_KEY = 'log-out';
const SYSTEM_PAGE_REGISTER_KEY = 'register';
const SYSTEM_PAGE_FACEBOOK_KEY = 'configure-facebook';
const SYSTEM_PAGE_LINKED_IN_KEY = 'configure-linked_in';


const PAGE_DASHBOARD_KEY = 'dashboard';
const PAGE_BUSINESS_BOOK_KEY = 'business-book';
const PAGE_NETWORK_ADD_KEY = 'network-add';
const PAGE_NETWORK_EDIT_KEY = 'network-edit';

const PAGE_BUSINESS_SCAN_KEY = 'business-show-scan';

const PAGE_PROFILE_EDIT_KEY = 'profile-edit';
const PAGE_PASSWORD_CHANGE_KEY = 'password-change';
const PAGE_PASSWORD_FORGOT_KEY = 'password-forgot';
const PAGE_PROFILE_ALIAS_KEY = 'profile-alias';

const PAGE_ARTICLE_ADD_KEY = 'article-add';
const PAGE_ARTICLE_VIEW_KEY = 'article-view';
const PAGE_ARTICLE_EDIT_KEY='article-edit';


const PAGE_NOTIFICATIONS_KEY = 'notifications';
const PAGE_SEARCH_KEY = 'search';

const PAGE_INTRO_KEY = 'intro';
const PAGE_INTRO_BADGE = 'intro-badge';
const PAGE_INTRO_ASK = 'intro-ask';

const PAGE_INTRO_TERMS = 'intro-terms';





const CORE_PAGE_RETRIEVE_NETWORK_LIST = 'N-retrieve-network-list';
const CORE_DO_VISIBLE_CHANGE = 'N-do-public-change';
const CORE_DO_NETWORK_DELETE = 'N-do-network-delete';
const CORE_DO_NETWORK_ADD = 'N-do-network-add';
const CORE_DO_NETWORK_EDIT = 'N-do-network-edit';
const CORE_DO_NETWORK_REORDER = 'N-do-network-reorder';

const CORE_DO_PROFILE_RETRIEVE_NETWORK_LIST = "P-retrieve-network-list";
const CORE_DO_PROFILE_RETRIEVE_ARTICLE_LIST = "P-retrieve-article-list";
const CORE_DO_EDIT_PROFILE_RETRIEVE ="P-retrieve-user";
const CORE_DO_EDIT_USER = "P-edit-user";
const CORE_DO_PROFILE_UPLOAD_PICTURE = "P-upload-picture";
const CORE_DO_PASSWORD_CHANGE = "P-password-change";
const CORE_DO_PASSWORD_EXISTENCE_CHECK = "P-password-existence-check"; //checks if password is already defined (facebook account won't have pw at the beginning)
/** CORE_DO_PASSWORD_FORGOT_REQUEST | HAS RELATIVE DUMB LINK */
const CORE_DO_PASSWORD_FORGOT_REQUEST = "P-password-forgot-request"; //requests a token for a forgot password action
const CORE_DO_PASSWORD_FORGOT_CHECK = "P-password-forgot-check"; //is token valid?
const CORE_DO_PASSWORD_FORGOT_CHANGE = "P-password-forgot-change";



const CORE_DO_ALIAS_RETRIEVE_MAIN = "P-alias-retrieve-main";
const CORE_DO_ALIAS_RETRIEVE_LIST = "P-alias-retrieve-list";
const CORE_DO_ADD_ALIAS = "P-alias-add";
const CORE_DO_CHECK_ALIAS_AVAILABLE = "P-check-alias-available";
const CORE_DO_SET_PRIMARY_ALIAS = "P-set-primary-alias";


const CORE_DO_ARTICLE_ADD = "A-article-add";
const CORE_DO_ARTICLE_REMOVE = "A-article-remove";
const CORE_DO_RETRIEVE_ARTICLE = "A-article-retrieve";
const CORE_DO_RETRIEVE_ARTICLE_LIST = "A-article-list-retrieve";
const CORE_DO_UPLOAD_ARTICLE_IMAGE = "A-article-upload-image";
const CORE_DO_REMOVE_ARTICLE_IMAGE = "A-article-remove-image";
const CORE_DO_ARTICLE_EDIT = "A-article-edit";


const CORE_DO_RETRIEVE_BUSINESS_CONNECT_LIST = "BC-retrieve-connect-list";
const CORE_DO_RETRIEVE_BUSINESS_REQUEST_LIST = "BC-retrieve-request-list";

const CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS = "BC-do-retrieve-request-status";
const CORE_DO_BUSINESS_REQUEST = "BC-do-business-request";
const CORE_DO_ACCEPT_BUSINESS_REQUEST = "BC-do-accept-business-request";
const CORE_DO_CANCEL_BUSINESS_REQUEST = "BC-do-cancel-business-request";
const CORE_DO_REMOVE_BUSINESS_CONNECTION = "BC-do-remove-business-connection";
const CORE_DO_RETRIEVE_BUSINESS_CUSTOM_LIST = "BC-do-retrieve-business-custom-list";
const CORE_DO_BUSINESS_CUSTOM_CARD_ADD = "BC-do-business-custom-card-add";
const CORE_DO_BUSINESS_CUSTOM_CARD_DELETE = "BC-do-business-custom-card-delete";
const CORE_DO_BUSINESS_CUSTOM_CARD_EDIT = "BC-do-business-custom-card-edit";



const CORE_DO_NOTIFICATION_LIST_RETRIEVE = "N-do-notification-list-retrieve";
const CORE_DO_NOTIFICATION_ONESIGNAL_REGISTER_PLAYER = "N-do-notification-onesignal-register-player";
const CORE_DO_NOTIFICATION_ONESIGNAL_UNREGISTER_PLAYER = "N-do-notification-onesignal-unregister-player";


const CORE_DO_TUTORIAL_STEP_UP = 'T-do-step-up';
const CORE_DO_TUTORIAL_ADD_PREMIUM = 'T-add-premium';


const CORE_DO_SEARCH_RETRIEVE_USER_LIST = "S-do-search-retrieve-user-list";

/** CORE_DO_PASSWORD_FORGOT_REQUEST | HAS RELATIVE DUMB LINK */
const CORE_DO_SEND_INTRO_MESSAGE = "M-do-send-message";

const CORE_DO_RETRIEVE_NEWS_LIST = "NEWS-retrieve-list";
const CORE_DO_NEWS_VISIT = "NEWS-do-visit";

const CORE_DO_BADGE_RETRIEVE_USER = "BADGE-retrieve-user";

const CORE_DO_LOG_ADD = "LOG-add-log"; //is being use as a static url in config.js

/**
 * Common
 */
const CORE_COMMON_RETRIEVE_NETWORK_DEFAULT_LIST = 'COMMON-retrieve-network-default-list';
const CORE_COMMON_RETRIEVE_LABEL_LIST = 'COMMON-retrieve-label-list';
const CORE_COMMON_RETRIEVE_NETWORK = 'COMMON-retrieve-network';
const CORE_COMMON_RETRIEVE_USER = 'COMMON-retrieve-user';
const CORE_COMMON_RETRIEVE_USER_MINI = 'COMMON-retrieve-user-mini';
const CORE_COMMON_SEARCH_USER = 'COMMON-search-user'; //is being used as a static url in toolbar.js
const CORE_COMMON_RETRIEVE_NOTIFICATION_COUNT = 'COMMON-retrieve-notification-count';



const ARTICLE_CONTENT_PATH = "data/article/content/";
const ARTICLE_COVER_PATH =  "data/article/cover/";
const ARTICLE_IMAGE_PATH =  "data/article/image/";
const ARTICLE_THUMBNAIL_PATH = "data/article/thumbnail/";

$depthToRoot = array(
    PAGE_PROFILE_KEY => 0, /** User profile */
    PAGE_WELCOME_KEY => 0, /** Homepage/Landing for the public/unregistered user */
    SYSTEM_PAGE_SESSION_CHECK_KEY=>1, /**SYSTEM page for checking if session is set*/
    SYSTEM_PAGE_CONFIG => 1,
    SYSTEM_PAGE_LOG_IN_KEY => 1,
    SYSTEM_PAGE_LOG_OUT_KEY=>1,
    SYSTEM_PAGE_REGISTER_KEY=>1,
    SYSTEM_PAGE_FACEBOOK_KEY=>1,
    SYSTEM_PAGE_LINKED_IN_KEY=>1,
    SYSTEM_PAGE_LIBS_CORE => 1,
    SYSTEM_PAGE_LIBS_CONSTANT => 1,
    SYSTEM_PAGE_LIBS_IMAGE_RESIZE=>1,
    PAGE_INTRO_KEY =>1,
    PAGE_INTRO_BADGE=>1,
    PAGE_INTRO_ASK=>1,
    PAGE_INTRO_TERMS=>1,

    SYSTEM_CLASS_USER=>1,

    PAGE_NOTIFICATIONS_KEY => 1,
    PAGE_DASHBOARD_KEY=>1,
    PAGE_NETWORK_ADD_KEY=>2,
    PAGE_NETWORK_EDIT_KEY=>2,
    PAGE_BUSINESS_BOOK_KEY => 2,
    PAGE_SEARCH_KEY => 1,

    PAGE_BUSINESS_SCAN_KEY=>2,

    PAGE_PROFILE_EDIT_KEY=>2,
    PAGE_PASSWORD_CHANGE_KEY => 2,
    PAGE_PASSWORD_FORGOT_KEY=>2,
    PAGE_PROFILE_ALIAS_KEY=>2,

    PAGE_ARTICLE_ADD_KEY=>2,
    PAGE_ARTICLE_VIEW_KEY=>2,
    PAGE_ARTICLE_EDIT_KEY => 2,

    CORE_DO_PROFILE_RETRIEVE_NETWORK_LIST => 3,
    CORE_DO_PROFILE_RETRIEVE_ARTICLE_LIST => 3,
    CORE_DO_EDIT_PROFILE_RETRIEVE => 3,
    CORE_DO_EDIT_USER => 3,
    CORE_DO_PROFILE_UPLOAD_PICTURE => 3,

    CORE_DO_PASSWORD_CHANGE=>4,
    CORE_DO_PASSWORD_EXISTENCE_CHECK=>4,
    CORE_DO_PASSWORD_FORGOT_REQUEST => 4,
    CORE_DO_PASSWORD_FORGOT_CHECK =>4,
    CORE_DO_PASSWORD_FORGOT_CHANGE =>4,


    CORE_DO_ALIAS_RETRIEVE_MAIN=>4,
    CORE_DO_ALIAS_RETRIEVE_LIST=>4,

    CORE_DO_ADD_ALIAS => 4,
    CORE_DO_CHECK_ALIAS_AVAILABLE => 4,
    CORE_DO_SET_PRIMARY_ALIAS=>4,




    CORE_DO_ARTICLE_ADD => 3,
    CORE_DO_ARTICLE_REMOVE => 3,
    CORE_DO_RETRIEVE_ARTICLE => 3,
    CORE_DO_RETRIEVE_ARTICLE_LIST => 3,
    CORE_DO_UPLOAD_ARTICLE_IMAGE => 3,
    CORE_DO_REMOVE_ARTICLE_IMAGE => 3,
    CORE_DO_ARTICLE_EDIT=>3,

    CORE_PAGE_RETRIEVE_NETWORK_LIST => 3,
    CORE_DO_VISIBLE_CHANGE => 3,
    CORE_DO_NETWORK_DELETE => 3,

    CORE_DO_NETWORK_ADD=>3,
    CORE_DO_NETWORK_EDIT => 3,
    CORE_DO_NETWORK_REORDER => 3,

    CORE_DO_RETRIEVE_BUSINESS_CONNECT_LIST=> 3,
    CORE_DO_RETRIEVE_BUSINESS_REQUEST_LIST=> 3,
    CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS => 3,
    CORE_DO_BUSINESS_REQUEST => 3,
    CORE_DO_ACCEPT_BUSINESS_REQUEST =>3,
    CORE_DO_CANCEL_BUSINESS_REQUEST =>3,
    CORE_DO_REMOVE_BUSINESS_CONNECTION =>3,
    CORE_DO_RETRIEVE_BUSINESS_CUSTOM_LIST => 4,
    CORE_DO_BUSINESS_CUSTOM_CARD_ADD => 4,
    CORE_DO_BUSINESS_CUSTOM_CARD_EDIT => 4,
    CORE_DO_BUSINESS_CUSTOM_CARD_DELETE => 4,


    CORE_DO_NOTIFICATION_LIST_RETRIEVE => 3,
    CORE_DO_NOTIFICATION_ONESIGNAL_REGISTER_PLAYER=>4,
    CORE_DO_NOTIFICATION_ONESIGNAL_UNREGISTER_PLAYER=>4,



    CORE_DO_SEARCH_RETRIEVE_USER_LIST => 3,

    CORE_DO_SEND_INTRO_MESSAGE=>2,


    CORE_DO_RETRIEVE_NEWS_LIST=>3,
    CORE_DO_NEWS_VISIT=>3,



    CORE_COMMON_RETRIEVE_NETWORK_DEFAULT_LIST=>2,
    CORE_COMMON_RETRIEVE_LABEL_LIST => 2,
    CORE_COMMON_RETRIEVE_NETWORK => 2,
    CORE_COMMON_RETRIEVE_USER => 2,
    CORE_COMMON_RETRIEVE_USER_MINI => 2,
    CORE_COMMON_SEARCH_USER => 2,
    CORE_COMMON_RETRIEVE_NOTIFICATION_COUNT=>2,


    CORE_DO_BADGE_RETRIEVE_USER=> 1,

    CORE_DO_LOG_ADD=>2,

    CORE_DO_TUTORIAL_STEP_UP=> 2,
    CORE_DO_TUTORIAL_ADD_PREMIUM=>2,
);


/**
 * $pageKey is an Array that contains the names for every page.
 * Its purpose is to help the dev when targeting a certain page.
 * Key may be named ~whatever is easier for dev to refer to. MUST MATCH WITH $depthToRoot
 * Value must be path to page from root of Website
 */

$pathFromRoot = array(
    PAGE_PROFILE_KEY => 'index.php',
    PAGE_WELCOME_KEY => 'welcome.php',
    SYSTEM_PAGE_SESSION_CHECK_KEY => 'session/check.php',
    SYSTEM_PAGE_CONFIG => 'base/config.php',
    SYSTEM_PAGE_LOG_IN_KEY => 'session/log-in.php',
    SYSTEM_PAGE_LOG_OUT_KEY=>'session/log-out.php',
    SYSTEM_PAGE_REGISTER_KEY=>'session/register.php',
    SYSTEM_PAGE_FACEBOOK_KEY => 'session/facebook.php',
    SYSTEM_PAGE_LINKED_IN_KEY=>'session/linked-in.php',
    SYSTEM_PAGE_LIBS_CORE => 'libs/connsuite-core.php',
    SYSTEM_PAGE_LIBS_CONSTANT=> 'libs/connsuite-constant.php',
    SYSTEM_PAGE_LIBS_IMAGE_RESIZE =>'libs/image-resize.php',
    SYSTEM_CLASS_USER=>'base/user.php',

    PAGE_INTRO_KEY =>'intro/index.php',
    PAGE_INTRO_BADGE=> 'intro/badge.php',
    PAGE_INTRO_ASK => 'intro/ask.php',
    PAGE_INTRO_TERMS=>'intro/terms.php',
    PAGE_NOTIFICATIONS_KEY => 'p/notifications.php',
    PAGE_DASHBOARD_KEY => 'p/dashboard.php',
    PAGE_NETWORK_ADD_KEY => 'p/network/add.php',
    PAGE_NETWORK_EDIT_KEY => 'p/network/edit.php',
    PAGE_BUSINESS_BOOK_KEY => 'p/business/book.php',
    PAGE_SEARCH_KEY => 'p/search.php',

    PAGE_BUSINESS_SCAN_KEY=> 'p/business/scan.php',

    PAGE_PROFILE_EDIT_KEY => 'p/profile/edit.php',
    PAGE_PASSWORD_CHANGE_KEY => 'p/profile/password-change.php',
    PAGE_PASSWORD_FORGOT_KEY => 'p/profile/password-forgot.php',
    PAGE_PROFILE_ALIAS_KEY=>'p/profile/alias.php',

    PAGE_ARTICLE_ADD_KEY => 'p/article/add.php',
    PAGE_ARTICLE_VIEW_KEY => 'p/article/view.php',
    PAGE_ARTICLE_EDIT_KEY => 'p/article/edit.php',

    CORE_PAGE_RETRIEVE_NETWORK_LIST => 'core/p/dashboard/retrieve-network-list.php',
    CORE_DO_VISIBLE_CHANGE => 'core/p/dashboard/do-visible-change.php',
    CORE_DO_NETWORK_DELETE => 'core/p/network/delete.php',
    CORE_DO_NETWORK_ADD => 'core/p/network/add.php',
    CORE_DO_NETWORK_EDIT => 'core/p/network/edit.php',
    CORE_DO_NETWORK_REORDER => 'core/p/network/reorder.php',
    CORE_DO_PROFILE_RETRIEVE_NETWORK_LIST => 'core/p/profile/retrieve-network-list.php',
    CORE_DO_PROFILE_RETRIEVE_ARTICLE_LIST => 'core/p/profile/retrieve-article-list.php',
    CORE_DO_EDIT_PROFILE_RETRIEVE => 'core/p/profile/retrieve-user.php',
    CORE_DO_EDIT_USER => 'core/p/profile/edit-user.php',
    CORE_DO_PROFILE_UPLOAD_PICTURE => 'core/p/profile/upload-picture.php',

    CORE_DO_PASSWORD_CHANGE=>'core/p/profile/password/change.php',
    CORE_DO_PASSWORD_EXISTENCE_CHECK => 'core/p/profile/password/existence-check.php',
    CORE_DO_PASSWORD_FORGOT_REQUEST => 'core/p/profile/password/forgot-request.php',
    CORE_DO_PASSWORD_FORGOT_CHECK =>'core/p/profile/password/forgot-check.php',
    CORE_DO_PASSWORD_FORGOT_CHANGE =>'core/p/profile/password/forgot-change.php',


    CORE_DO_ALIAS_RETRIEVE_MAIN=>'core/p/profile/alias/retrieve-main.php',
    CORE_DO_ALIAS_RETRIEVE_LIST=>'core/p/profile/alias/retrieve-list.php',
    CORE_DO_ADD_ALIAS => 'core/p/profile/alias/add.php',
    CORE_DO_CHECK_ALIAS_AVAILABLE => 'core/p/profile/alias/check-available.php',
    CORE_DO_SET_PRIMARY_ALIAS=>'core/p/profile/alias/set-primary.php',

    CORE_DO_ARTICLE_ADD => 'core/p/article/add.php',
    CORE_DO_ARTICLE_REMOVE => 'core/p/article/remove.php',
    CORE_DO_RETRIEVE_ARTICLE => 'core/p/article/retrieve.php',
    CORE_DO_RETRIEVE_ARTICLE_LIST => 'core/p/article/retrieve-list.php',
    CORE_DO_UPLOAD_ARTICLE_IMAGE => 'core/p/article/image-upload.php',
    CORE_DO_REMOVE_ARTICLE_IMAGE => 'core/p/article/image-remove.php',
    CORE_DO_ARTICLE_EDIT=>'core/p/article/edit.php',

    CORE_DO_RETRIEVE_BUSINESS_CONNECT_LIST=> 'core/p/business/retrieve-connect-list.php',
    CORE_DO_RETRIEVE_BUSINESS_REQUEST_LIST=> 'core/p/business/retrieve-request-list.php',
    CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS => 'core/p/business/retrieve-request-status.php',
    CORE_DO_BUSINESS_REQUEST => 'core/p/business/do-request.php',
    CORE_DO_ACCEPT_BUSINESS_REQUEST =>'core/p/business/do-accept-request.php',
    CORE_DO_CANCEL_BUSINESS_REQUEST => 'core/p/business/do-cancel-request.php',
    CORE_DO_REMOVE_BUSINESS_CONNECTION => 'core/p/business/do-remove-connect.php',
    CORE_DO_RETRIEVE_BUSINESS_CUSTOM_LIST => 'core/p/business/custom/retrieve-custom-list.php',
    CORE_DO_BUSINESS_CUSTOM_CARD_ADD => 'core/p/business/custom/do-add.php',
    CORE_DO_BUSINESS_CUSTOM_CARD_EDIT =>  'core/p/business/custom/do-edit.php',
    CORE_DO_BUSINESS_CUSTOM_CARD_DELETE => 'core/p/business/custom/do-delete.php',


    CORE_DO_NOTIFICATION_LIST_RETRIEVE=>'core/p/notification/retrieve.php',
    CORE_DO_NOTIFICATION_ONESIGNAL_REGISTER_PLAYER => 'core/p/notification/onesignal/register-player.php',
    CORE_DO_NOTIFICATION_ONESIGNAL_UNREGISTER_PLAYER =>'core/p/notification/onesignal/unregister-player.php',


    CORE_DO_SEARCH_RETRIEVE_USER_LIST => 'core/p/search/retrieve-user-list.php',
    CORE_DO_SEND_INTRO_MESSAGE => 'core/intro/send-message.php',

    CORE_DO_RETRIEVE_NEWS_LIST=> 'core/p/news/retrieve-list.php',
    CORE_DO_NEWS_VISIT=>'core/p/news/do-visit.php',


    CORE_COMMON_RETRIEVE_NETWORK_DEFAULT_LIST=> 'core/common/retrieve-network-default-list.php',
    CORE_COMMON_RETRIEVE_LABEL_LIST=> 'core/common/retrieve-label-list.php',
    CORE_COMMON_RETRIEVE_NETWORK => 'core/common/retrieve-network.php',
    CORE_COMMON_RETRIEVE_USER => 'core/common/retrieve-user.php',
    CORE_COMMON_RETRIEVE_USER_MINI => 'core/common/retrieve-user-mini.php',
    CORE_COMMON_SEARCH_USER => 'core/common/search-user.php',
    CORE_COMMON_RETRIEVE_NOTIFICATION_COUNT => 'core/common/retrieve-notification-count.php',

    CORE_DO_BADGE_RETRIEVE_USER=> 'badge/get-user.php',
    CORE_DO_LOG_ADD => 'core/system/add-log.php',

    CORE_DO_TUTORIAL_STEP_UP=>'core/tutorial/step-up.php',
    CORE_DO_TUTORIAL_ADD_PREMIUM=>'core/tutorial/add-premium.php',
);


/**
 * Go To Root folder of Website and than go to target-page (by pageKey)
 * @param $from - will be a const KEY
 * @param $to  - will be a const KEY
 * @return string - will be the full path needed to access the "to" file from "from"
 */

function goToRootTarget($from,$to){
    global $depthToRoot;
    global $pathFromRoot;
    $path = "";
    for($i=0;$i<$depthToRoot[$from];$i++) $path.="../";
    $path.= $pathFromRoot[$to];
    return $path;
    //goToRoot from $from and than goTo$to
}

/**
 * Go To Base folder of Server and than go to target-page (by full path)
 * @param $from
 * @param $to
 * @return string
 */
function goToBaseTarget($from,$to){
    global $depthToRoot, $depthToBase;
    $path = "";
    for($i=0;$i< $depthToRoot[$from]+$depthToBase; $i++){ $path.="../";}
    $path.=$to;
    return $path;
    // example : goToBase('credentials','libs/example-core.php') = "../../libs/example-core.php"
}


function secureString($inp) {
    $inp = strip_tags($inp);
    if(is_array($inp))
        return array_map(__METHOD__, $inp);

    if(!empty($inp) && is_string($inp)) {
        $inp = strip_tags($inp);
        return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp);
    }

    return $inp;
}



function secureInt($number){
    $number = strip_tags($number);
    if(filter_var($number, FILTER_VALIDATE_INT) === false){
        exit(exitWithNegative("Data error."));
    }
    $number = (int) $number;
    return $number;
}


function exitWithNegative($error){
    return json_encode(array(
        "response"=>kCSResponseNegative,
        "result"=>$error
    ));
}

function exitWithOk($result){
    return json_encode(array(
        "response"=>kCSResponseOk,
        "result"=>$result
    ));
}


function exitWithEmail($error){
    return json_encode(array(
        "response"=>kCSResponseEmail,
        "result"=>$error
    ));
}

function exitWithUsername($error){
    return json_encode(array(
        "response"=>kCSResponseUsername,
        "result"=>$error
    ));
}
function exitWithSomething($response,$result){
    return json_encode(array(
        "response"=>$response,
        "result"=>$result
    ));
}


function millitime() {
    $microtime = microtime();
    $comps = explode(' ', $microtime);

    // Note: Using a string here to prevent loss of precision
    // in case of "overflow" (PHP converts it to a double)
    return $comps[1];
}


function getNewDimensions($originalWidth,$originalHeight,$newSize){

    $ratio = $originalWidth / $originalHeight;
    if ($ratio > 1) { //width > height
        $newWidth = $newSize;
        $newHeight =  ceil(($originalHeight/$originalWidth)*$newWidth);
    } else { // width <= height
        $newHeight = $newSize;
        $newWidth =  ceil($ratio*$newHeight);
    }

    return array($newWidth,$newHeight);
}



function startSecureSession() {
    $secure = false; //https
    $HTTPOnly = true;  // This stops JavaScript or other languages being able to access the session id.
    // Forces sessions to only use cookies.
    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ".ROOT);
        exit(exitWithNegative("Session error."));
    }
    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params(3600 * 24 * 30, $cookieParams["path"], $cookieParams["domain"], $secure, $HTTPOnly);
    session_start();
    session_regenerate_id();

}



include_once(ROOT.$pathFromRoot[SYSTEM_PAGE_LIBS_CONSTANT]);
include_once('log.php');
include_once('notification.php');


startSecureSession();



const SELF_USERNAME = 'razgraf';
const PROFILE_PICTURE_TYPE = '.jpg';
const PROFILE_PICTURE_NORMAL_SIZE = 300;
const PROFILE_PICTURE_THUMBNAIL_SIZE = 100;
const NETWORK_ICON_NORMAL_SIZE = 300;
const NETWORK_ICON_THUMBNAIL_SIZE = 100;
const ARTICLE_COVER_THUMBNAIL_SIZE = 200;



const USERNAME_BLACKLIST = array(
    'self',
    'razgraf','razvangabriel','razvangabrielapostu',
    'van','vansoftware','connsuite','intro','js','conn',
    'session','libs','image','razvan','news','connnews',
);


const CONNSUITE_OFFICIAL_USERNAME = 'connsuite.team';
const CONNSUITE_OFFICIAL_USERID = '16';



const MAX_BUSINESS_CARD_NUMBER = 30;


const PRIVILEGE_POSITION_USER = 0;
const PRIVILEGE_POSITION_STAR = 1;






const PRIVILEGE = array(
    PRIVILEGE_POSITION_USER => array(
        'MAX_CUSTOM_BUSINESS_CARD_NUMBER' => 30,
        'MAX_ALIAS_NUMBER'=>1,
    ),
    PRIVILEGE_POSITION_STAR=> array(
        'MAX_CUSTOM_BUSINESS_CARD_NUMBER' => 9999,
        'MAX_ALIAS_NUMBER'=>19,
    )
);




function printMeta_Image(){
    echo '<meta property="og:image" content="https://www.connsuite.com/image/marketing/connsuitebusiness.png" />';
}
function printMeta_Description($description = null){
    if($description == null) $description = "Are your paper business cards already too crowded but still not telling the right story about you? Upgrade your business presence with ConnSuite!";
    echo '<meta name="description" content="'.$description.'">';
    echo '<meta property="og:description" content="'.$description.'">';
}

function printMeta_Article($aID,$conn)
{

    $aID = (int)$aID;
    if (!$aID || !is_integer($aID)) { return;}

    $SQL_ARTICLE_USER_ID = "SELECT a.userID, a.title, u.name, u.username FROM article a INNER JOIN user u ON a.userID = u.ID WHERE a.ID = '" . $aID . "' LIMIT 1";
    $res = $conn->query($SQL_ARTICLE_USER_ID);
    if ($res) {
        $res = $res->fetch_assoc();
        $userID = $res['userID'];
        $title = $res['title'];
        $name = $res['name'];
        $username = $res['username'];
        echo '<meta property="og:image" content="https://www.connsuite.com/data/article/cover/' . $userID . "-" . $aID . '.png" />';
        echo '<meta property="og:title" content="'.$title.' @'.$username.' | ConnSuite" />';
        echo '<meta name="description" content="'.$title.' @'.$username.' on ConnSuite | Check out this new article wrote by '.$name.'" />';
        echo '<meta property="og:description" content="'.$title.' @'.$username.' on ConnSuite | Check out this new article wrote by '.$name.'" />';

        echo '<meta name="twitter:card" content="summary_large_image">';
        echo '<meta name="twitter:title" content="'.$title.' @'.$username.' | ConnSuite" />';
        echo '<meta name="twitter:description" content="'.$title.' @'.$username.' on ConnSuite | Check out this new article wrote by '.$name.'">';
        echo '<meta name="twitter:image:src" content="https://www.connsuite.com/data/article/cover/' . $userID . "-" . $aID . '.png"/>';

    }
}

function printMeta_Profile($username,$conn)
{
    if (!$username ) { return;}
    $username = secureString((string)$username);

     $IMAGE_SIZE = PROFILE_PICTURE_THUMBNAIL_SIZE;

    $SQL_USER = "SELECT u.name, u.ID, u.version FROM user u WHERE u.username = '" . $username . "' LIMIT 1";
    $res = $conn->query($SQL_USER);
    if ($res) {
        $res = $res->fetch_assoc();
        $name = $res['name'];
        $userID = $res['ID'];
        $version = $res['version'];
    }
    else {
        $SQL_USER = "SELECT u.name, u.ID, u.version FROM user_alias ua INNER JOIN user u ON u.ID = ua.userID WHERE ua.username = '" . $username . "' LIMIT 1";
        $resA = $conn->query($SQL_USER);
        if ($resA) {
            $resA = $resA->fetch_assoc();
            $name = $resA['name'];
            $userID = $resA['ID'];
            $version = $resA['version'];
        }
        else return; //SQL was not successful
    }



    echo '<meta property="og:image" content="https://www.connsuite.com/data/user/thumbnail/' . $userID . "-" . $version . '.jpg" />';
    echo '<meta property="og:title" content="'.$name.' @'.$username.' | Find me on ConnSuite | Your official online networking suite" />';
    echo '<meta name="description" content="Find '.$name.' on ConnSuite and view a complete personal online business card & portfolio. ConnSuite is the best way to showcase and improve your online business presence." />';
    echo '<meta property="og:description" content="Find '.$name.' on ConnSuite and view a complete personal online business card & portfolio. ConnSuite is the best way to showcase and improve your online business presence." />';
    echo '<meta property="og:image:width" content="'.$IMAGE_SIZE.'" /><meta property="og:image:height" content="'.$IMAGE_SIZE.'" />';
    echo '<meta property="og:image:alt" content="'.$username.'\'s profile on ConnSuite" />';

    echo '<meta name="twitter:card" content="summary">';
    echo '<meta name="twitter:title" content="'.$name.' @'.$username.' | Find me on ConnSuite" />';
    echo '<meta name="twitter:description" content="Find '.$name.' on ConnSuite and view a complete personal online business card & portfolio. Create your online business card now!">';
    echo '<meta name="twitter:image:src" content="https://www.connsuite.com/data/user/profile/' . $userID . "-" . $version . '.jpg"/>';




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

/**
 * Tutorial Session Sticky
 */

function setSessionTutorialStickyPassed(){
    $_SESSION['connVariableStickyPassed'] = "SET";
}
function isSessionTutorialStickyPassed(){
    if(session_status() == PHP_SESSION_NONE) return false;
    return isset($_SESSION['connVariableStickyPassed']);
}
function disposeSessionTutorialStickyPassed(){
    if(session_status() == PHP_SESSION_NONE) return;
    unset($_SESSION['connVariableStickyPassed']);
}





?>