<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 13/08/2017
 * Time: 12:12
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
extractSession(PAGE_DASHBOARD_KEY);

/**
 * ---------------------------------------
 */

$user = (new User())->mapUser($_SESSION['user']);

$stickyTutorial = false;
$stickyPassed = false;
if($_GET['stickyTutorial']) $stickyTutorial = true;
if($_GET['stickyPassed']) $stickyPassed = true;

if(isSessionTutorialStickyPassed()){
    $stickyTutorial = true; $stickyPassed = true;
    disposeSessionTutorialStickyPassed();
}



?>


<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Dashboard | ConnSuite | Your official online networking suite</title>
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
    <link rel="stylesheet" href="../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../css/p/dashboard.css">
    <link rel="stylesheet" href="../css/util.css">
    <link rel="stylesheet" href="../css/system/conn_item.css">
    <link rel="stylesheet" href="../css/system/conn_article.css">
    <link rel="stylesheet" href="../css/system/conn_news.css">

    <link rel="stylesheet" href="../support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="../support/animate/file.css" >
    <script src="../support/dotdotdot/jquery.dotdotdot.min.js"></script>

    <link rel="stylesheet" href="../support/owl-carousel/dist/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="../support/owl-carousel/dist/assets/owl.theme.default.min.css">



    <link rel="manifest" href="/manifest.json">
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>

    <link rel="stylesheet" href="../support/ytpop/YouTubePopUp.css" >
    <script src="../support/ytpop/YouTubePopUp.jquery.js"></script>

    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">

</head>



<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #f3f8fa"  >
<a class="csVideo" href="https://youtu.be/s-mP22EkCfM" style="z-index: 9999999; display: none;"></a>

<div class="transitionContainer" style="display: flex">
    <div style="width: 100%; height: 100%;display: flex;justify-content: center; align-items: center;">
        <img src="../image/dualRing.svg">
        </div>
</div>

<div class="background" style="display: flex">



<div style="width: 100%;" >


    <div id="toolbar"></div>

    <script src="../base/config.js"></script>
    <script src="../js/util.js"></script>



    <script>
    $(function(){
        <?php
        echo 'loadToolbar('.$depthToRoot[PAGE_DASHBOARD_KEY].',"'.$user->name.'",PAGE_DASHBOARD,"'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'" });';
        echo 'loadLeftSideBar('.$depthToRoot[PAGE_DASHBOARD_KEY].', PAGE_DASHBOARD, {username : "'.$user->username.'" });';

        ?>

    });

    var depthToRoot = <?php echo $depthToRoot[PAGE_DASHBOARD_KEY] ?> ;
    var retrieveNetworkListURL = "<?php echo ROOT.$pathFromRoot[CORE_PAGE_RETRIEVE_NETWORK_LIST] ?>";
    var userID = <?php echo $user->ID ?>;
    var myUsername = "<?php echo $user->getUsername() ?>";
    var token = "<?php echo $user->getToken(); ?>";
    let stepID = "<?php echo $user->getStepID();?>"; try{stepID = parseInt(stepID);}catch(err){stepID = TUTORIAL_STEP_WELCOME;}
    var doVisibleChangeURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_VISIBLE_CHANGE] ?>";
    var doNetworkDeleteURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_NETWORK_DELETE] ?>";
    var doUploadPictureURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_PROFILE_UPLOAD_PICTURE] ?>";
    var retrieveArticleList = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_ARTICLE_LIST] ?>";
    var removeArticleURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ARTICLE_REMOVE] ?>";
    var retrieveNewsListURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_NEWS_LIST] ?>";
    var doReorderNetworksURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_NETWORK_REORDER] ?>";
    var doNewsVisitURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_NEWS_VISIT] ?>";
    var doStepUpURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_TUTORIAL_STEP_UP] ?>";
    let stickyTutorial = "<?php echo $stickyTutorial ? 'true' : 'false'?>";try{stickyTutorial = stickyTutorial === 'true';}catch(err){stickyTutorial = false;}
    let stickyPassed = "<?php echo $stickyPassed ? 'true' : 'false'?>";try{stickyPassed = stickyPassed === 'true';}catch(err){stickyPassed = false;}

