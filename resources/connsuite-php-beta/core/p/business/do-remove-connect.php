<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 28/08/2017
 * Time: 18:33
 */


include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_REMOVE_BUSINESS_CONNECTION, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_REMOVE_BUSINESS_CONNECTION, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));



if(!isset($_POST['sourceID'])) exit(exitWithNegative("No sourceID provided"));
if(!isset($_POST['targetID'])) exit(exitWithNegative("No targetID provided"));


$sourceID = $_POST['sourceID'];
$targetID = $_POST['targetID'];

$SQL = "DELETE FROM business_connect WHERE sourceID = '".$sourceID."' AND targetID = '".$targetID."'";
$result = $conn->query($SQL);
if($result) exit(exitWithSomething(kCSResponseOk, "Success."));

exit(exitWithNegative("Error on delete"));
?>