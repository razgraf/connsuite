<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 13/08/2017
 * Time: 12:15
 */

class User {

     public $ID;
     public $username;
     public $name;
     public $firstname;
     public $lastname;
     public $email;
     public $facebookID;
     private $linkedID;
     public $phone;
     public $instantiated;
     public $token;
     public $version;
     public $imageURL;
     public $thumbnailURL;
     public $notificationCount;


     public $star;
     public $alias;

     public $visible;


     public $stepID;

    /**
     * @param $ID
     * @param $username
     * @param $name
     * @param $firstname
     * @param $lastname
     * @param $email
     * @param $phone
     * @param $instantiated
     * @param $version
     * @param $notificationCount
     * @param $token
     *
     * SETTERS
     * @param null $star
     * @param $visible
     * @internal param null $alias
     */
     public function set($ID, $username, $name, $firstname, $lastname, $email, $phone, $instantiated,$version, $notificationCount, $token, $star = null, $visible, $stepID = 0){
        $this->token;
        $this->ID = $ID;
        $this->username = $username;
        $this->name = $name;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->phone = $phone;
        $this->instantiated = $instantiated;
        $this->version = $version;
        $this->token = $token;
        $this->notificationCount = $notificationCount;
        $this->facebookID = null;
        $this->visible = $visible;

        $this->imageURL = buildProfileImageURL($this->ID , $this->version);
        $this->thumbnailURL = buildProfileThumbnailURL($this->ID , $this->version);

        $this->star = new Star(); if($star){ $this->star->set($star);

        $this->stepID = $stepID;



        }
     }

     function updateInSession(){
         $_SESSION['user'] = json_encode($this);
     }

    function setID($ID){ $this->ID = $ID; }

    function setFacebookID($ID){ $this->facebookID = $ID; }
    function setLinkedID($ID){ $this->linkedID = $ID; }

    function setUsername($username){ $this->username = $username; }

    function setName($name){ $this->name = $name; }

    function setFirstname($firstname){ $this->firstname = $firstname; }

    function setLastname($lastname){ $this->lastname = $lastname; }

    function setEmail($email){ $this->email = $email; }

    function setPhone($phone){ $this->phone = $phone; }

    function setInstantiated($instantiated){ $this->instantiated = $instantiated; }

    function setVersion($version){ $this->version = $version; }

    function setVisible($visible){ $this->visible = $visible; }

    function setTokenObjectFromJson($json){
        $jsonToken = (array) $json; //We tell the $jsonToken that it will receive an ARRAY from the value of $json['token'].
        $this->token = new Token();
        $this->token->set(
            $jsonToken['ID'],
            $jsonToken['value'],
            $jsonToken['device']
        );
    }

    function setTokenObjectFromArray($array){

        $this->token = new Token();

        $this->token->set(
            $array['ID'],
            $array['value'],
            $array['device']
        );

    }

    function setNotificationCount($notificationCount){ $this->notificationCount = $notificationCount;}


    function setImageURL(){ $this->imageURL = buildProfileImageURL($this->ID , $this->version);}

    function setThumbnailURL(){   $this->thumbnailURL = buildProfileThumbnailURL($this->ID , $this->version);}

    function setStar($star){
        $this->star = new Star();
        $star = (array) $star;
        if($star && is_array($star))
            $this->star->set($star);
    }

    function setAlias($aliases = array()) {
        if(!$aliases || !is_array($aliases) || count($aliases) == 0) return;
        $this->alias = array();
        for($i=0; $i<count($aliases); $i++){
            $alias = new Alias();
            $alias->set($aliases[$i]);
            array_push($this->alias, $alias);
        }
    }

    function setStepID($stepID){ $this->stepID = $stepID; }

    /**
     * GETTERS
     */

    function getID(){ if($this->ID) return $this->ID; else return null;}
    function getToken(){ if($this->token->value) return $this->token->value; else return null;}
    function getTokenValue(){if($this->token->value) return $this->token->value;else return null;}
    function getTokenDevice(){if($this->token->device) return $this->token->device;else return null;}
    function getTokenObject(){if($this->token) return $this->token;else return null;}
    function getUsername(){if($this->username)  return $this->username; else return null;}
    function getName(){ return $this->name;}
    function getFirstname(){ return $this->firstname;}
    function getLastname(){ return $this->lastname;}
    function getEmail(){ return $this->email;}
    function getPhone(){ return $this->phone;}
    function getInstantiated(){ return $this->instantiated;}
    function getVersion(){ return $this->version;}
    function getNotificationCount(){return $this->notificationCount;}
    function getFacebookID() {return $this->facebookID;}
    function getLinkedID() {return $this->linkedID;}
    function getImageURL() {return $this->imageURL; }
    function getThumbnailURL() {return $this->thumbnailURL; }
    function getStarObject(){ return $this->star; }
    function getAliasList(){ return $this->alias; }
    function getVisible(){return $this->visible;}
    function getStepID(){return $this->stepID && is_int( (int)$this->stepID)? $this->stepID : 0;}

    function isVisible(){
        try{
            if($this!=null && $this->visible != null && (((int) $this->getVisible()) == 1) || $this->getVisible() == "1") return true;
            else return false;
        }
        catch(Exception $e) { return false; }

    }


