<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/08/2017
 * Time: 15:06
 */

include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_NOTIFICATION_LIST_RETRIEVE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_NOTIFICATION_LIST_RETRIEVE, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

if(!isset($_GET['userID'])) exit(exitWithNegative("No userID provided"));
$userID = $_GET['userID'];
$notificationList = array();

$SQL = "SELECT n.ID, n.userID, n.type, n.extra, n.seen, n.instantiated
        FROM notification n
        WHERE n.userID = '".$userID."' ORDER BY n.instantiated DESC";
$results = $conn->query($SQL);
if($results->num_rows > 0){
    while($row = $results->fetch_assoc()){
        $notification = null;
        $notification = array(
            'ID' => $row['ID'],
            'type' => $row['type'],
            'seen' => '1',
            'instantiated' => $row['instantiated']
        );

        $extra = $row['extra'];


        switch ($row['type']){
            case kCSNotificationTypeBusinessRequest : $notification = handleNotificationCommon($notification,$extra,$conn); break;
            case kCSNotificationTypeBusinessRequestSelfAccepted : $notification = handleNotificationCommon($notification,$extra,$conn); break;
            case kCSNotificationTypeBusinessRequestAccepted : $notification = handleBusinessRequestAccepted($notification,$extra,$conn); break;
            case kCSNotificationTypeCustom : $notification = handleCustom($notification,$extra,$conn); break;
        }
        array_push($notificationList,$notification);
    }

    /**
     * Set seen
     */

    $SQL_SEEN = "UPDATE notification SET seen = '1' 
                 WHERE  userID = '".$userID."'";
    $conn->query($SQL_SEEN);


    exit(exitWithSomething(kCSResponseOk,$notificationList));
}

exit(exitWithNegative("No notifications."));


function handleNotificationCommon($notification,$extra,$conn){

    $extra = json_decode($extra,true);
    $sourceID = $extra['sourceID'];
    $targetID = $extra['targetID'];

    if($extra['requestID'] != null ) $requestID = $extra['requestID'];

    /**
     * Query to extract connection available or request // same code as in retrieve-request-status.php
     */

    $opposite = null;

    $SQL_CHECK = "SELECT ID FROM business_connect WHERE sourceID='".$targetID."' AND targetID='".$sourceID."'";
    $result = $conn->query($SQL_CHECK);
    if($result->num_rows > 0) $opposite = kCSBusinessRequestAccepted;

    $SQL_CHECK_SENT = "SELECT ID FROM business_request WHERE sourceID='".$targetID."' AND targetID='".$sourceID."'";
    $result = $conn->query($SQL_CHECK_SENT);
    if($result->num_rows > 0) $opposite = kCSBusinessRequestPending;


    /**
     * Query to extract source user
     */
    $SQL_USER = "SELECT ID, name, username,version FROM user WHERE ID = '".$sourceID."' LIMIT 1";
    $result_user = $conn->query($SQL_USER);
    if($result_user){
        $row = $result_user->fetch_assoc();
        $sourceUser = array(
            'ID' => $row['ID'],
            'name' => $row['name'],
            'username' => $row['username'],
            'version' => $row['version'],
        );
        $notification['source'] = $sourceUser;
    }
    $notification['sourceID'] = $sourceID;
    $notification['opposite'] = $opposite;
    if($extra['requestID'] != null ) $notification['requestID'] =  $extra['requestID'];
    $notification['targetID'] = $targetID;

    return $notification;
}



function handleBusinessRequestAccepted($notification,$extra,$conn){

    $extra = json_decode($extra,true);
    $sourceID = $extra['sourceID'];
    $targetID = $extra['targetID'];

    if($extra['requestID'] != null ) $requestID = $extra['requestID'];


    /**
     * Query to extract source user
     */
    $SQL_USER = "SELECT ID, name, username,version FROM user WHERE ID = '".$targetID."' LIMIT 1";
    $result_user = $conn->query($SQL_USER);
    if($result_user){
        $row = $result_user->fetch_assoc();
        $targetUser = array(
            'ID' => $row['ID'],
            'name' => $row['name'],
            'username' => $row['username'],
            'version' => $row['version']
        );
        $notification['target'] = $targetUser;
    }
    $notification['sourceID'] = $sourceID;
    if($extra['requestID'] != null ) $notification['requestID'] =  $extra['requestID'];
    $notification['targetID'] = $targetID;

    return $notification;
}


function handleCustom($notification,$extra,$conn){

    $extra = json_decode($extra,true);
    try {
        $notification['text'] = $extra['text'];
    }catch (Exception $e){}

    return $notification;
}


?>