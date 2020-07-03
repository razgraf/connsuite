<?php

/**
 * Create by @VanSoftware
 * Date: 27/05/2018
 * Time: 15:17
 */



include_once(__DIR__ . "/alphabet.php");
require_once(__DIR__ . "/PDOParser.php");
include_once(__DIR__ . "/Core.php");
include_once(__DIR__ . "/Session.php");
include_once(__DIR__ . "/User.php");




/**
 * Class Environment
 * SINGLETON
 */

final class Environment
{

    protected $page = null;
    protected $list;
    protected function __clone(){}
    protected function __sleep() {}
    protected function __wakeup() {}
    protected function __construct(){}

    use PDOParser;


    public $ROOT;
    public $DEPTH_TO_HOME;


    /**
     * @var User $user
     */
    public $user;


    /**
     * @return Environment|null
     * Instance() will instantiate the Environment if it has not already been set.
     */
    public static function Instance(){

        static $environmentInstance = null;

        if ($environmentInstance === null) {
            $environmentInstance = new Environment();
        }
        return $environmentInstance;
    }


    public function Set($ROOT, $DEPTH_TO_HOME=0,$data){
        $this->ROOT = $ROOT;
        $this->DEPTH_TO_HOME = $DEPTH_TO_HOME;

        if(is_array($data)) {
            foreach ($data as $item) {
                if (!is_array($item)) return null;
                if (array_key_exists(ENVIRONMENT_KEY_PAGE_IDENTIFIER, $item) &&
                    array_key_exists(ENVIRONMENT_KEY_PAGE_PATH, $item) &&
                    array_key_exists(ENVIRONMENT_KEY_PAGE_DEPTH, $item)
                ) {
                    $this->list[$item[ENVIRONMENT_KEY_PAGE_IDENTIFIER]] = $item;
                }
            }

            foreach ($data as $item) {
                if (array_key_exists(ENVIRONMENT_KEY_PAGE_API, $item)) {
                    $API = $item[ENVIRONMENT_KEY_PAGE_API];
                    foreach ($API as $key => $value) $API[$key] = ROOT.$this->getPath($API[$key]);
                    $this->list[$item[ENVIRONMENT_KEY_PAGE_IDENTIFIER]][ENVIRONMENT_KEY_PAGE_API] = $API;
                }
            }
        }
    }



    /**
     * @param array $options defines options for the data set/retrieval
     *      $options = [
     *          'forceUserReloadInSession' => (boolean) Instructs the ENV to download an updated User Profile from DB
     *       ]
     * @param null|PDO $conn
     * @return bool
     */
    public function setEnvironmentData($options = array(),$conn = null){
        if($conn == null) return false;
        $this->setEnvironmentUser($conn,getDataFromObject(ENVIRONMENT_SET_DATA_OPTION_FORCE_USER_RETRIEVE,$options,DATA_TYPE_BOOLEAN));

        return true;
    }


    /**
     * @param bool $forceReloadInSession
     * @param null|PDO $conn
     */
    private function setEnvironmentUser($conn,$forceReloadInSession = false){
        $this->user = new User();
        /**
         * WE KNOW THAT THE CONNECTION IS VALID, SO WE HAVE 2 OPTIONS
         * 1. USER IS IN SESSION => RETRIEVE IT FROM THERE
         * 2. USER IS NOT IN SESSION => RETRIEVE IT FROM DB
         * --------
         * IF $forceReloadInSession IS TRUE
         */

        if($forceReloadInSession === true){
            $this->user->getDatabaseUser($conn);
            $this->user->saveSessionUser();
        }
        else{
            $status = $this->user->getSessionUser(true);
            if($status == null) {
                $this->user->getDatabaseUser($conn);
                $this->user->saveSessionUser();
            }
        }

    }



    public function initConnection($pageIdentifier, $connectionType = CONNECTION_TYPE_AUTHENTICATED, $exitIfNull = true){
        if($connectionType == CONNECTION_TYPE_GLOBAL){
            $conn = Core::globalAccess();
            if($exitIfNull && $conn == null) exit(exitWithNegative("Connection Error."));
            $conn->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
            return $conn;
        }
        return null;
    }



    public function validateAPIConnection($pageIdentifier, $exitIfInvalid = true, $retrieveEnvironmentDataIfValid = true){
        if($pageIdentifier) $this->page = $this->getPage($pageIdentifier);
        if(false == ($conn = $this->validateConnection($pageIdentifier,false,$retrieveEnvironmentDataIfValid,false))){
            if($exitIfInvalid) exit(exitWithNegativeDebug("Connection error."));
            return false;
        }
        return $conn;

    }

