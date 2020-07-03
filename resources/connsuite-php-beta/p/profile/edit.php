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
extractSession(PAGE_PROFILE_EDIT_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);



?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Edit Profile | ConnSuite</title>
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

    <link rel="stylesheet" href="../../css/p/profile/edit.css">
    <link rel="stylesheet" href="../../css/util.css">


    <link rel="stylesheet" href="../../css/system/conn_item.css">

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
            echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_PROFILE_EDIT_KEY].',"'.$user->name.'","Edit Profile","'.$user->thumbnailURL.'", {username : "'.$user->username.'" ,notificationCount : "'.$user->notificationCount.'" });';
            ?>
        });

        var depthToRoot = <?php echo $depthToRoot[PAGE_PROFILE_EDIT_KEY] ?> ;
        var userID = <?php echo $user->ID ?>;
        var token = "<?php echo $user->getToken(); ?>";
        var retrieveUserURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_EDIT_PROFILE_RETRIEVE] ?>";
        var profilePicturePrimaryURL = "<?php echo $user->imageURL; ?>";
        var editUserURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_EDIT_USER] ?>";

        let sendMessageURL = "<?php echo ROOT."core/remove-account.php";?>";

    </script>

    <div style="width: 100%; display: flex; justify-content: center;flex-direction: column;">

        <div class="customContainerS" style="background: #ffffff;min-height: 300px;">
            <div id="mainContentContainer">

                <div id="profileHelperContainer" style="width: 100%; margin-bottom: 40px;padding-left: 10px; padding-right: 10px;">
                    <script>
                        $(function(){printHelper($("#profileHelperContainer"),"Tip: For anyone to find and recognize you easier on ConnSuite, add a recent picture to your profile and your real full name. The username you chose will help anyone find you easier.",true)})
                    </script>
                </div>


                <div class="container-fluid row" style="margin: 0; padding: 0;">
                    <div class="col-sm-4 col-xs-12" id="topProfilePictureOuterContainer">
                        <div id="topProfilePictureContainer">
                        <img  src="" id="topProfilePictureOutput" >
                        <div id="editProfilePictureContainer">
                        <img src="../../image/camera_icon.svg" style="width: 40px; padding-top: 10px;"/>
                        <p style="color: #ffffff">Pick New Photo</p>
                        </div>
                        </div>

                        <input type="file" id="customImage" name="customImage"
                               style="margin-top: 10px; z-index: 10; display: none" accept="image/*"
                               onchange="loadFile(event)">

                        <div id="changePictureButton">
                            <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-top: 20px;">
                                <span class="modalButton">PICK ANOTHER PICTURE</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-8 col-xs-12" style="margin-right: 0; margin-left: 0;">

                        <div style="width: 100%; display: flex; flex-direction: row; align-items: center">


                        <div style="flex: 1; display: flex;flex-direction: column">
                            <p class="rightFormTitle">Username</p>
                            <div style="display: flex; flex-direction: row;align-items: center">
                                <input maxlength="70" style="flex: 1" class="rightFormInputLocked" type="text" name="username" id="username" title="Username" disabled="disabled">
                            </div>
                        </div>
                        <div style="height: 100%; width: 20px;"></div>
                        <div style="flex: 1; display: flex;flex-direction: column">
                            <p class="rightFormTitle" id="fbEmailTitle"></p>
                            <div style="display: flex; flex-direction: row;align-items: center">
                                <input maxlength="70" style="flex: 1" class="rightFormInputLocked" type="text" name="fbemail" id="fbemail" title="Identifier"  disabled="disabled">
                            </div>
                        </div>


                        </div>





                        <div style="display: flex; flex-direction: row">
                            <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                <p class="rightFormTitle">First Name</p>
                                <input class="rightFormInput" name="firstname" autocomplete="off" maxlength="20" type="text" id="firstname" title="Your First Name" placeholder="Your First Name" required>
                                <div class="divider"></div>
                            </div>
                            <div style="width: 25px;"></div>

                            <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                <p class="rightFormTitle">Last Name</p>
                                <input class="rightFormInput" name="lastname"  autocomplete="off"type="text" maxlength="20" id="lastname" title="Your Last Name" placeholder="Your Last Name" required>
                                <div class="divider"></div>
                            </div>

                        </div>


                        <div style="display: flex; flex-direction: row">
                            <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                <p class="rightFormTitle">Tagline</p>
                                <input class="rightFormInput" name="tagline" autocomplete="off" maxlength="2500" type="text" id="tagline" title="Your Tagline | A short description" placeholder="Your Tagline | A short description" required>
                                <div class="divider"></div>
                            </div>
                        </div>


                        <div style="display: flex; flex-direction: row">
                            <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                <p class="rightFormTitle">Description</p>
                                <textarea style="max-width: 100%;width: 100%; resize: vertical" class="rightFormInput" name="description" rows="3" type="text" id="description" title="Your Description" placeholder="Your Description" required></textarea>
                                <div class="divider"></div>
                            </div>
                        </div>



                        <div id="rightAddNetworkButtonContainer">

                            <div id="addNetworkButton" class="buttonTypeOutlinePrimary" style=" min-width: 160px;">Save Changes</div>
                            <div id="cancelButton" class="buttonTypeOutlineGray" style=" min-width: 160px; margin-left: 20px;">Cancel</div>
                        </div>
                    </div>
                </div>



                <div style="width: 100%; margin-top: 20px; margin-bottom: 20px;">
                    <div style="width: 100%; height: 1px; background: #eeeeee"></div>
                </div>



                <div class="container-fluid row" style="margin: 0; padding: 0;">
                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">
                        <div class="optionOuterContainer">
                            <div class="optionContainer">
                                <div style="display: flex; justify-content: center; width: 100%;">
                                    <div id="passwordShieldContainer">
                                        <img id="passwordShield" src="../../image/password_shield.png">
                                        <img id="passwordOverlay" src="../../image/password_shield_overlay.png">
                                    </div>
                                </div>
                                <p class="optionContainerTitle">Password</p>
                                <span class="optionContainerContent">Would you like to change your password? Click below and follow the steps in order to do it! Choose it wisely.</span>
                                <a href="password-change.php" id="passwordChangeButton" class="buttonTypeOutlineGray" >Change your password</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">
                        <div class="optionOuterContainer">
                            <div class="optionContainer">
                                <div style="display: flex; justify-content: center; width: 100%;">
                                    <div id="badgeIllustrationContainer">
                                            <img src="../../image/badge_illustration.png">
                                    </div>
                                </div>
                                <p class="optionContainerTitle">Badge</p>
                                <span class="optionContainerContent">Do you have a website of your own and you want to add some <b>ConnSuite SWAG</b> to it? Say no more!</span>
                                <a href="../../intro/badge.php" id="passwordChangeButton" class="buttonTypeOutlineGray" >Check out the Badge</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">
                        <div class="optionOuterContainer">
                            <div class="optionContainer">
                                <div style="display: flex; justify-content: center; width: 100%;">
                                    <div id="badgeIllustrationContainer">
                                        <img src="../../image/alias_illustration.png">
                                    </div>
                                </div>
                                <p class="optionContainerTitle">Username & Aliases</p>
                                <span class="optionContainerContent">Do you wish to change your username or add an alias? Manage it wisely as you can only have 1 main username and 1 alias!</span>
                                <a href="alias.php" id="passwordChangeButton" class="buttonTypeOutlineGray">Manage</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">
                        <div class="optionOuterContainer">
                            <div class="optionContainer">
                                <div style="display: flex; justify-content: center; width: 100%;">
                                    <div id="badgeIllustrationContainer">
                                        <img src="../../image/about_conn_illustration.png">
                                    </div>
                                </div>
                                <p class="optionContainerTitle">About</p>
                                <span class="optionContainerContent">Too many accounts and networks? Too many business acquaintances sharing cards with you that you forget home? Find out how clear the social sky!</span>
                                <a href="../../intro/index.php" id="passwordChangeButton" class="buttonTypeOutlineGray" >Read about ConnSuite</a>
                            </div>
                        </div>
                    </div>


                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">
                        <div class="optionOuterContainer">
                            <div class="optionContainer">
                                <div style="display: flex; justify-content: center; width: 100%;">
                                    <div id="badgeIllustrationContainer">
                                        <img src="../../image/faq_conn_illustration.png">
                                    </div>
                                </div>
                                <p class="optionContainerTitle">FAQ</p>
                                <span class="optionContainerContent">Stuck? Check out Frequently Asked Questions and find out how to take full advantage or <b>@connsuite</b>!</span>
                                <a href="../../intro/ask.php" id="passwordChangeButton" class="buttonTypeOutlineGray" >View FAQ</a>
                            </div>
                        </div>
                    </div>


                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">


                            <div class="optionOuterContainer">
                                <div class="optionContainer">
                                    <div id="badgeIllustrationContainer">
                                        <i class="icon-conn-02 colorPrimary" style="font-size: 40pt;"></i>
                                    </div>
                                    <p class="optionContainerTitle" style="line-height: 1.5">Terms & Privacy Policy</p>
                                    <span class="optionContainerContent">Because it looks professional to have these on our website, we included them. To sum it all up: you trust us we trust you!</span>
                                    <a href="../../intro/terms.php" id="passwordChangeButton" class="buttonTypeOutlineGray" >View T&C and PP</a>
                                </div>
                            </div>

                    </div>


                    <div class="col-sm-4 col-xs-12" style="margin: 0; padding: 0;">


                        <div class="optionOuterContainer">
                            <div class="optionContainer">
                                <div id="badgeIllustrationContainer">
                                    <i class="material-icons"  style="color: #ff2c14;font-size:35pt;">delete_outline</i>
                                </div>
                                <p class="optionContainerTitle" style="line-height: 1.5;color: #ff2c14 ">Leave ConnSuite </p>
                                <span class="optionContainerContent" style="color: #ff2c14">Would you like to remove your account and all data related to it from ConnSuite? This is a permanent process and once you decide on it, we will remove your account within a few hours.</span>
                                <div onclick="sendRemoveRequest()" id="passwordChangeButton" class="buttonTypeOutlineGray" style="color: #ff2c14" >Remove Account</div>
                            </div>
                        </div>

                    </div>
            </div>

            </div>
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

<script src="../../js/p/profile/edit.js"></script>





</body>
</html>
