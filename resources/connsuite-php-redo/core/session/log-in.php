<?php
/**
 * Create by @VanSoftware
 * Date: 28/05/2018
 * Time: 14:25
 */

include_once("../../base/config.php");


$conn = $E -> initConnection(URL_SESSION_LOG_IN,CONNECTION_TYPE_GLOBAL);

if(!isDataSet($_POST['email'],DATA_TYPE_STRING)) exit(exitWithNegativeData("Email missing."));
if(!isDataSet($_POST['password'],DATA_TYPE_STRING)) exit(exitWithNegativeData("Password missing."));


$email = secure($_POST['email'],DATA_TYPE_STRING);
$password = secure($_POST['password'],DATA_TYPE_STRING);



/**
 * RETRIEVE PASSWORD FROM DB BASED ON EMAIL
 */


$SQL = $conn->prepare("SELECT u.*, ud.email FROM user_data ud INNER JOIN user u ON u.ID = ud.userID WHERE ud.email=?");
$SQL->bindValue(1, $email, PDO::PARAM_STR);
try {
    $SQL->execute();
    $result = $SQL->fetchAll(PDO::FETCH_ASSOC);

    if($result && count($result) == 1){
        $result = $result[0];
        $hash = $result['password'];
        if(User::verifyPassword($password,$hash)){
            /**
             * CREDENTIALS MATCH -> STORE USER
             */
            unset($result["password"]);

            $user = new User();
            $user->setUser($result)
                 ->addToken($conn);


            /**
             * IF NO EXCEPTION IS THROWN, WE CAN SAVE THE NEW AUTH COOKIE
             */

            if(null == $user->saveAuthCookie()) exit(exitWithNegativeDebug("Cannot Save user."));

            /**
             * ONCE AUTH COOKIE IS SAVED, WE CAN RETRIEVE THE USER BASED ON INFO FROM AUTH COOKIE
             * ! --- !
             * ! Don't rely on the cookie for the download of the user. Cookies are accessible at php reload.
             * ! So, the system won't be able to see the cookie. Solution : download the user with the ID, not the cookie for now.
             * ! --- !
             */

            if(null == $user->getDatabaseUser($conn,false,array(CLASS_USER_KEY_ID => $user->getID() ))) exit(exitWithNegativeDebug("Cannot retrieve user."));

            /**
             * ONCE THE USER IS SUCCESSFULLY RETRIEVED (0 ISSUES) WE CAN SAVE IT TO SESSION
             */

            $user->saveSessionUser();


            exit(exitWithOK("Done"));
        }
    }

} catch(Exception $ex) {
    exit(exitWithNegativeData("Error:".$ex));
}


exit(exitWithNegative("Wrong details"));