    public function validateConnection($pageIdentifier, $kickToIndex = true, $retrieveEnvironmentDataIfValid = false, $forceSessionUserRetrieve = false){
        if($pageIdentifier) $this->page = $this->getPage($pageIdentifier);
        try{
            $temp = new User();
            if(null == ( $cookie = User::decodeAuthCookie())){
                /**
                 * NO COOKIE AVAILABLE. IF THE USER IS IN SING IN PAGE, WE NEED TO KNOW (return false) THAT WE SHOULD NOT REDIRECT TO DASHBOARD
                 * NO COOKIE AVAILABLE. IF THE USER CAN BE KICKED ($kickToIndex), WE CLEAN THE ENVIRONMENT AND LET clean() DO THE WORK
                 */
                if($kickToIndex == true)  self::clean(); //-BRANCH AUTO : CLEAN AND REDIRECT
                else return false; //-BRANCH : INVALID CONNECTION
            }


            $temp->setToken(getDataFromObject(AUTH_COOKIE_KEY_TOKEN, $cookie, DATA_TYPE_STRING,false));
            $temp->setID(getDataFromObject(AUTH_COOKIE_KEY_USER_ID, $cookie, DATA_TYPE_STRING,false));


            $conn = $this->initConnection($pageIdentifier, CONNECTION_TYPE_GLOBAL,false);

            if($temp->checkTokenValidity($conn)) {

                /**
                 * EVERYTHING IS FINE, TOKEN HAS BEEN VALIDATED SO WE CAN PROCEED WITH USUAL BUSINESS
                 * BEFORE ENDING THE SCRIPT, WE ALSO RETRIEVE ENVIRONMENT DATA IS NECESSARY
                 */
                if($retrieveEnvironmentDataIfValid) $this->setEnvironmentData(array(
                    ENVIRONMENT_SET_DATA_OPTION_FORCE_USER_RETRIEVE => $forceSessionUserRetrieve
                ), $conn);

                $temp->refreshAuthCookie($conn, true);

                return $conn; //+BRANCH : VALID CONNECTION
            }
        }
        catch (Exception $e){}

        /**
         * SOMETHING HAPPENED
         * If $kickToIndex == true, we can assume that the user is somewhere he/she is not supposed to be => we kick them out (redirect to front page) and clean the Environment
         */
        if($kickToIndex == true) self::clean(); //-BRANCH AUTO : CLEAN AND REDIRECT
        return false; //-BRANCH : INVALID CONNECTION
    }


    /**
     * @param null|User $user
     * @param null|PDO $conn
     */
    public static function clean($user = null, $conn = null){
        /**
         * 1. REMOVE COOKIES
         * 2. REMOVE TOKEN FROM DATABASE IF I STILL HAVE ACCESS TO THE USER
         * 3. REMOVE SESSION DATA
         * 4. SEND USER TO SING IN SCREEN &kicked=true
         */

        User::removeAuthCookie();
        User::removeSessionUser();

        if($user && $conn){
            try{
                $user->removeToken($conn);
            }
            catch (Exception $e){}
        }

        header("Location: ".ROOT."?kick=true");
    }








    /**
     *
     * ----------------------------------------------------------
     *
     * UTIL FUNCTIONS #ENVIRONMENT
     *
     * ----------------------------------------------------------
     *
     */


    /**
     * @param $identifier integer
     * @return null|string
     */

