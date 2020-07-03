<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 03/12/2017
 * Time: 00:48
 */


class Notification{
    /**
     * @param $userID int
     * @param $body string
     * @param $conn mysqli
     * @param null $url string
     */
    static function send($userID,$body,$conn,$url = null) {
        $SQL_SELECT_PLAYER = "SELECT DISTINCT(playerID) as 'playerID' FROM onesignal WHERE userID = '".$userID."' ";
        $result = $conn->query($SQL_SELECT_PLAYER);
        if($result && $result->num_rows > 0){
            $players = array();
            while($row = $result->fetch_assoc()) array_push($players,$row['playerID']);
            $magic = self::performOneSignalMagic($players,$body,$url);
            self::handleOneSignalResponse($magic,$conn);
        }

    }

    static function performOneSignalMagic($playerID, $body, $url = null){
        $fields = array(
            'app_id' => "ad860974-d73d-419d-8b1e-f1a6cd5cf3c2",
            'include_player_ids' => $playerID,
            'data' => array("foo" => "bar"), //custom returning array of data
            'contents' => array("en" => $body),
            'headings' => array(
                "en" => "ConnSuite | Your official online networking suite",
            ),
        );

        if($url) $fields['url'] = $url;

        $fields = json_encode($fields);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
            'Authorization: Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
        //https://documentation.onesignal.com/reference#section-results-create-notification
    }

    static function handleOneSignalResponse($response,$conn){
        if(array_key_exists("errors",$response)){
            $errors = (array) $response['errors'];
            if(array_key_exists("invalid_player_ids",$errors)){
                $invalid = (array) $errors['invalid_player_ids'];
                if($invalid && is_array($invalid) && count($invalid) > 0){
                    $SQL_DELETE = "DELETE FROM onesignal WHERE playerID = '".$invalid[0]."' ";
                    for($i = 1; $i < count($invalid); $i++) $SQL_DELETE.=" OR playerID = '".$invalid[$i]."' ";
                    $conn->query($SQL_DELETE);
                }
            }

        }
    }


}