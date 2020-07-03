<?php
/**
 * Create by @VanSoftware
 * Date: 25/08/2018
 * Time: 22:43
 */



include_once("../../base/config.php");
$conn = $E -> validateAPIConnection(URL_NETWORK_EDIT, true, true);

include_once($E->goIdentifierToIdentifier(URL_NETWORK_EDIT, SYSTEM_IDENTIFIER_LIBRARY_IMAGE));
use \Eventviva\ImageResize;

$userID = $E->user->getID();
$NOW = getNOW();


$n = array();

/**
 * MANDATORY VALUES
 */

$n[NETWORK_KEY_LINK_AID] = getAPIParam($_POST[NETWORK_KEY_LINK_AID], DATA_TYPE_STRING,"Missing AID.");
$n[NETWORK_KEY_TYPE] = (int) getAPIParam($_POST[NETWORK_KEY_TYPE], DATA_TYPE_NUMERIC,"Missing type.");
$n[NETWORK_KEY_VISIBLE] = (int) getAPIParam($_POST[NETWORK_KEY_VISIBLE], DATA_TYPE_NUMERIC,"Missing visibility.");


/**
 * TODO
 *
 * Check if network exists (in Environment or User)
 *
 * TODO
 */


/**
 * OPTIONAL VALUES
 */

$n[NETWORK_KEY_USERNAME] = getAPIParam($_POST[NETWORK_KEY_USERNAME], DATA_TYPE_STRING,false,true,null,"");
$n[NETWORK_KEY_DESCRIPTION] =  getAPIParam($_POST[NETWORK_KEY_DESCRIPTION], DATA_TYPE_STRING,false,true,null,"");
$n[NETWORK_KEY_LABELS] = json_decode(getAPIParam($_POST[NETWORK_KEY_LABELS], DATA_TYPE_STRING,false, true, null,""),true);


