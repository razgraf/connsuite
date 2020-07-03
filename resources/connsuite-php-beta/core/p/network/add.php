<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 19/08/2017
 * Time: 21:57
 */



include_once("../../../base/config.php");

if(!isset($_POST['username'])) exit(exitWithNegative("No username provided."));
if(!isset($_POST['userID'])) exit(exitWithNegative("No user ID provided."));
if(!isset($_POST['special'])) exit(exitWithNegative("No special provided."));
if(!isset($_POST['visible'])) exit(exitWithNegative("No visible status provided."));
if(!isset($_POST['labelIDs'])) exit(exitWithNegative("No labelIDs provided."));

if(!isset($_POST['description'])) exit(exitWithNegative("No description provided."));
if(!isset($_POST['custom'])) exit(exitWithNegative("No custom provided."));

$pathToIR = goToBaseTarget(CORE_DO_NETWORK_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);
include_once($pathToIR);

use \Eventviva\ImageResize;

$pathToLibs = goToBaseTarget(CORE_DO_NETWORK_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);
include_once($pathToLibs);

$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_NETWORK_ADD, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));



$userID = $_POST['userID'];

try {
    if ((int)$user->getID() != (int)$userID) exit(exitWithNegative("Error"));
}catch (Exception $e){exit(exitWithNegative("Error"));}

$userID = $user->getID();

$username= secureString($_POST['username']);
$special = $_POST['special'];
$visible = $_POST['visible'];
$labelIDs = json_decode($_POST['labelIDs']);
$description = secureString($_POST['description']);
$custom = $_POST['custom'];





/**
 * Insert network
 */

if($custom == '0') {


    if(!isset($_POST['networkID'])) exit(exitWithNegative("No networkID provided."));
    $networkID = $_POST['networkID'];


    $SQL_POS = "SELECT COALESCE(MAX(position),0) AS 'pos' FROM network WHERE userID = '" . $userID . "'";
    $pos = (($conn->query(($SQL_POS)))->fetch_assoc())['pos'];

    $SQL_NET = "INSERT INTO network SET 
             userID = '" . $userID . "',
             networkID = '" . $networkID . "',
             username = '" . $username . "',
             custom = '" . $custom . "',
             visible = '" . $visible . "',
             description = '" . $description . "',
             position = $pos+1
            ";
    $result = $conn->query($SQL_NET);
    if ($result) {
        $ID = $conn->insert_id;
        if ($labelIDs != null & count($labelIDs) > 0)
            for ($i = 0; $i < count($labelIDs); $i++) {
                $SQL_LABEL = "INSERT 
                  INTO network_label 
                  SET
                  labelID = '" . $labelIDs[$i] . "',
                  networkID = '" . $ID . "'";
                $conn->query($SQL_LABEL);
            }
        exit(exitWithSomething(kCSResponseOk, "Everything went ok." . json_encode($conn->error)));
    }
}

else if($custom == '1'){


    if(!isset($_POST['networkName'])) exit(exitWithNegative("Not enough data provided."));
    if(!isset($_POST['link'])) exit(exitWithNegative("Not enough data provided."));
    if(!isset($_POST['userlink'])) exit(exitWithNegative("Not enough data provided."));
    $isImageAvailable = isset($_FILES['image']['tmp_name']);

    $networkName = secureString($_POST['networkName']);
    $link = secureString($_POST['link']);
    $userlink = secureString($_POST['userlink']);

    //if(substr($link, -1) != "/") $link = $link."/";

    $SQL_POS = "SELECT COALESCE(MAX(position),0) AS 'pos' FROM network WHERE userID = '" . $userID . "'";
    $pos = (($conn->query(($SQL_POS)))->fetch_assoc())['pos'];


    $SQL_POS = "SELECT COALESCE(MAX(ID),0) AS 'ID' FROM network_custom";
    $networkIDCustom = (($conn->query(($SQL_POS)))->fetch_assoc())['ID'];
    if($networkIDCustom == null) exit(exitWithNegative("ID query error."));


    /**
    * Create custom network
    */


    $SQL_CUSTOM = "INSERT INTO network_custom SET
                  userID = '".$userID."',
                  name = '".$networkName."',
                  url = '',
                  link = '".$link."',
                  special = '".$special."',
                  userlink = '".$userlink."'
                  ";
    $result_custom_insert = $conn->query($SQL_CUSTOM);
    if(!$result_custom_insert) exit(exitWithNegative("Network upload error."));

    $networkID = $conn->insert_id;

    $SQL_NET = "INSERT INTO network SET 
             userID = '" . $userID . "',
             networkID = '" . $networkID . "',
             username = '" . $username . "',
             custom = '" . $custom . "',
             visible = '" . $visible . "',
             description = '" . $description . "',
             position = $pos+1
            ";
    $result = $conn->query($SQL_NET);
    if ($result) {
        $ID = $conn->insert_id;
        if ($labelIDs != null & count($labelIDs) > 0) {
            for ($i = 0; $i < count($labelIDs); $i++) {
                $SQL_LABEL = "INSERT 
                  INTO network_label 
                  SET
                  labelID = '" . $labelIDs[$i] . "',
                  networkID = '" . $ID . "'";
                $conn->query($SQL_LABEL);
            }
        }
        if(!$isImageAvailable)   exit(exitWithSomething(kCSResponseOk, "Everything went ok." . json_encode($conn->error)));

        $timeMil = millitime();

        $imageName = $userID."-".$networkID."-".$timeMil.".png";


        $SQL_UPDATE = "UPDATE network_custom SET url = '".$imageName."' WHERE ID = '".$networkID."'";
        $conn->query($SQL_UPDATE);


        /**
         * Create Thumbnail and Primary Picture
         */
        $thumbnailPath = "../../../data/network/thumbnail/";
        $thumbnailPathPng = $thumbnailPath.$imageName;
        $normalPath = "../../../data/network/normal/";
        $normalPathPng = "../../../data/network/normal/".$imageName;


        list($originalWidth, $originalHeight) = getimagesize($_FILES['image']['tmp_name']);
        if (move_uploaded_file( $_FILES['image']['tmp_name'], $normalPathPng)) {
            /**
             * First we upload the picture as is, so we can have a reference to it.
             * Second thing we do is use the ImageResize library to resize the image and re-upload it in place
             * Third thing we do is use the reference towards the primary picture (step 2) to also upload a new re-sized thumbnail
             */

            $dimen = getNewDimensions($originalWidth,$originalHeight,NETWORK_ICON_NORMAL_SIZE);
            $newWidth = $dimen[0];
            $newHeight = $dimen[1];

            $resizer = new ImageResize($normalPathPng);
            $path = $normalPathPng;
            $resizer->quality_png = 6;
            $resizer->resize($newWidth, $newHeight);
            $resizer->save($path);


            //thumbnail
            $dimen = getNewDimensions($originalWidth,$originalHeight,NETWORK_ICON_THUMBNAIL_SIZE);
            $newWidth = $dimen[0];
            $newHeight = $dimen[1];

            $resizer = new ImageResize($normalPathPng);
            $path = $thumbnailPathPng;
            $resizer->resize($newWidth, $newHeight);
            $resizer->save($path);
        }




        exit(exitWithSomething(kCSResponseOk, "Everything went ok." . json_encode($conn->error)));
    }

}

exit(exitWithNegative("Error on insert."));

?>
