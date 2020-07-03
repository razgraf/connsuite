<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 11-Feb-17
 * Time: 4:46 PM
 */

include_once("../base/config.php");
include_once("../base/user.php");
$pathToLibs = goToBaseTarget(SYSTEM_PAGE_LOG_OUT_KEY, $pathFromRoot[ SYSTEM_PAGE_LIBS_CORE ]); include_once($pathToLibs);
$pathToWelcome = goToRootTarget(SYSTEM_PAGE_LOG_OUT_KEY, PAGE_WELCOME_KEY );


$user = (new User())->mapUser($_SESSION['user']);

$conn = CSCore::credentialAccess();
unset ($_SESSION["user"]);
$_SESSION["user"] = null;
if($_SESSION['user'] != null){
    session_unset();
    session_destroy();
    session_start();
    session_regenerate_id(true);
}

$SQL = "DELETE FROM token WHERE value = '".$user->token->value."' AND ID = '".$user->token->ID."' AND device = '" .$user->token->device. "'";
$result = $conn->query($SQL);


if($result) {
    header("Location: ".$pathToWelcome); // Redirecting To Home Page
}
else {
    header("Location: ".$pathToWelcome); // Redirecting To Home Page
}



?>