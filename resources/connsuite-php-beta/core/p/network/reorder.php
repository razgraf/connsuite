<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 17/08/2017
 * Time: 19:01
 */



include_once("../../../base/config.php");
if(!isset($_POST['reorder'])) exit(exitWithNegative("No reorder ID provided."));
if(!isset($_POST['userID'])) exit(exitWithNegative("No user ID provided."));


$pathToLibs = goToBaseTarget(CORE_DO_NETWORK_REORDER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_NETWORK_REORDER, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$reorder = $_POST['reorder'];
$userID = $_POST['userID'];

$reorder = json_decode($reorder,true);

$SQL_UPDATE_ORDER = "UPDATE network 
                SET position = 
                CASE ";
for($i=0;$i < count($reorder); $i++){
    $SQL_UPDATE_ORDER.="  WHEN ID = '".$reorder[$i]['ID']."' THEN ".$i."  ";
}
$SQL_UPDATE_ORDER.=
              "  ELSE 1  END WHERE userID = '".$userID."' ";


$result = $conn->query($SQL_UPDATE_ORDER);
if($result) exit(exitWithOk("Updated positions"));


exit(exitWithNegative("Error on insert.\n".$conn->error));




?>