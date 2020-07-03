<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 22/08/2017
 * Time: 18:37
 */


include_once("../../base/config.php");
include_once("../../base/log.php");
include_once("../../base/user.php");

$pathToLibs = goToBaseTarget(CORE_COMMON_RETRIEVE_USER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));

if(!isset($_GET['username'])) exit(exitWithNegative("No username provided"));
$username = secureString($_GET['username']);


/**
 * CHECK IF this is the MAIN username or it is just an alias
 */

$SQL_CHECK_MAIN = "SELECT username FROM user WHERE username = '".$username."' ";
$results_check_main = $conn->query($SQL_CHECK_MAIN);
if(!$results_check_main || $results_check_main->num_rows == 0){
    $SQL_CHECK_ALIAS = "SELECT ua.userID, u.username 
                        FROM user_alias ua
                        INNER JOIN user u ON u.ID = ua.userID
                        WHERE ua.username = '".$username."' LIMIT 1 ";
    $results_check_alias = $conn->query($SQL_CHECK_ALIAS);
    if($results_check_alias || $results_check_alias->num_rows > 0){
        $results_check_alias = $results_check_alias->fetch_assoc();
        $username = $results_check_alias['username'];
    }
}






if(isset($_GET['limit'])) $limit = $_GET['limit'];
else $limit = null;


$visible = false;
if(isset($_GET['visible']) && $_GET['visible'] != null  && $_GET['visible'] != 'null') $visible = true;

$networkCount = 0;
/**
 * Get the user data from 'user' table
 * After that, retrieve all the user's networks
 */
$SQL = "SELECT u.ID, u.username ,u.version, u.facebookID, u.name , u.firstname, u.lastname , u.email , u.phone, u.tagline, u.description, u.instantiated
        FROM user u 
        WHERE u.username = '".$username."' LIMIT 1";