    public function getPage($identifier){
        if(array_key_exists($identifier,$this->list)) return $this->list[$identifier];
        return null;
    }
    public function getIdentifier($identifier){
        if(array_key_exists($identifier,$this->list)) return $this->list[$identifier][ENVIRONMENT_KEY_PAGE_IDENTIFIER];
        return null;
    }
    public function getDepth($identifier){
        if(array_key_exists($identifier,$this->list)) return $this->list[$identifier][ENVIRONMENT_KEY_PAGE_DEPTH];
        return null;
    }
    public function getPath($identifier){
        if(array_key_exists($identifier,$this->list)) return $this->list[$identifier][ENVIRONMENT_KEY_PAGE_PATH];
        return null;
    }
    public function printPath($identifier){
        if(array_key_exists($identifier,$this->list)) return $this->ROOT.$this->list[$identifier][ENVIRONMENT_KEY_PAGE_PATH];
        return null;
    }
    public function getAPI($identifier){
        if(array_key_exists($identifier,$this->list)) return $this->list[$identifier][ENVIRONMENT_KEY_PAGE_API];
        return null;
    }
    public function printAPI($pageIdentifier = null){
        $pageIdentifier = $pageIdentifier ? $pageIdentifier : $this->page[ENVIRONMENT_KEY_PAGE_IDENTIFIER];
        $API = $this->getAPI($pageIdentifier);
        return $API ? json_encode($API) : '';
    }
    public function addAPI($addition = array(),$pageIdentifier = null){
        $pageIdentifier = $pageIdentifier ? $pageIdentifier : $this->page[ENVIRONMENT_KEY_PAGE_IDENTIFIER];
        $API = $this->getAPI($pageIdentifier) ?  $this->getAPI($pageIdentifier) : [];
        $API += $addition;
        $this->list[$pageIdentifier][ENVIRONMENT_KEY_PAGE_API] = $API;
    }


    public function goIdentifierToIdentifier($fromIdentifier,$toIdentifier){
        $path = "";
        for($i=0;$i<$this->getPage($fromIdentifier)[ENVIRONMENT_KEY_PAGE_DEPTH];$i++) $path.="../";
        $path.= $this->getPage($toIdentifier)[ENVIRONMENT_KEY_PAGE_PATH];
        return $path;
        // example : goIdentifierToPath(PAGE_IDENTIFIER...1, PAGE_IDENTIFIER...2)
    }


    public function goIdentifierToPath($fromIdentifier,$toPath){
        $path = "";
        for($i=0;$i<$this->getPage($fromIdentifier)[ENVIRONMENT_KEY_PAGE_DEPTH];$i++){ $path.="../";}
        $path.=$toPath;
        return $path;
        // example : goIdentifierToPath(PAGE_IDENTIFIER...,'libs/example.php') = "../../libs/example.php"
    }

    public function goPathToPath($fromPath, $toPath, $includeDepth = true){
        $path=$fromPath;
        if($includeDepth) for($i=0;$i<$this->DEPTH_TO_HOME;$i++) $path.="../";
        $path.=$toPath;
        return $path;
    }

    public function redirectTo($fromIdentifier, $toIdentifier){
        $path = $this->goIdentifierToIdentifier($fromIdentifier, $toIdentifier);
        header("Location: ".$path);
    }


    /**
     * @param $conn
     * @param $tableForQuery
     * @param string $keyForQuery
     * @return string
     */
    public static function createUniqueAID($conn, $tableForQuery, $keyForQuery = "AID"){
        $AID = self::generateToken(12);
        while(!self::isUniqueAID($conn, $AID, $tableForQuery, $keyForQuery)) $AID = self::generateToken(12);
        return strtoupper($AID);
    }

    /**
     * @param $conn
     * @param $AID
     * @param $tableForQuery
     * @param string $keyForQuery
     * @return bool
     */
    public static function isUniqueAID($conn,$AID,  $tableForQuery, $keyForQuery = "AID"){
        $check = PDOParser::parseBooleanValidRows($conn, "SELECT ID FROM ".$tableForQuery." WHERE ".$keyForQuery."= :AID", array([":AID", $AID, PDO::PARAM_STR]));
        return !$check;

    }


    public static function generateToken($length = 20)
    {
        return bin2hex(random_bytes($length));
    }


}

/**
 *
 * ----------------------------------------------------------
 *
 * UTIL FUNCTIONS FOR TYPE CHECKING AND SECURING
 *
 * ----------------------------------------------------------
 *
 */


/**
 * @param $data
 * @param $type Integer e.g. DATA_TYPE_NUMERIC, DATA_TYPE_STRING, ...
 * @param bool $isAlsoSecure
 * @param null $elementType
 * @return bool
 */
function isDataSet($data, $type, $isAlsoSecure = true, $elementType = null){
    if(!isset($data)) return false;
    if($type !== DATA_TYPE_FILE_IMAGE && $type !== DATA_TYPE_FILE_ANY) {if(count($data) == 0 || strlen($data) == 0) return false;}
    if($isAlsoSecure && !isSecure($data,$type,$elementType)) return false;
    return true;
}


