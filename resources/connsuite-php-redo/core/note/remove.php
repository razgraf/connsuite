<?php
/**
 * Create by @VanSoftware
 * Date: 16/06/2018
 * Time: 16:25
 */

include_once("../../base/config.php");

$conn = $E -> validateAPIConnection(URL_NOTE_REMOVE);

/**
 * Default DATA
 * ----
 * Because of the ID parameter, we can leave this type-independent
 */

$noteID =  getAPIParam($_POST['ID'], DATA_TYPE_NUMERIC,"Missing ID.");


/**
 * Project Specific DATA
 *
 * We need the parentID to be sure that the user will request/use notes only assigned to ID
 */


//$projectAID = ...





/**
 *
 * ----------------------------------------------------------
 *
 * Configure $parentID below
 *
 * ----------------------------------------------------------
 *
 */


$parentID = null;

switch ($type){
    default : break;
}



/**
 *
 * ----------------------------------------------------------
 *
 * Configure $parentID above
 *
 * ----------------------------------------------------------
 *
 */


if($parentID === null) exit(exitWithNegativeDebug("Error on parentID"));




/**
 * STEP 1 : Remove link
 */


$removeLink = PDOParser::parseBoolean(
    $conn,
    "DELETE FROM note_link WHERE noteID=:noteID AND parentID=:parentID",
    array(
        ["noteID",$noteID,PDO::PARAM_INT],
        ["parentID",$parentID,PDO::PARAM_INT]
    ));

if(!$removeLink) exit(exitWithNegativeDebug("Error on removing link"));


/**
 * STEP 2 : Remove note
 */


$removeLink = PDOParser::parseBoolean(
    $conn,
    "DELETE FROM note WHERE ID=:noteID",
    array(
        ["noteID",$noteID,PDO::PARAM_INT]
    ));

if(!$removeLink) exit(exitWithNegativeDebug("Error on removing link"));


exit(exitWithOK(VICTORY));

