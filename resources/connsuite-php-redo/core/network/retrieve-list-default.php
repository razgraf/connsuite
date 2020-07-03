<?php
/**
 * Create by @VanSoftware
 * Date: 26/08/2018
 * Time: 14:26
 */

include_once("../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_RETRIEVE_LIST_DEFAULT, true, true);

$n = PDOParser::parseArray($conn,"SELECT *, 1 as 'type' FROM network_default WHERE ID > 0",array());
$n ? exit(exitWithOK($n)) : exit(exitWithNegativeDebug(DANGER));