function isDataInObjectSet($key, $array, $type, $isAlsoSecure = true){
    if($array == null || count($array) == 0) return false;
    if(!array_key_exists($key,$array)) return false;
    if($type === DATA_TYPE_ARRAY) {
        if(count($array[$key]) == 0) return false;
    }
    else{
        if(strlen($array[$key]) == 0) return false;
    }
    if($isAlsoSecure && !isSecure($array[$key],$type)) return false;

    return true;
}


/**
 * @param $key
 * @param $array
 * @param $type
 * @param bool $isAlsoSecure
 * @return array|bool|int|null|string
 */
function getDataFromObject($key, $array, $type, $isAlsoSecure = true){
    if(isDataInObjectSet($key,$array,$type,$isAlsoSecure)) return $array[$key];
    return $type == DATA_TYPE_BOOLEAN ? false : null;
}

/**
 * @param $param
 * @param int $type
 * @param string $exitOnError
 * @param bool $isAlsoSecure
 * @param null $elementType
 * @param null $returnValueOnError
 * @return array|bool|int|null|string
 */
function getAPIParam($param, $type = DATA_TYPE_STRING, $exitOnError = "Error", $isAlsoSecure = true, $elementType = null, $returnValueOnError = null){
    if(!isDataSet($param, $type,$isAlsoSecure,$elementType)) {
        if ($exitOnError !== null && $exitOnError !== false) exit(exitWithNegativeDebug("API Param Error: " . $exitOnError));
        else return $returnValueOnError;
    }

    return $isAlsoSecure ? secure($param,$type,$elementType) : $param;
}


/**
 * @param $data string|int|array|object|boolean
 * @param $type
 * @param null $elementType
 * @return bool
 */
function isSecure($data, $type, $elementType = null){

    if($type == null || $data == null) return false;

    switch ($type){
        case DATA_TYPE_NUMERIC:
            if(!isNumericSecure($data)) return false;
            break;
        case DATA_TYPE_STRING:
            $data = trim($data);
            return true;
            break;
        case DATA_TYPE_EMAIL:
            $data = trim($data);
            break;
        case DATA_TYPE_HTML:
            $data = trim($data);
            break;
        case DATA_TYPE_USER_ID:
            break;
        case DATA_TYPE_BOOLEAN:
            break;
        case DATA_TYPE_ARRAY:
            if(count($data) === 0 ) return false;
            if($elementType !== null){
                foreach ($data as $item){
                    if(!isSecure($item,$elementType)); return false;
                }
            }
            break;
        case DATA_TYPE_FILE_IMAGE:
            if($data['size'] === 0) return false;

            if($data['size']/1048576 > 6) return false;

            if( $data === null || !isset($data) || !isset($data['tmp_name'])) return false;

            if( exif_imagetype($data['tmp_name']) != IMAGETYPE_PNG &&
                exif_imagetype($data['tmp_name']) != IMAGETYPE_JPEG &&
                exif_imagetype($data['tmp_name']) != IMAGETYPE_JPEG2000
            ) return false;
            break;

        case DATA_TYPE_FILE_ANY:
            return true;
            break;


        default:
            return false;
    }


    return true;
}


/**
 * @param $data
 * @param $type
 * @param null $elementType for Array
 * @return array|bool|int|null|string
 */
function secure($data,$type, $elementType = null){

    $secured = null;

    if($type == null || $data == null) return null;


    switch ($type){
        case DATA_TYPE_NUMERIC:
            $secured = secureNumeric($data);
            break;
        case DATA_TYPE_STRING:
            $secured = secureString($data);
            break;
        case DATA_TYPE_EMAIL:
            $secured = $data;
            break;
        case DATA_TYPE_HTML:
            $secured = $data;
            break;
        case DATA_TYPE_USER_ID:
            $secured = secureString($data);
            break;
        case DATA_TYPE_BOOLEAN:
            $secured = $data;
            break;
        case DATA_TYPE_ARRAY:
            if(count($data) !== 0 ) {
                $secured = $data;
                if ($elementType !== null) {
                    foreach ($data as $key=>$value) {
                        $secured[$key] = secure($data[$key], $elementType);
                    }

                }
            }
            break;
        case DATA_TYPE_FILE_IMAGE:
            $secured = $data;
            break;
        case DATA_TYPE_FILE_ANY:
            $secured = $data;
            break;
        default:
            return false;
    }


    return $secured;
}



function isNumericSecure($data){
    if(!is_numeric($data)) return false;
    return true;
}

