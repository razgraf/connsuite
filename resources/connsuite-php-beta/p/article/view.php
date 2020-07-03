<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 24/08/2017
 * Time: 20:03
 */


/**
 * Important INCLUDES
 */
include_once("../../base/config.php");
include_once("../../base/user.php");
$pathToLibs = goToBaseTarget(PAGE_ARTICLE_VIEW_KEY, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();


/**
 * Check if user is stored in session
include_once('../../session/check.php');
extractSession(PAGE_ARTICLE_VIEW_KEY);
 */


/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);

$identifier = "none";
$articleID = -1;

if(!isset($_GET['articleID']) && !isset($_GET['i'])) header('Location :../dashboard.php');
if(isset($_GET['i'])) $identifier = $_GET['i'];
if(isset($_GET['articleID'])) $articleID = $_GET['articleID'];


if(!isset($_GET['articleID']) && isset($_GET['i'])){
    $aID =  substr(strrchr($identifier , '-'),1);
}
else $aID = $articleID;

?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Article | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">
    <script language="JavaScript" type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>

    <!--CONNSUITE META-->
    <meta property="og:type"     content="article" />

    <?php
    printMeta_Article($aID,$conn);
    ?>

    <script src="../../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../../support/bootstrap4/css/bootstrap.css">
    <script src="../../support/bootstrap4/js/bootstrap.js"></script>

    <script src="../../support/loading-pace/pace.min.js"></script>
    <link rel="stylesheet" href="../../support/loading-pace/pace.css">



    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="../../support/fonts/custom-icon/css/conn-custom.css" >

    <link rel="stylesheet" href="../../css/util.css">
    <link rel="stylesheet" href="../../css/p/article/view.css">

    <link rel="stylesheet" href="../../support/custom-ui/material_design_toggle.css">
    <link rel="stylesheet" href="../../support/animate/file.css" >






</head>



<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%;"  >

<div class="transitionContainer" style="display: flex">
    <div style="width: 100%; height: 100%;display: flex;justify-content: center; align-items: center;">
        <img src="../../image/dualRing.svg">
    </div>
</div>

<div class="background" style="display: flex">


    <div id="toolbar"></div>

    <script>
        $(function(){
            <?php
            if($user) echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_ARTICLE_VIEW_KEY].',"'.$user->name.'","Article","'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
            else echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_ARTICLE_VIEW_KEY].',"Stranger","'."Article".'","image/connsuite_icon_inverted_rounded.png",null);';
            ?>
        });

        var depthToRoot = <?php echo $depthToRoot[PAGE_ARTICLE_VIEW_KEY] ?> ;
        var username=  null;
        var userID = null;
        var token = null;
        var identifier = "<?php echo $identifier ?>";


        <?php
        if($user && $user->username && $user->ID && $user->getToken()){
            echo '
            username=  "'.$user->username.'"; 
            userID = '.$user->ID.';
            token = "'.$user->getToken().'"; 
            ';

        if(isRelease()) echo 'if(identifier && identifier.trim().length > 0 && identifier !== "none") window.history.replaceState("article", "ConnSuite", location.protocol + "//" + location.host+"/a/"+identifier);';
        }
        ?>

        var articleID = <?php echo $articleID ?>;

        var retrieveArticleURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_ARTICLE] ?>";



    </script>

    <div style="width: 100%; flex: 1; display: flex; justify-content: center; flex-direction:column;align-items: center;">

        <div id="articleCoverContainer">
            <div class="articleCoverImage" ></div>
            <div class="articleCoverOverlay"></div>
        </div>

        <div id="blurHider"></div>
        <div class="customContainer" style="background: #ffffff;min-height: 300px;display:flex;justify-content: center; z-index: 30; border-radius: 5px;">
            <div id="mainContentContainer" style="max-width: 1000px;" >

                <div style="text-align: center;width: 100%;padding: 30px;">
                    <p id="articleTitle"></p>
                </div>

                <div style="width: 100%; background: #eeeeee; height: 1px; margin-bottom: 30px;"></div>

                <div id="content" style="font-size: 15pt;width: 100%;min-height: 400px; text-align: justify"></div>




                <div style="width: 100%; background: #eeeeee; height: 1px; margin-top: 30px; margin-bottom: 30px;"></div>

                <div  style="margin: 0; width: 100%; padding: 0;display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div  id="topProfilePictureOuterContainer">
                            <img  src="" id="topProfilePictureOutput" >
                    </div>

                    <div style="display: flex; flex-direction: column; margin-top:10px;align-items: center; justify-content: center;">
                        <p style="font-size: 15pt; color: #000000;margin: 0;" id="baseProfileUsername"></p>
                        <p style="font-size: 11pt; color: #aaaaaa; max-width: 500px; padding: 10px; text-align: center;" id="baseProfileTagline"></p>
                        <a id="viewProfileBottomButton" class="buttonTypeOutlinePrimary">Visit Profile</a>
                    </div>

                </div>
            </div>
        </div>


    </div>




</div>









<script src="../../base/config.js"></script>
<script src="../../js/util.js"></script>
<script src="../../js/model/network.js"></script>

<script src="../../js/model/conn_user.js"></script>
<script src="../../js/model/article.js"></script>

<script src="../../js/system/toolbar.js"></script>
<script src="../../js/p/article/view.js"></script>


</body>
</html>