</script>

    <div style="width: 100%; display: flex; justify-content: center;">


    <div class="customContainer" style="background: #ffffff; min-height: 100vh;display: flex; flex-direction: row; position: relative">

    <div id="leftSideBar"></div>
    <div id="dashboardContent" style="display: flex; flex-direction: column">

        <div id="tutorialSectionHeading" class="sectionHeading" style="<?php if($user->getStepID() === TUTORIAL_STEP_COUNT) echo "order : 100;" ?>display: flex; flex-direction: row; align-items: center; justify-content: flex-start;" >
            <span  class="tooltip-right" data-tooltip="A short tutorial to get you started.">My ConnSuite Experience <i id="tutorialSectionHeadingIcon" class="icon-conn-05 leftSideBarElementIcon"></i></span>
        </div>

        <div style="<?php if($user->getStepID() === TUTORIAL_STEP_COUNT) echo "order : 101;" ?>" id="tutorialParentOwl" class="owl-carousel">


        </div>



        <div class="sectionHeading" style="order:1;display: flex; flex-direction: row; align-items: center; justify-content: flex-start;" >
            <span>My Networks</span>
            <div id="reorderNetworksButton" class="tooltip-right" data-tooltip="Edit the order in which networks appear on your profile">
                <i class="material-icons">&#xE863;</i>
            </div>
        </div>




        <div id="connItemsParent" class="container-fluid row" style="order:2;width: 100%;padding-right: 0; margin: 0; padding-left: 0;"></div>

        <div class="sectionHeading" style="order:3;" ><span class="tooltip-right" data-tooltip="Tell your story or showcase your portfolio">My Story</span></div>

        <div id="articleParent" class="container-fluid row" style="order:4;width: 100%;padding-right: 0; margin: 0; padding-left: 0;"></div>



        <div id="newsSectionHeading" style="order:5;" class="sectionHeading"><span class="tooltip-right" data-tooltip="Latest updates from the ConnSuit team">Latest News</span></div>

        <div id="newsParent" style="width: 100%;order:6;" >

            <div id="newsParentOwl" class="owl-carousel">


            </div>


        </div>



    </div>



    </div>



    </div>


</div>




<div id="rightDetailPageCover" class=""></div>


<div id="rightDetailContainer" class="animated">

        <div id="rightDetailInnerContainer">
            <div class="toolbarSizer" ></div>
            <div id="rightDetailSectionDetailsContainer">

                <div id="rightDetailSectionDetailsHeaderContainer">
                <p id="rightDetailHeadingFirst" class="rightDetailHeading" style="padding-top: 3px; padding-bottom: 0;">Account Detail</p>
                    <div class="rightDetailCloseButton"><i class="material-icons">&#xE5CD;</i><span>Close</span></div>
                <div id="rightDetailToggleOuterContainer">
                    <div id="rightDetailToggleBoxContainer" >
                    <span data-tooltip="By turning off the toggle, this network will be made available only to those who requested your business card. If turned on, everyone will be able to see this network. (Changes will apply when you close the cover)" class="tooltip-bottom" id="publicToggleTitle">Public Conn</span>
                    <input type="checkbox" id="publicToggle" class="c_materialDesignToggleCheckbox c_materialDesignToggleHidden" checked/>
                    <label for="publicToggle" class="c_materialDesignToggleLabel"></label>
                    </div>

                </div>
            </div>

                <div id="rightDetailAccountCardContainer">
                    <div style=" flex: 1; position: relative;">
                       <img id="rightDetailAccountIcon" style="width: 100%;" src="">
                        <div data-tooltip="Number of clicks" class="tooltip-bottom" id="rightDetailClickContainer"><span>1211</span></div>
                    </div>

                    <div style="flex: 3">
                        <div id="rightDetailAccountCardCredentialsContainer">
                            <div style="text-align: left;">
                            <a id="rightDetailAccountCardCredentialsNetworkURL" target="_blank"  href=""><p id="rightDetailAccountCardCredentialsNetwork"></p></a>
                            <p id="rightDetailAccountCardCredentialsUsername"></p>
                            </div>
                            </div>
                    </div>

                        <div>
                        <a target="_blank" id="visitAccountButton">
                            <i class="material-icons colorPrimary" style="font-size: 18pt;">&#xE5C8;</i>
                        </a>
                        </div>

                </div>




            </div>

            <div id="rightDetailSectionInfoContainer">
                <p class="rightDetailHeading">Account Additional Info</p>
                <p id="rightDetailInfo"></p>
            </div>


            <div id="rightDetailSectionLabelsContainer">
                <p class="rightDetailHeading">Account Labels</p>
                <div style="width: 100%;">
                <div id="rightLabelContainer" class="container-fluid row" style="padding: 0;margin: 0;">



                </div>
                </div>
            </div>



            <div id="rightDetailSectionActionContainer">
                <p class="rightDetailHeading">Account Actions</p>
                <div style="display:flex; flex-direction: column">
                    <div id="rightDetailActionShare" class="rightDetailActionContainer" data-toggle="modal">
                        <i class="material-icons rightDetailActionIcon">&#xE80D;</i>
                        <span class="rightDetailActionText">Share this account</span>
                    </div>

                    <div  id="rightDetailActionEdit" class="rightDetailActionContainer" style="margin-top: 15px;">
                        <i class="material-icons rightDetailActionIcon">&#xE22B;</i>
                        <span class="rightDetailActionText">Edit this account</span>
                    </div>

                    <div id="rightDetailActionDelete" class="rightDetailActionContainer" style="margin-top: 15px;">
                        <i class="material-icons rightDetailActionIcon">&#xE92B;</i>
                        <span class="rightDetailActionText">Delete this account</span>
                    </div>
                </div>
            </div>

        </div>

    </div>