function secureNumeric($number){
    $number = strip_tags($number);
    $number = (int) $number;
    return $number;
}


function secureString($data) {
    $data = strip_tags($data);
    if(is_array($data)) return array_map(__METHOD__, $data);
    return $data;
}


/**
 *
 * ----------------------------------------------------------
 *
 * OTHER UTIL FUNCTIONS
 *
 * ----------------------------------------------------------
 *
 */



function transliterateString($txt) {
    $transliterationTable = array('á' => 'a', 'Á' => 'A', 'à' => 'a', 'À' => 'A', 'ă' => 'a', 'Ă' => 'A', 'â' => 'a', 'Â' => 'A', 'å' => 'a', 'Å' => 'A', 'ã' => 'a', 'Ã' => 'A', 'ą' => 'a', 'Ą' => 'A', 'ā' => 'a', 'Ā' => 'A', 'ä' => 'ae', 'Ä' => 'AE', 'æ' => 'ae', 'Æ' => 'AE', 'ḃ' => 'b', 'Ḃ' => 'B', 'ć' => 'c', 'Ć' => 'C', 'ĉ' => 'c', 'Ĉ' => 'C', 'č' => 'c', 'Č' => 'C', 'ċ' => 'c', 'Ċ' => 'C', 'ç' => 'c', 'Ç' => 'C', 'ď' => 'd', 'Ď' => 'D', 'ḋ' => 'd', 'Ḋ' => 'D', 'đ' => 'd', 'Đ' => 'D', 'ð' => 'dh', 'Ð' => 'Dh', 'é' => 'e', 'É' => 'E', 'è' => 'e', 'È' => 'E', 'ĕ' => 'e', 'Ĕ' => 'E', 'ê' => 'e', 'Ê' => 'E', 'ě' => 'e', 'Ě' => 'E', 'ë' => 'e', 'Ë' => 'E', 'ė' => 'e', 'Ė' => 'E', 'ę' => 'e', 'Ę' => 'E', 'ē' => 'e', 'Ē' => 'E', 'ḟ' => 'f', 'Ḟ' => 'F', 'ƒ' => 'f', 'Ƒ' => 'F', 'ğ' => 'g', 'Ğ' => 'G', 'ĝ' => 'g', 'Ĝ' => 'G', 'ġ' => 'g', 'Ġ' => 'G', 'ģ' => 'g', 'Ģ' => 'G', 'ĥ' => 'h', 'Ĥ' => 'H', 'ħ' => 'h', 'Ħ' => 'H', 'í' => 'i', 'Í' => 'I', 'ì' => 'i', 'Ì' => 'I', 'î' => 'i', 'Î' => 'I', 'ï' => 'i', 'Ï' => 'I', 'ĩ' => 'i', 'Ĩ' => 'I', 'į' => 'i', 'Į' => 'I', 'ī' => 'i', 'Ī' => 'I', 'ĵ' => 'j', 'Ĵ' => 'J', 'ķ' => 'k', 'Ķ' => 'K', 'ĺ' => 'l', 'Ĺ' => 'L', 'ľ' => 'l', 'Ľ' => 'L', 'ļ' => 'l', 'Ļ' => 'L', 'ł' => 'l', 'Ł' => 'L', 'ṁ' => 'm', 'Ṁ' => 'M', 'ń' => 'n', 'Ń' => 'N', 'ň' => 'n', 'Ň' => 'N', 'ñ' => 'n', 'Ñ' => 'N', 'ņ' => 'n', 'Ņ' => 'N', 'ó' => 'o', 'Ó' => 'O', 'ò' => 'o', 'Ò' => 'O', 'ô' => 'o', 'Ô' => 'O', 'ő' => 'o', 'Ő' => 'O', 'õ' => 'o', 'Õ' => 'O', 'ø' => 'oe', 'Ø' => 'OE', 'ō' => 'o', 'Ō' => 'O', 'ơ' => 'o', 'Ơ' => 'O', 'ö' => 'oe', 'Ö' => 'OE', 'ṗ' => 'p', 'Ṗ' => 'P', 'ŕ' => 'r', 'Ŕ' => 'R', 'ř' => 'r', 'Ř' => 'R', 'ŗ' => 'r', 'Ŗ' => 'R', 'ś' => 's', 'Ś' => 'S', 'ŝ' => 's', 'Ŝ' => 'S', 'š' => 's', 'Š' => 'S', 'ṡ' => 's', 'Ṡ' => 'S', 'ş' => 's', 'Ş' => 'S', 'ș' => 's', 'Ș' => 'S', 'ß' => 'SS', 'ť' => 't', 'Ť' => 'T', 'ṫ' => 't', 'Ṫ' => 'T', 'ţ' => 't', 'Ţ' => 'T', 'ț' => 't', 'Ț' => 'T', 'ŧ' => 't', 'Ŧ' => 'T', 'ú' => 'u', 'Ú' => 'U', 'ù' => 'u', 'Ù' => 'U', 'ŭ' => 'u', 'Ŭ' => 'U', 'û' => 'u', 'Û' => 'U', 'ů' => 'u', 'Ů' => 'U', 'ű' => 'u', 'Ű' => 'U', 'ũ' => 'u', 'Ũ' => 'U', 'ų' => 'u', 'Ų' => 'U', 'ū' => 'u', 'Ū' => 'U', 'ư' => 'u', 'Ư' => 'U', 'ü' => 'ue', 'Ü' => 'UE', 'ẃ' => 'w', 'Ẃ' => 'W', 'ẁ' => 'w', 'Ẁ' => 'W', 'ŵ' => 'w', 'Ŵ' => 'W', 'ẅ' => 'w', 'Ẅ' => 'W', 'ý' => 'y', 'Ý' => 'Y', 'ỳ' => 'y', 'Ỳ' => 'Y', 'ŷ' => 'y', 'Ŷ' => 'Y', 'ÿ' => 'y', 'Ÿ' => 'Y', 'ź' => 'z', 'Ź' => 'Z', 'ž' => 'z', 'Ž' => 'Z', 'ż' => 'z', 'Ż' => 'Z', 'þ' => 'th', 'Þ' => 'Th', 'µ' => 'u', 'а' => 'a', 'А' => 'a', 'б' => 'b', 'Б' => 'b', 'в' => 'v', 'В' => 'v', 'г' => 'g', 'Г' => 'g', 'д' => 'd', 'Д' => 'd', 'е' => 'e', 'Е' => 'E', 'ё' => 'e', 'Ё' => 'E', 'ж' => 'zh', 'Ж' => 'zh', 'з' => 'z', 'З' => 'z', 'и' => 'i', 'И' => 'i', 'й' => 'j', 'Й' => 'j', 'к' => 'k', 'К' => 'k', 'л' => 'l', 'Л' => 'l', 'м' => 'm', 'М' => 'm', 'н' => 'n', 'Н' => 'n', 'о' => 'o', 'О' => 'o', 'п' => 'p', 'П' => 'p', 'р' => 'r', 'Р' => 'r', 'с' => 's', 'С' => 's', 'т' => 't', 'Т' => 't', 'у' => 'u', 'У' => 'u', 'ф' => 'f', 'Ф' => 'f', 'х' => 'h', 'Х' => 'h', 'ц' => 'c', 'Ц' => 'c', 'ч' => 'ch', 'Ч' => 'ch', 'ш' => 'sh', 'Ш' => 'sh', 'щ' => 'sch', 'Щ' => 'sch', 'ъ' => '', 'Ъ' => '', 'ы' => 'y', 'Ы' => 'y', 'ь' => '', 'Ь' => '', 'э' => 'e', 'Э' => 'e', 'ю' => 'ju', 'Ю' => 'ju', 'я' => 'ja', 'Я' => 'ja');
    return str_replace(array_keys($transliterationTable), array_values($transliterationTable), $txt);
}




function getMilliseconds() {
    $microtime = microtime();
    $comps = explode(' ', $microtime); // Note: Using a string here to prevent loss of precision. In case of "overflow" (PHP converts it to a double)
    return $comps[1];
}
function getNewImageDimensions($originalWidth,$originalHeight,$newSize){

    $ratio = $originalWidth / $originalHeight;
    if ($ratio > 1) { //width > height
        $newWidth = $newSize;
        $newHeight =  ceil(($originalHeight/$originalWidth)*$newWidth);
    } else { // width <= height
        $newHeight = $newSize;
        $newWidth =  ceil($ratio*$newHeight);
    }

    return array($newWidth,$newHeight);
}




function getNOW(){
    $dateTime = new DateTime('now', new DateTimeZone("Europe/London"));
    return (String) $dateTime->format("Y-m-d H:i:s");
}



