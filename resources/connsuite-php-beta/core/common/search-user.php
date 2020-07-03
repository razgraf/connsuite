<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 28/08/2017
 * Time: 20:00
 */

include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_COMMON_SEARCH_USER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));

$array = array();
if(!isset($_GET['query'])) exit(exitWithNegative("Query missing."));
$query = secureString($_GET['query']);

if(!isset($_GET['limit'])) $limit = 10;
else $limit = $_GET['limit'];

$SQL = "SELECT username, name, version, ID FROM user WHERE username LIKE '%{$query}%' OR name LIKE '%{$query}%' LIMIT ".$limit." ";
$result = $conn->query($SQL);
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $item =  array (
            'ID' => $row['ID'],
            'username' => $row['username'],
            'name'=>$row['name'],
            'version' => $row['version']
        );
        array_push($array,$item);

    }
    exit(exitWithSomething(kCSResponseOk,$array));

}

exit(exitWithNegative("0 users"));
?>