<?php
/**
 * Create by @VanSoftware
 * Date: 16/06/2018
 * Time: 16:24
 */


include_once("../../base/config.php");

$conn = $E -> validateAPIConnection(URL_NOTE_EDIT);



/**
 * Default DATA
 * ----
 * Because of the ID parameter, we can leave this type-independent
 */

$ID = (int) getAPIParam($_POST['ID'], DATA_TYPE_NUMERIC,"Missing ID.");
$title =   getAPIParam($_POST['title'], DATA_TYPE_STRING,"Missing title.");
$content = getAPIParam($_POST['content'], DATA_TYPE_STRING,"Missing content.");
$editedTimestamp = getNOW();

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


$edit = PDOParser::parseBoolean(
    $conn,
    "UPDATE note n 
                  INNER JOIN note_link nl on n.ID = nl.noteID
                  SET n.title=:title, n.content=:content, n.edited=:edited 
                  WHERE n.ID=:ID AND nl.parentID =:parentID",
    array(
        [':ID',$ID,PDO::PARAM_INT],
        [':parentID',$parentID,PDO::PARAM_INT],
        [':title',$title,PDO::PARAM_STR],
        [':content',$content,PDO::PARAM_STR],
        [':edited',$editedTimestamp,PDO::PARAM_STR],
    )
);

if($edit) exit(exitWithOK(VICTORY));



exit(exitWithNegative("Final error."));

