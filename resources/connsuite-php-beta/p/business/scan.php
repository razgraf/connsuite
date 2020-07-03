<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 22-Feb-17
 * Time: 2:46 PM
 */
/**
 * Important INCLUDES
 */
include_once("../../base/config.php");
include_once("../../base/user.php");

/**
 * Check if user is stored in session
 */
include_once('../../session/check.php');
extractSession(PAGE_BUSINESS_SCAN_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);



?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Show & Scan Pass | ConnSuite</title>
    <meta charset='utf-8'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">

    <!--CONNSUITE META-->
    <?php printMeta_Description();printMeta_Image(); ?>

    <script language="JavaScript" type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>


    <script src="../../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../../support/bootstrap4/css/bootstrap.css">
    <script src="../../support/bootstrap4/js/bootstrap.js"></script>

    <script src="../../support/loading-pace/pace.min.js"></script>
    <link rel="stylesheet" href="../../support/loading-pace/pace.css">

    <script src="../../support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../../support/fonts/custom-icon/css/conn-custom.css" >

    <link rel="stylesheet" href="../../css/p/business/scan.css">
    <link rel="stylesheet" href="../../css/util.css">

    <link rel="stylesheet" href="../../support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="../../support/animate/file.css" >




    <link rel="manifest" href="/manifest.json">
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>




</head>


<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #f3f8fa"  >

<div class="transitionContainer" style="display: flex">
    <div style="width: 100%; height: 100%;display: flex;justify-content: center; align-items: center;">
        <img src="../../image/dualRing.svg">
    </div>
</div>

<div class="background" style="display: flex">
<div style="width: 100%;">

    <div id="toolbar"></div>

    <script>
        $(function(){
            <?php
            echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_BUSINESS_SCAN_KEY].',"'.$user->name.'","Show & Scan Pass","'.$user->thumbnailURL.'", {username : "'.$user->username.'" ,notificationCount : "'.$user->notificationCount.'" });';
            ?>
        });

        var depthToRoot = <?php echo $depthToRoot[PAGE_BUSINESS_SCAN_KEY] ?> ;
        var userID = <?php echo $user->ID ?>;
        var username =  "<?php echo $user->username ?>";
        var token = "<?php echo $user->getToken(); ?>";
        var retrieveUserURL = "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_USER_MINI] ?>";
        var retrieveRequestStatusURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS] ?>";
        var doBusinessRequestURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_BUSINESS_REQUEST] ?>";


    </script>

    <div style="width: 100%; display: flex; justify-content: center;flex-direction: column;">


        <div id="scanHeaderContainer">
            <div class="customContainerPadding" style="display: flex; justify-content: center;">
            <div id="scanSelfCard">
                <div id="scanSelfCardHeader">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                    <div id="scanSelfCardPictureContainer">
                        <img src="" id="scanSelfCardPicture"/>
                    </div>
                    <div id="scanSelfCardHeaderContent">
                        <p id="scanSelfCardName"></p>
                        <p id="scanSelfCardUsername"></p>
                    </div>
                    </div>
                </div>
                <div id="scanSelfCardBody">

                    <div id="qrcode"></div>


                </div>

            </div>
            </div>

        </div>
        <div class="customContainerS" style="background: #ffffff;min-height: 600px; padding-top: 10px;width: 100%;">
            <div id="mainContentContainer">
            <div class="customContainerPadding">
                <div class="container-fluid row" style="padding: 0; margin: 0; width: 100%;">

                    <div class="col-lg-6 col-md-6 col-sm-12" style="margin: 0; padding: 0;">


                        <div id="scanCodeOuterContainer">
                            <div id="scanCodeContainer">
                                <div id="placeholder">
                                <div id="scanPlaceholder">
                                    <div id="scanCodeButtonContainer">
                                        <span class="buttonTypeOutlinePrimary">Scan Code</span>
                                    </div>
                                    <div id="scanCodeImageOverlay" style="border-radius: 30px;">
                                        <img id="scanIllustrationDesktop" src="../../image/scan_illustration.png" style="width: 100%; height: 100%; object-fit: contain; border-radius: 30px;">
                                        <img id="scanIllustrationMobile" src="../../image/scan_illustration_mobile.png" style="width: 100%; height: 100%;object-fit: contain; border-radius: 30px;">
                                    </div>
                                </div>
                                </div>
                                <video id="preview"></video>


                                <div id="closePreview"><div><i class="material-icons">&#xE5CD;</i></div></div>

                            </div>
                        </div>



                    </div>
                    <div style="margin: 0; padding: 0;" id="scanColumnRight" class="col-lg-6 col-md-6 col-sm-12">

                        <div id="scanAnimationContainer">
                            <p style="text-align: center; margin-bottom: 0;" data-tooltip="Click on the 'Scan Code' button and hover over the code from the device of the person you want to connect with. This will automatically open a window targeting to his/her profile. Have fun! "><span id="scanAnimationTitle">Scan it live!</span></p>
                             <img id="scanAnimationImage" src="../../image/scan_3.gif"/>
                            <span id="scanAnimationContent">Click on the 'Scan Code' button and hover over the code from the device of the person you want to connect with. This will automatically open a window targeting to his/her profile. Have fun! </span>
                        </div>
                    </div>



                    <div id="scanHelper"></div>


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
                    <p id="rightDetailHeadingFirst" class="rightDetailHeadingTop" ></p>
                    <div class="rightDetailCloseButton"><i class="material-icons">&#xE5CD;</i><span>Close</span></div>
                </div>
                <div class='businessCard' id="businessCardFront" >
                        <div class='businessCardLeft'>
                            <div id="selfBusinessCardPictureContainer">
                                <img src="../../image/small_self_profile.png" id="selfBusinessCardPicture"/>
                                <img id="selfBusinessCardIcon" src="../../image/connsuite_icon_inverted_rounded.png"  />
                            </div>
                        </div>
                        <div class='businessCardRight'>
                            <div style="display: flex; flex-direction: column; justify-content: center">
                                <span class="businessCardRightName"></span>
                                <span class="businessCardRightUsername"></span>
                                <div id="businessCardSelfNetworks">

                                </div>
                            </div>
                        </div>
                    </div>



                <div id="rightDetailButtonsContainer">
                    <p id="rightAboutHeading" class="rightDetailHeading" style="margin-bottom: 20px;text-align: center">About</p>
                    <div style="display: flex; flex-direction: column;">

                        <a id="rightVisitProfileButton" class="buttonTypeOutlineWhite"><span>Visit Profile</span></a>



                    </div>

                    <div id="rightRequestContainer">
                    <div style="width: 100%;display: flex; flex-direction: column;">
                        <p id="rightAboutYouAndHeading" class="rightDetailHeading">About You & </p>
                        <div id="rightRequestCardButton" class="profileRequestButton"><span>Request Business Card</span></div>
                    </div>
                    </div>

                </div>







            </div>



        </div>

        <div id="rightDetailLoader">
            <div>
                <img src="../../image/dualRing.svg" >
            </div>
        </div>

    </div>




</div>

<script src="../../support/qr-generator/instascan.min.js"></script>
<script src="../../support/qr-generator/raphael.js"></script>
<script src="../../support/qr-generator/qrcodesvg.js"></script>


<script src="../../js/util.js"></script>
<script src="../../base/config.js"></script>
<script src="../../js/model/network.js"></script>
<script src="../../js/system/conn_item.js"></script>
<script src="../../js/model/conn_user.js"></script>


<script src="../../js/system/toolbar.js"></script>

<script src="../../js/p/business/scan.js"></script>





</body>
</html>
