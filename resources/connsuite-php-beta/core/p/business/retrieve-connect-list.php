<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 26/08/2017
 * Time: 00:23
 */



include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_RETRIEVE_BUSINESS_CONNECT_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_RETRIEVE_BUSINESS_CONNECT_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));
if(!isset($_GET['limit'])) exit(exitWithNegative("No limit provided"));
if(!isset($_GET['offset'])) exit(exitWithNegative("No offset provided"));
$userID = $_GET['userID']; $limit = $_GET['limit']; $offset = $_GET['offset'];
$cards = array();

    $SQL_SELECT = "SELECT bc.ID as 'connectID', bc.sourceID, bc.targetID, bc.instantiated,
                   u.ID, u.name, u.username, u.tagline, u.version
                   FROM business_connect bc
                   INNER JOIN user u ON u.ID = bc.targetID
                   WHERE bc.sourceID = '".$userID."'
                   LIMIT ".$limit."
                   OFFSET ".$offset." ";
    $result = $conn->query($SQL_SELECT);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $targetID = $row['targetID'];
            $articlesCount = (($conn->query("SELECT COUNT(ID) as 'count' FROM article WHERE userID = '".$targetID."' "))->fetch_assoc())['count'];
            $networksCount = (($conn->query( "SELECT COUNT(ID) as 'count' FROM network WHERE userID = '".$targetID."' AND visible = '1' "))->fetch_assoc())['count'];
            $card = null;
            $card = array(
                "ID" => $row['connectID'],
                "sourceID" => $row['sourceID'],
                "targetID" => $row['targetID'],
                "instantiated" => $row['instantiated'],
                "user" => array(
                    "ID" => $row['targetID'],
                    "name" => $row['name'],
                    "username" => $row['username'],
                    "tagline" => $row['tagline'],
                    "version" => $row['version'],
                    "articlesCount" => $articlesCount,
                    "networksCount" => $networksCount
                )
            );

            array_push($cards,$card);
        }
        exit(exitWithSomething(kCSResponseOk,$cards));
    }


    exit(exitWithNegative("Error on Select"));

?>
