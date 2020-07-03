<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 10/11/2017
 * Time: 22:47
 */


include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_PASSWORD_EXISTENCE_CHECK, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_PASSWORD_EXISTENCE_CHECK, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['userID'])) exit(exitWithNegative("Data missing"));

$userID = $_GET['userID'];

$SQL = "SELECT password FROM user WHERE ID = '".$userID."' ";
$result = $conn->query($SQL);
if($result->num_rows > 0) exit(exitWithOk(array("password"=>1)));
else exit(exitWithOk(array("password"=>0)));



?>