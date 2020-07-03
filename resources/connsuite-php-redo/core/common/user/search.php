<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 28/08/2017
 * Time: 20:00
 */

include_once("../../../base/config.php");


$conn = $E -> initConnection(URL_COMMON_USER_SEARCH,CONNECTION_TYPE_GLOBAL);
$key = getAPIParam($_GET['key'],DATA_TYPE_STRING,"Key missing.",true);
$limit = getAPIParam($_GET['limit'],DATA_TYPE_STRING,null,true,null,0);


$list = PDOParser::parseArray(
    $conn,
    "SELECT u.username, ud.firstName, ud.lastName , ud.version, ud.AID
               FROM user u
               INNER JOIN user_data ud ON u.ID = ud.uID
               WHERE 
                u.username LIKE :q_before OR u.username LIKE :q_middle OR u.username LIKE :q_end OR
                 CONCAT(ud.firstName,' ', ud.lastName) LIKE :q_before1 OR  CONCAT(ud.firstName,' ', ud.lastName) LIKE :q_middle1 OR  CONCAT(ud.firstName,' ', ud.lastName) LIKE :q_end1
               ORDER BY CASE
                WHEN (u.username LIKE :q_before2 ) then 1
                WHEN ( CONCAT(ud.firstName,' ', ud.lastName) LIKE :q_before3 ) then 2
                WHEN (u.username LIKE :q_middle2 ) then 3
                WHEN ( CONCAT(ud.firstName,' ', ud.lastName) LIKE :q_middle3 ) then 4
                WHEN (u.username LIKE :q_end2 ) then 5
                WHEN ( CONCAT(ud.firstName,' ', ud.lastName) LIKE :q_end3 ) then 6
               END
               LIMIT :limit
                   ",
    array(
        [":limit", $limit, PDO::PARAM_INT],

        [":q_before", $key.'%', PDO::PARAM_STR],
        [":q_middle", '%'.$key.'%', PDO::PARAM_STR],
        [":q_end", '%'.$key, PDO::PARAM_STR],

        [":q_before1", $key.'%', PDO::PARAM_STR],
        [":q_middle1", '%'.$key.'%', PDO::PARAM_STR],
        [":q_end1", '%'.$key, PDO::PARAM_STR],

        [":q_before2", $key.'%', PDO::PARAM_STR],
        [":q_middle2", '%'.$key.'%', PDO::PARAM_STR],
        [":q_end2", '%'.$key, PDO::PARAM_STR],

        [":q_before3", $key.'%', PDO::PARAM_STR],
        [":q_middle3", '%'.$key.'%', PDO::PARAM_STR],
        [":q_end3", '%'.$key, PDO::PARAM_STR],

    )
);


if(!$list) exit(exitWithNegativeDebug("0 Results."));
exit(exitWithOK($list));


?>


