<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 19/08/2017
 * Time: 15:11
 */




include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_COMMON_RETRIEVE_NETWORK_DEFAULT_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_COMMON_RETRIEVE_NETWORK_DEFAULT_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


$SQL = "SELECT * FROM network_default LIMIT 5000 OFFSET 1";
if($results = $conn->query($SQL)) {
    $networks = [];
    while($row = $results->fetch_assoc()){
        $row['custom'] = '0';
        array_push($networks,$row);
    }
    exit(exitWithSomething(kCSResponseOk,$networks));
}
exit(exitWithNegative("There are no default networks"));





?>