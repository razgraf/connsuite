<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 11-Feb-17
 * Time: 3:03 PM
 */

function extractSession2($key){

};
function extractSession($key){
    /**
     * include_once("../base/config.php") in the HTML FILE
     * include_once("../base/user.php")
     */
    $tokenFound = false; //this will make sure if we find tokens, but none of those match our session, we log out everything at the end of the check.

    $pathToIndex = goToRootTarget($key, PAGE_WELCOME_KEY);
    $pathToLogOut = goToRootTarget($key, SYSTEM_PAGE_LOG_OUT_KEY);
    $pathToLibs = goToBaseTarget($key, 'libs/connsuite-core.php'); include($pathToLibs);


    $conn = CSCore::credentialAccess();
    startSecureSession();

    try {

        if (!isset($_SESSION['user']) || $_SESSION['user'] == null) {
            header("Location: " . $pathToLogOut);
        }
        $user = (new User())->mapUser($_SESSION['user']);

        if ($user == null || !$user->getTokenObject() || !$user->getID()) {
            header("Location: " . $pathToLogOut);
        }
        /** First check if there is any SESSION userID inserted */

    }catch(Exception $e){
        header("Location: " . $pathToLogOut);
    }



    $SQL = "SELECT value FROM token WHERE userID='" . $user->getID() . "' AND device = '".$user->getTokenDevice()."'";
    $results = $conn -> query($SQL);

    $tokenCount = $results->num_rows;
     if($results -> num_rows > 0){
        while(($row = $results -> fetch_assoc()) && $tokenFound == false) if($row['value'] == $user->getTokenValue()) {
              /**
               * TOKEN FOUND. Everything is fine. Refresh the session data so everything is up to date
               */
                $tokenFound = true;
                $SQL_USER = "SELECT * FROM user WHERE ID = '".$user->getID()."' AND username = '".$user->getUsername()."' LIMIT 1";
                $results = $conn->query($SQL_USER);

                if ($results->num_rows > 0) {
                    $row = $results->fetch_assoc();
                    $userRefresh = new User();
                    $userRefresh->set(
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
                        $user->getTokenObject(),
                        null,
                        $row['visible']
                    );

                    if(!$userRefresh->isVisible()) header("Location: ".$pathToLogOut);
                    $userRefresh->setAlias($user->alias);

                    /**
                     * Get star
                     */

                    $SQL_STAR = "SELECT * FROM star WHERE userID = '".$row['ID']."' LIMIT 1";
                    $results_star = $conn->query($SQL_STAR);
                    if($results_star && $results_star->num_rows > 0){
                        $userRefresh->setStar($results_star->fetch_assoc());
                    }

                    /**
                     * GET TUTORIAL STEP ID
                     */

                    $SQL_STEP = "SELECT ID, stepID FROM tutorial WHERE userID = '".$userRefresh->getID()."' ORDER BY stepID DESC LIMIT 1 ";
                    $result_step = $conn->query($SQL_STEP);
                    if($result_step != null && $result_step->num_rows > 0){
                        $userRefresh->setStepID( (int)(($result_step->fetch_assoc())['stepID']) + 1 );
                    }
                    else $user->setStepID(0);



                    $SQL_NOTIF = "SELECT COUNT(ID) AS 'count' FROM notification WHERE userID= '".$userRefresh->getID()."' AND seen = '0'";
                    $notification_result = $conn->query($SQL_NOTIF);
                    if($notification_result) {
                        $userRefresh->setNotificationCount(($notification_result->fetch_assoc())['count']);
                    }
                    $_SESSION['user'] = json_encode($userRefresh);

                }
                else header('Location: '.$pathToLogOut);

        }
    }
    else{
       header('Location: '.$pathToLogOut);
        /**
         * If there is nothing coming back from the server, there must be an error
         * Go to Index
         */
    }



    if(!$tokenFound){

        if($tokenCount > 1){
            $conn->query("DELETE FROM token WHERE userID = '".$user->getID()."' AND device = '" .$user->getTokenDevice(). "'");

        }

        header("Location: ".$pathToLogOut);
    }

/**
 * If everything is fine, resume with your work.
 * Do not make changes to the environment in this case
 */
}


?>