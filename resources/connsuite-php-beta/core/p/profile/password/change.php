<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 08/11/2017
 * Time: 17:49
 */





include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_PASSWORD_CHANGE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_PASSWORD_CHANGE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_POST['userID'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['facebookFirst'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['oldPassword'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['newPassword'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['newPassword2'])) exit(exitWithNegative("Data missing"));


$userID = $_POST['userID'];
$facebookFirst = $_POST['facebookFirst'] == "1";
$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];
$newPassword2 = $_POST['newPassword2'];




if($newPassword != $newPassword2) exit(exitWithNegative("Data entered is wrong."));


/**
 * Check old password
 */

$SQL_GET = "SELECT ID, password FROM user WHERE ID = '".$userID."' ";
$result = $conn->query($SQL_GET);
if($result && $result->num_rows > 0){
    $row = $result->fetch_assoc();
    $ID = $row['ID'];
    if(!$facebookFirst) {
        $password = $row['password'];
        $oldPassword = md5($ID .$oldPassword);

        if ($password != $oldPassword) exit(exitWithSomething(kCSResponseOldPassword, "Old data entered is wrong."));
    }

    /**
     * Build new password
     */

    $password = "";
    $password = md5($ID.$newPassword);


    $SQL_UPDATE_PASSWORD = "UPDATE user SET password = '".$password."' WHERE ID = '".$ID."' ";
    $update = $conn->query($SQL_UPDATE_PASSWORD);
    if($update){

        $SQL = "DELETE FROM token WHERE userID = '".$userID."' ";
        $delete = $conn->query($SQL);

        if($delete){
            session_destroy();
            exit(exitWithOk("Password Changed"));
        }


    }
}

exit(exitWithNegative("Data error"));
