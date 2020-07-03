<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 13/10/2017
 * Time: 17:25
 */

include_once("../../base/config.php");

if(!isset($_GET['userID'])) exit(exitWithNegative("No user ID provided"));

$pathToLibs = goToBaseTarget(CORE_COMMON_RETRIEVE_NOTIFICATION_COUNT, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_COMMON_RETRIEVE_NOTIFICATION_COUNT, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));



$SQL_NOT = "SELECT COUNT(ID) AS 'count' FROM notification WHERE userID= '".$_GET['userID']."' AND seen = '0'";
$notification_result = $conn->query($SQL_NOT);
if($notification_result) {

   exit(exitWithOk(array('count'=> ($notification_result->fetch_assoc())['count']) ));
}

exit(exitWithNegative("Could not retrieve notification count."))



?>