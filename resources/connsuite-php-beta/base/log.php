<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 07/11/2017
 * Time: 14:56
 */

const LOG_TYPE_DEFAULT = 0;
const LOG_TYPE_PROFILE_VISIT = 1;
const LOG_TYPE_USER_SIGN_IN = 2;
const LOG_TYPE_BADGE_ACCESSED = 3;
const LOG_TYPE_NETWORK_LINK_ACCESSED = 4;
const LOG_TYPE_REFERRER = 5;
const LOG_TYPE_USER_SIGN_UP = 6;



/**
 * @const STRANGER_ID will be the ID of the source/visitor if he/she is an unknown user / not connected to ConnSuite.
 */
const LOG_STRANGER_SOURCE_ID = -5;

//0
class LOG_DEFAULT{

    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;

    /**
     * @var array $body in case we need more details
     */
    public $body;

    public function __construct($ID = null, $body){
        if($ID) $this->ID = $ID;
        if($body) {
            $this->body = new BODY();
            if($body['content']) $this->body->content = $body['content'];
        }
    }

}
//1
class LOG_PROFILE_VISIT{

    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;
    /**
     * @var int $sourceID will store the ID of the user accessing the page.
     */
    public $sourceID;
    /**
     * @var int $targetID will store the ID of the user whose page/profile is being accessed.
     */
    public $targetID;
    /**
     * @var string $instantiated will be the timestamp of the visit.
     * Only visible if downloaded from database, as it will be created at the moment of insertion.
     */
    public $instantiated;

    /**
     * @var BODY $body in case we need more details
     */
    public $body;


    public function __construct($ID=null, $sourceID, $targetID, $instantiated = null, $body = null){
        if($ID) $this->ID = $ID;
        $this->sourceID = $sourceID;
        $this->targetID = $targetID;
        if($instantiated) $this->instantiated = $instantiated;
        if($body) {
            $this->body = new BODY();
            if($body['content']) $this->body->content = $body['content'];
        }
    }
}
//2
class LOG_USER_SIGN_IN{
    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;
    /**
     * @var int $sourceID will store the ID of the person accessing the page.
     */
    public $userID;
    /**
     * @var string $instantiated will be the timestamp of the visit.
     * Only visible if downloaded from database, as it will be created at the moment of insertion.
     */
    public $instantiated;
    /**
     * @var BODY $body in case we need more details.
     */
    public $body;

    public function __construct($ID = null, $userID, $instantiated = null, $body = null){
        if($ID) $this->ID = $ID;
        $this->userID = $userID;
        if($instantiated) $this->instantiated = $instantiated;
        if($body) {
            $this->body = new BODY();
            if($body['content']) $this->body->content = $body['content'];
        }
    }
}
//3
class LOG_TYPE_BADGE_ACCESSED{
    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;
    /**
     * @var int $sourceID will store the ID of the person whose badge is being viewed.
     */
    public $userID;

    /**
     * @var string $instantiated will be the timestamp of the visit.
     * Only visible if downloaded from database, as it will be created at the moment of insertion.
     */
    public $instantiated;
    /**
     * @var BODY $body in case we need more details.
     */
    public $body;

    public function __construct($ID = null, $userID, $instantiated = null, $body = null){
        if($ID) $this->ID = $ID;
        $this->userID = $userID;
        if($instantiated) $this->instantiated = $instantiated;
        if($body) {
            $this->body = new BODY();
            if($body['content']) $this->body->content = $body['content'];
            if($body['networkID']) $this->body->networkID = $body['networkID'];
        }
    }
}
//4
class LOG_NETWORK_LINK_ACCESSED{
    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;
    /**
     * @var int $sourceID will store the ID of the person accessing the network.
     */
    public $sourceID;
    /**
     * @var int $targetID will store the ID of the user whose page/profile is being accessed.
     */
    public $targetID;

    /**
     * @var string $instantiated will be the timestamp of the visit.
     * Only visible if downloaded from database, as it will be created at the moment of insertion.
     */
    public $instantiated;
    /**
     * @var BODY $body in case we need more details.
     */
    public $body;


