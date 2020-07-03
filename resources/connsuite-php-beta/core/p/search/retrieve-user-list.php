<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 31/08/2017
 * Time: 15:54
 */


include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_SEARCH_RETRIEVE_USER_LIST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_SEARCH_RETRIEVE_USER_LIST, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));

$array = array();
if(!isset($_GET['query'])) exit(exitWithNegative("Query missing."));
if(!isset($_GET['limit'])) exit(exitWithNegative("No limit provided"));
if(!isset($_GET['offset'])) exit(exitWithNegative("No offset provided"));

$query = secureString($_GET['query']);
$limit = $_GET['limit'];
$offset = $_GET['offset'];

if($query == null || strlen($query) == 0 || strlen(str_replace(' ',"",$query)) == 0){
    $query = null;
}

$SQL = "SELECT u.username, u.name, u.version, u.ID,u.instantiated,
        (SELECT COUNT(ID) FROM network WHERE userID = u.ID) +
        (SELECT COUNT(ID) FROM article WHERE userID = u.ID) as 'count'
        FROM user u
        ";
if($query) {
    $SQL .= " WHERE u.username LIKE '%{$query}%' OR u.name LIKE '%{$query}%' ";
    $SQL .="ORDER BY CASE 
            WHEN (u.username LIKE '{$query}%' OR u.name LIKE '{$query}%') then 1 
            WHEN (u.username LIKE '%{$query}%' OR u.name LIKE '%{$query}%') then 2
            WHEN (u.username LIKE '%{$query}' OR u.name LIKE '%{$query}') then 3
        END,
        count DESC, u.instantiated DESC
        ";
}
else $SQL.=" ORDER BY count DESC, u.instantiated DESC ";
$SQL.="
        LIMIT ".$limit." 
        OFFSET ".$offset." ";

$result = $conn->query($SQL);
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $item =  array (
            'ID' => $row['ID'],
            'username' => $row['username'],
            'name'=>$row['name'],
            'version' => $row['version'],
            'networks' => array()
        );

        array_push($array,$item);
    }



    for($i=0;$i<count($array);$i++){
        $networks = array();
        $userID = $array[$i]['ID'];

        $SQL_NETWORKS = " SELECT s.* FROM(
                  SELECT n.ID, n.userID, n.custom, n.networkID, n.position, n.visible, 
                   nd.name as 'name', nd.url as 'url'
                  FROM network n
                  INNER JOIN network_default nd ON (nd.ID = n.networkID AND n.custom = 0)
                  WHERE n.userID = '". $userID ."' AND n.visible = '1'
                  UNION ALL
                  SELECT n.ID, n.userID,  n.custom, n.networkID, n.position, n.visible,
                  nc.name as 'name', nc.url as 'url'
                  FROM network n
                  INNER JOIN network_custom nc ON (nc.ID = n.networkID AND n.custom = 1)
                  WHERE n.userID = '". $userID ."' AND n.visible = '1' 
                  ) s
                  ORDER BY s.position ASC
                  LIMIT 3";


        $resultsN = $conn->query($SQL_NETWORKS);
        if($resultsN->num_rows > 0){

            while($rowN = $resultsN->fetch_assoc()){
                $network = array(
                    'ID' => $rowN['ID'],
                    'name' => $rowN['name'],
                    'position' => $rowN['position'],
                    'visible' => $rowN['visible'],
                    'image' => array(
                        'networkID' => $rowN['networkID'],
                        'custom' => $rowN['custom'],
                        'userID' => $userID,
                        'url' => $rowN['url']
                    )
                );
                array_push($array[$i]['networks'],$network);
            };

        };

    }

    $SQL_COUNT = "SELECT COUNT(ID) as 'count' FROM user ";
    if($query)$SQL_COUNT.=" WHERE username LIKE '%{$query}%' OR name LIKE '%{$query}%' ";
;

    $count = (($conn->query($SQL_COUNT))->fetch_assoc())['count'];

    $result = array("count"=>$count, 'users'=>$array);
    exit(exitWithSomething(kCSResponseOk,$result));

}

exit(exitWithNegative("0 users"));
?>