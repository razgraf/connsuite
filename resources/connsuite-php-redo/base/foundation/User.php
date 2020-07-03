<?php

/**
 * Create by @VanSoftware
 * Date: 27/05/2018
 * Time: 15:17
 */

require_once(__DIR__ . "/alphabet.php");
require_once(__DIR__ . "/Session.php");
require_once(__DIR__ . "/Cookie.php");
require_once(__DIR__ . "/PDOParser.php");

include_once(__DIR__ ."/../model/UserData.php");


require_once (__DIR__ . '/JWT/BeforeValidException.php');
require_once (__DIR__ . '/JWT/ExpiredException.php');
require_once (__DIR__ . '/JWT/SignatureInvalidException.php');
require_once (__DIR__ . '/JWT/JWT.php');

require_once (__DIR__ . "/polyfill/random_compat/lib/random.php");

use \Firebase\JWT\JWT;

const CLASS_USER_KEY_ID = "ID";
const CLASS_USER_KEY_USERNAME = "username";
const CLASS_USER_KEY_INSTANTIATED = "instantiated";
const CLASS_USER_KEY_TOKEN = "token";
const CLASS_USER_KEY_DATA = "data";


class User
{

    private $ID;
    private $username;
    private $token;
    private $instantiated;
    private $JWT;
    private $data;

    use Cookie;


    public function __construct(){}

    /**
     * @param object|User $data
     * @param bool $fromObject (if $data is a defined object (e.g. class User), this will be true)
     * @return $this
     */
    public function setUser($data, $fromObject = false){
        if($fromObject == false) {
            $this->ID = (isDataInObjectSet(CLASS_USER_KEY_ID, $data, DATA_TYPE_USER_ID)) ? $data[CLASS_USER_KEY_ID] : null;
            $this->username = (isDataInObjectSet(CLASS_USER_KEY_USERNAME, $data, DATA_TYPE_STRING)) ? $data[CLASS_USER_KEY_USERNAME] : null;
            $this->token = (isDataInObjectSet(CLASS_USER_KEY_TOKEN, $data, DATA_TYPE_STRING)) ? $data[CLASS_USER_KEY_TOKEN] : null;
            $this->instantiated = (isDataInObjectSet(CLASS_USER_KEY_INSTANTIATED, $data, DATA_TYPE_STRING)) ? $data[CLASS_USER_KEY_INSTANTIATED] : null;
            $this->data = (isDataInObjectSet(CLASS_USER_KEY_DATA,$data,DATA_TYPE_ARRAY)) ? new UserData($data[CLASS_USER_KEY_DATA]) : null;
        }
        else{
            $this->ID = $data->getID();
            $this->username = $data->getUsername();
            $this->token = $data->getToken();
            $this->instantiated = $data->getInstantiated();
            $this->data = $data->getData();
        }



        return $this;
    }

    public function printUser(){
        $ID = $this->getID() ? $this->getID() : "-";
        $username = $this->getUsername() ? $this->getUsername() : "-";
        $inst = $this->getInstantiated() ? $this->getInstantiated() : "-";



        $p = "ID: ".$ID."<br>";
        $p.= "username: ".$username."<br>";
        $p.= "instantiated: ".$inst."<br>";
        $p.= $this->getData()->printData();
        return $p;
    }


    /**
     *
     * ----------------------------------------------------------
     *
     * SESSION MANAGER
     *
     * ----------------------------------------------------------
     *
     */




