<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 15/08/2017
 * Time: 15:25
 */


include_once("../../../base/config.php");
if(!isset($_GET['userID'])) exit(exitWithNegative("No user ID provided"));

$pathToLibs = goToBaseTarget(CORE_PAGE_RETRIEVE_NETWORK_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);

$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_PAGE_RETRIEVE_NETWORK_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$userID = $_GET['userID'];
$networks = array();
$labels = array();

$SQL_NETWORKS = " SELECT s.* FROM(
                  SELECT n.ID, n.userID, n.username, n.custom, n.networkID, n.position, n.visible,n.description,n.click,
                   nd.name as 'name', nd.url as 'url', nd.link as 'link', nd.userlink as 'userlink',nd.special 
                  FROM network n
                  INNER JOIN network_default nd ON (nd.ID = n.networkID AND n.custom = 0)
                  WHERE n.userID = '". $userID ."'
                 
                  UNION ALL
                  
                  SELECT n.ID, n.userID, n.username, n.custom, n.networkID, n.position, n.visible,n.description,n.click,
                  nc.name as 'name', nc.url as 'url', nc.link as 'link', nc.userlink as 'userlink',nc.special
                  FROM network n
                  INNER JOIN network_custom nc ON (nc.ID = n.networkID AND n.custom = 1)
                  WHERE n.userID = '". $userID ."'
                  ) s
                  ORDER BY s.position ASC
                  ";

$results = $conn->query($SQL_NETWORKS);
//var_dump($conn->error);
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
                'custom' => $row['custom'],
                'username' => $row['username'],
                'userlink' => $row['userlink'],
                'position' => $row['position'],
                'link' => $row['link'],
                'special' => $row['special'],
                'visible' => $row['visible'],
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

        exit(exitWithSomething(kCSResponseOk,$networks));
    }
    else exit(exitWithNegative("There are no networks here."))



?>