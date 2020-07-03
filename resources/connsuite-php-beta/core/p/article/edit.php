<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 02/09/2017
 * Time: 19:30
 */


include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_ARTICLE_EDIT, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_ARTICLE_EDIT, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$userID = $_POST['userID'];
$articleID = $_POST['articleID'];
$title = secureString($_POST['title']);
$content = $_POST['content'];
$contentForEdit = $_POST['contentForEdit'];

/**
 * New Article
 */

$SQL_UPDATE = "UPDATE article 
               SET title = '".$title."' 
               WHERE userID = '".$userID."' AND ID = '".$articleID."' ";
$result_update = $conn->query($SQL_UPDATE);
if($result_update){

    $json = "../../../" . ARTICLE_CONTENT_PATH . $userID . "-" . $articleID . ".json";
    if (file_exists($json)) {
        $article = json_decode(file_get_contents($json), true);
        $article['content'] = $content;
        $article['contentForEdit'] = $contentForEdit;
        $file = fopen($json, "w");
        fwrite($file, json_encode($article));
        fclose($file);
    }

    /**
     * Identifier
     */
    $newIdentifier = createIdentifier($title,$articleID);

    $SQL_IDENTIFIERS = "SELECT identifier FROM article WHERE ID = '".$articleID."' LIMIT 1";
    $result_identifier = $conn->query($SQL_IDENTIFIERS);
    if($result_identifier){
        $result_identifier = $result_identifier->fetch_assoc();
        $identifier = (array) json_decode($result_identifier['identifier']);

        $isIdentifierNew = true;
        for($j = 0; $j < count($identifier) && $isIdentifierNew; $j++){ if($newIdentifier == $identifier[$j]) $isIdentifierNew = false;}
        if($isIdentifierNew) array_push($identifier,$newIdentifier);
    }
    else{
        $identifier = array();
        array_push($identifier,$newIdentifier);
    }


    $SQL_ADD_IDENTIFIERS = "UPDATE article SET identifier = '".json_encode($identifier,true)."' WHERE ID = '".$articleID."' ";
    $conn->query($SQL_ADD_IDENTIFIERS);



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