<?php

/**
 * Create by @VanSoftware
 * Date: 27/05/2018
 * Time: 15:17
 */

include_once(__DIR__ . "/alphabet.php");

class Core
{


    public static function authenticatedAccess(){
        return Core::globalAccess();
    }

    public  static function globalAccess() {

        $server = "localhost";
        $user = "root";
        $pass = "root";
        $database = "csuite";


        $DSN = 'mysql:host='.$server.';dbname='.$database.';charset=utf8mb4';
        $conn =  new PDO($DSN, $user, $pass);

        return $conn;
    }


}