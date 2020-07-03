<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 29/08/2017
 * Time: 19:00
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_UPLOAD_ARTICLE_IMAGE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]); include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_UPLOAD_ARTICLE_IMAGE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_FILES['image']) || !isset($_FILES['image']['tmp_name']) || $_FILES['image'] == null) exit(exitWithNegative("No image provided"));


$imageName = "image-".milliseconds().".png";
if( !move_uploaded_file ($_FILES['image']['tmp_name'],"../../../data/article/image/".$imageName) ) exit(exitWithNegative("Error on upload."));



$result = array(
            "url" => ROOT."data/article/image/".$imageName,
            'ID' => milliseconds(),
            'name' => $imageName
        );


if(isset($_POST['articleID']) && isset($_POST['userID'])) {
    $userID = $_POST['userID'];
    $articleID = $_POST['articleID'];
    $json = "../../../" . ARTICLE_CONTENT_PATH .$userID."-".$articleID.".json";
    if (file_exists($json)) {
        $article = json_decode(file_get_contents($json), true);
        if(isset($article['imageList'])) $article['imageList'] = json_decode($article['imageList']);
        array_push($article['imageList'], array('url' => $result['url'], 'name' => $imageName));
        $article['imageList'] = json_encode($article['imageList']);
        $file = fopen($json, "w");
        fwrite($file, json_encode($article));
        fclose($file);

    }

}

exit(exitWithSomething(kCSResponseOk,$result));




function milliseconds() {
    $mt = explode(' ', microtime());
    return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
}





?>