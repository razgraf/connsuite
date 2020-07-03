<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 07/11/2017
 * Time: 21:47
 */

include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_LOG_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();


if(!isset($_POST['type'])) exit(exitWithNegative("Data is missing"));

$type = secureInt($_POST['type']);
$sourceID = isset($_POST['sourceID']) ? $_POST['sourceID'] : LOG_STRANGER_SOURCE_ID;
$targetID = isset($_POST['targetID']) ? $_POST['targetID'] : null;
$body = isset($_POST['body']) ? $_POST['body'] : null;



addConnLog($type,$sourceID,$targetID,$body,$conn);

if($type == LOG_TYPE_NETWORK_LINK_ACCESSED) {
    /**
     * Special case NETWORK_LINK_ACCESSED will increment in network table also.
     * This was done for faster queries over the network clicks.
     */

   // var_dump(json_decode($body,true)['networkID']);

    $ID = json_decode($body,true)['ID'];



    $SQL_CLICK = "UPDATE network SET click = click + 1 WHERE ID = '".$ID."' ";
    $result =  $conn->query($SQL_CLICK);
    if(!$result) exit(exitWithNegative("Error on click incrementation."));
    else exit(exitWithOk("Log is being registered. Click is being registered."));


}


exit(exitWithOk("Log is being registered."));







?>