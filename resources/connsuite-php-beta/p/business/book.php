<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 25/08/2017
 * Time: 19:42
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
extractSession(PAGE_BUSINESS_BOOK_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);




?>



<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Business Book | ConnSuite | Your official online networking suite</title>
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


    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../../css/p/business/book.css">
    <link rel="stylesheet" href="../../css/util.css">
    <link rel="stylesheet" href="../../css/system/conn_item.css">
    <link rel="stylesheet" href="../../css/system/conn_article.css">

    <link rel="stylesheet" href="../../support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="../../support/animate/file.css" >
    <script src="../../support/dotdotdot/jquery.dotdotdot.min.js"></script>


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



    <div style="width: 100%;" >


        <div id="toolbar"></div>

        <script>
            $(function(){
                <?php
                echo 'loadToolbar('.$depthToRoot[PAGE_BUSINESS_BOOK_KEY].',"'.$user->name.'",PAGE_BUSINESS_BOOK,"'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
                echo 'loadLeftSideBar('.$depthToRoot[PAGE_BUSINESS_BOOK_KEY].', PAGE_BUSINESS_BOOK, {username : "'.$user->username.'" });';

                ?>

            });

            var depthToRoot = <?php echo $depthToRoot[PAGE_BUSINESS_BOOK_KEY] ?> ;
            var userID = <?php echo $user->ID ?>;
            var username =  "<?php echo $user->username ?>";
            var token = "<?php echo $user->getToken(); ?>";
            var retrieveUserURL = "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_USER_MINI] ?>";
            var retrieveConnectListURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_BUSINESS_CONNECT_LIST] ?>";
            var removeBusinessConnectionURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_REMOVE_BUSINESS_CONNECTION] ?>";
            var retrieveCustomBusinessCardsURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_BUSINESS_CUSTOM_LIST] ?>";
            var editCustomBusinessCardURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_BUSINESS_CUSTOM_CARD_EDIT] ?>";
            var addCustomBusinessCardURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_BUSINESS_CUSTOM_CARD_ADD] ?>";
            var deleteCustomBusinessCardURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_BUSINESS_CUSTOM_CARD_DELETE] ?>";
            let stepID = "<?php echo $user->getStepID();?>"; try{stepID = parseInt(stepID);}catch(err){stepID = TUTORIAL_STEP_WELCOME;}
        </script>

        <div style="width: 100%; display: flex; justify-content: center;">


            <div class="customContainer" style="background: #ffffff; min-height: 100vh;display: flex; flex-direction: row; position: relative">

                <div id="leftSideBar"></div>
                <div id="bookContent">

                    <p  class="sectionHeading">My Business Card</p>

                    <div class="container-fluid row" style="position: relative; margin: 20px 0 0 0; padding: 0;">
                        <div class="col-lg-6 col-md-6 col-xs-12 businessCardContainer">
                            <div class='businessCard' id="businessCardFront" >
                                <div class='businessCardLeft'>
                                    <div id="selfBusinessCardPictureContainer">
                                    <img id="selfBusinessCardPicture"/>
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
                        </div>

                        <div class="col-lg-3 col-xs-12" id="pendingRequestsOuterContainer">
                                <div class="pendingRequestCounterContainer">
                                    <span id="pendingRequestsNumber">0</span>
                                    <p id="pendingRequestsHelper">Pending Requests</p>
                                    <span id="pendingRequestsButton" class="buttonTypeOutlinePrimary">Check</span>
                                </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-xs-12 businessPassContainer">
                            <div class="eventPassOuterContainer">
                                <div class="eventPassContainer">
                                    <div style="display: flex; justify-content: center; width: 100%;">

                                    </div>
                                    <p class="eventPassTitle">My Business Pass</p>
                                    <span class="eventPassContent">Are you at a business event? Make as many connections as possible. Scan the official ConnSuite-QR of their account or show yours! All directly from your device. </span>
                                    <a title="Visit Show&Scan Page" href="scan.php" class="eventPassButton" ><span>Show & Scan</a>
                                </div>
                            </div>
                    </div>



                    </div>





                    <div style="width: 100%; display: flex;justify-content: flex-start;">

                    <a href="../search.php" data-tooltip="Request and bookmark business cards of your acquaintances. Tap to search for them." class="sectionHeading tooltip-right" style="margin-top: 20px;display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                        <p style="margin: 0;">My Business Book</p>
                        <div id="addBusinessBookButton"><span>+</span></div>
                    </a>
                    </div>

                    <section class="container-fluid row" id="bcParent" style="position: relative; margin: 20px 0 0 0; padding: 0;">



                    </section>

                    <div style="width: 100%; display: flex;justify-content: flex-start;">
                        <p  data-tooltip="Transfer your paper buinsess cards online." class="sectionHeading tooltip-right" style="margin-top: 10px; color: #aaaaaa">My Offline Cards <span style="margin-left: 5px;" id="customNumber">0</span> / <span style="margin-left: 5px;" id="customLimit">30</span></p>
                    </div>



                    <section class="container-fluid row" id="offlineParent" style="position: relative; margin: 20px 0 60px 0; padding: 0;">




                    </section>



                </div>




            </div>
        </div>


    </div>




    <!------------------------------------------------->
    <!-- MODAL ZONE -->





    <!-- DELETE MODAL -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >
            <div class="modal-content" >
                <div class="modal-header modal-headerDelete">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Remove this connection from your business book?</h4>
                </div>
                <div class="modal-body">
                <span id="deleteModalContent">

                </span>




                </div>
                <div class="modal-footer">
                    <span id="deleteModalDeleteButton"  class="modalButtonDelete" data-dismiss="modal">Delete</span>
                    <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
                </div>
            </div>
        </div>
    </div>



    <!--CUSTOM CARD MODAL-->

    <div class="modal fade" id="customModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >
            <div class="modal-content" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Offline Card Details</h4>
                </div>
                <div class="modal-body">
                    <div style="width: 100%; display: flex; flex-direction: column; justify-content: flex-start">
                    <input type="text" id="customModalName" maxlength="50"/>
                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="customModalPhoneNumber" class="customModalLabel">Phone Number</label>
                            <input class="customModalText"  id="customModalPhoneNumber"/>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="customModalEmail" class="customModalLabel">Email</label>
                            <input class="customModalText" type="email" id="customModalEmail"/>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="customModalWebsite" class="customModalLabel">Website</label>
                            <input class="customModalText" type="url" id="customModalWebsite"/>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="customModalDescription" class="customModalLabel">Description</label>
                            <textarea rows="3" style="min-height: 100px;" class="customModalText"  id="customModalDescription"></textarea>
                        </div>


                        <div id="picturesShowcaseContainer">
                            <label class="customModalLabel" style="width: 100%; text-align: left;">Images</label>
                            <img id="picture1Showcase" src="" />
                            <img id="picture2Showcase" src=""/>
                        </div>



                        <div id="editCustomModalPictureContainer" style="display: none; flex-direction: column; justify-content: flex-start">
                            <div style="display: flex; flex-direction: row;">
                                <div style="display: flex; flex-direction: column; justify-content: flex-start">
                                    <label class="customModalLabel">Picture</label>

                                    <div class="addCustomModalPictureContainer">
                                        <img class="addCustomModalTargetPicture" id="targetEditPicture1" src=""/>
                                        <div id="addButtonEditPicture1" class="addCustomModalPictureButton">
                                            <i class="material-icons">&#xE254;</i>
                                        </div>
                                        <input type="file" id="elementEditPicture1" style="display: none" accept="image/*">
                                    </div>

                                    <span class="addCustomModalPictureDeleteButton" id="deleteButtonEditPicture1">Delete</span>

                                </div>




                                <div style="display: flex; margin-left: 20px; flex-direction: column; justify-content: flex-start">
                                    <label class="customModalLabel">Picture</label>

                                    <div class="addCustomModalPictureContainer">
                                        <img class="addCustomModalTargetPicture" id="targetEditPicture2" src=""/>
                                        <div id="addButtonEditPicture2" class="addCustomModalPictureButton">
                                            <i class="material-icons">&#xE254;</i>
                                        </div>
                                        <input type="file" id="elementEditPicture2" style="display: none" accept="image/*">
                                    </div>

                                    <span class="addCustomModalPictureDeleteButton" id="deleteButtonEditPicture2">Delete</span>

                                </div>





                            </div>



                            <div class="modalDivider"></div>
                        </div>



                    </div>


                </div>
                <div class="modal-footer">
                    <span id="saveButton" class="modalButton" style="display: none" >Save</span>
                    <span id="editButton" class="modalButton" >Edit</span>
                    <span  id="cancelButtonEditModal" class="modalButtonCancel" data-dismiss="modal">Close</span>
                </div>
            </div>
        </div>
    </div>


    <!-- DELETE CUSTOM CARD MODAL -->
    <div class="modal fade" id="deleteCustomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >
            <div class="modal-content" >
                <div class="modal-header modal-headerDelete">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Remove this card from your offline list?</h4>
                </div>
                <div class="modal-body">
                    <div id="deleteCustomModalName">

                    </div>

                </div>
                <div class="modal-footer">
                    <span id="deleteModalDeleteCardButton"  class="modalButtonDelete" data-dismiss="modal">Delete</span>
                    <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
                </div>
            </div>
        </div>
    </div>


    <!--ADD CUSTOM CARD MODAL-->
    <div class="modal fade" id="addCustomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" >
            <div class="modal-content" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Add New Offline Card</h4>
                </div>
                <div class="modal-body">
                    <div style="width: 100%; display: flex; flex-direction: column; justify-content: flex-start">


                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="addCustomModalName" class="customModalLabel colorPrimary">Contact Name</label>
                            <input placeholder="Contact's name here" class="addCustomModalText" type="text" maxlength="50" id="addCustomModalName"/>
                            <div class="modalDivider"></div>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="addCustomModalPhoneNumber" class="customModalLabel">Phone Number</label>
                            <input placeholder="Contact's phone number" class="addCustomModalText" type="number" id="addCustomModalPhoneNumber"/>
                            <div class="modalDivider"></div>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="addCustomModalEmail" class="customModalLabel">Email</label>
                            <input class="addCustomModalText" placeholder="Contact's Email" type="email" id="addCustomModalEmail"/>
                            <div class="modalDivider"></div>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="addCustomModalWebsite" class="customModalLabel">Website</label>
                            <input class="addCustomModalText" type="url" placeholder="Contact's Website" id="addCustomModalWebsite"/>
                            <div class="modalDivider"></div>
                        </div>

                        <div style="display: flex; flex-direction: column; justify-content: flex-start">
                            <label for="addCustomModalDescription" class="customModalLabel">Description</label>
                            <textarea rows="3"  class="addCustomModalText" placeholder="Other Details" id="addCustomModalDescription" style="max-width: 100%; min-height: 80px;"></textarea>
                            <div class="modalDivider"></div>
                        </div>


                        <div id="addCustomModalPictureContainer" style="display: flex; flex-direction: column; justify-content: flex-start">
                            <div style="display: flex; flex-direction: row;">
                                <div style="display: flex; flex-direction: column; justify-content: flex-start">
                                    <label class="customModalLabel">Picture 1</label>

                                    <div class="addCustomModalPictureContainer">
                                        <img class="addCustomModalTargetPicture" id="targetPicture1" src=""/>
                                        <div id="addButtonPicture1" class="addCustomModalPictureButton">
                                            <i class="material-icons">&#xE254;</i>
                                        </div>
                                        <input type="file" id="elementPicture1" style="display: none" accept="image/*">
                                    </div>

                                    <span class="addCustomModalPictureDeleteButton" id="deleteButtonPicture1">Delete</span>

                                </div>




                                <div style="display: flex; margin-left: 20px; flex-direction: column; justify-content: flex-start">
                                    <label class="customModalLabel">Picture 2</label>

                                    <div class="addCustomModalPictureContainer">
                                        <img class="addCustomModalTargetPicture" id="targetPicture2" src=""/>
                                        <div id="addButtonPicture2" class="addCustomModalPictureButton">
                                            <i class="material-icons">&#xE254;</i>
                                        </div>
                                        <input type="file" id="elementPicture2" style="display: none" accept="image/*">
                                    </div>

                                    <span class="addCustomModalPictureDeleteButton" id="deleteButtonPicture2">Delete</span>

                                </div>





                            </div>



                            <div class="modalDivider"></div>
                        </div>



                    </div>


                </div>
                <div class="modal-footer">
                    <span id="addButton" class="modalButton" >Add New Card</span>
                    <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
                </div>
            </div>
        </div>
    </div>





</div>

<script src="../../js/model/network.js"></script>
<script src="../../js/util.js"></script>
<script src="../../base/config.js"></script>

<script src="../../js/system/conn_item.js"></script>
<script src="../../js/system/sidebar_left.js"></script>
<script src="../../js/system/toolbar.js"></script>

<script src="../../js/model/custom_bc.js"></script>
<script src="../../js/model/conn_user.js"></script>

<script src="../../js/p/business/book.js"></script>

</body>
</html>

