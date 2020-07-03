<?php
/**
 * Create by @VanSoftware
 * Date: 27/05/2018
 * Time: 15:18
 */


include_once(__DIR__ . "/foundation/alphabet.php");

/**
 *
 * ----------------------------------------------------------
 *
 * IMPORTANT SYSTEM CONSTANTS & VARIABLES
 *
 * will be used to define the behavior or the Environment
 * e.g. @const RELEASE will state if the project is still in development(local) or not(public) and will for example hide the development logs/responses
 *
 * ----------------------------------------------------------
 *
 */

const RELEASE = false;
const ROOT =  RELEASE ? "" : "http://localhost:8888/csuite/";
const DEPTH_TO_HOME = RELEASE ? 0 : 0;
const OFFICIAL_RECEIVER_EMAIL = RELEASE ? "contact@connsuite.com" : "contact@connsuite.com";
const WEBSITE_NAME = "ConnSuite";






/**
 * @var Environment $E
 */
include_once(__DIR__ . "/foundation/Environment.php");

$E = Environment::Instance();
$E->Set(ROOT,DEPTH_TO_HOME,array(
    array(
        "identifier"=>SYSTEM_IDENTIFIER_CONFIG,
        "depth"=>1,
        "path"=>"base/config.php"
    ),
    array(
        "identifier"=>SYSTEM_IDENTIFIER_LIBRARY_IMAGE,
        "depth"=>3,
        "path"=>"base/foundation/FILE/image-resize.php"
    ),
    array(
        "identifier"=>PAGE_IDENTIFIER_INDEX,
        "depth"=>0,
        "path"=>"index.php",
        "API" => [
            "URL_SESSION_LOG_IN" => URL_SESSION_LOG_IN,
            "URL_SESSION_REGISTER" => URL_SESSION_REGISTER,
            "PAGE_IDENTIFIER_DASHBOARD" => PAGE_IDENTIFIER_DASHBOARD,
            "URL_COMMON_USER_SEARCH" => URL_COMMON_USER_SEARCH
        ]
    ),
    array(
        "identifier"=>PAGE_IDENTIFIER_DASHBOARD,
        "depth"=>1,
        "path"=>"content/dashboard.php",
         "API" => [
             "URL_NETWORK_RETRIEVE_LIST" => URL_NETWORK_RETRIEVE_LIST,
             "URL_NETWORK_VISIBILITY_CHANGE" => URL_NETWORK_VISIBILITY_CHANGE,
             "URL_NETWORK_REMOVE" => URL_NETWORK_REMOVE,
         ]
    ),
    array(
        "identifier"=>PAGE_IDENTIFIER_NETWORK_ADD,
        "depth"=>1,
        "path"=>"content/n/add.php",
        "API" => [
            "URL_NETWORK_ADD" => URL_NETWORK_ADD,
            "URL_NETWORK_LABEL_RETRIEVE_LIST" => URL_NETWORK_LABEL_RETRIEVE_LIST,
            "URL_NETWORK_RETRIEVE_LIST_DEFAULT" => URL_NETWORK_RETRIEVE_LIST_DEFAULT,
            "PAGE_IDENTIFIER_DASHBOARD" => PAGE_IDENTIFIER_DASHBOARD
        ]
    ),
    array(
        "identifier"=>PAGE_IDENTIFIER_NETWORK_EDIT,
        "depth"=>1,
        "path"=>"content/n/edit.php",
        "API" => [
            "URL_NETWORK_RETRIEVE" => URL_NETWORK_RETRIEVE,
            "URL_NETWORK_EDIT" => URL_NETWORK_EDIT,
            "URL_NETWORK_LABEL_RETRIEVE_LIST" => URL_NETWORK_LABEL_RETRIEVE_LIST,
            "URL_NETWORK_RETRIEVE_LIST_DEFAULT" => URL_NETWORK_RETRIEVE_LIST_DEFAULT,
            "PAGE_IDENTIFIER_DASHBOARD" => PAGE_IDENTIFIER_DASHBOARD
        ]
    ),
    array(
        "identifier"=>URL_SESSION_LOG_IN,
        "depth"=>2,
        "path"=>"core/session/log-in.php"
    ),
    array(
        "identifier"=>URL_SESSION_REGISTER,
        "depth"=>2,
        "path"=>"core/session/register.php"
    ),
    array(
        "identifier"=>URL_SESSION_LOG_OUT,
        "depth"=>2,
        "path"=>"core/session/log-out.php"
    ),
    array(
        "identifier"=>URL_NOTE_RETRIEVE,
        "depth"=>2,
        "path"=>"core/note/retrieve.php"
    ),
    array(
        "identifier"=>URL_NOTE_RETRIEVE_LIST,
        "depth"=>2,
        "path"=>"core/note/retrieve-list.php"
    ),
    array(
        "identifier"=>URL_NOTE_ADD,
        "depth"=>2,
        "path"=>"core/note/add.php"
    ),
    array(
        "identifier"=>URL_NOTE_EDIT,
        "depth"=>2,
        "path"=>"core/note/edit.php"
    ),
    array(
        "identifier"=>URL_NOTE_REMOVE,
        "depth"=>2,
        "path"=>"core/note/remove.php"
    ),
    array(
        "identifier"=>URL_COMMON_USER_SEARCH,
        "depth"=>3,
        "path"=>"core/common/user/search.php"
    ),
    array(
        "identifier"=>URL_NETWORK_RETRIEVE_LIST,
        "depth"=>2,
        "path"=>"core/network/retrieve-list.php"
    ),
    array(
        "identifier"=>URL_NETWORK_RETRIEVE,
        "depth"=>2,
        "path"=>"core/network/retrieve.php"
    ),
    array(
        "identifier"=>URL_NETWORK_VISIBILITY_CHANGE,
        "depth"=>2,
        "path"=>"core/network/visibility.php"
    ),
    array(
        "identifier"=>URL_NETWORK_REMOVE,
        "depth"=>2,
        "path"=>"core/network/remove.php"
    ),
    array(
        "identifier"=>URL_NETWORK_ADD,
        "depth"=>2,
        "path"=>"core/network/add.php"
    ),
    array(
        "identifier"=>URL_NETWORK_EDIT,
        "depth"=>2,
        "path"=>"core/network/edit.php"
    ),
    array(
        "identifier"=>URL_NETWORK_LABEL_RETRIEVE_LIST,
        "depth"=>2,
        "path"=>"core/network/label/retrieve-list.php"
    ),
    array(
        "identifier"=>URL_NETWORK_RETRIEVE_LIST_DEFAULT,
        "depth"=>2,
        "path"=>"core/network/retrieve-list-default.php"
    ),
));



/**
 *
 * ----------------------------------------------------------
 *
 * EXIT FUNCTIONS AND DEFAULT RESPONSE
 *
 * ----------------------------------------------------------
 *
 */


/**
 * @param $result
 * @return string
 */
function exitWithNegativeData($result){
    $result = RELEASE ? "Trivial error." : $result;
    return json_encode(array(
        "response"=>kResponseNegative,
        "result"=>$result
    ));
}

function exitWithNegativeDebug($result){
    $result = RELEASE ? "Trivial Error." : $result;
    return json_encode(array(
        "response"=>kResponseNegative,
        "result"=>$result
    ));
}

function exitWithNegative($result){
    return json_encode(array(
        "response"=>kResponseNegative,
        "result"=>$result
    ));
}

function exitWithOK($result){
    return json_encode(array(
        "response"=>kResponseOk,
        "result"=>$result
    ));
}
function exitWithSomething($response,$result){
    return json_encode(array(
        "response"=>$response,
        "result"=>$result
    ));
}


