<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/08/2017
 * Time: 13:30
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_BUSINESS_REQUEST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_BUSINESS_REQUEST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_POST['sourceID'])) exit(exitWithNegative("No sourceID provided"));
if(!isset($_POST['targetID'])) exit(exitWithNegative("No targetID provided"));

$sourceID = $_POST['sourceID'];
$targetID = $_POST['targetID'];

$SQL_INSERT_BR = "INSERT INTO business_request SET sourceID = '".$sourceID."', targetID = '".$targetID."' ";
$result_insert_br = $conn->query($SQL_INSERT_BR);

if($result_insert_br){
    $extra = array(
        "sourceID" => $sourceID,
        "targetID" => $targetID,
        "requestID" => $conn->insert_id
    );


    /**
     * -You have received a request- notification
     */
    $SQL_INSERT_NOT_R = "INSERT INTO notification
                       SET userID = '".$targetID."',
                       type = '".kCSNotificationTypeBusinessRequest."',
                       extra = '".json_encode($extra)."'
                       ";
    $insert_not = $conn->query($SQL_INSERT_NOT_R);



    /**
     * ------------------------------
     * Notification
     * ------------------------------
     */
    $SQL_NAME = "SELECT username FROM user WHERE ID = '".$targetID."' ";
    $username = $conn->query($SQL_NAME);
    if($username){
        $username = $username->fetch_assoc();
        $username = $username['username'];
        Notification::send($targetID,'@'.$username.", you have received a new business card request!",$conn);
    }
    else Notification::send($targetID,"You have received a new business card request!",$conn);

    /** ------------------------------ */

    exit(exitWithSomething(kCSResponseOk,"Success."));
}

exit(exitWithNegative("Error on insert."))


?>