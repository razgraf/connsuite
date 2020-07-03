<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 30/11/2017
 * Time: 21:01
 */





include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_CHECK_ALIAS_AVAILABLE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_CHECK_ALIAS_AVAILABLE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_GET['alias'])) exit(exitWithNegative("Not enough data."));
$alias = $_GET['alias'];


if(preg_match('/[#$%^&*()+=\-\[\]\';,.\/{}|":<>?~\\\\]/', $alias))
    exit(exitWithNegative("Alias special characters."));



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

exit(exitWithOk("Username not in use"));

