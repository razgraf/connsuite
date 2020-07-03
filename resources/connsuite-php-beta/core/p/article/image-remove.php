<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 29/08/2017
 * Time: 21:07
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_REMOVE_ARTICLE_IMAGE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]); include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_REMOVE_ARTICLE_IMAGE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_POST['name'])) exit(exitWithNegative("No image name provided"));

$name = $_POST['name'];
//unlink("../../../data/article/image/".$name);

if(isset($_POST['articleID']) && isset($_POST['userID'])) {
    $userID = $_POST['userID'];
    $articleID = $_POST['articleID'];
    $json = "../../../" . ARTICLE_CONTENT_PATH . $userID . "-" . $articleID . ".json";
    if (file_exists($json)) {
        $article = json_decode(file_get_contents($json), true);
        $article['imageList'] = json_decode($article['imageList']);
        for ($i = 0; $i  < sizeof($article['imageList']); $i++) {
            if ( $article['imageList'][$i]->name === $name ) {
                array_splice($article['imageList'], $i, 1);
            }
        }
        $article['imageList'] = json_encode($article['imageList']);
        $file = fopen($json, "w");
        fwrite($file, json_encode($article));
        fclose($file);
    }
}

exit(exitWithSomething(kCSResponseOk,"Success"));

?>