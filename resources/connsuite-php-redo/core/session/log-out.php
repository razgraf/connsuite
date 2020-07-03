<?php
/**
 * Create by @VanSoftware
 * Date: 28/05/2018
 * Time: 14:25
 */


include_once("../../base/config.php");
$conn = $E -> initConnection(URL_SESSION_LOG_OUT,CONNECTION_TYPE_GLOBAL);

$JWT = User::decodeAuthCookie();
if($JWT){
    $token = getDataFromObject(AUTH_COOKIE_KEY_TOKEN,$JWT,DATA_TYPE_STRING,false);
    $userID = getDataFromObject(AUTH_COOKIE_KEY_USER_ID,$JWT,DATA_TYPE_STRING,false);

    $temp = new User();
    $temp->setID($userID)->setToken($token);

    Environment::clean($temp, $conn);
}
else {
    Environment::clean();
}

Session::sessionDestroy(STORAGE_SESSION_KEY);




?>