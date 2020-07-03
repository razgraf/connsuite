<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 24/08/2017
 * Time: 19:22
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_RETRIEVE_ARTICLE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_RETRIEVE_ARTICLE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));

$userID = $_GET['userID'];



$articleList = array();


$SQL_SELECT = "SELECT a.ID, a.title ,a.userID, a.instantiated, u.username, u.ID as 'userID', u.version,u.name,u.tagline
                FROM article a
                INNER JOIN user u ON a.userID = u.ID
                WHERE a.userID = '".$userID."'
                ORDER BY a.instantiated DESC
                ";

$result_select = $conn->query($SQL_SELECT);

if($result_select && $result_select->num_rows > 0){
    while($row = $result_select->fetch_assoc()) {



        $imagePath = ROOT . ARTICLE_COVER_PATH . $userID . "-" . $row['ID'] . ".png";
        $thumbnailPath = ROOT . ARTICLE_THUMBNAIL_PATH . $userID . "-" . $row['ID'] . ".png";

        $article = null;
        $article = array(
            'ID' => $row['ID'],
            'title' => $row['title'],
            'instantiated' => $row['instantiated'],
            'user' => array(
                'username' => $row['username'],
                'ID' => $row['userID'],
                'name' => $row['name'],
                'version' => $row['version'],
                'tagline' => $row['tagline']
            ),
            'imageURL' => $imagePath,
            'thumbnailURL'=>$thumbnailPath
        );
        array_push($articleList,$article);

    }

    exit(exitWithSomething(kCSResponseOk,$articleList));

}


exit(exitWithNegative("Article unavailable"));

?>