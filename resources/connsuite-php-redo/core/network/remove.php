<?php
/**
 * Create by @VanSoftware
 * Date: 25/08/2018
 * Time: 22:43
 */


include_once("../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_REMOVE, true, true);
$userID = $E->user->getID();


$AID = getAPIParam($_POST[NETWORK_KEY_LINK_AID], DATA_TYPE_STRING,"Missing AID." );

$network = PDOParser::parseSingleObject($conn,"SELECT networkID, type FROM network_link WHERE AID = :AID AND userID = :uID", array([":AID",$AID,PDO::PARAM_STR],[":uID",$userID,PDO::PARAM_STR]));
if(!$network) exit(exitWithNegativeDebug("No network?"));
$networkID = (int) $network["networkID"];
$type = (int)$network["type"];

if($type === NETWORK_TYPE_CUSTOM) {

    $removeCustom = PDOParser::parseBoolean($conn, "DELETE FROM network_custom WHERE ID =:nID", array([":nID", $networkID, PDO::PARAM_INT]));
    if(!$removeCustom) exit(exitWithNegativeDebug("Error on removing custom."));

    $pathToDir = ($E->goIdentifierToPath(URL_NETWORK_REMOVE,PATH_DATA_NETWORK_CUSTOM.$AID."/"));
    array_map('unlink', glob("$pathToDir/*.*"));
    rmdir($pathToDir);

}

$removeLink = PDOParser::parseBoolean($conn,"DELETE FROM network_link WHERE AID = :AID AND userID = :uID", array([":AID",$AID,PDO::PARAM_STR],[":uID",$userID,PDO::PARAM_STR]));
$removeLabels = PDOParser::parseBoolean($conn,"DELETE FROM network_label_link WHERE networkID = :nID",array([":nID",$networkID,PDO::PARAM_INT]));


exit(exitWithOK(VICTORY));