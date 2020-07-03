<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 17/08/2017
 * Time: 19:01
 */



include_once("../../../base/config.php");
if(!isset($_POST['ID'])) exit(exitWithNegative("No network ID provided."));
if(!isset($_POST['userID'])) exit(exitWithNegative("No user ID provided."));
if(!isset($_POST['custom'])) exit(exitWithNegative("No custom provided.".$_POST['ID']));

$pathToLibs = goToBaseTarget(CORE_DO_NETWORK_DELETE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_NETWORK_DELETE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$ID = $_POST['ID'];
$custom = $_POST['custom'];
$userID = $_POST['userID'];



try {
    if ((int)$user->getID() != (int)$userID) exit(exitWithNegative("Error"));
}catch (Exception $e){exit(exitWithNegative("Error"));}


$userID = $user->getID();

$SQL = "SELECT networkID FROM network WHERE ID = '".$ID."'";
$result = $conn->query($SQL);
if($result->num_rows>0) {
    $networkID = ($result->fetch_assoc())['networkID']; //this is for deleting the network in network_custom
    /**
     * Delete labels
     */

    $SQL_LABELS = "DELETE FROM network_label WHERE networkID = '" . $ID . "'";
    $conn -> query($SQL_LABELS);
    //NOT WORKING TODO

    /**
     * Delete network line from network table
     */
    $SQL = "DELETE FROM network WHERE ID = '" . $ID . "'";
    if ($conn->query($SQL)) {
        /**
         * If the network was custom, delete the line also from network_custom
         */
        if ($custom === '1') {

            /**
             * Delete Pictures
             */
            $SQL_SELECT_URL = "SELECT url FROM network_custom WHERE ID = '".$networkID."'";
            $url = (($conn->query($SQL_SELECT_URL))->fetch_assoc())['url'];


            unlink("../../../data/network/normal/".$url);
            unlink("../../../data/network/thumbnail/".$url);


            $SQL = "DELETE FROM network_custom WHERE ID = '" . $networkID . "'";
            $conn->query($SQL);
        }
        exit(exitWithSomething(kCSResponseOk, "Success.".$networkID));

    }
}
exit(exitWithNegative("Error on insert."));




?>