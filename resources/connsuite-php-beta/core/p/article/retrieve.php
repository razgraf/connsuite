<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 24/08/2017
 * Time: 19:22
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_RETRIEVE_ARTICLE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));


if( !isset($_GET['articleID']) && !isset($_GET['identifier']) ) exit(exitWithNegative("Data missing. None."));

if(isset($_GET['articleID']) &&  $_GET['articleID'] != -1  &&  $_GET['articleID'] != "-1") $articleID = $_GET['articleID'];
else {
    $identifier = $_GET['identifier']; //none
    if(!$identifier || count($identifier) == 0 ||  $identifier == "none") exit(exitWithNegative("Data wrong."));
    $articleID =  substr(strrchr($identifier , '-'),1);
}



/**
 * New Article
 */

$SQL_SELECT = "SELECT a.ID, a.identifier, a.title ,a.userID, a.instantiated, u.username, u.ID as 'userID', u.version,u.name,u.tagline
                FROM article a
                INNER JOIN user u ON a.userID = u.ID
                WHERE a.ID = '".$articleID."' LIMIT 1";

$result_select = $conn->query($SQL_SELECT);

if($result_select && $result_select->num_rows > 0){
    $row = $result_select->fetch_assoc();
    $userID = $row['userID'];

    $path = ROOT.ARTICLE_CONTENT_PATH.$userID."-".$row['ID'].".json";
    $content = json_decode(file_get_contents($path),true);

    $imagePath = ROOT.ARTICLE_COVER_PATH.$userID."-".$row['ID'].".png";

    $article = array(
        'ID' => $row['ID'],
        'title' => $row['title'],
        'instantiated' => $row['instantiated'],
        'user' => array(
            'username' => $row['username'],
            'ID' => $row['userID'],
            'name'=>$row['name'],
            'version' => $row['version'],
            'tagline' => $row['tagline']
        ),
        'content' => $content['content'],
        'contentForEdit' => $content['contentForEdit'],
        'imageList' => $content['imageList'],
        'imageURL' => $imagePath,
        'identifier' => json_decode($row['identifier'])
    );

    $result = array(
        "article"=>$article,
        "articleID"=>$row['ID']
        );


    $SQL_VISIT = "UPDATE article SET click = click+1 WHERE ID = '".$articleID."' ";
    $conn->query($SQL_VISIT);

    exit(exitWithSomething(kCSResponseOk,$result));

}


exit(exitWithNegative("Article unavailable"));

?>