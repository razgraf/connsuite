<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 12/08/2017
 * Time: 23:53
 */


include_once "connsuite-constant.php";

/**
 * Class CS
 * Deals with the most important things in the RealJobs web server application. EG: connecting the PHP to the MySQL database.
 */
class CSCore {
    static function globalAccess() {
        /**
         * This will require a token passed in the HEADERS.
         * Another function will be needed for separate access without token.
         */
        $servername = "localhost";
        $user = "razvan";
        $pass = "connsuitepass";
        $database = "connsuite";


        $conn = new mysqli($servername, $user, $pass, $database);
        $conn -> set_charset('utf8');
        if(self::checkHeaderToken())  return $conn;
        return null;
    }

    static function checkHeaderToken(){
        $conn = self::credentialAccess();


        if(!isset($_SERVER['HTTP_TOKEN'])) return false;
        if(!isset($_SERVER['HTTP_USER'])) return false;


        $value = $_SERVER['HTTP_TOKEN'];
        $userID = $_SERVER['HTTP_USER'];

        $SQL_CHECK = "SELECT ID FROM token WHERE userID = '".$userID."' AND value = '".$value."' ";
        $result = $conn->query($SQL_CHECK);
        if( $result->num_rows > 0) { return true; }

        return false;

    }

    static function credentialAccess() {
        /**
         * This will require a token passed in the HEADERS.
         * Another function will be needed for separate access without token.
         */
        $servername = "localhost";
        $user = "razvan";
        $pass = "connsuitepass";
        $database = "connsuite";

        $conn = new mysqli($servername, $user, $pass, $database);
        $conn -> set_charset('utf8');
        return $conn;
    }


    /**
     * A helper function used to print the output based upon a $results array.
     */
    static function printOutput($results) {
        if ($results->num_rows == 0) {
            exit (json_encode(kCSResponseNegative));
        }

        $output = array();
        while ($row = $results -> fetch_assoc()) {
            $output[] = $row;
        }
        print(json_encode($output));
    }

    /**
    Secures the MySQL injection case.
     */
    function secureString($inp) {
        if(is_array($inp))
            return array_map(__METHOD__, $inp);

        if(!empty($inp) && is_string($inp)) {
            return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp);
        }

        return $inp;
    }


    function exitWithNegative($error){
        return json_encode(array(
            "result"=>kCSResponseNegative,
            "response"=>$error
        ));
    }
}
?>