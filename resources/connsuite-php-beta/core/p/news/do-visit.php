<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/12/2017
 * Time: 17:50
 */


include_once("../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_NEWS_VISIT, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();

if(!isset($_POST['newsID'])) exit(exitWithNegative("No data provided"));
$newsID = $_POST['newsID'];

$SQL_VISIT = "UPDATE news SET click = click+1 WHERE ID = '".$newsID."'";
$r = $conn->query($SQL_VISIT);
if($r) exit(exitWithOk("Visited"));
exit(exitWithNegative("Error on visit."));


?>