    /**
     * @param $conn PDO
     * @param bool $fromAuthCookie
     * @param array $extra
     * @return $this
     * @internal param $fromCookie
     */
    public function getDatabaseUser($conn, $fromAuthCookie = true, $extra = array()){
        try{
            if($fromAuthCookie){
                if(null == ($cookie = self::decodeAuthCookie())) return null; //-BRANCH : NO USER ID
                $userID = getDataFromObject(CLASS_USER_KEY_ID,$cookie,DATA_TYPE_USER_ID,true);
            }
            else {
                if(array_key_exists(CLASS_USER_KEY_ID,$extra)){
                    $userID = getDataFromObject(CLASS_USER_KEY_ID,$extra,DATA_TYPE_USER_ID,true);
                }
                else return null; //-BRANCH : NO USER ID
            }

            /**
             * GET PRIMARY USER & USER DATA
             */

            $data = PDOParser::parseSingleObject($conn, "SELECT u.username, u.instantiated, ud.* FROM user u INNER JOIN user_data ud ON ud.userID = u.ID WHERE u.ID =:ID", array([":ID",$userID,PDO::PARAM_INT]));
            if(!$data) return null; //-BRANCH : ISSUES


            $T[CLASS_USER_KEY_ID] = $userID;
            $T[CLASS_USER_KEY_USERNAME]  = $data[USER_KEY_USERNAME];
            $T[CLASS_USER_KEY_INSTANTIATED] = $data[USER_KEY_INSTANTIATED];
            $T[CLASS_USER_KEY_DATA] = $data;

            /**
             * GET ALIASES
             */


            /**
             * GET STATUS
             */



            $this->setUser($T);

            return $this;//+BRANCH : USER HAS BEEN FETCHED
        }
        catch (Exception $e){}

        return null; //-BRANCH : ISSUES

    }

    public function saveSessionUser(){

        $serialized = serialize($this);

        Session::sessionStart(STORAGE_SESSION_KEY,STORAGE_SESSION_EXPIRY_DATE);
        $_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY] = $serialized;

