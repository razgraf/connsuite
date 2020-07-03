<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 01/09/2017
 * Time: 01:16
 */

const CASE_PICTURE_UNCHANGED = 0;
const CASE_PICTURE_CHANGED = 1;
const CASE_PICTURE_DELETED = 2;

include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_BUSINESS_CUSTOM_CARD_EDIT, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$pathToIR = goToBaseTarget(CORE_DO_BUSINESS_CUSTOM_CARD_EDIT, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);include_once($pathToIR);
use \Eventviva\ImageResize;
$conn = CSCore::globalAccess();


if(!$conn) exit(exitWithNegative("Error|Connection"));
$pathToUser = goToRootTarget(CORE_DO_BUSINESS_CUSTOM_CARD_EDIT, SYSTEM_CLASS_USER);include_once($pathToUser);
$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));


if(!isset($_POST['userID'])) exit(exitWithNegative("No userID provided"));
if(!isset($_POST['cardID'])) exit(exitWithNegative("No cardID provided"));
if(!isset($_POST['name'])) exit(exitWithNegative("No name provided"));
if(!isset($_POST['phone'])) exit(exitWithNegative("No phone provided"));
if(!isset($_POST['email'])) exit(exitWithNegative("No email provided"));
if(!isset($_POST['website'])) exit(exitWithNegative("No website provided"));
if(!isset($_POST['description'])) exit(exitWithNegative("No description provided"));

if(!isset($_POST['picture1Changed'])) exit(exitWithNegative("No picture1Changed provided"));
if(!isset($_POST['picture2Changed'])) exit(exitWithNegative("No picture2Changed provided"));


if( !isset($_FILES['picture1']) ||
    !isset($_FILES['picture1']['tmp_name']) ||
    $_FILES['picture1'] == null) $noPicture1 = true;
else $noPicture1 = false;

if( !isset($_FILES['picture2']) ||
    !isset($_FILES['picture2']['tmp_name']) ||
    $_FILES['picture2'] == null) $noPicture2 = true;
else $noPicture2 = false;


$userID = secureInt($_POST['userID']);
$cardID = secureInt( $_POST['cardID']);
$name = secureString($_POST['name']);
$phone = secureString($_POST['phone']);
$email = secureString($_POST['email']);
$website = secureString($_POST['website']);
$description = secureString($_POST['description']);
$picture1Changed = $_POST['picture1Changed'];
$picture2Changed = $_POST['picture2Changed'];
$m =  millitime();

if($user->getID() != $userID) exit(exitWithNegative("Nope."));


$extraLog = "";


$SQL = "UPDATE business_custom 
        SET name = '".$name."',
        email = '".$email."',
        phone = '".$phone."',
        website = '".$website."',
        description = '".$description."'
        WHERE ID = '".$cardID."' AND userID = '".$userID."'";
