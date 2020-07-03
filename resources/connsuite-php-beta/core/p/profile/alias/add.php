<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 30/11/2017
 * Time: 20:32
 */


include_once("../../../../base/config.php");

$pathToLibs = goToBaseTarget(CORE_DO_ADD_ALIAS, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_ADD_ALIAS, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['alias'])) exit(exitWithNegative("Not enough data."));
if(!isset($_GET['userID'])) exit(exitWithNegative("Not enough data."));
$alias = $_GET['alias'];
$userID = $_GET['userID'];

if(!$_SERVER['HTTP_USER'] || $userID != $_SERVER['HTTP_USER']) exit(exitWithNegative("Wrong data"));


/**
 * Check if the username is not taken
 */
$SQL_USERNAME = "SELECT username
                 FROM user 
                 WHERE username = '".$alias."'
                 UNION
                 SELECT username
                 FROM user_alias 
                 WHERE username = '".$alias."'
                 ";
$results = $conn->query($SQL_USERNAME);
if($results->num_rows > 0) exit(exitWithNegative("This username is already in use."));




/**
 * Check if user already has reached MAX_ALIAS_NUMBER already --> Premium Account Waiver
 */

$user = (new User())->mapUser($_SESSION['user']);


$count = PRIVILEGE[PRIVILEGE_POSITION_USER]['MAX_ALIAS_NUMBER'];
try{if($user->star->isStar || $user->star->accountType) $count = PRIVILEGE[(int)$user->star->accountType]['MAX_ALIAS_NUMBER'];}catch (Exception $e){};


$SQL_ALIAS_NO = "SELECT username
                 FROM user_alias 
                 WHERE userID = '".$userID."'
                 ";
$results = $conn->query($SQL_ALIAS_NO);
if($results->num_rows >= $count) exit(exitWithNegative("This user already has one/maxNo or more aliases already."));





/**
 * Add Alias
 */




$SQL_ADD = "INSERT INTO user_alias SET userID = '".$userID."', username = '".$alias."' ";
$results = $conn->query($SQL_ADD);
if($results) {
    $SQL_ALIAS = "SELECT username, -1 as 'uaID'
                 FROM user u
                 WHERE u.ID = '".$userID."'
                 UNION
                 SELECT ua.username, ua.ID as 'uaID'
                 FROM user_alias ua
                 WHERE ua.userID = '".$userID."'
                 ";
    $results_alias = $conn->query($SQL_ALIAS);

    $aliases = array();
    if($results_alias && $results_alias->num_rows > 0){
        while($row_alias = $results_alias->fetch_assoc())
            array_push($aliases,array(
                "username"=>$row_alias['username'],
                "ID"=>$row_alias['uaID']));
        $user->setAlias($aliases);
    }

    exit(exitWithOk("Alias added"));

}


exit(exitWithNegative('Error'));

