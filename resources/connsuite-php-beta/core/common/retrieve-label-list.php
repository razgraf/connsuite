<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 19/08/2017
 * Time: 20:11
 */




include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_COMMON_RETRIEVE_LABEL_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_COMMON_RETRIEVE_LABEL_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$SQL = "SELECT * FROM label";
if($results = $conn->query($SQL)) {
    $labels = [];
    while($row = $results->fetch_assoc()){
        array_push($labels,$row);
    }
    exit(exitWithSomething(kCSResponseOk,$labels));
}
exit(exitWithNegative("There are no default networks"));





?>