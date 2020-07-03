<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 11-Feb-17
 * Time: 4:21 PM
 */

include_once("../base/config.php");
include_once("../base/user.php");

$pathToLibs = goToBaseTarget(SYSTEM_PAGE_LOG_IN_KEY, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$pathToWelcome = goToRootTarget(SYSTEM_PAGE_LOG_IN_KEY, PAGE_WELCOME_KEY);
$pathToDashboard = goToRootTarget(SYSTEM_PAGE_LOG_IN_KEY, PAGE_DASHBOARD_KEY);



startSecureSession();




$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));



$error = 'isset2'.$_POST['email'].$_POST['password'];
if (isset($_POST['email']) && isset($_POST['password'])) {
    /**
     * Test if the entered data is valid.
     */
    if (empty($_POST['email']) || empty($_POST['password'])) {
        $error = "Username or Password are not set.";
    } else {
        $email = secureString($_POST['email']);


        if (!preg_match('/(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i',
            $email))exitWithNegative("Incorrect Email.");




        /**
         * Test if for the entered data, there is a username set.
         */
        $SQL_GET_ID = "SELECT ID FROM user WHERE email = '".$email."' LIMIT 1";
        $ID = $conn->query($SQL_GET_ID); if($ID->num_rows<=0){
            exit(exitWithNegative("ID was not found."));
        }

        /**
         * Get the full description of the user
         */
        $ID = $ID->fetch_assoc()['ID'];
        $password = md5($ID .secureString($_POST['password']));

        $SQL = "SELECT * FROM user WHERE password='" . $password . "' AND ID='" . $ID . "' LIMIT 1";
        $results = $conn->query($SQL);

        if ($results->num_rows > 0) {
            $row = $results->fetch_assoc();
            $user = new User();
            $user->set(
                $row['ID'],
                $row['username'],
                $row['name'],
                $row['firstname'],
                $row['lastname'],
                $row['email'],
                $row['phone'],
                $row['instantiated'],
                $row['version'],
                0,
                null,
                null,
                $row['visible']
                );

            if(!$user->isVisible()){
                exit(exitWithSomething(kCSResponseVisible,"Invisible/banned".$user->visible));
            }



            /**
             * GET ALIAS List
             */

            $SQL_ALIAS = "SELECT username, -1 as 'uaID'
                 FROM user u
                 WHERE u.ID = '".$row['ID']."'
                 UNION
                 SELECT ua.username, ua.ID as 'uaID'
                 FROM user_alias ua
                 WHERE ua.userID = '".$row['ID']."'
                 ";
            $results_alias = $conn->query($SQL_ALIAS);
            $aliases = array();
            if($results_alias && $results_alias->num_rows > 0){
                while($row_alias = $results_alias->fetch_assoc())
                    array_push($aliases,array("username"=>$row_alias['username'], "ID"=>$row_alias['uaID']));
                $user->setAlias($aliases);
            }



            /**
             * GET STAR
             */

            $SQL_STAR = "SELECT * FROM star WHERE userID = '".$row['ID']."' LIMIT 1";
            $results_star = $conn->query($SQL_STAR);
            if($results_star!=null && $results_star->num_rows > 0)
                $user->setStar($results_star->fetch_assoc());


            /**
             * GET TUTORIAL STEP ID
             */

            $SQL_STEP = "SELECT ID, stepID FROM tutorial WHERE userID = '".$user->getID()."' ORDER BY instantiated DESC LIMIT 1 ";
            $result_step = $conn->query($SQL_STEP);
            if($result_step != null && $result_step->num_rows > 0){
                $user->setStepID( (int)(($result_step->fetch_assoc())['stepID']) + 1 );
            }
            else $user->setStepID(0);


            /**
             * HANDLE TOKEN
             */

            $tokenDevice = session_id();
            $tokenValue = md5($tokenDevice.$row['ID']);

            /**
             * DELETE OLD TOKENS WITH SAME SESSION_ID
             */
            $SQL_OLD_TOKENS = " DELETE FROM token WHERE  device = '". $tokenDevice ."' AND userID ='" . $row['ID'] . "'";
            $results_old = $conn->query($SQL_OLD_TOKENS);

            /**
             * INSERT NEW TOKEN
             */
            $SQL = " INSERT INTO token SET value='" . $tokenValue . "' , device = '". $tokenDevice ."', userID ='" . $row['ID'] . "'";
            $results = $conn->query($SQL);


            if ($results) { //the INSERT was successful
                $user->setTokenObjectFromArray(array("ID"=>$conn->insert_id,"value"=>$tokenValue,"device"=>$tokenDevice));
                $_SESSION['user'] = json_encode($user);

                //SESSION IS NOW SET

                try{
                    addConnLog(LOG_TYPE_USER_SIGN_IN,$row['ID'],null,null);
                }catch (Exception $e){}


                exit (json_encode(array(
                    "response"=>kCSResponseOk,
                    "result"=>"We did it!"
                )));
            }
            else exit(exitWithNegative("Token was not inserted."));
        } else {
            /**
             * User does not exist or the data entered is wrong
             */
            exit(exitWithNegative("Username or Password are invalid."));
        }
    }
}else exit(json_encode(array(
    "response"=>kCSResponseNegative,
    "result" => $error
)));


exit(json_encode(array(
    "response"=>kCSResponseNegative,
    "result" => "nope"
)));


?>