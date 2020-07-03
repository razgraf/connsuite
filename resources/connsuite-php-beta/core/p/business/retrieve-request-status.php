<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/08/2017
 * Time: 14:02
 */
include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['sourceName'])) exit(exitWithNegative("No sourceName provided"));
if(!isset($_GET['targetName'])) exit(exitWithNegative("No targetName provided"));
$sourceName = $_GET['sourceName'];
$targetName = $_GET['targetName'];

/** Select the IDs by username */
$SQL_SOURCE = "SELECT ID FROM user WHERE username = '".$sourceName."'";
$result = $conn->query($SQL_SOURCE);
if(!$result) exit(exitWithNegative("No source ID found by sourceName"));
$sourceID = ($result->fetch_assoc())['ID'];

$SQL_TARGET = "SELECT ID FROM user WHERE username = '".$targetName."'";
$result = $conn->query($SQL_TARGET);
if(!$result) exit(exitWithNegative("No source ID found by targetName"));
$targetID = ($result->fetch_assoc())['ID'];



$SQL_CHECK = "SELECT ID FROM business_connect WHERE sourceID='".$sourceID."' AND targetID='".$targetID."'";
$result = $conn->query($SQL_CHECK);
if($result->num_rows > 0) exit(exitWithSomething(kCSResponseOk,array("status"=>kCSBusinessRequestAccepted)));
$case = "check";
$SQL_CHECK_SENT = "SELECT ID FROM business_request WHERE sourceID='".$sourceID."' AND targetID='".$targetID."'";
$result = $conn->query($SQL_CHECK_SENT);
if($result->num_rows > 0) exit(exitWithSomething(kCSResponseOk,array("status"=>kCSBusinessRequestPending)));
$case = "check+sent";
exit(exitWithNegative("No request available. ".$case));

?>