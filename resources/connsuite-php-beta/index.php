<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 22-Feb-17
 * Time: 2:46 PM
 */
include_once("base/config.php");
include_once ("base/user.php");
$pathToLibs = goToBaseTarget(PAGE_PROFILE_KEY, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

$user = (new User())->mapUser($_SESSION['user']);
if($_GET['ref']) addConnLog(LOG_TYPE_REFERRER,null,null,array("ref"=>secureString($_GET['ref'])),$conn);
/**
 * No username provided
 */
if(!isset($_GET['username']) && !isset($_GET['self'])) {
        if ($user != null && $user->ID != null && $user->token != null && $user->token->value != null)
            header("Location: p/dashboard.php");
        else {
            header("Location: welcome.php");
        }
}
/**
 * Username provided
 */


$selectedUsername = isset($_GET['self']) ? $user->username : secureString($_GET['username']);

$self = $user!=null && ($selectedUsername == $user->username);


?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Profile | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">


    <!--CONNSUITE META-->
    <?php printMeta_Profile($selectedUsername,$conn) ?>

    <script language="JavaScript" type="text/javascript" src="js/jquery-3.2.1.min.js"></script>


    <script src="support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="support/bootstrap4/css/bootstrap.css">
    <script src="support/bootstrap4/js/bootstrap.js"></script>

    <script src="support/loading-pace/pace.min.js"></script>
    <link rel="stylesheet" href="support/loading-pace/pace.css">

    <script src="support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="css/profile.css">
    <link rel="stylesheet" href="css/util.css">


    <link rel="stylesheet" href="css/system/conn_item.css">
    <link rel="stylesheet" href="css/system/conn_article.css">

    <link rel="stylesheet" href="support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="support/animate/file.css" >






</head>


<body>

<div class="transitionContainer" style="display: flex">
    <div style="width: 100%; height: 100%;display: flex;justify-content: center; align-items: center;">
        <img src="image/dualRing.svg">
    </div>
</div>

<div class="background" style="display: flex">
<div style="width: 100%;">


    <div id="toolbar"></div>

    <script>
        $(function(){
            <?php
            if($user) echo 'loadToolbar('.$depthToRoot[PAGE_PROFILE_KEY].',"'.$user->name.'",PAGE_PUBLIC_PROFILE,"'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
            else echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_PROFILE_KEY].',"Stranger","'.$selectedUsername.'","image/connsuite_icon_inverted_rounded.png",null);';
            if($selectedUsername == $user->username) echo 'loadLeftSideBar('.$depthToRoot[PAGE_PROFILE_KEY].', PAGE_PUBLIC_PROFILE, {username : "'.$user->username.'" });';
            ?>
        });
        var selectedUsername = "<?php echo $selectedUsername ?>";
        var depthToRoot = <?php echo $depthToRoot[PAGE_PROFILE_KEY] ?> ;
        var self = false;
        var username=  null;
        var userID = null;
        var token = null;
        <?php
        if($user && $user->username && $user->ID && $user->getToken()){
           echo '
            username=  "'.$user->username.'"; 
            userID = '.$user->ID.';
            token = "'.$user->getToken().'"; 
            
            self = username == selectedUsername
            ';
        }
        ?>

        var version = "<?php echo $user->version ?>";

        var retrieveUserURL = "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_USER] ?>";
        var retrieveMainUsernameURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ALIAS_RETRIEVE_MAIN] ?>";
        var retrieveMoreNetworksURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_PROFILE_RETRIEVE_NETWORK_LIST] ?>";

        var retrieveArticleListURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_PROFILE_RETRIEVE_ARTICLE_LIST] ?>";
        var retrieveRequestStatusURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_BUSINESS_REQUEST_STATUS] ?>";
        var doBusinessRequestURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_BUSINESS_REQUEST] ?>";

    </script>

    <div style="width: 100%; display: flex; justify-content: center;flex-direction: column">

        <div id="userHeaderContainer">

            <div class="customContainerS userHeaderInnerContainer">

                <div style=" height: 200px;width: 200px;">
                    <img id="profilePicture" src="" />
                </div>

                <p id="profileName"></p>
                <p id="profileTagline" style="margin-bottom: 20px;"></p>


                    <span class="profileRequestButton" id="profileRequestButton"><i style="font-size: 15pt; margin-right: 5px;" class="material-icons">&#xE870;</i> Request Business Card<span class="buttonCSLoaderWhite"></span></span>


            </div>
            <div class="backgroundOverlay"></div>
        </div>

        <div class="customContainerS" style="display: flex; flex-direction: row; position: relative" >
            <div id="leftSideBar"></div>

         <div id="mainContentContainer" style="flex: 1">

            <div id="descriptionContainer">
                <p class="sectionHeading">About</p>
                <p id="profileDescription"></p>
            </div>

            <p class="sectionHeading" id="headingAccounts">Networks & Accounts</p>
            <div id="connItemsParent" class="container-fluid row" style="margin: 0;">
                <div  style="margin-top: 10px; margin-left: 20px;"><span style="color: #eeeeee; font-size: 11pt; font-weight: 400;">There are no networks shared yet.</span></div>

            </div>

            <div id="loadMoreContainer">
                <div id="loadMoreNetworksButton">
                <i class="material-icons">&#xE5D3;</i>
                <span>Load More Networks</span>
                </div>
            </div>

            <p class="sectionHeading" id="headingStory" style="margin-top: 20px;"></p>

             <div id="articleParent" class="container-fluid row" style="width: 100%; margin: 0 0 40px 0;">
                 <div  id="articleParentHolder"><span style="color: #eeeeee; font-size: 11pt; font-weight: 400;">There are no stories shared yet.</span></div>
             </div>


             <div id="loadMoreArticlesContainer">
                 <div id="loadMoreArticlesButton">
                     <i class="material-icons">&#xE5D3;</i>
                     <span>Load More Articles</span>
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
                        <a href="p/dashboard.php" id="publicToggleTitle">Edit in Dashboard</a>
                    </div>

                </div>
            </div>

            <div id="rightDetailAccountCardContainer">
                <div style=" flex: 1;position: relative;">
                    <img id="rightDetailAccountIcon" style="width: 100%;" src="">
                    <div data-tooltip="Number of clicks" class="tooltip-bottom" id="rightDetailClickContainer"><span></span></div>

                </div>

                <div style="flex: 3">
                    <div id="rightDetailAccountCardCredentialsContainer">
                        <div style="text-align: left;">
                            <a id="rightDetailAccountCardCredentialsNetworkURL" target="_blank"  href=""><p id="rightDetailAccountCardCredentialsNetwork"></p></a>
                            <p id="rightDetailAccountCardCredentialsUsername"></p>
                        </div>
                    </div>
                </div>


                <a target="_blank" id="visitAccountButton">
                    <i class="material-icons colorPrimary" style="font-size: 18pt;">&#xE5C8;</i>
                </a>

            </div>




        </div>

        <div id="rightDetailSectionInfoContainer">
            <p class="rightDetailHeading">Account Additional Info</p>
            <p id="rightDetailInfo"></p>
        </div>


        <div id="rightDetailSectionLabelsContainer">
            <p class="rightDetailHeading">Account Labels</p>
            <div style="width: 100%;">
                <div id="rightLabelContainer" class="container-fluid row" style="padding: 0; margin: 0;">



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


            </div>
        </div>

    </div>

</div>

<!------------------------------------------------->
<!-- MODAL ZONE -->

<!--SHARE MODAL-->

<div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Share your account</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

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

<script src="js/util.js"></script>
<script src="base/config.js"></script>
<script src="js/model/network.js"></script>
<script src="js/system/conn_item.js"></script>
<script src="js/model/conn_user.js"></script>
<script src="js/system/sidebar_left.js"></script>


<script src="js/system/toolbar.js"></script>

<script src="js/profile.js"></script>



<script src="js/model/article.js"></script>
<script src="js/system/conn_article.js"></script>





</body>
</html>
