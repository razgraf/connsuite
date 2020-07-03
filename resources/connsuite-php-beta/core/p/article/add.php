<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 24/08/2017
 * Time: 19:22
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_ARTICLE_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_ARTICLE_ADD,SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$pathToIR = goToBaseTarget(CORE_DO_ARTICLE_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);
include_once($pathToIR);
use \Eventviva\ImageResize;

if(!isset($_POST['userID'])) exit(exitWithNegative("No userID provided"));
if(!isset($_POST['title'])) exit(exitWithNegative("No title provided"));
if(!isset($_POST['content'])) exit(exitWithNegative("No content provided"));
if(!isset($_POST['imageList'])) exit(exitWithNegative("No imageList provided"));
if(!isset($_FILES['image']) || !isset($_FILES['image']['tmp_name']) || $_FILES['image'] == null) exit(exitWithNegative("No image provided"));


$userID = $_POST['userID'];
$title = secureString($_POST['title']);
$content = $_POST['content'];
$contentForEdit = $_POST['contentForEdit'];
$imageList = $_POST['imageList'];

/**
 * New Article
 */

$SQL_CREATE = "INSERT INTO article SET
              userID = '".$userID."',
              title = '".$title."' ";
$result_create = $conn->query($SQL_CREATE);
if($result_create){
    $ID = $conn->insert_id;
    $name = $userID."-".$ID;
    $path = "../../../".ARTICLE_CONTENT_PATH.$name.".json";

    $newFile = fopen("$path", "w");

    fwrite($newFile, json_encode(array(
        "imageList" => $imageList,
        "content" => $content,
        "contentForEdit"=>$contentForEdit
        )));
    fclose($newFile);

    /**
     * Identifier
     */
    $newIdentifier = createIdentifier($title,$ID);


    $identifier = array();
    array_push($identifier,$newIdentifier);



    $SQL_ADD_IDENTIFIERS = "UPDATE article SET identifier = '".json_encode($identifier,true)."' WHERE ID = '".$ID."' ";
    $conn->query($SQL_ADD_IDENTIFIERS);



    /**
     * Create Thumbnail and Primary Picture
     */

    $imageName =  $name.".png";


    $normalPath ="../../../".ARTICLE_COVER_PATH;
    $normalPathPng = $normalPath.$imageName;

    $thumbnailPath = "../../../".ARTICLE_THUMBNAIL_PATH;
    $thumbnailPathPng = $thumbnailPath.$imageName;

    list($originalWidth, $originalHeight) = getimagesize($_FILES['image']['tmp_name']);

    if (move_uploaded_file( $_FILES['image']['tmp_name'], $normalPathPng)) {
        /**
         * First we upload the picture as is, so we can have a reference to it.
         * Second thing we do is use the reference towards the primary picture (step 2) to also upload a new re-sized thumbnail
         */
        $resizer = new ImageResize($normalPathPng);
        $path = $thumbnailPathPng;

        $resizer->quality_png = 7;
        $resizer->scale(50);
        $resizer->save($path);
    }

    exit(exitWithSomething(kCSResponseOk,"Done"));

}

exit(exitWithNegative("Error on creating article."));


function createIdentifier($title,$articleID){
    $title = strtolower($title);
    $title = trim($title);
    $o = $title;
    $title = preg_replace('/[^a-zA-Z0-9 ]/', '', $title);
    while($o != $title){
        $o = $title;
        $title = preg_replace('/[^a-zA-Z0-9 ]/', '', $title);
    }
    $title = preg_replace('/\s+/', '-', $title);
    $title.="-".$articleID;

    return $title;
}


?>