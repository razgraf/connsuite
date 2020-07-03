<?php
/**
 * Create by @VanSoftware
 * Date: 20/08/2018
 * Time: 16:32
 */




include_once("../../base/config.php");
$conn = $E -> initConnection(URL_SESSION_REGISTER,CONNECTION_TYPE_GLOBAL);

$user = array();
$NOW = getNOW();



$user[USER_KEY_FIRSTNAME] = getAPIParam($_POST[USER_KEY_FIRSTNAME], DATA_TYPE_STRING,"Missing first name.");
$user[USER_KEY_LASTNAME] = getAPIParam($_POST[USER_KEY_LASTNAME], DATA_TYPE_STRING,"Missing last name.");
$user[USER_KEY_USERNAME] = getAPIParam($_POST[USER_KEY_USERNAME], DATA_TYPE_STRING,"Missing last name.");
$user[USER_KEY_EMAIL] = getAPIParam($_POST[USER_KEY_EMAIL], DATA_TYPE_STRING,"Missing email.");
$user[USER_KEY_PASSWORD] = getAPIParam($_POST[USER_KEY_PASSWORD], DATA_TYPE_STRING,"Missing password.");



if(!User::isValidEmail($user[USER_KEY_EMAIL]) || !User::isUniqueEmail($conn,$user[USER_KEY_EMAIL])) exit(exitWithSomething(kResponseEmail,"Email conflict."));
if(!User::isValidUsername($user[USER_KEY_USERNAME]) || !User::isUniqueUsername($conn,$user[USER_KEY_USERNAME])) exit(exitWithSomething(kResponseUsername,"Username conflict."));

$user[USER_KEY_AID] = User::createUniqueAID($conn);
$user[USER_KEY_PASSWORD] = User::hashPassword($user[USER_KEY_PASSWORD]);


/**
 * --------
 * CREATE THE USER
 * --------
 */


$user_creator = PDOParser::parseBoolean(
    $conn,
    "INSERT INTO user SET username = :username, password = :password, instantiated = :instantiated  ",
    array(
        [":username", $user[USER_KEY_USERNAME], PDO::PARAM_STR],
        [":password", $user[USER_KEY_PASSWORD], PDO::PARAM_STR],
        [":instantiated", $NOW, PDO::PARAM_STR]
    )
);
if(! $user_creator) exit(exitWithNegativeDebug("Issue on creating the user."));
$user[USER_KEY_ID] = $conn->lastInsertId();


$user_data_creator = PDOParser::parseBoolean(
    $conn,
    "INSERT INTO user_data SET 
                  userID = :userID, 
                  AID = :AID,
                  firstName =:firstName,
                  lastName =:lastName,
                  email =:email,
                  instantiated = :instantiated
                ",
    array(
        [":userID", $user[USER_KEY_ID], PDO::PARAM_INT],
        [":AID", $user[USER_KEY_AID], PDO::PARAM_STR],
        [":firstName", $user[USER_KEY_FIRSTNAME], PDO::PARAM_STR],
        [":lastName", $user[USER_KEY_LASTNAME], PDO::PARAM_STR],
        [":email", $user[USER_KEY_EMAIL],PDO::PARAM_STR],
        [":instantiated", $NOW, PDO::PARAM_STR]
    )
);


if(!$user_data_creator) {
    $cleaner = PDOParser::parseBoolean($conn,"DELETE FROM user WHERE ID = :userID",array([":userID", $user[USER_KEY_ID], PDO::PARAM_INT]));
    exit(exitWithNegativeDebug("Issue on creating the user data."));
}


exit(exitWithOK(VICTORY));