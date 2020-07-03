<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 11/11/2017
 * Time: 15:17
 */


include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_PASSWORD_FORGOT_CHECK, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));

if(!isset($_GET['email'])) exit(exitWithNegative("Data missing"));
if(!isset($_GET['token'])) exit(exitWithNegative("Data missing"));

$email = secureString($_GET['email']);
$token = secureString($_GET['token']);


$SQL = "SELECT tp.ID, tp.instantiated, u.version, u.firstname, tp.userID, u.name
        FROM token_password  tp
        INNER JOIN user u ON tp.userID = u.ID
        WHERE tp.email = '".$email."' AND tp.token = '".$token."' LIMIT 1";
$result = $conn->query($SQL);
if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $ID = $row['ID'];

    if($row['instantiated'] > strtotime("-60 minutes")){
        $conn->query("DELETE FROM token_password WHERE ID = '".$ID."' ");
        exit(exitWithSomething(kCSResponseTokenExpired,"Error"));
    }

    exit(exitWithOk(
        array(
            "ID"=>$row['userID'],
            "version" => $row['version'],
            "firstname"=> $row['firstname'],
            "name"=>$row['name']
        )
    )
    );
}

exit(exitWithNegative("Token not found ".$email." ".$token." ".$conn->error));



?>