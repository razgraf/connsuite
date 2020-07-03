<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 29/08/2017
 * Time: 22:02
 */


include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_ARTICLE_REMOVE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_ARTICLE_REMOVE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$prePath = ""; for($i=0;$i < $depthToRoot[CORE_DO_ARTICLE_REMOVE];$i++) $prePath .="../";

if(!isset($_POST['articleID'])) exit(exitWithNegative("No articleID provided"));
$articleID = $_POST['articleID'];


/**
 * SELECT INFO ABOUT ARTICLE
 */

$SQL_SELECT = "SELECT a.ID ,a.userID
                FROM article a
                WHERE a.ID = '".$articleID."' LIMIT 1";

$result_select = $conn->query($SQL_SELECT);

if($result_select && $result_select->num_rows > 0){
    $row = $result_select->fetch_assoc();
    $userID = $row['userID'];

    $path = ROOT.ARTICLE_CONTENT_PATH.$userID."-".$row['ID'].".json";
    $content = json_decode(file_get_contents($path),true);

    $article = array(
        'ID' => $row['ID'],
        'userID' => $row['userID'],
        'content' => $content['content'],
        'imageList' => json_decode($content['imageList']),
        'prePath' => $prePath,
        'replace' => array()
    );

    /*
     * --------------------------
     * REMOVE IT
     */

    // remove cover
    unlink($prePath.ARTICLE_COVER_PATH.$userID."-".$row['ID'].".png");

    //remove images

    $json = $prePath . ARTICLE_CONTENT_PATH . $userID . "-" . $articleID . ".json";
    if (file_exists($json)) {
        $article = json_decode(file_get_contents($json), true);
        $imageList = json_decode($article['imageList']);
        try{
            foreach ($imageList as $image){
                try {
                    $iName = $image->name;
                    $iPath = $prePath.ARTICLE_IMAGE_PATH.$iName;
                    unlink($iPath);
                }catch(Exception $e){}
            }
        }
        catch(Exception $e){}



    }

    //remove content
    unlink($prePath.ARTICLE_CONTENT_PATH.$userID."-".$row['ID'].".json");

    //remove from article list

    $SQL = "DELETE FROM article WHERE ID = '".$articleID."'";
    $result = $conn->query($SQL);
    if($result) exit(exitWithSomething(kCSResponseOk,$article));





}


exit(exitWithNegative("Article unavailable"));

?>