$results = $conn->query($SQL);
if ($results->num_rows > 0) {
    $res = $results->fetch_assoc();
    $userID = $res['ID'];
    $user = array(
        'ID' => $res['ID'],
        'username' => $res['username'],
        'facebookID' => $res['facebookID'],
        'name' => $res['name'],
        'firstname' => $res['firstname'],
        'lastname' => $res['lastname'],
        'email' => $res['email'],
        'phone' => $res['phone'],
        'tagline' => $res['tagline'],
        'description' => $res['description'],
        'version' => $res['version'],
        'instantiated' => $res['instantiated'],
    );



    /**
     * Get networks
     */

    $networks = array();
    $labels = array();

    $SQL_NETWORKS = " SELECT s.* FROM(
                  SELECT n.ID, n.userID, n.username, n.custom, n.networkID, n.position, n.visible,n.description,n.click,
                   nd.name as 'name', nd.url as 'url', nd.link as 'link', nd.userlink as 'userlink',nd.special, nd.hint as 'hint'
                  FROM network n
                  INNER JOIN network_default nd ON (nd.ID = n.networkID AND n.custom = 0)
                  WHERE n.userID = '". $userID ."'";
    if($visible) $SQL_NETWORKS .= " AND n.visible = '1'  ";
    $SQL_NETWORKS .=" 
    UNION ALL ";
    $SQL_NETWORKS .="
                  SELECT n.ID, n.userID, n.username, n.custom, n.networkID, n.position, n.visible,n.description,n.click,
                  nc.name as 'name', nc.url as 'url', nc.link as 'link', nc.userlink as 'userlink',nc.special, '' as 'hint'
                  FROM network n
                  INNER JOIN network_custom nc ON (nc.ID = n.networkID AND n.custom = 1)
                  WHERE n.userID = '". $userID ."' ";
    if($visible) $SQL_NETWORKS .= "AND n.visible = '1'  ";
    $SQL_NETWORKS .=" ) s
                  ORDER BY s.position ASC";
    if($limit) $SQL_NETWORKS.=" LIMIT ".$limit;


    $results = $conn->query($SQL_NETWORKS);

    if($results->num_rows > 0){

        while($row = $results->fetch_assoc()){
            $labels = array(); // clear the array
            $SQL_LABEL = "SELECT nl.labelID as 'labelID', nl.networkID, l.ID, l.name, l.color
                          FROM network_label nl
                          INNER JOIN label l ON l.ID = nl.labelID    
                          WHERE nl.networkID = '".$row['ID']."'";
            $label_results = $conn->query($SQL_LABEL);

            if($label_results->num_rows > 0) {
                while ($label_row = $label_results->fetch_assoc()) {

                    array_push($labels, array(
                        'ID' => $label_row['ID'],
                        'networkID' => $label_row['networkID'],
                        'name' => $label_row['name'],
                        'labelID' => $label_row['labelID'],
                        'color' => $label_row['color']
                    ));
                }
            } else $labels = null;

            $network = array(
                'ID' => $row['ID'],
                'name' => $row['name'],
                'username' => $row['username'],
                'custom' => $row['custom'],
                'userlink' => $row['userlink'],
                'position' => $row['position'],
                'link' => $row['link'],
                'special' => $row['special'],
                'visible' => $row['visible'],
                'hint'=>$row['hint'],
                'description' => $row['description'],
                'label' =>$labels,
                'click' => $row['click'],
                'image' => array(
                    'networkID' => $row['networkID'],
                    'custom' => $row['custom'],
                    'userID' => $userID,
                    'url' => $row['url']
                )
            );
            array_push($networks,$network);
        };

    };

    $SQL_COUNT = createCountNetworksSQL($userID, $visible);
    $networkCount = (($conn->query($SQL_COUNT))->fetch_assoc())['count'];

    $SQL_ARTICLE_COUNT = createCountArticlesSQL($userID);
    $articleCount = (($conn->query($SQL_ARTICLE_COUNT))->fetch_assoc())['count'];

    $SQL_REQUESTS = createBusinessRequests($userID);
    $requestsCount = (($conn->query($SQL_REQUESTS))->fetch_assoc())['count'];

    $SQL_CONN = createBusinessConnections($userID);
    $connCount = (($conn->query($SQL_CONN))->fetch_assoc())['count'];


    $user['networks'] = $networks;
    $user['networksCount'] = $networkCount;
    $user['articlesCount'] = $articleCount;
    $user['requestsCount'] = $requestsCount;
    $user['connectionsCount'] = $connCount;

    try{
        if(isset($_SERVER["HTTP_USER"]) && $_SERVER["HTTP_USER"] &&  $_SERVER["HTTP_USER"]!="null" && (int)$_SERVER["HTTP_USER"]!=$userID) addConnLog(LOG_TYPE_PROFILE_VISIT, $_SERVER["HTTP_USER"],$userID, null );
        else {
            try{
                if(isset($_SESSION['user'])) {
                    $userSession = (new User())->mapUser($_SESSION['user']);
                    if($userSession && $userSession->getID()){
                        if((int)$userSession->getID() != (int) $userID){
                            addConnLog(LOG_TYPE_PROFILE_VISIT, LOG_STRANGER_SOURCE_ID,$userID,null);
                        }
                    }
                }
                else   addConnLog(LOG_TYPE_PROFILE_VISIT, LOG_STRANGER_SOURCE_ID,$userID,null);
            }catch (Exception $e){  addConnLog(LOG_TYPE_PROFILE_VISIT, LOG_STRANGER_SOURCE_ID,$userID,null);}

        }
    }catch(Exception $e){}

 exit(exitWithSomething(kCSResponseOk,$user));






}

else exit(exitWithNegative("There are no networks here."));

function createCountNetworksSQL($userID,$visible){

    $SQL_NETWORKS = "SELECT COUNT(ID) as 'count' FROM network WHERE userID = '".$userID."' ";
    if($visible) $SQL_NETWORKS .= "AND visible = '1'  ";
    return $SQL_NETWORKS;
}

function createCountArticlesSQL($userID){

    $SQL_ARTICLES = "SELECT COUNT(ID) as 'count' FROM article WHERE userID = '".$userID."' ";
    return $SQL_ARTICLES;
}

function createBusinessRequests($userID){

    $SQL_REQUESTS = "SELECT COUNT(ID) as 'count' FROM business_request WHERE targetID = '".$userID."' ";
    return $SQL_REQUESTS;
}


function createBusinessConnections($userID){

    $SQL_CONN = "SELECT COUNT(ID) as 'count' FROM business_connect WHERE targetID = '".$userID."' ";
    return $SQL_CONN;
}

?>