<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 17/08/2017
 * Time: 19:01
 */



include_once("../../../base/config.php");
if(!isset($_POST['ID'])) exit(exitWithNegative("No network ID provided"));
if(!isset($_POST['visible'])) exit(exitWithNegative("No visible state provided"));
$pathToLibs = goToBaseTarget(CORE_DO_VISIBLE_CHANGE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_VISIBLE_CHANGE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$ID = $_POST['ID'];
$visible = $_POST['visible']; //visible will mean it will not be request only

$SQL = "UPDATE network SET visible = '".$visible."' WHERE ID = '".$ID."'";
if($conn->query($SQL)) exit(exitWithSomething(kCSResponseOk, "Success."));
exit(exitWithNegative("Error on insert."));




?>