<?php
/**
 * Create by @VanSoftware
 * Date: 16/06/2018
 * Time: 16:25
 */

include_once("../../base/config.php");

$conn = $E -> validateAPIConnection(URL_NOTE_RETRIEVE_LIST);



/**
 * Default DATA
 * ----
 * Because of the ID parameter, we can leave this type-independent
 */


$limit = (int) getAPIParam($_GET['limit'], DATA_TYPE_NUMERIC,"Missing limit.");
$offset =(int) getAPIParam($_GET['offset'], DATA_TYPE_NUMERIC,"Missing offset.");
$type = (int) getAPIParam($_GET['type'], DATA_TYPE_NUMERIC,"Missing type.");


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
 * STEP 2 : get the notes
 */

$notes = PDOParser::parseArray(
    $conn,
    "SELECT n.title, n.content, n.instantiated, n.edited, n.ID,
              (SELECT COUNT(cnl.ID) FROM note_link cnl WHERE type =:type1 AND cnl.parentID=:parentIDCount) as 'count'
               FROM note_link nl
               INNER JOIN note n ON n.ID = nl.noteID
               WHERE nl.parentID=:parentID AND nl.type =:type
               ORDER BY n.edited DESC
               LIMIT :limit
               OFFSET :offset",
    array(
        [':parentIDCount',(int)$parentID,PDO::PARAM_INT],
        [':parentID',(int)$parentID,PDO::PARAM_INT],
        [':limit',(int)$limit,PDO::PARAM_INT],
        [':type',(int)$type,PDO::PARAM_INT],
        [':type1',(int)$type,PDO::PARAM_INT],
        [':offset',(int)$offset, PDO::PARAM_INT]
    )
);

if($notes === null) exit(exitWithNegativeDebug("No notes found.".$conn->errorCode()));
exit(exitWithOK($notes));




