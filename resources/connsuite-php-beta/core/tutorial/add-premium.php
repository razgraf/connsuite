<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 11/02/2018
 * Time: 00:01
 */
include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_TUTORIAL_ADD_PREMIUM, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();
if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_TUTORIAL_ADD_PREMIUM, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_POST['stepID'])) exit(exitWithNegative("Data is missing"));
$stepID = secureInt($_POST['stepID']);
$userID = $user->getID();
if($stepID != $user->getStepID()) exit(exitWithNegative("Data not matching."));

try{
    if((!$user->getEmail() || ($user->getEmail() && count($user->getEmail()) === 0))) //user does not have an email
    {
    if(!isset($_POST['email'])) exit(exitWithEmail("Ups."));
    else {if (isset($_POST['email'])) {
            $email = secureString($_POST['email']);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) exit(exitWithNegative("Incorrect Email."));
            /** Check email in table */
            $SQL_CHECK = "SELECT email FROM user WHERE userID = '" . $userID . "' ";
            $result_check = $conn->query($SQL_CHECK);


            //---
            if (!$result_check || $result_check->num_rows == 0) {

                $SQL_UPDATE = "UPDATE user SET email = '" . $email . "' WHERE ID = '" . $userID . "' ";
                $result_update = $conn->query($SQL_UPDATE);
                if (!$result_update) exit(exitWithNegative("Email error."));
                /**
                 * Updated email field
                 */

            } else exit(exitWithNegative("Email error."));



            //---


        } else exit(exitWithNegative("Email error."));}
    }else $email = $user->getEmail();

}catch(Exception $e){exit(exitWithNegative("Email error."));}

$email = secureString($email);

/**
 * Check step 7 ?
 */

$SQL = "INSERT INTO tutorial_premium SET userID = '".secureInt($user->ID)."', email = '".$email."' ";
$result = $conn->query($SQL);
if(!$result) exit(exitWithNegative("Some error"));
else exit(exitWithOk("Yey"));


?>