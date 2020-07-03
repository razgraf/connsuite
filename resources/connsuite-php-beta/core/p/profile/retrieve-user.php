<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 22/08/2017
 * Time: 18:37
 */





include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_EDIT_PROFILE_RETRIEVE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_EDIT_PROFILE_RETRIEVE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));
$userID = $_GET['userID'];


/**
 * Get the user data from 'user' table
 * After that, retrieve all the user's networks
 */
$SQL = "SELECT u.ID, u.username,u.version , u.facebookID, u.name , u.firstname, u.lastname , u.email , u.phone, u.tagline, u.description, u.instantiated
        FROM user u 
        WHERE ID = '".$userID."' LIMIT 1";
$results = $conn->query($SQL);
if ($results->num_rows > 0) {
    $res = $results->fetch_assoc();
    $user = array(
        'ID' => $res['ID'],
        'username' => $res['username'],
        'facebookID' => $res['facebookID'],
        'name' => $res['name'],
        'firstname' => $res['firstname'],
        'lastname' => $res['lastname'],
        'email' => $res['email'],
        'phone' => $res['phone'],
        'tagline' => $res['tagline'],
        'description' => $res['description'],
        'instantiated' => $res['instantiated'],
        'version' => $res['version']
    );


        exit(exitWithSomething(kCSResponseOk,$user));
    }


else exit(exitWithNegative("There are no networks here."))



?>