<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 24/08/2017
 * Time: 19:22
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_PROFILE_RETRIEVE_ARTICLE_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));



if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));
if(!isset($_GET['limit'])) exit(exitWithNegative("No limit provided"));
if(!isset($_GET['offset'])) exit(exitWithNegative("No offset provided"));

$userID = secureInt($_GET['userID']);
$limit = secureInt($_GET['limit']);
$offset = secureInt($_GET['offset']);



$articleList = array();


$SQL_SELECT = "SELECT a.ID, a.title ,a.userID, a.instantiated, u.username, u.ID as 'userID', u.version,u.name,u.tagline
                FROM article a
                INNER JOIN user u ON a.userID = u.ID
                WHERE a.userID = '".$userID."'
                ORDER BY a.instantiated DESC
                LIMIT ".$limit."
                OFFSET ".$offset." ";

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