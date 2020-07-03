<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 27/08/2017
 * Time: 11:58
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
extractSession(PAGE_NOTIFICATIONS_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);



?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Notifications | ConnSuite</title>
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


    <link rel="stylesheet" href="../css/p/notifications.css">
    <link rel="stylesheet" href="../css/util.css">


    <link rel="stylesheet" href="../css/system/conn_item.css">

    <link rel="stylesheet" href="../support/custom-ui/material_design_toggle.css">


    <link rel="stylesheet" href="../support/animate/file.css" >
    <script src="../support/flip/script.js"></script>



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
                echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_NOTIFICATIONS_KEY].',"'.$user->name.'","Notifications Center","'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
                ?>
            });

            var depthToRoot = <?php echo $depthToRoot[PAGE_NOTIFICATIONS_KEY] ?> ;
            var userID = <?php echo $user->ID ?>;
            var username = "<?php echo $user->username ?>";
            var token = "<?php echo $user->getToken(); ?>";
            var thumbnailURL = "<?php echo $user->thumbnailURL ?>";
            var doRetrieveNotificationListURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_NOTIFICATION_LIST_RETRIEVE] ?>";
            var doRequestAcceptURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ACCEPT_BUSINESS_REQUEST] ?>";
            var doRequestCancelURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_CANCEL_BUSINESS_REQUEST] ?>";
            var doBusinessRequestURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_BUSINESS_REQUEST] ?>";
            var doRetrieveNotificationCountURL =  "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_NOTIFICATION_COUNT] ?>";

        </script>

        <div style="width: 100%; display: flex; justify-content: center;flex-direction: column;">

            <div class="customContainerS" style="background: #ffffff;min-height: 300px;">
                <div id="mainContentContainer">

                    <div id="profileHelperContainer" style="width: 100%; margin-bottom: 40px;padding-left: 10px; padding-right: 10px;">
                        <script>
                            $(function(){printHelper($("#profileHelperContainer"),"This is your notifications center. Keep track of your progress or accept business card requests from here.",true)})
                        </script>
                    </div>


                    <div class="container-fluid row" style="margin: 0; padding: 0;">
                        <div class="col-sm-8 col-xs-12">
                            <div id="notificationsContainer">





                            </div>
                        </div>

                        <div class="col-sm-4 col-xs-12">

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
<script src="../js/model/notification.js" ></script>

<script src="../js/system/toolbar.js"></script>

<script src="../js/p/notifications.js"></script>






</body>
</html>
