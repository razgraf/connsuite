<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 30/11/2017
 * Time: 18:51
 */

include_once("../../../../base/config.php");

$pathToLibs = goToBaseTarget(CORE_DO_ALIAS_RETRIEVE_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();



if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_ALIAS_RETRIEVE_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['userID'])) exit(exitWithNegative("Not enough data."));
$userID = $_GET['userID'];
$aliases = array();

/**
 * RETRIEVE all
 */
$SQL_USERNAME = "SELECT username, -1 as 'uaID'
                 FROM user u
                 WHERE u.ID = '".$userID."'
                 UNION
                 SELECT ua.username, ua.ID as 'uaID'
                 FROM user_alias ua
                 WHERE ua.userID = '".$userID."'
                 ";
$results = $conn->query($SQL_USERNAME);
if($results->num_rows > 0){
    while($row = $results->fetch_assoc()) array_push($aliases,array(
        "username"=>$row['username'],
        "aliasID"=>$row['uaID']));


    $count = PRIVILEGE[PRIVILEGE_POSITION_USER]['MAX_ALIAS_NUMBER'];
    try{if($user->star->isStar || $user->star->accountType) $count = PRIVILEGE[(int)$user->star->accountType]['MAX_ALIAS_NUMBER'];}catch (Exception $e){};



    exit(exitWithOk(array("alias"=>$aliases, "MAX_ALIAS_NUMBER"=>$count,'accountType'=>$user->star->isStar)));
}





exit(exitWithNegative("Error"));


