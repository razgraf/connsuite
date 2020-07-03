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

if(!isset($_POST['ID'])) exit(exitWithNegative("No ID ( big network table ) provided."));


$pathToIR = goToBaseTarget(CORE_DO_NETWORK_EDIT, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);
include_once($pathToIR);
use \Eventviva\ImageResize;

$pathToLibs = goToBaseTarget(CORE_DO_NETWORK_EDIT, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);

$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_NETWORK_EDIT, SYSTEM_CLASS_USER);include_once($pathToUser);
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

$ID = $_POST['ID'];



/**
 * Insert network
 */

if($custom == '0') {





    $SQL_NET = "UPDATE network SET 
             userID = '" . $userID . "',
             username = '" . $username . "',
             custom = '" . $custom . "',
             visible = '" . $visible . "',
             description = '" . $description . "'
             WHERE ID = '".$ID."'
            ";
    $result = $conn->query($SQL_NET);
    if ($result) {
        /**
         * Delete old labels
         */
        $SQL_DELETE_LABELS = "DELETE FROM network_label WHERE networkID = '".$ID."'";
        $result_delete = $conn->query($SQL_DELETE_LABELS);

        if ($labelIDs != null & count($labelIDs) > 0)
            for ($i = 0; $i < count($labelIDs); $i++) {

                /**
                 * Add new labels
                 */
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
    if(!isset($_FILES['image']) || !isset($_FILES['image']['tmp_name']) || $_FILES['image'] == null) $noImage = true;
    else $noImage = false;

    $networkName = secureString($_POST['networkName']);
    $link = secureString($_POST['link']);
    $userlink = secureString($_POST['userlink']);


    if(substr($link, -1) != "/") $link = $link."/";


    /**
    * Update custom network
    */

    $timeMil = millitime();

    $SQL_CUSTOM_ID = "SELECT networkID FROM network WHERE ID = '".$ID."'";
    $networkCustomID = (($conn->query($SQL_CUSTOM_ID))->fetch_assoc())['networkID'];
    if($networkCustomID == null) exit(exitWithNegative("No custom ID found"));

    $SQL_CUSTOM = "UPDATE network_custom SET
                  name = '".$networkName."',
                  link = '".$link."',
                  special = '".$special."',
                  userlink = '".$userlink."'
                  WHERE ID = '".$networkCustomID."'
                  ";
    $result_custom_update = $conn->query($SQL_CUSTOM);
    if(!$result_custom_update) exit(exitWithNegative("Network update error."));


    $SQL_NET = "UPDATE network SET 
             username = '" . $username . "',
             custom = '" . $custom . "',
             visible = '" . $visible . "',
             description = '" . $description . "'
             WHERE ID = '".$ID."' ";
    $result = $conn->query($SQL_NET);
    if ($result) {
        /**
         * Delete old labels
         */
        $SQL_DELETE_LABELS = "DELETE FROM network_label WHERE networkID = '".$ID."'";
        $result_delete = $conn->query($SQL_DELETE_LABELS);


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
                /**
                 * Image update
                 * If $noImage is true, than there is no image update
                 */
        if($noImage)  exit(exitWithSomething(kCSResponseOk, "Everything went ok." . json_encode($conn->error)));


        /**
         * Delete old photos
         */

        $SQL_SELECT_URL = "SELECT url FROM network_custom WHERE ID = '".$networkCustomID."'";
        $url = (($conn->query($SQL_SELECT_URL))->fetch_assoc())['url'];

        unlink("../../../data/network/normal/".$url);
        unlink("../../../data/network/thumbnail/".$url);





        /**
         * Create Thumbnail and Primary Picture
         */



        $imageName = $userID."-".$networkCustomID."-".$timeMil.".png";
        $SQL_UPDATE = "UPDATE network_custom SET url = '".$imageName."' WHERE ID = '".$networkCustomID."'";
        $conn->query($SQL_UPDATE);



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
