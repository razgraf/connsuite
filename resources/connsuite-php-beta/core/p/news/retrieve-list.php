<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 13/10/2017
 * Time: 21:36
 */


include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_RETRIEVE_NEWS_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();


if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_RETRIEVE_NEWS_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


$list = array();

$SQL_SELECT = "SELECT ID, typeID, title, url, version, instantiated FROM news ORDER BY instantiated DESC LIMIT 5 ";
$result = $conn->query($SQL_SELECT);

if($result && $result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $item = array(
            'ID' => $row['ID'],
            'typeID' => $row['typeID'],
            'title' => $row['title'],
            'url' => $row['url'],
            'version' => $row['version'],
            'instantiated' => $row['instantiated']
        );

        array_push($list,$item);
    }

    exit(exitWithOk($list));
}


exit(exitWithNegative("Error on news selection."));