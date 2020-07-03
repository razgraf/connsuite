<?php
/**
 * Create by @VanSoftware
 * Date: 16/06/2018
 * Time: 16:24
 */
include_once("../../base/config.php");

$conn = $E -> validateAPIConnection(URL_NOTE_RETRIEVE);

/**
 * Default DATA
 * ----
 * Because of the ID parameter, we can leave this type-independent
 */
$noteID = getAPIParam($_GET['ID'], DATA_TYPE_STRING,"Missing noteID.");



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




$note = PDOParser::parseArray(
    $conn,
    "SELECT n.title, n.content, n.instantiated, n.edited, n.ID
                INNER JOIN note_link nl ON nl.noteID = n.ID
               FROM note n
               WHERE n.ID=:noteID AND nl.parentID =:parentID
               LIMIT 1",
    array(
        [':nodeID',$noteID,PDO::PARAM_INT],
        [':parentID',$parentID,PDO::PARAM_INT],
    )
);

if($note === null) exit(exitWithNegativeDebug("No notes found."));
exit(exitWithOK($note));