    /**
     * @param $json
     * @return User
     * This will re-map to the user class once we retrieve the user-json from the SESSION
     */
    function mapUser($json){
        if($json == null) return null;
        $json = (array) json_decode($json); //We decode the string. It will be read as a JSON now.

        $user = new User();
        if(array_key_exists("ID",$json)) $user->setID($json['ID']);
        if(array_key_exists("facebookID",$json)) $user->setFacebookID($json['facebookID']);
        if(array_key_exists("linkedID",$json)) $user->setLinkedID($json['linkedID']);
        if(array_key_exists("username",$json)) $user->setUsername($json['username']);
        if(array_key_exists("name",$json)) $user->setName($json['name']);
        if(array_key_exists("firstname",$json))  $user->setFirstname($json['firstname']);
        if(array_key_exists("lastname",$json)) $user->setLastname($json['lastname']);
        if(array_key_exists("email",$json)) $user->setEmail($json['email']);
        if(array_key_exists("phone",$json)) $user->setPhone($json['phone']);
        if(array_key_exists("instantiated",$json)) $user->setInstantiated($json['instantiated']);
        if(array_key_exists("version",$json)) $user->setVersion($json['version']);
        if(array_key_exists("visible",$json)) $user->setVisible($json['visible']);
        if(array_key_exists("notificationCount",$json)) $user->setNotificationCount($json['notificationCount']);
        if(array_key_exists("ID",$json) && array_key_exists("version",$json)) { $user->setImageURL(); $user->setThumbnailURL(); }
        if(array_key_exists("star",$json)) $user->setStar($json['star']);
        if(array_key_exists("alias",$json)) $user->setAlias($json['alias']);
        if(array_key_exists("token",$json)) $user->setTokenObjectFromJson($json['token']);
        if(array_key_exists("stepID",$json)) $user->setStepID($json['stepID']);

        return $user;
    }


    function setSessionProviderID($providerID){
        /**
         * ID for a username who is already registered with email in DB and is trying to connect with another provider to the same account
         */
        if(session_status() == PHP_SESSION_NONE) startSecureSession();
        $_SESSION['CONNSESSIONProviderID'] = $providerID;

    }
    function getSessionProviderID(){
        if(session_status() == PHP_SESSION_NONE)  return null;
        try{

            if(isset($_SESSION['CONNSESSIONProviderID'])) return secureInt($_SESSION['CONNSESSIONProviderID']);

        }catch (Exception $e){}
        return null;
    }


    function isSessionWithServerValid(){
        try{
            if(!isset($_SERVER['HTTP_TOKEN'])) return false;
            if(!isset($_SERVER['HTTP_USER'])) return false;

            $value = $_SERVER['HTTP_TOKEN'];
            $userID = $_SERVER['HTTP_USER'];

            if($this->getID() != $userID) return false;
            if($this->getToken() != $value) return false;
            return true;
        }
        catch(Exception $e){return false;}

    }

}


class Token{
    public $ID;
    public $value;
    public $device;
    public $instantiated;


    function getID(){return $this->ID;}
    function getValue(){return $this->value;}
    function getDevice(){return $this->device;}
    function getInstantiated(){return $this->instantiated;}

    function set($ID,$value,$device){
        $this->ID = $ID;
        $this->value = $value;
        $this->device = $device;
    }



}


function buildProfileImageURL($userID , $version){
    return ($version=="0" || $version == 0) ? ROOT."image/no_people_o.png" : ROOT."data/user/profile/".$userID.'-'.$version.PROFILE_PICTURE_TYPE;
}
function buildProfileThumbnailURL($userID , $version){
    return ($version=="0" || $version == 0) ? ROOT."image/no_people_o.png" : ROOT."data/user/thumbnail/".$userID.'-'.$version.PROFILE_PICTURE_TYPE;
}




class Star{
    public $isStar = false;
    public $ID = null;
    public $userID = null;
    public $accountType = null;
    public $termination = null;
    public $instantiated = null;

    function isStar(){
        $this->isStar = false;
        if($this->getID() && $this->getAccountType() && $this->getTermination() && !$this->isStarExpired()) $this->isStar = true;
        return $this->isStar;
    }
    function getID(){return $this->ID;}
    function getUserID(){return $this->userID;}
    function getAccountType(){return $this->accountType;}
    function getTermination(){return $this->termination;}
    function getInstantiated(){return $this->instantiated;}

    function isStarExpired(){
        return (time() > strtotime($this->termination));
    }


    function set($response){
        if(!$response || !is_array($response) || count($response) == 0) return;
        try{
        $this->ID = array_key_exists("ID",$response) ? $response['ID'] : null;
        $this->userID = array_key_exists("userID",$response)? $response['userID'] : null;
        $this->accountType = array_key_exists("accountType",$response)? $response['accountType'] : null;
        $this->termination = array_key_exists("termination",$response)? $response['termination'] : null;
        $this->instantiated = array_key_exists("instantiated",$response)? $response['instantiated'] : null;

        if($this->getID() &&
            $this->getAccountType() &&
            $this->getTermination() &&
            !$this->isStarExpired())
            $this->isStar = true;
        }
        catch (Exception $e){  }
    }

}



class Alias{
    public $ID;
    public $username;


    function getID(){return $this->ID;}
    function getUsername(){return $this->username;}

    function set($response){
        $response = (array) $response;
        if(!$response || !is_array($response) || count($response) == 0) return;
        try{
            $this->ID = array_key_exists("ID",$response) ? $response['ID'] : null;
            $this->username = array_key_exists("username",$response)? $response['username'] : null;
        }
        catch (Exception $e){  }
    }

}


?>