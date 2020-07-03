<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 08/09/2017
 * Time: 15:17
 */



/**
 * Important INCLUDES
 */
include_once("../base/config.php");
include_once ("../base/user.php");

/**
 * Check if user is stored in session
 */

include_once('../session/check.php');
extractSession(PAGE_INTRO_BADGE);
$user = (new User())->mapUser($_SESSION['user']);


?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Badge | ConnSuite</title>
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


    <script src="../support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../css/intro-badge.css">
    <link rel="stylesheet" href="../css/util.css">



    <link rel="stylesheet" href="../support/animate-it/animations.css" >










</head>


<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #ffffff; overflow-x: hidden"  >

<script>

    var depthToRoot = <?php echo $depthToRoot[PAGE_INTRO_BADGE] ?> ;
    var userID = null;
    var token  = null;
    <?php if($user && $user->getID()) echo "userID =".$user->getID().";";?>
    <?php if($user && $user->getToken()) echo "token ='".$user->getToken()."';";  ?>

</script>


    <div  class="background">
     <div style="width: 100%; padding-bottom: 100px;">

         <div id="introHeader" style="width: 100%;">

             <div id="introToolbar">
                 <div class="customContainerS container-fluid row" id="introToolbarInnerContainer" >
                     <div id="introToolbarLogoContainer" class="col-lg-6 col-6" style="height: 100%;">
                         <a href="../p/dashboard.php" style="display: flex; height: 100%; align-items: center;">
                             <img src="../image/connsuite_full_horiz_white.png" id="introToolbarLogo">
                         </a>
                     </div>

                     <div class="col-lg-6 col-6" style="padding: 0;">
                         <div id="introToolbarButtons">
                             <a href="index.php" id="introToolbarButtonConnect">
                                 <div><span>About</span></div>
                             </a>
                             <a href="../p/dashboard.php" id="introToolbarButtonConnect">
                                 <div><span><?php  if ($user != null && $user->ID != null && $user->token != null && $user->token->value != null) echo "Dashboard"; else echo "Connect" ?></span></div>
                             </a>
                         </div>
                     </div>




                 </div>

             </div>
             <div style="width: 100%; display: flex; justify-content: center;flex-direction: column;">

                 <div class="customContainer container-fluid row" id="mainHeaderContent">
                     <div class="col-lg-6 col-md-12" style="height: 100%;">
                         <div  style="height: 100%; display: flex; justify-content: center;flex-direction: column;">
                             <div class="mobileDivider"></div>
                             <div id="mainHeaderHeadlineContainer">
                                 <div id="mobileIntroLogo" style="width: 100%; padding-top: 20px; padding-bottom: 20px;">
                                     <img src="../image/connsuite_full_horiz_white_x2.png" style="width: 80%;margin-left: 10%;">
                                 </div>

                                 <span id="introHeadline">ConnSuite SWAG</span>

                             </div>
                             <p id="introHeadlineAbout">Do you want to make the most out of this account? Embed it into your personal website and become a real ConnSuite Star!</p>
                         </div>
                     </div>

                     <div class="col-lg-6 col-md-12" style="height: 100%;" id="introPlanetContainer">
                        <div style="display: flex; height: 100%; width: 100%; align-items: center; flex-direction: column; justify-content: center;">
                            <div class="connsuite-badge" data-location="home" data-client-bg="0" data-client-id="<?php echo $user->ID ?>" style="margin-bottom: 20px;"></div>
                            <div class="connsuite-badge" data-location="home" data-client-bg="1" data-client-id="<?php echo $user->ID ?>"></div>
                        </div>
                     </div>
                 </div>
             </div>

         </div>

         <div style="width: 100%;display: flex; flex-direction: column; justify-content: center;">
             <section class="customContainer" style="height: auto;display: flex; padding-left: 15px; padding-right: 15px; flex-direction: column; align-items: center">
                 <p class="stepSectionTitle" id="features">Step 1</p>
                 <span class="stepSectionContent" style="padding-bottom: 20px;">Copy and paste the following script at the bottom of your page.<br>(You only need to do this once) </span>
                 <span style="margin-top: 20px; width: 100%; max-width: 500px;" class="helperScriptPrint"></span>

             </section>

             <section class="customContainer" style="height: auto;display: flex;  flex-direction: column; align-items: center">
                 <p class="stepSectionTitle" id="features">Step 2</p>
                 <span class="stepSectionContent">Choose the badge that works best with your website and use the code under the selected badge.</span>
                 <div class="container-fluid row" style="margin: 50px 0 0 0; padding: 0;">
                     <div class="col-md-6 col-xs-12 col-12 badgeCol">
                         <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                         <div style="margin-bottom: 20px;" class="connsuite-badge" data-location="home" data-client-bg="0" data-client-id="<?php echo $user->ID ?>"></div>
                         <span style="width: 100%;"  id="helperBadgeWhitePrint"></span>
                     </div>
                     </div>
                     <div class="col-md-6 col-xs-12 col-12">
                         <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                         <div style="margin-bottom: 20px;" class="connsuite-badge" data-location="home" data-client-bg="1" data-client-id="<?php echo $user->ID ?>"></div>
                         <span style="width: 100%;" id="helperBadgeGPrint"></span>
                         </div>

                     </div>

                 </div>

             </section>


             <section class="customContainer" style="height: auto;display: flex; padding-left: 15px; padding-right: 15px; flex-direction: column; align-items: center">
                 <p class="stepSectionTitle" id="features">Step 3</p>
                 <span class="stepSectionContent" >Enjoy your ConnSuite experience!</span>
                    <div style="height: 50px; padding-top: 20px;">


                        <a href="../p/dashboard.php" ><span class="sendButton">Go back to the Dashboard</span></a>
                    </div>

             </section>
         </div>





    </div>

    </div>



<script src="../base/config.js"></script>
<script src="../js/util.js"></script>


<!--<script src="http://localhost:8888/connsuite/badge/conn-badge-small.js" async></script>-->
<script src="https://www.connsuite.com/badge/conn-badge-small.js" async></script>


<script src="../js/model/network.js"></script>

<script src="../js/intro-badge.js"></script>
<script src="../support/animate-it/css3-animate-it.js"></script>




<!-- Start of Async Drift Code -->
<script>
    !function() {
        var t;
        if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
            t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
            t.factory = function(e) {
                return function() {
                    var n;
                    return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
                };
            }, t.methods.forEach(function(e) {
            t[e] = t.factory(e);
        }), t.load = function(t) {
            var e, n, o, i;
            e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
        });
    }();
    drift.SNIPPET_VERSION = '0.3.1';
    drift.load('2kt7vwbtvspm');
</script>
<!-- End of Async Drift Code -->



</body>
</html>