$result = $conn->query($SQL);
if($result) {


        $SQL_VERIFY_PICTURES = "SELECT picture1,picture2 FROM business_custom  WHERE ID = '".$cardID."' ";
        $verification = $conn->query($SQL_VERIFY_PICTURES);

        if($verification) $verification = $verification->fetch_assoc();
        $isPicture1AlreadyThere = ($verification && $verification['picture1'] && $verification['picture1'] !=null && count($verification['picture1']) > 0) ? $verification['picture1'] : false;
        $isPicture2AlreadyThere = ($verification && $verification['picture2'] && $verification['picture2'] !=null && count($verification['picture2']) > 0) ? $verification['picture2'] : false;

        $depthPath = "";
        for($p = 0; $p< $depthToRoot[CORE_DO_BUSINESS_CUSTOM_CARD_EDIT]; $p++) $depthPath.="../";


    /**
     * HANDLE PICTURE1 BEGINNING ----------------------------------------------------------
     */

       if($noPicture1 && $isPicture1AlreadyThere && $picture1Changed == CASE_PICTURE_DELETED){
           unlink($depthPath."data/custom_bc/".$isPicture1AlreadyThere);
           $extraLog.="Picture1 has been deleted but not replaced.\n";
           $SQL_DELETE = "UPDATE business_custom SET picture1 = '' WHERE ID = '".$cardID."'";
           $conn->query($SQL_DELETE);


       }
       else if(!$noPicture1 && $picture1Changed == CASE_PICTURE_CHANGED){

           /**
            * Picture1 has been replaced
            */

           unlink($depthPath ."data/custom_bc/". $isPicture1AlreadyThere); //delete the old one
           $picture1Path = $depthPath ."data/custom_bc/". $userID . "-" . $m . "-1.png"; //create name for new one

           list($originalWidth, $originalHeight) = getimagesize($_FILES['picture1']['tmp_name']); //get dimensions for new one
           if (move_uploaded_file( $_FILES['picture1']['tmp_name'], $picture1Path)) { //upload temporary one -> not re-sized yet

               $extraLog.="Picture1 has been replaced in folder(no resize yet). \n";

               $dimen = getNewDimensions($originalWidth, $originalHeight, 600);
               $newWidth = $dimen[0];
               $newHeight = $dimen[1];

               $resizer = new ImageResize($picture1Path);
               $path = $picture1Path;
               $resizer->resize($newWidth, $newHeight);
               $resizer->save($path);

               //new one re-sized and saved

               $SQL_UPDATE = "UPDATE business_custom SET picture1 = '".$userID."-".$m."-1.png' WHERE ID = '".$cardID."'";
               if( $conn->query($SQL_UPDATE) ) {
                   $extraLog.="Picture1 has been replaced in DB too (re-sized). \n";
               }
               else exit(exitWithSomething(kCSResponseReload, "Success | Picture 1 not changed, database error!"));
           }
           else $extraLog.="Picture1 has replaced but the upload did not work.\n";
       }
       else $extraLog.="Picture1 did not suffer any changes.\n";


    /**
     * HANDLE PICTURE1 END ----------------------------------------------------------
     */


    /**
     * HANDLE PICTURE2 BEGINNING ----------------------------------------------------------
     */

    if($noPicture2 && $isPicture2AlreadyThere && $picture2Changed == CASE_PICTURE_DELETED){
        unlink($depthPath."data/custom_bc/".$isPicture2AlreadyThere);
        $extraLog.="Picture2 has been deleted but not replaced.\n";
        $SQL_DELETE = "UPDATE business_custom SET picture2 = '' WHERE ID = '".$cardID."'";
        $conn->query($SQL_DELETE);
    }
    else if(!$noPicture2 && $picture2Changed == CASE_PICTURE_CHANGED){

        /**
         * Picture2 has been replaced
         */

        unlink($depthPath ."data/custom_bc/". $isPicture2AlreadyThere); //delete the old one
        $picture2Path = $depthPath ."data/custom_bc/". $userID . "-" . $m . "-2.png"; //create name for new one

        list($originalWidth, $originalHeight) = getimagesize($_FILES['picture2']['tmp_name']); //get dimensions for new one
        if (move_uploaded_file( $_FILES['picture2']['tmp_name'], $picture2Path)) { //upload temporary one -> not re-sized yet

            $extraLog.="Picture2 has been replaced in folder(no resize yet). \n";


            $dimen = getNewDimensions($originalWidth, $originalHeight, 600);
            $newWidth = $dimen[0];
            $newHeight = $dimen[1];

            $resizer = new ImageResize($picture2Path);
            $path = $picture2Path;
            $resizer->resize($newWidth, $newHeight);
            $resizer->save($path);

            //new one re-sized and saved

            $SQL_UPDATE = "UPDATE business_custom SET picture2 = '".$userID."-".$m."-2.png' WHERE ID = '".$cardID."'";
            if( $conn->query($SQL_UPDATE) ) {
                $extraLog.="Picture2 has been replaced in DB too (re-sized). \n";
            }
            else exit(exitWithSomething(kCSResponseReload, "Success | Picture 2 not changed, database error!"));
        }
        else $extraLog.="Picture2 has replaced but the upload did not work.\n";
    }

    else $extraLog.="Picture2 did not suffer any changes.\n";

    /**
     * HANDLE PICTURE2 END ----------------------------------------------------------
     */

    // STEP 1. ORDER PICTURES IN DB PLACE

    $SQL_VERIFY_PICTURES = "SELECT picture1,picture2 FROM business_custom WHERE ID = '".$cardID."' ";
    $verification = $conn->query($SQL_VERIFY_PICTURES);

    if($verification) {
        $verification = $verification->fetch_assoc();
        if( ($verification['picture2'] != null && count($verification['picture2']) > 0 ) &&
            ($verification['picture1'] == null || count($verification['picture1']) == 0 ) ){
           // $extraLog.=$verification['picture2'].="\n".=$verification['picture1'].="\n";

            $SQL_VERIFY_PICTURES_UPDATE = "UPDATE business_custom SET picture1 = '".$verification['picture2']."', picture2 = '' WHERE ID = '".$cardID."' ";
            $conn->query($SQL_VERIFY_PICTURES_UPDATE);

        }

    }


    if($picture2Changed !== CASE_PICTURE_UNCHANGED || $picture1Changed !== CASE_PICTURE_UNCHANGED )     exit(exitWithSomething(kCSResponseReload, "Success\n".$extraLog));
    exit(exitWithSomething(kCSResponseOk, "Success\n".$extraLog));
}
exit(exitWithNegative("Error on update"));

?>