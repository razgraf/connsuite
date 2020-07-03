<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 08/02/2018
 * Time: 20:22
 */

include_once("../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_TUTORIAL_STEP_UP, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::globalAccess();
if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_TUTORIAL_STEP_UP, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_POST['stepID'])) exit(exitWithNegative("Data is missing"));
$stepID = secureInt($_POST['stepID']);
$userID = $user->getID();
if($stepID != $user->getStepID()) exit(exitWithNegative("Data not matching."));

/**
 * Check validity of each step
 */



$OK = false;
$response = null;

while(!$OK){
    $OK = true; //suppose we might have multiple steps
    switch ($stepID){
        case TUTORIAL_STEP_WELCOME :
            /**
             * STEP 0 : Default, no check;
             */
            $OK = false; //check again for next steps
            $response = exitWithOk("Step UP");
            break;
        case TUTORIAL_STEP_PROFILE_PICTURE :
            /**
             * STEP 1 : Profile Picture, check version
             */
            $SQL1 = "SELECT version FROM user WHERE ID = '".$userID."' LIMIT 1";
            $result1 = $conn->query($SQL1);
            try{
                if($result1 != null) {
                    $result1 = $result1->fetch_assoc();
                    $version = (int) $result1['version'];
                    if($version === 0){if($response == null) $response = exitWithNegative("Step update will not be done.");}
                    else {
                        $OK = false;
                        $response = exitWithOk("Step UP");
                        //clear the road.
                    }

                }
                else if($response == null) $response = (exitWithNegative("Version Error."));

            }catch (Exception $e){
                exit(exitWithNegative("Connection Error."));
            }
            break;
        case TUTORIAL_STEP_NETWORK :
            /**
             * STEP 2 : 2 New Networks
             */
            $SQL2 = "SELECT COUNT(ID) as 'count' FROM network WHERE userID = '".$userID."' ";
            $result2 = $conn->query($SQL2);
            try{
                if($result2 != null) {
                    $result2 = $result2->fetch_assoc();
                    $count = (int) $result2['count'];
                    if($count < 3) {if($response == null) $response = exitWithNegative("Step update will not be done.");}
                    else {
                        $OK = false;
                        $response = exitWithOk("Step UP");
                        //clear the road.
                    }
                }
                else if($response == null) $response = exitWithNegative("Count Error.");

            }catch (Exception $e){
                if($response == null) $response = exitWithNegative("Connection Error.");
            }
            break;
        case TUTORIAL_STEP_BUSINESS_BOOK :
            /**
             * STEP 3 : 1 Offline Business Card
             */
            $SQL3 = "SELECT COUNT(ID) as 'count' FROM business_custom WHERE userID = '".$userID."' ";
            $result3 = $conn->query($SQL3);
            try{
                if($result3 != null) {
                    $result3 = $result3->fetch_assoc();
                    $count = (int) $result3['count'];
                    if($count < 1) {if($response == null) $response = exitWithNegative("Step update will not be done.");}
                    else {
                        if(isset($_POST['tutorialAction']) && secureInt($_POST['tutorialAction']) == TUTORIAL_STEP_BUSINESS_BOOK ){
                            $OK = false;
                            setSessionTutorialStickyPassed();
                            $response = exitWithOk("Step UP");
                        }
                    }
                }
                else if($response == null) $response = exitWithNegative("Count Error.");

            }catch (Exception $e){
                if($response == null) $response = exitWithNegative("Connection Error.");
            }
            break;
        case TUTORIAL_STEP_PROFILE_EXAMPLE :
            /**
            * STEP 4 : Visit example profiles
            */
            if(isset($_POST['tutorialAction']) && secureInt($_POST['tutorialAction']) == TUTORIAL_STEP_PROFILE_EXAMPLE ) {
                $OK = false;
                $response = exitWithOk("Step UP");
                setSessionTutorialStickyPassed();
            }
            //clear the road.
            break;
        case TUTORIAL_STEP_ARTICLE :
            /**
             * STEP 5 : 1 Article
             */
            $SQL5= "SELECT COUNT(ID) as 'count' FROM article WHERE userID = '".$userID."' ";
            $result5 = $conn->query($SQL5);
            try{
                if($result5 != null) {
                    $result5 = $result5->fetch_assoc();
                    $count = (int) $result5['count'];
                    if($count < 1) {if($response == null) $response = exitWithNegative("Step update will not be done.");}
                    else {
                        if(isset($_POST['tutorialAction']) && secureInt($_POST['tutorialAction']) == TUTORIAL_STEP_ARTICLE ){
                            $OK = false;
                            $response = exitWithOk("Step UP");
                            setSessionTutorialStickyPassed();
                        }
                    }
                }
                else if($response == null) $response = exitWithNegative("Count Error.");

            }catch (Exception $e){
                if($response == null) $response = exitWithNegative("Connection Error.");
            }
            break;
        case TUTORIAL_STEP_SHARE :
            /**
             * STEP 6 : SHARE
             */
            if(isset($_POST['tutorialAction']) && secureInt($_POST['tutorialAction']) == TUTORIAL_STEP_SHARE ) {
                $OK = false;
                $response = exitWithOk("Step UP");
            }
            break;
        case TUTORIAL_STEP_END :
            /**
             * STEP 7 : END
             */
            if(isset($_POST['tutorialAction']) && secureInt($_POST['tutorialAction']) == TUTORIAL_STEP_END ) {
                $OK = false;
                $response = exitWithOk("Step UP");
            }
            break;
    }

    if($stepID < TUTORIAL_STEP_COUNT && !$OK ) {
        $SQL_STEP_UP = "INSERT INTO tutorial SET userID = '" . $userID . "', stepID = '" . $stepID . "' ";
        $resultUP = $conn->query($SQL_STEP_UP);
        if ($resultUP === null) exit(exitWithNegative("Step could not be done."));
        $stepID++;
    }
}
if($response === null) $response = exitWithNegative("Response missing");
$user->setStepID($stepID+1);
$user->updateInSession();


exit($response);