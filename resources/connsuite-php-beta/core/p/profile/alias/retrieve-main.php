<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 30/11/2017
 * Time: 18:51
 */

include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_ALIAS_RETRIEVE_MAIN, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

if(!isset($_GET['username'])) exit(exitWithNegative("Not enough data."));
$username = $_GET['username'];


/**
 * CHECK IF this is the MAIN username or it is just an alias
 */

$SQL_CHECK_MAIN = "SELECT username FROM user WHERE username = '".$username."' ";
$results_check_main = $conn->query($SQL_CHECK_MAIN);
if(!$results_check_main || $results_check_main->num_rows == 0){
    $SQL_CHECK_ALIAS = "SELECT ua.userID, u.username 
                        FROM user_alias ua
                        INNER JOIN user u ON u.ID = ua.userID
                        WHERE ua.username = '".$username."' LIMIT 1 ";
    $results_check_alias = $conn->query($SQL_CHECK_ALIAS);
    if($results_check_alias || $results_check_alias->num_rows > 0){
        $results_check_alias = $results_check_alias->fetch_assoc();
        $username = $results_check_alias['username'];
    }
    else exit(exitWithNegative("User not found."));
}

exit(exitWithOk(array("username"=>$username)));



