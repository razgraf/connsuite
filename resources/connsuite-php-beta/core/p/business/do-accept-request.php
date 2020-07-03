<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/08/2017
 * Time: 13:30
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_ACCEPT_BUSINESS_REQUEST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_ACCEPT_BUSINESS_REQUEST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_POST['sourceID'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['targetID'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['requestID'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['notificationID'])) exit(exitWithNegative("Data missing"));

$sourceID = $_POST['sourceID'];
$targetID = $_POST['targetID'];
$requestID = $_POST['requestID'];
$notificationID = $_POST['notificationID'];

/**
 * Insert into official business_connect
 */
$SQL_INSERT_BC = "INSERT INTO business_connect SET sourceID = '".$sourceID."', targetID = '".$targetID."' ";
$result_insert_br = $conn->query($SQL_INSERT_BC);
if($result_insert_br){
    /**
     * Remove from temporary business_request
     */
    $SQL_REMOVE_BR = "DELETE FROM business_request WHERE ID='".$requestID."' ";
    $conn->query($SQL_REMOVE_BR);

    /**
     * Delete accept/a&r/deny notification from personal stack
     */

    $SQL_DELETE_SELF = "DELETE FROM notification WHERE ID='".$notificationID."'";
    $conn->query($SQL_DELETE_SELF);

    /**
     * Send self accepted notification
     */
    $extra = json_encode(array(
        "sourceID" => $sourceID,
        "targetID" => $targetID
    ));

    $SQL_SELF_ACCEPTED = "INSERT INTO notification SET 
                          type = '".kCSNotificationTypeBusinessRequestSelfAccepted."',
                          userID = '".$targetID."',
                          extra = '".$extra."'
                          ";
    $conn->query($SQL_SELF_ACCEPTED);

    /**
     * Send accepted notification
     */

    $SQL_SOURCE_ACCEPTED = "INSERT INTO notification SET 
                          type = '".kCSNotificationTypeBusinessRequestAccepted."',
                          userID = '".$sourceID."',
                          extra = '".$extra."'
                          ";
    $conn->query($SQL_SOURCE_ACCEPTED);


    /**
     * Send OneSignal notification to source (the one who is requesting access)
     */
    $SQL_NAME = "SELECT name FROM user WHERE ID = '".$targetID."' LIMIT 1";
    $name = $conn->query($SQL_NAME);
    if($name){
        $name = $name->fetch_assoc();
        if(array_key_exists("name",$name)){
            $name = $name['name'];
            Notification::send($sourceID,$name." is now a business connection!",$conn);
        }
    }
    else  Notification::send($sourceID,"You have a new business connection!",$conn);


    exit(exitWithSomething(kCSResponseOk,"Success"));
}




exit(exitWithNegative("Error on insert."))


?>