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
include_once("../../base/config.php");
include_once("../../base/user.php");


/**
 * Check if user is stored in session
 */
include_once('../../session/check.php');
extractSession(PAGE_NETWORK_ADD_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);





?>


<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Add Network | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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



    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../../support/fonts/custom-icon/css/conn-custom.css" >



    <link rel="stylesheet" href="../../css/util.css">
    <link rel="stylesheet" href="../../css/p/network/add.css">

    <link rel="stylesheet" href="../../support/custom-ui/material_design_toggle.css">

    <link rel="stylesheet" href="../../support/animate/file.css" >

    <script src="../../support/slick-carousel/slick.js" ></script>
    <link rel="stylesheet" href="../../support/slick-carousel/slick.css">
    <link rel="stylesheet" href="../../support/slick-carousel/slick-theme.css">


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
        echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_NETWORK_ADD_KEY].',"'.$user->name.'","Add a New Network","'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
        ?>
    });

    var depthToRoot = <?php echo $depthToRoot[PAGE_NETWORK_ADD_KEY] ?> ;
    var userID = <?php echo $user->ID ?>;
    var token = "<?php echo $user->getToken(); ?>";
    var firstname = "<?php echo $user->firstname ?> ";
    var requestNetworkListURL = "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_NETWORK_DEFAULT_LIST] ?>" ;
    var requestLabelListURL = "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_LABEL_LIST] ?>";
    var doNetworkAddURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_NETWORK_ADD] ?>" ;
    let stepID = "<?php echo $user->getStepID();?>"; try{stepID = parseInt(stepID);}catch(err){stepID = TUTORIAL_STEP_WELCOME;}



</script>

<div style="width: 100%; flex: 1; display: flex; justify-content: center;align-items: center;">

    <div id="backgroundContainer">

        <div id="backgroundCard" class="container-fluid row" style="">
            <div class="col-md-6 col-xs-12 backgroundCardHalf">
                <div id="backgroundCardHalfDivider"></div>

                <div>
                    <p class="leftTitle">Add to your profile</p>
                </div>

                <p class="leftChoiceHeading" id="chooseDefaultButton">Choose a default network</p>

                <div style="min-height: 5px; width: 100%;">
                <div id="leftNetworksTable"> </div>
                </div>
                <div id="C_networkDivider" class="divider" style="background: #04befe; max-width: 400px; margin-top: 20px; margin-bottom: 20px;display: none"></div>

                <div id="C_networkNameContainer" >

                    <p class="rightFormTitle">Network's Name(*)</p>
                    <div style="display: flex; flex-direction: row;align-items: center">
                        <input maxlength="30" style="flex: 1" class="rightFormInput" type="text" name="C_networkName" id="C_networkName" title="Custom Network's name" placeholder="What shall we call it?" required>
                    </div>
                    <div class="divider"></div>
                </div>


                <p id="C_or" class="leftChoiceHeading" style="margin-top: 10px;">or</p>

                <div>
                    <div id="createCustomNetworkButton" class="buttonTypeFullWhite">Create Custom Network</div>
                </div>



                <div class="cardNetworks" style="width: 100%;position: relative">
                    <div class="cardNetworksProducts" style="position: relative">


                    </div>
                    <div class="cardNetworksFooter">
                        <a class="cardNetworksButton" id="prev" href="#" ripple="" ripple-color="#666666">Prev</a>
                        <a class="cardNetworksButton" id="next" href="#" ripple="" ripple-color="#666666">Next</a></div>


                    <div id="C_choosePictureContainer">

                            <div id="pictureContainer">


                                <div id="noPictureContainer">
                                    <img src="../../image/network/normal/icon_default.png" style="width: 180px; height: 180px; margin-bottom: 10px;">
                                </div>
                                <div id="outputContainer" style="display: none">
                                <img id="output" src="" style="object-position: center; max-height: 180px; max-width: 180px;  /* Center the image within the element */" />
                                </div>


                            </div>




                        <input type="file" id="customImage" name="customImage"
                               style="margin-top: 10px; z-index: 10; display: none" accept="image/*"
                               onchange="loadFile(event)">


                            <span class="modalButton" id="chooseThumbnailButton">CHOOSE ANOTHER ICON</span>


                    </div>


                </div>


            </div>
            <div class="col-md-6 col-xs-12 backgroundCardHalf">

                <div id="backgroundCardRightInnerContainer">


                    <div style="width: 100%; display: flex; flex-direction: column">
                        <p id="rightFormTitleUsername" class="rightFormTitle">Username (*)</p>
                        <div style="display: flex; flex-direction: row;align-items: center">
                            <span   id="rightFormUserlink"></span>
                            <input maxlength="70" style="flex: 1" class="rightFormInput" type="text" name="username" id="username" title="Your Username" placeholder="e.g. john123" required>
                        </div>
                            <div class="divider"></div>
                    </div>

                    <div id="accountNameField" style="width: 100%; display: none;">
                        <div style="margin-top: 20px; display: flex;flex-direction: column">
                            <p class="rightFormTitle">Account's Username (optional)</p>
                            <div style="display: flex; flex-direction: row;align-items: center">
                                <input maxlength="70" style="flex: 1" class="rightFormInput" type="text" name="accountName" id="accountName" title="Display Name for this Account " placeholder="e.g. johnsmith123" required>
                            </div>
                            <div class="divider"></div>
                        </div>
                    </div>



                    <div style="margin-top:20px; width: 100%; display: flex;flex-direction: column;">
                            <p class="rightFormTitle">Public / Request Only (*)</p>
                            <span style="color: #aaaaaa; font-size: 0.7em">Choose if this account will be seen on your public profile or if you want to make it available only to those who request your business card.</span>

                            <div id="rightDetailToggleOuterContainer">
                                <div id="rightDetailToggleBoxContainer">
                                    <span id="publicToggleTitle">Public (On)</span>
                                    <input type="checkbox" id="publicToggle" class="c_materialDesignToggleCheckbox c_materialDesignToggleHidden" checked/>
                                    <label for="publicToggle" class="c_materialDesignToggleLabel"></label>
                                </div>

                            </div>


                        </div>

                    <div style="margin-top:20px; width: 100%; display: flex;flex-direction: column">
                        <p class="rightFormTitle">Labels<span style="font-size: 9pt; color: #aaaaaa; margin-left: 5px">(click to select)</span></p>

                        <div id="rightLabelContainer" class="container-fluid row" style="padding: 0;margin: 0;">
                        </div>
                    </div>


                    <div style="margin-top:20px; width: 100%; display: flex;flex-direction: column">
                        <p class="rightFormTitle">Description</p>

                            <textarea spellcheck="true" style="max-height: 80px;" class="rightFormInput" type="text" name="description" id="description" title="Your Description" rows="3" placeholder="Description eg. You can contact me here for business proposals." ></textarea>
                        <div class="divider"></div>
                    </div>




                    <div id="rightAddNetworkButtonContainer">
                        <div id="addNetworkButton" class="buttonTypeOutlinePrimary" style=" min-width: 200px;">Add Network</div>
                    </div>



                </div>




            </div>



        </div>

    </div>

</div>




</div>










<script src="../../js/model/network.js"></script>
<script src="../../base/config.js"></script>
<script src="../../js/system/toolbar.js"></script>
<script src="../../js/p/network/add.js"></script>
<script src="../../js/util.js"></script>

</body>
</html>

