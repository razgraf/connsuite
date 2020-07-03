<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 22/08/2017
 * Time: 18:37
 */


include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_COMMON_RETRIEVE_USER_MINI, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);


if(!isset($_GET['username'])) exit(exitWithNegative("No username provided"));
$username = $_GET['username'];
$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));

if(isset($_GET['limit'])) $limit = $_GET['limit'];
else $limit = null;


$visible = false;
if(isset($_GET['visible'])) $visible = true;

$networkCount = 0;
/**
 * Get the user data from 'user' table
 * After that, retrieve all the user's networks
 */
$SQL = "SELECT u.ID, u.username ,u.version, u.name , u.firstname, u.lastname , u.instantiated
        FROM user u 
        WHERE u.username = '".$username."' LIMIT 1";
$results = $conn->query($SQL);
if ($results->num_rows > 0) {
    $res = $results->fetch_assoc();
    $userID = $res['ID'];
    $user = array(
        'ID' => $res['ID'],
        'username' => $res['username'],
        'name' => $res['name'],
        'firstname' => $res['firstname'],
        'lastname' => $res['lastname'],
        'version' => $res['version'],
        'instantiated' => $res['instantiated'],
    );

    /**
     * Get networks
     */

    $networks = array();
    $labels = array();

    $SQL_NETWORKS = " SELECT s.* FROM(
                  SELECT n.ID, n.userID, n.custom, n.networkID, n.position, n.visible, 
                   nd.name as 'name', nd.url as 'url'
                  FROM network n
                  INNER JOIN network_default nd ON (nd.ID = n.networkID AND n.custom = 0)
                  WHERE n.userID = '". $userID ."'";
    if($visible) $SQL_NETWORKS .= " AND n.visible = '1'  ";
    $SQL_NETWORKS .=" 
    UNION ALL ";
    $SQL_NETWORKS .="
                  SELECT n.ID, n.userID,  n.custom, n.networkID, n.position, n.visible,
                  nc.name as 'name', nc.url as 'url'
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
            $network = array(
                'ID' => $row['ID'],
                'name' => $row['name'],
                'position' => $row['position'],
                'custom' => $row['custom'],
                'visible' => $row['visible'],
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