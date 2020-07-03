<?php
/**
 * Create by @VanSoftware
 * Date: 23/08/2018
 * Time: 15:09
 */


include_once("../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_RETRIEVE_LIST, true, true);

/**
 * Default DATA
 */

$limit =  getAPIParam($_GET['limit'], DATA_TYPE_NUMERIC,false,true,null,999999);
$offset =  getAPIParam($_GET['offset'], DATA_TYPE_NUMERIC,false,true,null,0);
$userID = $E->user->getID();


$labels = getAPIParam($_GET['labels'], DATA_TYPE_BOOLEAN, false,true,null,false);


$networks = PDOParser::parseArray(
    $conn,
    "( 
    SELECT nd.ID AS 'ID', nl.*, nd.name, nd.icon, nd.hint, nd.url, null as version
    FROM network_link nl
    LEFT JOIN network_default nd ON nl.networkID = nd.ID 
    WHERE nl.userID = 1 AND nl.type = 1
    )
    UNION ALL
    (
    SELECT nc.ID AS 'ID', nl.*, nc.name, null as icon, null as hint, nc.url, nc.version
    FROM network_link nl
    LEFT JOIN network_custom nc ON nl.networkID = nc.ID
    WHERE nl.userID = 1 AND nl.type = 2
    )
    
    LIMIT :limit 
    OFFSET :offset
    ",
    array(
        [":ID1",$userID,PDO::PARAM_INT],
        [":ID2",$userID,PDO::PARAM_INT],
        [":limit",$limit,PDO::PARAM_INT],
        [":offset",$offset,PDO::PARAM_INT],
    )
);

if(!$networks) exit(exitWithNegative("Empty"));



if($labels){
    for($i = 0; $i < count($networks); $i++){
        $l = PDOParser::parseArray(
            $conn,
            "SELECT nl.ID, nl.name, nl.color FROM network_label_link nll INNER JOIN network_label nl ON nl.ID = nll.labelID WHERE nll.networkID = :ID",
            array([":ID",$networks[$i]["ID"],PDO::PARAM_INT])
        );
        if($l) $networks[$i][NETWORK_KEY_LABELS] = $l;
    }
}

for($i = 0; $i < count($networks); $i++){
    unset($networks[$i]["networkID"]);
    unset($networks[$i]["ID"]);
    unset($networks[$i]["userID"]);
}


exit(exitWithOK($networks));






