<?php
/**
 * Create by @VanSoftware
 * Date: 23/08/2018
 * Time: 15:09
 */


include_once("../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_RETRIEVE, true, true);


$AID =  getAPIParam($_GET['AID'], DATA_TYPE_STRING,"Missing AID.");
$userID = $E->user->getID();


/**
 * Main
 */

$n = PDOParser::parseSingleObject(
    $conn,
    "SELECT * FROM network_link WHERE AID = :AID AND userID = :userID",
    array(
        [":AID",$AID,PDO::PARAM_STR],
        [":userID",$userID,PDO::PARAM_INT],
    )
    );

if(!$n) exit(exitWithNegativeDebug("Missing network."));
$ID = $n[NETWORK_KEY_ID];

/**
 * Specifics (Default / Custom)
 */


if((int)$n[NETWORK_KEY_TYPE] === NETWORK_TYPE_DEFAULT){
    $default =  PDOParser::parseSingleObject(
        $conn,
        "SELECT * FROM network_default WHERE ID = :ID",
        array([":ID",$n[NETWORK_KEY_NETWORK_ID],PDO::PARAM_INT])
    );
    if(!$default) exit(exitWithNegativeDebug("Default network not found."));
    else foreach ($default as $key=>$value) $n[$key] = $value;
}
else if((int)$n[NETWORK_KEY_TYPE] === NETWORK_TYPE_CUSTOM){
    $custom =  PDOParser::parseSingleObject(
        $conn,
        "SELECT * FROM network_custom WHERE ID = :ID",
        array([":ID",$n[NETWORK_KEY_NETWORK_ID],PDO::PARAM_INT])
    );
    if(!$custom) exit(exitWithNegativeDebug("Default network not found."));
    else foreach ($custom as $key=>$value) $n[$key] = $value;
}


/**
 * Labels
 */


$l = PDOParser::parseArray(
    $conn,
    "SELECT nl.ID, nl.name, nl.color FROM network_label_link nll INNER JOIN network_label nl ON nl.ID = nll.labelID WHERE nll.networkID = :ID",
    array([":ID",$ID,PDO::PARAM_INT])
);
if($l) $n[NETWORK_KEY_LABELS] = $l;


unset($n["networkID"]);
unset($n["ID"]);
unset($n["userID"]);


exit(exitWithOK($n));







