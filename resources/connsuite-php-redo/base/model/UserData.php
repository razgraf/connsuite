<?php
/**
 * Create by @VanSoftware
 * Date: 08/08/2018
 * Time: 19:40
 */


include_once(__DIR__ . "/../foundation/alphabet.php");
include_once(__DIR__ . "/../foundation/PDOParser.php");


class UserData{

    protected $ID;
    protected $AID;
    protected $username;
    protected $firstName;
    protected $lastName;
    protected $name;
    protected $instantiated;
    protected $version;

    public function __construct($data){


        $this->ID = (isDataInObjectSet(USER_KEY_ID, $data, DATA_TYPE_USER_ID)) ? (int) $data[USER_KEY_ID] : null;
        $this->AID = (isDataInObjectSet(USER_KEY_AID, $data, DATA_TYPE_STRING)) ? $data[USER_KEY_AID] : null;

        $this->username = (isDataInObjectSet(USER_KEY_USERNAME, $data, DATA_TYPE_STRING)) ? $data[USER_KEY_USERNAME] : null;
        $this->firstName = (isDataInObjectSet(USER_KEY_FIRSTNAME, $data, DATA_TYPE_STRING)) ? $data[USER_KEY_FIRSTNAME] : null;
        $this->lastName = (isDataInObjectSet(USER_KEY_LASTNAME, $data, DATA_TYPE_STRING)) ? $data[USER_KEY_LASTNAME] : null;


        $this->version = (isDataInObjectSet(USER_KEY_VERSION, $data, DATA_TYPE_NUMERIC)) ? $data[USER_KEY_VERSION] : null;
        $this->instantiated = (isDataInObjectSet(USER_KEY_INSTANTIATED, $data, DATA_TYPE_STRING)) ? $data[USER_KEY_INSTANTIATED] : null;


        $this->name = $this->getParsedName();

    }



    public function printData(){
        $p = "<br>DATA:<br>-------<br>";
        $p .="ID: ". ($this->getID() ? $this->getID() : "-") . "<br>";
        $p .="AID: ". ($this->getAID() ? $this->getAID() : "-") . "<br>";
        $p .="username: ". ($this->getUsername() ? $this->getUsername() : "-") . "<br>";
        $p .="firstName: ". ($this->getFirstName() ? $this->getFirstName() : "-") . "<br>";
        $p .="lastName: ". ($this->getLastName() ? $this->getLastName() : "-") . "<br>";

        $p .="instantiated: ". ($this->getInstantiated() ? $this->getInstantiated() : "-") . "<br>";


        return $p;
    }




    private function getParsedName(){
        return $this->firstName !== null ?
            ($this->lastName!== null ?
                $this->firstName . " " . $this->lastName :
                "") :
            ($this->lastName !== null ?
                $this->lastName:
                "");
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
     * @return UserData
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
     * @param mixed $AID
     * @return UserData
     */
    public function setAID($AID)
    {
        $this->AID = $AID;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAID()
    {
        return $this->AID;
    }

    /**
     * @param mixed $instantiated
     * @return UserData
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
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $username
     * @return UserData
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @param mixed $lastName
     * @return UserData
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @param mixed $firstName
     * @return UserData
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
        return $this;
    }

    /**
     * @return null|string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param null|string $name
     * @return UserData
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @param null $version
     * @return UserData
     */
    public function setVersion($version)
    {
        $this->version = (int) $version;
        return $this;
    }

    /**
     * @return null
     */
    public function getVersion()
    {
        return $this->version;
    }


}