        return $this;
    }

    public function getSessionUser($populate = true){
        Session::sessionStart(STORAGE_SESSION_KEY,STORAGE_SESSION_EXPIRY_DATE);
        if(isset($_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY]) && !empty($_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY])){
            $temp = unserialize($_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY]);
            if($populate){
                $this->setUser($temp, true);
                return $this;
            }
            return $temp;
        }

        return null;
    }



    public static function removeSessionUser(){
        Session::sessionStart(STORAGE_SESSION_KEY,STORAGE_SESSION_EXPIRY_DATE);
        unset($_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY]);
        Session::unsetCookie(STORAGE_SESSION_KEY);
        if(isset($_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY]) && !empty(  $_SESSION[STORAGE_SESSION_KEY.STORAGE_SESSION_USER_KEY])) {
            session_destroy();
        }
    }


    /**
     *
     * ----------------------------------------------------------
     *
     * TOKEN MANAGER
     *
     * ----------------------------------------------------------
     *
     */


    /**
     * @param $conn PDO
     * @return $this|bool
     * @throws Exception
     */
    public function addToken($conn){
        $token = self::generateToken();
        $SQL = $conn->prepare("INSERT INTO token SET userID=? , token=?, instantiated=?");
        $SQL->bindValue(1, $this->ID, PDO::PARAM_INT);
        $SQL->bindValue(2, $token, PDO::PARAM_STR);
        $SQL->bindValue(3, getNOW(), PDO::PARAM_STR);
        try{
            if($SQL->execute()) {
                $this->token = $token;
                return $this;
            }
        }catch (PDOException $ex){}//handle throws if necessary

        return null;
    }

    /**
     * @param $conn PDO
     * @param $token string
     * @param null $userID
     * @return bool
     * @throws Exception
     * @internal param null $callback
     */
    public function removeToken($conn, $token = null, $userID = null){

        if($token == null || $userID == null){
            if($this->token && $this->ID) {
                $token = $this->getToken();
                $userID = $this->getID();
            }
            else return false;
        }

        $SQL = $conn->prepare("DELETE FROM token WHERE userID=? AND token=?");
        $SQL->bindValue(1, $userID, PDO::PARAM_INT);
        $SQL->bindValue(2, $token, PDO::PARAM_STR);
        try{
            if($SQL->execute()) {
                return true; //+BRANCH
            }
        }catch (PDOException $ex){}

        return false; //-BRANCH : ISSUES
    }

    /**
     * @param $conn PDO
     * @param $token string
     * @return bool
     * @internal param null $callback
     */

    public function checkTokenValidity($conn, $token = null){
        if($token == null){
            if($this->token && $this->ID) $token = $this->token;
            else return false;
        }

        $SQL = $conn->prepare("SELECT * FROM token WHERE userID=? AND token=?");
        $SQL->bindValue(1, $this->ID, PDO::PARAM_INT);
        $SQL->bindValue(2, $token, PDO::PARAM_STR);
        try{
            if($SQL->execute()) {
                $result = $SQL->fetchAll(PDO::FETCH_ASSOC);
                if($result && count($result) == 1){
                    return true;
                }
            }
        }catch (PDOException $ex){}

        return false;
    }


    public static function generateToken($length = 20)
    {
        return bin2hex(random_bytes($length));
    }


    /**
     *
     * ----------------------------------------------------------
     *
     * AUTH COOKIE MANAGER & PASSWORD
     *
     * ----------------------------------------------------------
     *
     */

    /**
     * @param null|string $JWT
     * @return array|null
     */



    public static function decodeAuthCookie($JWT = null){
        if($JWT){
            return get_object_vars(JWT::decode($JWT, base64_decode(AUTH_COOKIE_JWT_KEY), array('HS256')));
        }
        else{
            if(!isset($_COOKIE[AUTH_COOKIE_NAME]))  return null;
            else return get_object_vars(JWT::decode($_COOKIE[AUTH_COOKIE_NAME], base64_decode(AUTH_COOKIE_JWT_KEY), array('HS256')));
        }
    }

    public function refreshAuthCookie($conn, $isTokenValid = null){
        try{
            if($isTokenValid == null) $isTokenValid = $this->checkTokenValidity($conn);
            $decoded = $this->decodeAuthCookie();
            $issued = getDataFromObject(AUTH_COOKIE_KEY_ISSUED, $decoded, DATA_TYPE_STRING,false);
            $today = date_create(date('y-m-d h:i:s'));
            $issued = date_create($issued);
            if(!$today || !$issued) return; //-BRANCH : DATE ERROR
            $dateDiff = (int)(date_diff($issued,$today) -> format("%s"));

            if ($dateDiff >= (AUTH_COOKIE_EXPIRY_DATE - AUTH_COOKIE_REFRESH_INTERVAL)){
                //Today is already 28 days (30 - 2) bigger than the issue date, so we can refresh the cookie
                if($isTokenValid){
                    $oldToken = $this->token;
                    if($this->addToken($conn) != null){
                        if($this->removeToken($conn,$oldToken, $this->ID)){
                            self::unsetCookie(AUTH_COOKIE_NAME);
                            $this->saveAuthCookie();
                            //+BRANCH : CONTINUE
                        }
                        else throw (new Exception("Error on removing Token"));
                    }
                    else throw (new Exception("Error on adding Token"));
                }
                else throw (new Exception("Error on validating Token"));

            }
            else{
                return; //-BRANCH : NO UPDATE HAS BEEN MADE, GO ON WITH THE DAY
            }

        }
        catch (Exception $e){
            return; //-BRANCH : SOME ERROR //handle throws if necessary
        }

        return; //-BRANCH : NO UPDATE HAS BEEN MADE, GO ON WITH THE DAY
    }

    public function saveAuthCookie(){

        if(!$this->ID && !$this->token) return null;


        if(isset($_COOKIE[AUTH_COOKIE_NAME])) {
            unset($_COOKIE[AUTH_COOKIE_NAME]);
            self::unsetCookie(AUTH_COOKIE_NAME);
        }



        $J = array(
            AUTH_COOKIE_KEY_USER_ID => $this->ID,
            AUTH_COOKIE_KEY_TOKEN => $this->token,
            AUTH_COOKIE_KEY_ISSUED => date('y-m-d h:i:s')
        );

        $result = JWT::encode($J, base64_decode(AUTH_COOKIE_JWT_KEY),'HS256');
        $this->setJWT($result);
        self::setCookie(AUTH_COOKIE_NAME,$result);


        return VICTORY;

    }

    public static function removeAuthCookie(){
        if(isset($_COOKIE[AUTH_COOKIE_NAME])) {
            unset($_COOKIE[AUTH_COOKIE_NAME]);
            self::unsetCookie(AUTH_COOKIE_NAME);
        }
    }

    /**
     *
     * ----------------------------------------------------------
     *
     * PASSWORD
     *
     *
     * ----------------------------------------------------------
     * @param $plain string
     * @return bool|string
     *
     */

    public static function hashPassword($plain){

        return password_hash( base64_encode( hash('sha256', $plain, true)), PASSWORD_BCRYPT, ['cost'=>8]);

    }
    public static function verifyPassword($plain , $hash){
        return password_verify(base64_encode( hash('sha256', $plain, true)),$hash);
    }


    /**
     *
     * ----------------------------------------------------------
     *
     * PROJECT FUNCTIONS
     *
     * ----------------------------------------------------------
     *
     */


    /**
     * @param $email
     * @return bool
     */
    public static function isValidEmail($email){
        $pattern = '/[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/';
        return (preg_match($pattern, $email) === 1);
    }

    /**
     * @param $conn
     * @param $email
     * @return bool
     */
    public static function isUniqueEmail($conn,$email){
        $check = PDOParser::parseBooleanValidRows($conn, "SELECT email FROM user_data WHERE email=:email", array([":email", $email, PDO::PARAM_STR]));
        return !$check;

    }

    /**
     * @param $conn
     * @return string
     */
    public static function createUniqueAID($conn){
        $AID = self::generateToken(12);
        while(!self::isUniqueAID($conn, $AID)) $AID = User::generateToken(12);
        return strtoupper($AID);
    }
    /**
     * @param $conn
     * @param $AID
     * @return bool
     */
    public static function isUniqueAID($conn,$AID){
        $check = PDOParser::parseBooleanValidRows($conn, "SELECT userID FROM user_data WHERE AID=:AID", array([":AID", $AID, PDO::PARAM_STR]));
        return !$check;

    }

    /**
     * @param $username
     * @return bool
     */
    public static function isValidUsername($username){
        $bad =  '/[#$%^&*()+=\-\[\]\';,\/{}|\":<>?~\\\\]/';
        for($i = 0; $i <  strlen($bad) ; $i++) if(strpos($username, $bad[$i]) !== false) return false;
        return true;
    }

    /**
     * Create a unique username based on a primary username given
     * @param $conn
     * @param $primary
     * @return string
     */
    public static function createUniqueUsername($conn, $primary){
        $count = 1;
        $username = $primary;
        while(!self::isUniqueUsername($conn,$username)) {
            $username = $primary.$count;
            $count++;
        }
        return $username;

    }

    /**
     * @param $conn
     * @param $username
     * @return bool
     */
    public static function isUniqueUsername($conn, $username){

        $check = PDOParser::parseBooleanValidRows(
            $conn,
            "SELECT u.ID as 'userID' FROM user u WHERE username = :u1
                       UNION 
                       SELECT ua.userID as 'userID' FROM user_alias ua WHERE alias =:u2",
            array(
                [":u1",$username,PDO::PARAM_STR],
                [":u2",$username,PDO::PARAM_STR],
            )
        );

        return ! $check;
    }



    /**
     *
     * ----------------------------------------------------------
     *
     * SETTERS AND GETTERS
     *
     * ----------------------------------------------------------
     *
     */




    /**
     * @param mixed $ID
     * @return User
     */
    public function setID($ID)
    {
        $this->ID = $ID;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getID()
    {
        return $this->ID;
    }

    /**
     * @param mixed $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $token
     * @return User
     */
    public function setToken($token)
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param mixed $JWT
     * @return User
     */
    public function setJWT($JWT)
    {
        $this->JWT = $JWT;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getJWT()
    {
        return $this->JWT;
    }

    /**
     * @param mixed $instantiated
     * @return User
     */
    public function setInstantiated($instantiated)
    {
        $this->instantiated = $instantiated;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getInstantiated()
    {
        return $this->instantiated;
    }


    /**
     * @param UserData $data
     * @return User
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * @return UserData
     */
    public function getData()
    {
        return $this->data;
    }
}


