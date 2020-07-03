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
extractSession(PAGE_PROFILE_ALIAS_KEY);

/**
 * ---------------------------------------
 */

$user = (new User())->mapUser($_SESSION['user']);



?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Username & Alias | ConnSuite</title>
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

    <link rel="stylesheet" href="../../css/p/profile/alias.css">
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
                echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_PROFILE_ALIAS_KEY].',"'.$user->name.'","Change Your Username","'.$user->thumbnailURL.'", {username : "'.$user->username.'" ,notificationCount : "'.$user->notificationCount.'" });';
                ?>
            });

            var depthToRoot = <?php echo $depthToRoot[PAGE_PROFILE_ALIAS_KEY] ?> ;
            var userID = <?php echo $user->ID ?>;
            var token = "<?php echo $user->getToken(); ?>";
            var globalUsername = "<?php echo $user->username; ?>";



            var doAliasRetrieveListURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ALIAS_RETRIEVE_LIST] ?>";
            var doAliasAddURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ADD_ALIAS] ?>";
            var doAliasCheckAvailableURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_CHECK_ALIAS_AVAILABLE] ?>";
            var doSetPrimaryAliasURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_SET_PRIMARY_ALIAS] ?>";


        </script>

        <div style="width: 100%; display: flex; justify-content: center;flex-direction: column;">

            <div class="customContainerPadding" style="background: #ffffff;min-height: 300px;">
                <div id="mainContentContainer">
                    <div id="profileHelperContainer" style="width: 100%;"></div>
                    <div class="container-fluid row" style="margin: 0; padding: 30px 0 0 0;">
                        <div class="col-sm-4 col-xs-12" >
                        <div style="display: flex; justify-content: center; width: 100%;">
                            <div id="passwordShieldContainer">
                                <img id="aliasIllustration" src="../../image/alias_illustration.png">
                            </div>
                        </div>
                        </div>

                        <div class="col-md-8 col-xs-12" style="margin: 0; padding: 0;">
                        <div id="aliasParent" class="container-fluid row" style="margin: 0; padding: 0;">
                        <div class="col-sm-6 col-xs-12" style="margin-right: 0; margin-left: 0;">
                            <div class="uaContainer">

                                <div style="display: flex;width: 100%; flex-direction: row; height: 80px;">
                                    <div style="flex: 1; display: flex;flex-direction: column;">
                                        <p class="rightFormTitle">Primary Username</p>
                                        <p id="primaryUsername"><?php echo $user->username?> </p>
                                    </div>
                                </div>
                                <div id="rightAddNetworkButtonContainer" style="display: flex;justify-content: center;margin-bottom: 0;">
                                    <div id="" class="buttonTypeOutlineGray disableClick" style=" min-width: 160px; user-select: none">Primary</div>
                                </div>
                            </div>
                        </div>
                        </div>

                        </div>




                        </div>


                </div>
            </div>
        </div>


    </div>

</div>


<div class="modal fade" id="newAliasModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header modal-headerComplementary">
                <button data-dismiss="modal" class="close"  aria-label="Close"> <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Is this the how you want to appear on ConnSuite?</h4>
            </div>
            <div class="modal-body">
                <span>If you move forward with this, the selected alias will be linked to your account. Are you sure this is the right one? You can only do this once! *Only after the update is made, you will be able to set it to be your primary username.</span>

            </div>
            <div class="modal-footer">
                <div id="registerAliasButton" class="modalButton" >Register my new alias</div>
                <div data-dismiss="modal" class="modalButtonCancel" >Cancel</div>
            </div>
        </div>
    </div>
</div>





<div class="modal fade" id="primaryModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header modal-headerComplementary">
                <button data-dismiss="modal" class="close"  aria-label="Close"> <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Is this the how you want to appear on ConnSuite?</h4>
            </div>
            <div class="modal-body">
                <span>If you move forward with this, the selected alias will be used as the primary username of your account. The current username will act from then on like an alias.</span>
            </div>
            <div class="modal-footer">
                <div id="setPrimaryButton" class="modalButton" >Set this to primary</div>
                <div data-dismiss="modal" class="modalButtonCancel" >Cancel</div>
            </div>
        </div>
    </div>
</div>




<script src="../../js/util.js"></script>
<script src="../../base/config.js"></script>
<script src="../../js/model/network.js"></script>
<script src="../../js/system/conn_item.js"></script>
<script src="../../js/model/conn_user.js"></script>


<script src="../../js/system/toolbar.js"></script>

<script src="../../js/p/profile/alias.js"></script>





</body>
</html>
