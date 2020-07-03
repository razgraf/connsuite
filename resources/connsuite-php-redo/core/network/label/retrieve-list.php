<?php
/**
 * Create by @VanSoftware
 * Date: 25/08/2018
 * Time: 23:20
 */
include_once("../../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_LABEL_RETRIEVE_LIST, true, true);

$labels = PDOParser::parseArray($conn,"SELECT * FROM network_label",array());
if($labels)exit(exitWithOK($labels));
exit(exitWithNegative(DANGER));

