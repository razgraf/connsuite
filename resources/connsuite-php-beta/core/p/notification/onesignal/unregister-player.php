<?php



include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_NOTIFICATION_ONESIGNAL_UNREGISTER_PLAYER, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

if(!isset($_POST['playerID'])) exit(exitWithNegative("Missing"));
if(!isset($_POST['userID'])) exit(exitWithNegative("Missing"));

$playerID = $_POST['playerID'];
$userID = $_POST['userID'];


$SQL = "DELETE FROM onesignal 
        WHERE userID = '".$userID."' AND  playerID = '".$playerID."' ";
$result = $conn->query($SQL);

if($result)  exit(exitWithOk("Removed!"));
exit(exitWithNegative("Error"));

?>