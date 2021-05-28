<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 23/08/2017
 * Time: 21:15
 */





include_once("../../../base/config.php");

$pathToLibs = goToBaseTarget(CORE_DO_EDIT_USER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$pathToIR = goToBaseTarget(CORE_DO_EDIT_USER, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);include_once($pathToIR);
use \Eventviva\ImageResize;

$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_EDIT_USER, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_POST['userID'])) exit(exitWithNegative("Data wrong"));
if(!isset($_POST['firstname'])) exit(exitWithNegative("Data wrong"));
if(!isset($_POST['lastname'])) exit(exitWithNegative("Data wrong"));
if(!isset($_POST['description'])) exit(exitWithNegative("Data wrong"));
if(!isset($_POST['tagline'])) exit(exitWithNegative("Data wrong"));


$userID = secureInt($_POST['userID']);
if($userID != (int) $user->getID()) exit(exitWithNegative("Data wrong!"));
$description = secureString($_POST['description']);
$tagline = secureString($_POST['tagline']);
$firstname = secureString($_POST['firstname']);
$lastname = secureString($_POST['lastname']);
$name = $firstname." ".$lastname;



$user = (new User())->mapUser($_SESSION['user']);
if((int) $userID != (int) $user->getID()) exit(exitWithNegative("Data wrong"));


if( !isset($_FILES['image']) ||
    !isset($_FILES['image']['tmp_name']) ||
        $_FILES['image'] == null) $noImage = true;
else $noImage = false;


/**
 * Update user table
 */

$SQL_UPDATE = " UPDATE user 
                SET firstname = '".$firstname."',
                name = '".$name."',
                lastname = '".$lastname."',
                description = '".$description."',
                tagline = '".$tagline."'
                WHERE ID = '".$userID."'";
$result_update = $conn->query($SQL_UPDATE);
if($result_update){

    /**
     * Get current version
     */

    $version = (($conn->query("SELECT version FROM user WHERE ID = '".$userID."' LIMIT 1"))->fetch_assoc())['version'];
    if($version == null) exit(exitWithNegative("Error on version"));

    if($noImage)  exit(exitWithSomething(kCSResponseOk, "Everything went ok." . json_encode($conn->error)));


    /**
     * Delete old photos
     */

    $oldPhotoName = $userID."-".$version.PROFILE_PICTURE_TYPE;

    unlink("../../../data/user/profile/".$oldPhotoName);
    unlink("../../../data/user/thumbnail/".$oldPhotoName);

    /**
     * Create Thumbnail and Primary Picture
     */
    $version++;
    $imageName =  $userID."-".$version.PROFILE_PICTURE_TYPE;


    $normalPath = "../../../data/user/profile/";
    $normalPathPng = "../../../data/user/profile/".$imageName;
    $thumbnailPathPng = "../../../data/user/thumbnail/".$imageName;


    list($originalWidth, $originalHeight) = getimagesize($_FILES['image']['tmp_name']);
    if (move_uploaded_file( $_FILES['image']['tmp_name'], $normalPathPng)) {
        /**
         * First we upload the picture as is, so we can have a reference to it.
         * Second thing we do is use the ImageResize library to resize the image and re-upload it in place
         */

        $dimen = getNewDimensions($originalWidth,$originalHeight,PROFILE_PICTURE_NORMAL_SIZE);
        $newWidth = $dimen[0];
        $newHeight = $dimen[1];

        $resizer = new ImageResize($normalPathPng);
        $path = $normalPathPng;
        $resizer->resize($newWidth, $newHeight);
        $resizer->save($path);

        /**
         * Thumbnail
         */

        //thumbnail
        $dimen = getNewDimensions($originalWidth,$originalHeight,PROFILE_PICTURE_THUMBNAIL_SIZE);
        $newWidth = $dimen[0];
        $newHeight = $dimen[1];

        $resizer = new ImageResize($normalPathPng);
        $path = $thumbnailPathPng;
        $resizer->resize($newWidth, $newHeight);
        $resizer->save($path);



        $SQL_UPDATE = "UPDATE user SET version = '".$version."' WHERE ID = '".$userID."'";
        if( $conn->query($SQL_UPDATE) ) {
            exit(exitWithSomething(kCSResponseOk,"Update was done!"));
        }
    }






}

exit(exitWithNegative("Error on update"));





?>