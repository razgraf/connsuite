<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/08/2017
 * Time: 15:02
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_CANCEL_BUSINESS_REQUEST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_CANCEL_BUSINESS_REQUEST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_POST['notificationID'])) exit(exitWithNegative("No notificationID provided"));
if(!isset($_POST['requestID'])) exit(exitWithNegative("No requestID provided"));
/**
 * Delete Request
 */
$requestID = $_POST['requestID'];
$SQL_DELETE_REQUEST = "DELETE FROM business_request WHERE ID = '".$requestID."'";
$res = $conn->query($SQL_DELETE_REQUEST);
/**
 * Delete Notification
 */
$notificationID = $_POST['notificationID'];
$SQL_DELETE = "DELETE FROM notification WHERE ID = '".$notificationID."'";
$result = $conn->query($SQL_DELETE);
if($result){
    exit(exitWithSomething(kCSResponseOk,"Success"));
}

exit(exitWithNegative("Error on deleting notification."))


?>