switch($n[NETWORK_KEY_TYPE])    {
    case NETWORK_TYPE_DEFAULT :
        $n[NETWORK_KEY_USERNAME] =  getAPIParam($_POST[NETWORK_KEY_USERNAME], DATA_TYPE_STRING,"Missing username.");



        $add = PDOParser::parseBoolean(
            $conn,
            "INSERT 
                       INTO network_link SET 
                       AID =:AID,
                       userID = :userID,
                       networkID =:networkID,
                       type = ".NETWORK_TYPE_DEFAULT.",
                       username = :username,
                       description = :description,
                       visible = :visible,
                       position = ".NETWORK_DEFAULT_POSITION.",
                       instantiated = :instantiated
                       ",
            array(
                [":AID",$n[NETWORK_KEY_LINK_AID], PDO::PARAM_STR],
                [":userID",$userID, PDO::PARAM_INT],
                [":networkID",$n[NETWORK_KEY_ID], PDO::PARAM_INT],
                [":username",$n[NETWORK_KEY_USERNAME], PDO::PARAM_STR],
                [":description",$n[NETWORK_KEY_DESCRIPTION], PDO::PARAM_STR],
                [":visible",$n[NETWORK_KEY_VISIBLE], PDO::PARAM_INT],
                [":instantiated",$NOW, PDO::PARAM_STR],
                )
        );
        if(!$add) exit(exitWithNegative("Danger on default add."));

        $n[NETWORK_KEY_ID] = $conn->lastInsertId();


        break;
    case NETWORK_TYPE_CUSTOM :
        $n[NETWORK_KEY_NAME] = getAPIParam($_POST[NETWORK_KEY_NAME], DATA_TYPE_STRING,"Missing name.");
        $n[NETWORK_KEY_URL] = getAPIParam($_POST[NETWORK_KEY_URL], DATA_TYPE_STRING,"Missing URL.");
        $n[NETWORK_KEY_ICON] = getAPIParam($_FILES[NETWORK_KEY_ICON],DATA_TYPE_FILE_IMAGE,false,true, null, null);



        $customizer = PDOParser::parseBoolean(
            $conn,
            "INSERT 
                       INTO network_custom SET
                       name =:name,
                       version =:version,
                       url =:url
                       ",
            array(
                [":name",  $n[NETWORK_KEY_NAME], PDO::PARAM_STR ],
                [":version",  $n[NETWORK_KEY_ICON] ? 1 : 0, PDO::PARAM_INT ],
                [":url",  $n[NETWORK_KEY_URL], PDO::PARAM_STR ],
            )
        );

        if(!$customizer) exit(exitWithNegativeDebug("Customizer error."));
        $n[NETWORK_KEY_ID] = $conn->lastInsertId();

        $add = PDOParser::parseBoolean(
            $conn,
            "INSERT 
                       INTO network_link SET 
                       AID =:AID,
                       userID = :userID,
                       networkID =:networkID,
                       type = ".NETWORK_TYPE_CUSTOM.",
                       username = :username,
                       description = :description,
                       visible = :visible,
                       position = ".NETWORK_DEFAULT_POSITION.",
                       instantiated = :instantiated
                       ",
            array(
                [":AID",$n[NETWORK_KEY_LINK_AID], PDO::PARAM_STR],
                [":userID",$userID, PDO::PARAM_INT],
                [":networkID",$n[NETWORK_KEY_ID], PDO::PARAM_INT],
                [":username",$n[NETWORK_KEY_USERNAME], PDO::PARAM_STR],
                [":description",$n[NETWORK_KEY_DESCRIPTION], PDO::PARAM_STR],
                [":visible",$n[NETWORK_KEY_VISIBLE], PDO::PARAM_INT],
                [":instantiated",$NOW, PDO::PARAM_STR],
            )
        );
        if(!$add) exit(exitWithNegative("Danger on custom add."));
        $n[NETWORK_KEY_ID] = $conn->lastInsertId();


        /**
         * IMAGE
         */

        $pathToDir = PATH_DATA_NETWORK_CUSTOM.$n[NETWORK_KEY_LINK_AID]."/";
        mkdir($E->goIdentifierToPath(URL_NETWORK_ADD,$pathToDir));

        if($n[NETWORK_KEY_ICON]){
            $profile = $E->goIdentifierToPath(URL_NETWORK_ADD,$pathToDir."icon-1".NETWORK_DEFAULT_ICON_TYPE);
            $thumbnail =  $E->goIdentifierToPath(URL_NETWORK_ADD,$pathToDir."thumbnail-1".NETWORK_DEFAULT_THUMBNAIL_TYPE);

            list($originalWidth, $originalHeight) = getimagesize($n[NETWORK_KEY_ICON]['tmp_name']);
            if (move_uploaded_file( $n[NETWORK_KEY_ICON]['tmp_name'], $profile)) {
                /**
                 * First we upload the picture as is, so we can have a reference to it.
                 * Second thing we do is use the ImageResize library to resize the image and re-upload it in place
                 */

                $dimension = getNewImageDimensions($originalWidth,$originalHeight,NETWORK_DEFAULT_ICON_SIZE);
                $newWidth = $dimension[0];
                $newHeight = $dimension[1];


                $resizeManager = new ImageResize($profile);
                $path = $profile;
                $resizeManager->quality_jpg = 100;
                $resizeManager->resize($newWidth, $newHeight);
                $resizeManager->save($path,IMAGETYPE_JPEG);

                /**
                 * Thumbnail
                 */

                $dimension = getNewImageDimensions($originalWidth,$originalHeight,NETWORK_DEFAULT_THUMBNAIL_SIZE);
                $newWidth = $dimension[0];
                $newHeight = $dimension[1];

                $resizeManager = new ImageResize($profile);
                $path = $thumbnail;
                $resizeManager->quality_jpg = 60;
                $resizeManager->resize($newWidth, $newHeight);
                $resizeManager->save($path,IMAGETYPE_JPEG);
            }
        }


        break;
    default : exit(exitWithNegativeDebug("Dangerous type."));
}






if($n[NETWORK_KEY_LABELS]) {
    $arrL = $n[NETWORK_KEY_LABELS];
    $VALUES_LABELS = array();

    $SQL_LABELS = "INSERT "."INTO network_label_link (networkID, labelID, instantiated) VALUES ";
    for($i = 0; $i < count($arrL); $i++){
        $SQL_LABELS.= ($i > 0 ? " , " : "")." ( :nID".$i." , :lID".$i.", :inst".$i." ) ";
        array_push($VALUES_LABELS,[":nID".$i, $n[NETWORK_KEY_ID], PDO::PARAM_INT]);
        array_push($VALUES_LABELS,[":lID".$i, $arrL[$i], PDO::PARAM_INT]);
        array_push($VALUES_LABELS,[":inst".$i, $NOW, PDO::PARAM_INT]);
    }
    $labels = PDOParser::parseBoolean(
        $conn,
        $SQL_LABELS,
        $VALUES_LABELS
    );
    if(!$labels) exit(exitWithNegative(DANGER." on Labels."));

}




exit(exitWithOK(VICTORY));