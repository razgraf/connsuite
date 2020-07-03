<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 30/08/2017
 * Time: 13:30
 */



/**
 * Important INCLUDES
 */
include_once("../base/config.php");
include_once("../base/user.php");

/**
 * Check if user is stored in session
 */
include_once('../session/check.php');
extractSession(PAGE_SEARCH_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);
$q = "";
$resultsForText = "All Users";
if(isset($_GET['q']) && strlen($_GET['q']) > 0 ) {
    $q = secureString($_GET['q']);
    $resultsForText = "<span style='color: #aaaaaa'>".$q."</span>";
}

if($user->getStepID() === TUTORIAL_STEP_PROFILE_EXAMPLE ) setSessionTutorialStickyPassed();



?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Search | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">

    <!--CONNSUITE META-->
    <?php printMeta_Description();printMeta_Image(); ?>

    <script language="JavaScript" type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>


    <script src="../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../support/bootstrap4/css/bootstrap.css">
    <script src="../support/bootstrap4/js/bootstrap.js"></script>

    <script src="../support/loading-pace/pace.min.js"></script>
    <link rel="stylesheet" href="../support/loading-pace/pace.css">

    <script src="../support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="../css/p/search.css">
    <link rel="stylesheet" href="../css/util.css">


    <link rel="stylesheet" href="../css/system/conn_item.css">

    <link rel="stylesheet" href="../support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="../support/animate/file.css" >

    <link rel="manifest" href="/manifest.json">
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>

</head>


<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #f3f8fa"  >


<div class="transitionContainer" style="display: flex">
    <div style="width: 100%; height: 100%;display: flex;justify-content: center; align-items: center;">
        <img src="../image/dualRing.svg">
    </div>
</div>

<div class="background" style="display: flex">
    <div style="width: 100%;">

    <div id="toolbar"></div>

    <script>
        $(function(){
            <?php
            echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_SEARCH_KEY].',"'.$user->name.'","Search Center","'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
            ?>
        });

        var depthToRoot = <?php echo $depthToRoot[PAGE_SEARCH_KEY] ?> ;
        var userID = <?php echo $user->ID ?>;
        var username = "<?php echo $user->username ?>";
        var token = "<?php echo $user->getToken(); ?>";
        var thumbnailURL = "<?php echo $user->thumbnailURL ?>";
        var doRetrieveUserList = "<?php echo ROOT.$pathFromRoot[CORE_DO_SEARCH_RETRIEVE_USER_LIST] ?>";
        var query = "<?php echo $q ?>"


    </script>

<div id="bigBro" style="width: 100%; display: flex; justify-content: center;flex-direction: column;">


    <div class="customContainerS" style="background: #ffffff;min-height: 300px;">
        <div id="headerSearchCenterContainer">
            <div id="headerSearchCenterBar">
                <div id="headerSearchBarInputContainer">
                    <input id="headerSearchBarInput" title="Search" placeholder="Type the name of a company or a person..."/>
                    <div id="headerSearchBarDivider"></div>
                </div>
                <a id="headerSearchButtonContainer" title="Click to Search">
                    <i class="material-icons">&#xE8B6;</i>
                </a>
            </div>
        </div>
        <div id="mainContentContainer">
            <div class="container-fluid row" style="margin: 0; padding: 0;">
            <div class="col-sm-12 col-xs-12">
                <div style="width: 100%; display: flex; flex-direction: row; align-items: center">
                    <span id="resultsForText" class="sectionHeading">Results for <?php echo $resultsForText ?></span>
                    <span class="sectionHeading" style="margin-left: 4px; ">| #</span>
                    <span id="resultsCountText" class="sectionHeading">0 Results</span>
                </div>
            </div>
            <div class="col-sm-12 col-xs-12">
                <div id="searchResultParent" class="container-fluid row" style="margin: 0; padding: 0;width: 100%;">



                </div>
            </div>

            </div>


        </div>
    </div>
</div>


    </div>

</div>




<script src="../js/util.js"></script>
<script src="../base/config.js"></script>
<script src="../js/model/conn_user.js"></script>
<script src="../js/model/network.js"></script>
<script src="../js/model/notification.js" ></script>

<script src="../js/system/toolbar.js"></script>

<script src="../js/p/search.js"></script>






</body>
</html>
