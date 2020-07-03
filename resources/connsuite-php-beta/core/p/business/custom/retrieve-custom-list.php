<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 26/08/2017
 * Time: 00:23
 */



include_once("../../../../base/config.php");

$pathToLibs = goToBaseTarget(CORE_DO_RETRIEVE_BUSINESS_CUSTOM_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_RETRIEVE_BUSINESS_CUSTOM_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));
$userID = $_GET['userID'];
$cards = array();

$SQL_COUNT = "SELECT COUNT(ID) AS 'count' FROM business_custom WHERE userID = '".$userID."'";
$count = (($conn->query($SQL_COUNT))->fetch_assoc())['count'];





$SQL = "SELECT ID, name, phone, email, website, description,picture1,picture2
        FROM business_custom
        WHERE userID = '".$userID."'
        ORDER BY name ASC
        ";
$results = $conn->query($SQL);

if($results->num_rows > 0){
    while($row = $results->fetch_assoc()){
        array_push($cards,$row);
    }


    $max = PRIVILEGE[PRIVILEGE_POSITION_USER]['MAX_CUSTOM_BUSINESS_CARD_NUMBER'];
    if($user->star->isStar) $max = PRIVILEGE[$user->star->accountType]['MAX_CUSTOM_BUSINESS_CARD_NUMBER'];


    exit(exitWithSomething(kCSResponseOk,array('count'=> $count, 'cards' => $cards, 'max' =>$max )));
}

exit(exitWithNegative("Error on select or 0 cards"));



?>
