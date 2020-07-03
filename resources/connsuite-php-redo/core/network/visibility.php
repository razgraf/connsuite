<?php
/**
 * Create by @VanSoftware
 * Date: 25/08/2018
 * Time: 19:28
 */


include_once("../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_VISIBILITY_CHANGE, true, true);
$userID = $E->user->getID();

/**
 * Default DATA
 */

$AID = getAPIParam($_POST[NETWORK_KEY_LINK_AID], DATA_TYPE_STRING,"Missing AID." );

$v = PDOParser::parseBoolean(
    $conn,
    "UPDATE network_link SET visible = NOT visible WHERE AID =:AID and userID = :uID",
    array([":AID",$AID,PDO::PARAM_STR],[":uID",$userID,PDO::PARAM_STR])
);

$v ? exit(exitWithOK(VICTORY)) : exit(exitWithNegative(DANGER));