<!------------------------------------------------->
<!-- MODAL ZONE -->









    <!--REORDER MODAL-->

    <div class="modal fade" id="reorderModal" data-keyboard="false" data-backdrop="static" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >
            <div class="modal-content" >
                <div class="modal-header modal-headerComplementary">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Edit the order of your networks</h4>
                </div>
                <div class="modal-body">
                    <div id="reorderNetworkList" style="min-height: 300px;">






                    </div>



                </div>
                <div class="modal-footer">
                    <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
                    <span id="saveOrderModalReorderButton"  class="modalButton" data-dismiss="modal">Save order</span>
                </div>
            </div>
        </div>
    </div>



    <!--TUTORIAL MODAL-->
    <div class="modal fade" id="tutorialModal" tabindex="-1" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >

            <div class="modal-content" >
                <div class="modal-body" >
                    <div id="closeButtonContainer"><button style="cursor: pointer;" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
                    <div class="container-fluid row" style="display: flex;align-items: center;">
                    <div class="col-md-5 col-xs-12" style="height: 100%;display: flex; align-items: center;min-height: 100px;">
                        <div id="tutorialExtraParent"></div>
                    </div>
                    <div class="col-md-7 col-xs-12">
                        <div id="tutorialModalContent">
                            <p id="tutorialModalTitle"></p>
                            <p id="tutorialModalDescription"></p>
                        </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer" style="padding: 20px auto auto">
                    <span id="tutorialModalCloseButton" class="modalButtonCancel" data-dismiss="modal">Later</span>
                    <a id="tutorialMagicButton" class="modalTutorialButtonSpecial"><span></span><div><i class="material-icons">&#xE5C8;</i></div></a>
                </div>
                <div id="tutorialModalLastCardContainer">
                    <div id="tutorialModalLastCard">
                        <div id="tutorialModalLastIconContainer">
                            <img src="../image/logo_icon_w.png">
                        </div>
                        <div id="tutorialModalLastCardContent">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--EMAIL MODAL-->
    <div class="modal fade" id="emailModal" tabindex="-1" data-keyboard="false" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >

            <div class="modal-content" >
                <div class="modal-header modal-headerComplementary" >
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Ups! We cannot find an email linked to this account.</h4>
                </div>
                <div class="modal-body">
                        <span>In order to sign you up for the 2 free months of premium access, we need your email so we can let you know when and how to access this prize. It looks like you used one of our external providers to create this ConnSuite account (e.g. Facebook) and we did not register an email to match your profile with. Please fill in your email below for us to put you on the 2-free-premium-months winners list!</span>
                    <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                        <p class="rightFormTitle">Your Email</p>
                        <input class="rightFormInput" name="tutorialEmail" autocomplete="off" maxlength="100" type="email" id="tutorialEmail" title="Enter your email here." placeholder="e.g. john.smith@gmail.com" required>
                        <div class="divider"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span id="emailModalSendButton"  class="modalButton" data-dismiss="modal">Submit</span>
                    <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
                </div>
            </div>
        </div>
    </div>

    <!--SHARE MODAL-->
<div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >

        <div class="modal-content" >
            <div class="modal-header modal-headerComplementary" >
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Share your account</h4>
            </div>
            <div class="modal-body">
                <div style="width: 100%;border: 1px solid #eeeeee; text-align: center; padding: 10px 20px;">
                <span style="letter-spacing: 2px" id="shareModalURL" >
                </span>
                </div>

                <div id="addAnyContainer" style="margin: 20px auto 0; display: flex;justify-content: center; align-items: center;">
                <!-- AddToAny BEGIN -->

                <!-- AddToAny END -->
                </div>

            </div>
            <div class="modal-footer">
                <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
            </div>
        </div>
    </div>
</div>


</div>


<div style="position: fixed;top: 100px; right: 10%; z-index: 100000000; display: none">

        <div id="localConnNotificationCard">
            <div id="localConnNotificationIconContainer">
                <img src="../image/logo_icon_w.png">
            </div>
            <div id="localConnNotificationCardContent">
                <p></p>
            </div>
        </div>

</div>



<script src="../support/rubaxa-sortable/script.js"></script>
<script src="../support/owl-carousel/dist/owl.carousel.js"></script>


<script src="../js/model/network.js"></script>







<script src="../js/system/sidebar_left.js"></script>
<script src="../js/system/toolbar.js"></script>



<script src="../js/model/conn_user.js"></script>
<script src="../js/model/article.js"></script>
<script src="../js/model/conn_news.js"></script>

<script src="../js/system/conn_item.js"></script>
<script src="../js/system/conn_article.js"></script>
<script src="../js/system/conn_news.js"></script>

<script src="../js/model/conn_step.js"></script>

<script src="../js/p/dashboard.js"></script>
</body>
</html>

