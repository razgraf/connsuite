<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 30/11/2017
 * Time: 21:40
 */

include_once("../../../../base/config.php");
include_once ("../../../../base/user.php");
$pathToLibs = goToBaseTarget(CORE_DO_SET_PRIMARY_ALIAS, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_SET_PRIMARY_ALIAS, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

session_set_cookie_params(3600 * 24 * 4);
session_start();


if(!isset($_POST['aliasID'])) exit(exitWithNegative("Not enough data."));
$aliasID = $_POST['aliasID'];

if(!isset($_POST['userID'])) exit(exitWithNegative("Not enough data."));
$userID = $_POST['userID'];

if(!$_SERVER['HTTP_USER'] || $userID != $_SERVER['HTTP_USER']) exit(exitWithNegative("Wrong data"));


/**
 * SELECT current username
 */

$SQL_SELECT = "SELECT username FROM user WHERE ID = '".$userID."' ";
$result = $conn->query($SQL_SELECT);
if($result){
    $result = $result->fetch_assoc();
    $currentUsername = $result['username'];




    /**
     * SELECT alias username
     */

    $SQL_SELECT_ALIAS = "SELECT username FROM user_alias WHERE ID = '".$aliasID."' AND userID = '".$userID."' ";
    $result_alias = $conn->query($SQL_SELECT_ALIAS);
    if($result_alias) {
        $result_alias = $result_alias->fetch_assoc();
        $aliasUsername = $result_alias['username'];


        /**
         * INSERT current username into user_alias table
         */

        $SQL_INSERT_CURRENT="INSERT INTO user_alias SET userID = '".$userID."', username = '".$currentUsername."'  ";
        if(!$conn->query($SQL_INSERT_CURRENT)) exit(exitWithNegative("Error on current."));

        /**
         * UPDATE new username into user table
         */

        $SQL_UPDATE_ALIAS="UPDATE user SET username = '".$aliasUsername."' WHERE ID ='".$userID."' ";
        if(!$conn->query($SQL_UPDATE_ALIAS)) exit(exitWithNegative("Error on update."));


        /**
         * UPDATE SESSION
         */
        $user = (new User())->mapUser($_SESSION['user']);

        $SQL_ALIAS = "SELECT username, -1 as 'uaID'
                 FROM user u
                 WHERE u.ID = '".$user->getID()."'
                 UNION
                 SELECT ua.username, ua.ID as 'uaID'
                 FROM user_alias ua
                 WHERE ua.userID = '".$user->getID()."'
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

        $user->setUsername($aliasUsername);
        $_SESSION['user'] = json_encode($user);


        /**
         * DELETE alias from user_alias table
         */

        $SQL_DELETE_ALIAS = "DELETE FROM user_alias WHERE ID = '".$aliasID."'";
        if($conn->query($SQL_DELETE_ALIAS)) exit(exitWithOk("Victory!"));

    }

}

exit(exitWithNegative("Error"));
