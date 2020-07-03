<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 01/09/2017
 * Time: 01:16
 */



include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_BUSINESS_CUSTOM_CARD_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$pathToIR = goToBaseTarget(CORE_DO_BUSINESS_CUSTOM_CARD_ADD, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);include_once($pathToIR);
use \Eventviva\ImageResize;

$conn = CSCore::globalAccess();

if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_BUSINESS_CUSTOM_CARD_ADD, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_POST['userID'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['name'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['phone'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['email'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['website'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['description'])) exit(exitWithNegative("Data missing"));


if( !isset($_FILES['picture1']) ||
    !isset($_FILES['picture1']['tmp_name']) ||
    $_FILES['picture1'] == null) $noPicture1 = true;
else $noPicture1 = false;


if( !isset($_FILES['picture2']) ||
    !isset($_FILES['picture2']['tmp_name']) ||
    $_FILES['picture2'] == null) $noPicture2 = true;
else $noPicture2 = false;



$userID =secureInt( $_POST['userID']);
$name = secureString($_POST['name']);
$phone = secureString($_POST['phone']);
$email = secureString($_POST['email']);
$website = secureString($_POST['website']);
$description = secureString($_POST['description']);

$m =  millitime();

if($user->getID() != $userID) exit(exitWithNegative("Nope."));

/**
 * Check Count First
 */

$max = PRIVILEGE[PRIVILEGE_POSITION_USER]['MAX_CUSTOM_BUSINESS_CARD_NUMBER'];
if($user->star->isStar) $max = PRIVILEGE[$user->star->accountType]['MAX_CUSTOM_BUSINESS_CARD_NUMBER'];


$SQL_COUNT = "SELECT COUNT(ID) as 'count' FROM business_custom WHERE userID = '".$userID."'";
$count = (($conn->query($SQL_COUNT))->fetch_assoc())['count'];
if($count >= $max) exit(exitWithNegative("This user already has MAX cards."));

$SQL = "INSERT INTO business_custom
        SET
        userID = '".$userID."',
        name = '".$name."',
        email = '".$email."',
        phone = '".$phone."',
        website = '".$website."',
        description = '".$description."'";
$result = $conn->query($SQL);

if($result) {

    $ID = $conn->insert_id;

    if($user->getStepID() === TUTORIAL_STEP_BUSINESS_BOOK ) setSessionTutorialStickyPassed();


    $depthPath = "";
    for($p = 0; $p< $depthToRoot[CORE_DO_BUSINESS_CUSTOM_CARD_ADD]; $p++) $depthPath.="../";

    $picture1Path = $depthPath."data/custom_bc/".$userID."-".$m."-1.png";
    $picture2Path = $depthPath."data/custom_bc/".$userID."-".$m."-2.png";


    if($noPicture1)  exit(exitWithSomething(kCSResponseOk,"Success|no pictures")); //no pictures, upload without

    list($originalWidth, $originalHeight) = getimagesize($_FILES['picture1']['tmp_name']);
    if (move_uploaded_file( $_FILES['picture1']['tmp_name'], $picture1Path)) {


        $dimen = getNewDimensions($originalWidth,$originalHeight,600);
        $newWidth = $dimen[0];
        $newHeight = $dimen[1];

        $resizer = new ImageResize($picture1Path);
        $path = $picture1Path;
        $resizer->resize($newWidth, $newHeight);
        $resizer->save($path);



        $SQL_UPDATE = "UPDATE business_custom SET picture1 = '".$userID."-".$m."-1.png' WHERE ID = '".$ID."'";
        if( $conn->query($SQL_UPDATE) ) {




            /**
             * Picture 1 was uploaded. Check for picture 2 and do the same
             */



            if($noPicture2)     exit(exitWithSomething(kCSResponseReload,"Success|no picture 2")); //no pictures, upload without

            list($originalWidth, $originalHeight) = getimagesize($_FILES['picture2']['tmp_name']);
            if (move_uploaded_file( $_FILES['picture2']['tmp_name'], $picture2Path)) {


                $dimen = getNewDimensions($originalWidth,$originalHeight,1000);
                $newWidth = $dimen[0];
                $newHeight = $dimen[1];

                $resizer = new ImageResize($picture2Path);
                $path = $picture2Path;
                $resizer->resize($newWidth, $newHeight);
                $resizer->save($path);



                $SQL_UPDATE2 = "UPDATE business_custom SET picture2 = '".$userID."-".$m."-2.png' WHERE ID = '".$ID."'";
                if( $conn->query($SQL_UPDATE2) ) {

                    exit(exitWithSomething(kCSResponseReload,"Success|Pictures uploaded"));

                }


            }





        }


    }


    exit(exitWithSomething(kCSResponseOk,"Success"));






}

exit(exitWithNegative("Error on insert"));

?>