    public function __construct($ID = null, $userID, $instantiated = null, $body = null){
        if($ID) $this->ID = $ID;
        $this->userID = $userID;
        if($instantiated) $this->instantiated = $instantiated;
        if($body) {
            $this->body = new BODY();
            if($body['content']) $this->body->content = $body['content'];
            if($body['networkID']) $this->body->networkID = $body['networkID'];
        }
    }
}


/**
 * Class LOG_REFERER | the misspelling of referrer is actually OK
 */
//5
class LOG_REFERER{


    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;
    /**
     * @var int $ref will store the location of the referring
     */
    public $ref;
    /**
     * @var string $instantiated will be the timestamp of the visit.
     * Only visible if downloaded from database, as it will be created at the moment of insertion.
     */
    public $instantiated;

    /**
     * @var BODY $body in case we need more details
     */
    public $body;


    public $referer;


    public function __construct($ID=null, $instantiated = null, $body = null){
        if($ID) $this->ID = $ID;
        if($instantiated) $this->instantiated = $instantiated;
        if($body) {
            $this->body = new BODY();
            if($body['HTTP_REFERER']) $this->body->referer = $body['HTTP_REFERER'];

        }
    }
}
//6
class LOG_USER_SIGN_UP{
    /**
     * @var int $ID will store the ID of the log from the DB.
     * Can be null when creating the LOG, but may not be null when downloading from DB.
     */
    public $ID;
    /**
     * @var int $sourceID will store the ID of the person accessing the page.
     */
    public $userID;
    /**
     * @var string $instantiated will be the timestamp of the visit.
     * Only visible if downloaded from database, as it will be created at the moment of insertion.
     */
    public $instantiated;
    /**
     * @var BODY $body in case we need more details.
     */
    public $body;

    public function __construct($ID = null, $userID, $instantiated = null, $body = null){
        if($ID) $this->ID = $ID;
        $this->userID = $userID;
        if($instantiated) $this->instantiated = $instantiated;
        if($body) {
            $this->body = new BODY();
            if($body['content']) $this->body->content = $body['content'];
        }
    }
}

/**
 * @param $type int
 * Will be the type of LOG created.
 *
 * @param null $sourceID
 * Will be the ID of the one because of whom the LOG is created.
 *
 *
 * @param null $targetID
 * Will be the ID of the one targeted by the log, in case of PROFILE VISITS or others.
 *
 *
 * @param $body string - json
 * Will contain all data necessary to build the LOG json body that will:
 * 1. match the structure of its class
 * 2. be uploaded with this structure into the database
 *
 * Will contain items of the right LOG object and an item called CONTENT, as an extra string if necessary.
 * @param null $conn
 */
function addConnLog($type, $sourceID = null, $targetID = null, $body = null,$conn = null){

    $connection = $conn ? $conn : CSCore::credentialAccess();
    if ($connection == null || $type == null) return;
    if(is_array($body)) $body = json_encode($body);


    $SQL = "INSERT INTO log SET ";
    $SQL.= "type = '".$type."' ";
    if($body) $SQL.= ", body = '".$body."'";
    if($sourceID) $SQL.=", sourceID = '".$sourceID."' ";
    if($targetID) $SQL.=", targetID = '".$targetID."' ";

    $connection->query($SQL);
}



/**
 * ------------------------------
 * HELPER STRUCTURE
 * ------------------------------
 */

class BODY {
    /**
     * @var string $content will be the explanation if needed.
     */
    public $content;
    /**
     * @var int $networkID will store the ID of the item accessed (from --network-- table).
     * Used in LOG_NETWORK_LINK_ACCESSED
     */
    public $networkID;
    /**
     * @var string $badgeURL will store the URL of the website making the request.
     * Used in LOG_BADGE_RETRIEVE
     */
    public $badgeURL; //HTTP_REFERER

    /**
     * @var int $ref will store the location of the referring
     * Used in LOG_REFERRAL
     */
    public $ref;



}




?>