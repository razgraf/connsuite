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
extractSession(PAGE_PASSWORD_CHANGE_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);


?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Change Password | ConnSuite</title>
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

    <link rel="stylesheet" href="../../css/p/profile/password-change.css">
    <link rel="stylesheet" href="../../css/util.css">


    <link rel="stylesheet" href="../../support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="../../support/animate/file.css" >
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
                echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_PASSWORD_CHANGE_KEY].',"'.$user->name.'","Change Your Password","'.$user->thumbnailURL.'", {username : "'.$user->username.'" ,notificationCount : "'.$user->notificationCount.'" });';
                ?>
            });

            var depthToRoot = <?php echo $depthToRoot[PAGE_PASSWORD_CHANGE_KEY] ?> ;
            var userID = <?php echo $user->ID ?>;
            var token = "<?php echo $user->getToken(); ?>";



            var doPasswordChange = "<?php echo ROOT.$pathFromRoot[CORE_DO_PASSWORD_CHANGE] ?>";
            var doPasswordExistenceCheck = "<?php echo ROOT.$pathFromRoot[CORE_DO_PASSWORD_EXISTENCE_CHECK] ?>";


        </script>

        <div style="width: 100%; display: flex; justify-content: center;flex-direction: column;">

            <div class="customContainerPadding" style="background: #ffffff;min-height: 300px;">
                <div id="mainContentContainer">
                    <div id="profileHelperContainer" style="width: 100%;"></div>
                    <div class="container-fluid row" style="margin: 0; padding: 0;">
                        <div class="col-sm-4 col-xs-12" >
                        <div style="display: flex; justify-content: center; width: 100%;padding-top: 30px;">
                            <div id="passwordShieldContainer">
                                <img id="passwordShield" src="../../image/password_shield.png">
                                <img id="passwordOverlay" src="../../image/password_shield_overlay.png">
                            </div>
                        </div>
                        </div>

                        <div class="col-sm-8 col-xs-12" style="margin-right: 0; margin-left: 0;">
                            <div id="oldPasswordField" style="display: flex; flex-direction: row">
                                <div style="flex: 1; display: flex;flex-direction: column; margin-top: 30px;">
                                    <p class="rightFormTitle">Old Password</p>
                                    <input class="rightFormInput" name="oldpass" autocomplete="off" maxlength="20" type="password" id="oldpass" title="Your old password" placeholder="Your old password" required>
                                    <div class="divider"></div>
                                </div>
                            </div>


                            <div style="display: flex; flex-direction: row">
                                <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                    <p class="rightFormTitle">New Password</p>
                                    <input class="rightFormInput" name="newpass" autocomplete="off" maxlength="2500" type="password" id="newpass" title="Your new password" placeholder="Your new password" required>
                                    <div class="divider"></div>
                                </div>
                            </div>

                            <div style="display: flex; flex-direction: row">
                                <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                    <p class="rightFormTitle">New Password Again</p>
                                    <input class="rightFormInput" name="newpass2" autocomplete="off" maxlength="100" type="password" id="newpass2" title="Repeat your new password" placeholder="Repeat your new password" required>
                                    <div class="divider"></div>
                                </div>
                            </div>





                            <div id="rightAddNetworkButtonContainer">
                                <div id="changePasswordButton" class="buttonTypeOutlinePrimary" style=" min-width: 160px;">Save New Password</div>
                                <div id="cancelChangeButton" class="buttonTypeOutlineGray" style=" min-width: 160px;">Cancel</div>
                            </div>
                        </div>
                        </div>


                </div>
            </div>
        </div>


    </div>

</div>


<div class="modal fade" id="checkModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header modal-headerComplementary">
                <button data-dismiss="modal" class="close"  aria-label="Close"> <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Are you sure you want to change your password?</h4>
            </div>
            <div class="modal-body">
                <span>You are going to change your password. After you do this, you will be logged out of the account from your devices, the old password will no longer be available for use, but the new one will be valid for use immediately. Proceed with this action?</span>

            </div>
            <div class="modal-footer">
                <div id="checkChangeButton" class="modalButton" >Change Password</div>
                <div data-dismiss="modal" class="modalButtonCancel" >Cancel</div>
            </div>
        </div>
    </div>
</div>





<div class="modal fade" id="changedModal"  data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header">
                <a  href="../../welcome.php"  class="close"  aria-label="Close"> <span aria-hidden="true">&times;</span></a>
                <h4 class="modal-title" id="myModalLabel">Password Changed!</h4>
            </div>
            <div class="modal-body">
                <span>Your password has been changed! You will now be logged out of ConnSuite from all your devices. Please re-connect with your new password after this.</span>

            </div>
            <div class="modal-footer">
                <a href="../../welcome.php"  class="modalButtonCancel">Let's go!</a>
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

<script src="../../js/p/profile/password-change.js"></script>





</body>
</html>
