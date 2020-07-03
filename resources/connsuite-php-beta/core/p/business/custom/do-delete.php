<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 01/09/2017
 * Time: 01:16
 */



include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_BUSINESS_CUSTOM_CARD_DELETE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_BUSINESS_CUSTOM_CARD_DELETE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$depthPath = "";
for($p = 0; $p< $depthToRoot[CORE_DO_BUSINESS_CUSTOM_CARD_DELETE]; $p++) $depthPath.="../";


if(!isset($_POST['userID'])) exit(exitWithNegative("No userID provided"));
if(!isset($_POST['cardID'])) exit(exitWithNegative("No cardID provided"));


$userID = secureInt($_POST['userID']);
$cardID = secureInt($_POST['cardID']);

if($user->getID() != $userID) exit(exitWithNegative("Nope."));



$SQL_VERIFY_PICTURES = "SELECT picture1,picture2 FROM business_custom  WHERE ID = '".$cardID."' ";
$verification = $conn->query($SQL_VERIFY_PICTURES);


$SQL = "DELETE FROM business_custom WHERE userID = '".$userID."' AND ID = '".$cardID."'";
$result = $conn->query($SQL);

if($result) {

    if($verification){
        $verification = $verification->fetch_assoc();
        if($verification['picture1']) unlink($depthPath."data/custom_bc/".$verification['picture1']);
        if($verification['picture2']) unlink($depthPath."data/custom_bc/".$verification['picture2']);
    }


    exit(exitWithSomething(kCSResponseOk,"Success"));
};
exit(exitWithNegative("Error on delete"));

?>