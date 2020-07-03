<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 14/10/2017
 * Time: 16:04
 */
header('Access-Control-Allow-Origin: *');


include_once("../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_BADGE_RETRIEVE_USER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();



if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));
$userID = secureInt($_GET['userID']);


if(!isset($_GET['location'])) addConnLog(LOG_TYPE_BADGE_ACCESSED,null,$userID,array("HTTP_REFERER"=>$_SERVER['HTTP_REFERER']));



$SQL = "SELECT ID, firstname, name, username, version FROM user WHERE ID = '".$userID."' ";
$result = $conn->query($SQL);

if($result && $result->num_rows > 0){
    $row = $result->fetch_assoc();
    exit(exitWithOk(
        array(
            'ID'=> $row['ID'],
            'username' => $row['username'],
            'version' => $row['version'],
            'name' => $row['name'],
            'firstname' => $row['firstname']
        )
    ));
}

?>