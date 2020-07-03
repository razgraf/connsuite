<?php
/**
 * Create by @VanSoftware
 * Date: 16/06/2018
 * Time: 16:24
 */

include_once("../../base/config.php");

$conn = $E -> validateAPIConnection(URL_NOTE_ADD);


/**
 * Default DATA
 */
$type =  getAPIParam($_POST['type'], DATA_TYPE_NUMERIC,"Missing type.");
$title = getAPIParam($_POST['title'], DATA_TYPE_STRING,"Missing title.");
$content =  getAPIParam($_POST['content'], DATA_TYPE_STRING,"Missing content.");

/**
 * Project Specific DATA
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
     * STEP 2 : Insert note
     */

    $insert = PDOParser::parseBoolean(
        $conn,
        "INSERT INTO note SET title=:title, content=:content, instantiated=:instantiated, edited=:edited",
        array(
            [':title',$title,PDO::PARAM_STR],
            [':content',$content,PDO::PARAM_STR],
            [':instantiated',getNOW(),PDO::PARAM_STR],
            [':edited',getNOW(),PDO::PARAM_STR],
        )
    );
    if($insert){
        /**
         * STEP 3 : Insert link
         */

        $ID = $conn->lastInsertId();
        $inertLink = PDOParser::parseBoolean(
            $conn,
            "INSERT INTO note_link SET type=:type, parentID=:parentID, noteID=:noteID",
            array(
                [':parentID',$parentID,PDO::PARAM_INT],
                [':noteID',$ID,PDO::PARAM_INT],
                [':type',$type,PDO::PARAM_INT],
            )
        );

        if($inertLink) exit(exitWithOK(VICTORY));
    }


exit(exitWithNegative("Final error.".json_encode($conn->errorInfo())));

