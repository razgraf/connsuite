<?php



include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_NOTIFICATION_ONESIGNAL_REGISTER_PLAYER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

if(!isset($_POST['playerID'])) exit(exitWithNegative("Missing"));
if(!isset($_POST['userID'])) exit(exitWithNegative("Missing"));

$playerID = $_POST['playerID'];
$userID = $_POST['userID'];

/**
 * Check if player is not already registered
 */
$SQL_CHECK = "SELECT userID,playerID FROM onesignal 
        WHERE userID = '".$userID."' AND playerID = '".$playerID."' ";
$check = $conn->query($SQL_CHECK);
if($check && $check->num_rows > 0) exit(exitWithNegative("Already registered"));


$SQL = "INSERT INTO onesignal 
        SET userID = '".$userID."', 
            playerID = '".$playerID."' ";
$result = $conn->query($SQL);

if($result)  exit(exitWithOk("Victory!"));
exit(exitWithNegative("Error"));

?>