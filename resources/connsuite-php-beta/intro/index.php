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
$user = (new User())->mapUser($_SESSION['user']);


?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>About | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">


<!--CONNSUITE META-->
    <?php printMeta_Description();printMeta_Image(); ?>
    <meta property="og:title" content="About ConnSuite | ConnSuite"/>
    <meta property="og:site_name" content="ConnSuite"/>

    <script language="JavaScript" type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>


    <script src="../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../support/bootstrap4/css/bootstrap.css">
    <script src="../support/bootstrap4/js/bootstrap.js"></script>


    <script src="../support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../css/intro.css">
    <link rel="stylesheet" href="../css/util.css">



    <link rel="stylesheet" href="../support/animate-it/animations.css" >


    <link rel="stylesheet" href="../support/ytpop/YouTubePopUp.css" >
    <script src="../support/ytpop/YouTubePopUp.jquery.js"></script>







</head>


<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #ffffff; overflow-x: hidden"  >

<script>
    var userID = null;
    var token  = null;
    <?php if($user && $user->getID()) echo "userID =".$user->getID().";";?>
    <?php if($user && $user->getToken()) echo "token ='".$user->getToken()."';";  ?>
    var retrieveUserURL = "<?php echo ROOT.$pathFromRoot[CORE_COMMON_RETRIEVE_USER_MINI] ?>";
    var sendMessageURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_SEND_INTRO_MESSAGE] ?>";
</script>

<a class="csVideo" href="https://youtu.be/s-mP22EkCfM" style="z-index: 9999999; display: none;"></a>

    <div  class="background">
     <div style="width: 100%;">

        <div id="introHeader" style="width: 100%;">



            <div id="introDotOverlay"><img src="../image/dots.png"></div>
            <div id="introToolbar" >
                <div class="customContainerS container-fluid row" id="introToolbarInnerContainer" >
                    <div id="introToolbarLogoContainer" class="col-md-6 col-sm-12" style="height: 100%;">
                        <a href="../welcome.php" style="display: flex; height: 100%; align-items: center;">
                            <img src="../image/connsuite_full_horiz_white.png" id="introToolbarLogo">
                        </a>
                    </div>

                    <div class="col-lg-6 col-md-12" style="">
                        <div id="introToolbarButtons">
                            <a href="#features" class="introToolbarButton">
                                <span>Features</span>
                                <div class="introToolbarDivider"></div>
                            </a>
                            <a href="#howitworks" class="introToolbarButton">
                                <span>How it works</span>
                                <div class="introToolbarDivider"></div></a>
                            <a href="#who" class="introToolbarButton">
                                <span>Who</span>
                                <div class="introToolbarDivider"></div>
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

                    <span id="introHeadline" style="margin-top: 20px;">
                        The home of all your<br>accounts & networks
                    </span>


                    </div>
                    <p id="introHeadlineAbout">What is there to be done when business cards are already too crowded but still don’t tell the right story about you? Gather your social media accounts & networks and showcase your biggest achievements on ConnSuite. One account to rule them all!</p>
                    <div class="playVideoContainer">
                        <div class="buttonTypeOutlineWhite playVideoButton" style="margin-top: 20px;" >
                            <div class="playVideoButtonOutline"><i style="font-size: 12pt;line-height: 1;" class="material-icons">&#xE037;</i></div>
                            <span style="padding-right: 12px;"> Play video</span>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12" style="height: 100%;" id="introPlanetContainer">
                    <div id="introPlanetParent">
                    <img id="introPlanet" src="../image/intro/icon_planet_white.png">
                    </div>
                </div>
                </div>
            </div>
            <img src="../image/clouds.png" style="width: 100%;"/>
        </div>


         <div style="width: 100%;display: flex; flex-direction: column; justify-content: center;">
             <div class="customContainerPadding" style="height: auto;display: flex; max-width: 1000px; flex-direction: column; align-items: center">
                    <p class="introSectionTitle" id="features">Features</p>

                 <div class="container-fluid row animatedParent animateOnce" style="padding: 30px 0 0 0;width: 100%;">
                     <div style="margin-bottom: 20px;" class="animated fadeInUpShort col-sm-4 col-xs-12">
                         <div class="introFeatureCard" id="FEATURE_CARD_1">
                             <div class="introFeatureCardImageContainer"><img src="../image/intro/illustration_planets.png"></div>
                             <div class="introFeatureMainContainer">
                                 <div class="introFeatureMainFront">
                                     <p class="introFeatureCardTitle">Clear the <b>social sky</b> and boost your online presence with one account to rule them all. </p>
                                     <div style="padding-bottom: 20px;padding-top: 20px;"><span onclick="showCard(1)" class="introFeatureCardButtonOutlineWhite">Read More</span></div>
                                 </div>



                                 <div class="introFeatureMainBack">
                                     <p class="introFeatureCardBackText">Having many accounts & networks is always good as it guarantees that you are present on all the main channels and ready to do business. ConnSuite deals with the problem of showcasing them to potential partners, fans or clients.</p>
                                     <div style="padding-bottom: 10px;padding-top: 10px;"><span onclick="showCard(4)" class="introFeatureCardButtonPrimary">Go Back</span></div>
                                 </div>


                             </div>
                         </div>
                     </div>
                     <div style="margin-bottom: 20px;" class="animated fadeInUpShort col-sm-4 col-xs-12">
                         <div class="introFeatureCard" id="FEATURE_CARD_2">
                             <div class="introFeatureCardImageContainer"><img src="../image/intro/illustration_book.png"></div>
                             <div class="introFeatureMainContainer">
                                 <div class="introFeatureMainFront">
                                     <p class="introFeatureCardTitle">Tell everyone your <b>story</b> in more than 3 small rows on a piece of paper.</p>
                                     <div style="padding-bottom: 20px;padding-top: 20px;"><span onclick="showCard(2)" class="introFeatureCardButtonOutlineWhite">Read More</span></div>
                                 </div>



                                 <div class="introFeatureMainBack">
                                     <p class="introFeatureCardBackText">With a simple business card you can't say a lot about yourself. ConnSuite acts as more than that. It becomes your personal portfolio where you can showcase your projects, skills, articles or achievements.</p>
                                     <div style="padding-bottom: 20px;padding-top: 20px;"><span onclick="showCard(4)" class="introFeatureCardButtonPrimary">Go Back</span></div>
                                 </div>


                             </div>
                         </div>
                     </div>
                     <div style="margin-bottom: 20px;" class="animated fadeInUpShort col-sm-4 col-xs-12">
                         <div class="introFeatureCard" id="FEATURE_CARD_3">
                             <div class="introFeatureCardImageContainer"><img src="../image/intro/illustration_pocket.png"></div>
                             <div class="introFeatureMainContainer">
                                 <div class="introFeatureMainFront">
                                     <p class="introFeatureCardTitle">Build your online business book with 24/7 online access.</p>
                                     <div style="padding-bottom: 20px;padding-top: 20px;"><span onclick="showCard(3)" class="introFeatureCardButtonOutlineWhite">Read More</span></div>
                                 </div>



                                 <div class="introFeatureMainBack">
                                     <p class="introFeatureCardBackText">As your business network grows, so will the stack of business contacts that you might need at any point in your day. Import your offline cards or request one from your partners on ConnSuite.</p>
                                     <div style="padding-bottom: 20px;padding-top: 20px;"><span onclick="showCard(4)" class="introFeatureCardButtonPrimary">Go Back</span></div>
                                 </div>


                             </div>
                         </div>
                     </div>
                 </div>
             </div>


             <div class="customContainerPadding" style="height: auto;display: flex; flex-direction: column; align-items: center">
                 <p class="introSectionTitle" id="howitworks">How it works</p>


                 <div class="howContainer container-fluid row animatedParent animateOnce" >
                     <div style="margin-bottom: 20px; " class="animated fadeInRightShort col-sm-8 col-xs-12">
                         <div style="display: flex;flex-direction: column;">
                             <div class="desktopOutlineOuter">
                                 <div class="desktopCameraCircle"></div>
                                 <div class="desktopOutlineInner" style="
                                  background: url('../image/intro/screen_register.png');
                                  background-repeat: no-repeat;
                                  background-size: cover;
                                  background-position: center;">
                                 </div>
                             </div>
                             <div style="width: 100%; background: #eeeeee; height: 1px;"></div>
                         </div>

                     </div>
                     <div style="margin-bottom: 20px;" class="animated fadeInLeftShort  col-sm-4 col-xs-12">
                         <div class="howSection" style="float: left">
                             <p class="howSectionTitle">Register your account</p>
                             <span class="howSectionContent">To access the full power of ConnSuite, register a new account or connect with Facebook. This way, you will be able to:<br><br>
                                <b>-Add your accounts & networks</b><br>
                                <b>-Write articles & showcase achievements</b><br>
                                <b>-Import offline business cards</b><br>
                                <b>-Request business cards from other ConnSuite users</b><br>
                                <b>-Improve online business presence & more</b><br>

                             </span>
                         </div>

                     </div>

                 </div>

                 <div class="howContainer container-fluid row animatedParent animateOnce">
                     <div style="margin-bottom: 20px; " class="animated fadeInLeftShort col-sm-8 col-xs-12 reverse1">
                         <div style="display: flex;flex-direction: column;">
                             <div class="desktopOutlineOuter">
                                 <div class="desktopCameraCircle"></div>
                                 <div class="desktopOutlineInner" style="
                                  background: url('../image/intro/screen_dashboard.png');
                                  background-repeat: no-repeat;
                                  background-size: cover;
                                  background-position: center;">
                                 </div>
                             </div>
                             <div style="width: 100%; background: #eeeeee; height: 1px;"></div>
                         </div>

                     </div>
                     <div style="margin-bottom: 20px;" class="animated fadeInRightShort col-sm-4  reverse2 col-sm-pull-8 col-xs-12">
                         <div class="howSection" style="float: right">
                             <p class="howSectionTitle">Gather all your<br>networks & accounts</p>
                             <span class="howSectionContent">Never worry again that someone interested in you will not be able to reach you. <b>The more networks</b> you add to your account, <b>the bigger the chance</b> of being contacted by others looking to work with your (or for you!). <br>
                                 Don't forget to set the most sensitive networks (such as your personal phone number) to <span style="color: #04befe">request only</span> ! Those will be available only to the people whose business card request your accept!</span>
                         </div>

                     </div>


                 </div>

                 <div class="howContainer container-fluid row animatedParent animateOnce" >
                     <div style="margin-bottom: 20px; " class="animated fadeInRightShort  col-sm-8 col-xs-12">
                         <div style="display: flex;flex-direction: column;">
                             <div class="desktopOutlineOuter">
                                 <div class="desktopCameraCircle"></div>
                                 <div class="desktopOutlineInner" style="
                                  background: url('../image/intro/screen_story.png');
                                  background-repeat: no-repeat;
                                  background-size: cover;
                                  background-position: center;">
                                 </div>
                             </div>
                             <div style="width: 100%; background: #eeeeee; height: 1px;"></div>
                         </div>

                     </div>
                     <div style="margin-bottom: 20px;" class="animated fadeInLeftShort  col-sm-4 col-xs-12">
                         <div class="howSection" style="float: left">
                             <p class="howSectionTitle">Tell your story<br>in your own words</p>
                             <span class="howSectionContent">Don't lose the opportunity to showcase your work & achievements. Link to your <b>Medium</b> article, to your <b>Behance</b> project or write a <span style="color: #04befe">portfolio article</span> here on ConnSuite, describing a project your worked on, an app you developed or something you are proud of.</span>
                         </div>

                     </div>




                 </div>

                 <div class="howContainer container-fluid row animatedParent animateOnce" >

                     <div style="margin-bottom: 20px; " class="animated fadeInLeftShort col-sm-8 col-sm-push-4 reverse1  col-xs-12">
                         <div style="display: flex;flex-direction: column;">
                             <div class="desktopOutlineOuter">
                                 <div class="desktopCameraCircle"></div>
                                 <div class="desktopOutlineInner" style="
                                  background: url('../image/intro/screen_cards.png');
                                  background-repeat: no-repeat;
                                  background-size: cover;
                                  background-position: center;">
                                 </div>
                             </div>
                             <div style="width: 100%; background: #eeeeee; height: 1px;"></div>
                         </div>

                     </div>
                     <div style="margin-bottom: 20px;" class="animated fadeInRightShort  col-sm-4 col-sm-pull-8 reverse2 col-xs-12">
                         <div class="howSection" style="float: right">
                             <p class="howSectionTitle">Grow your online business stack</p>
                             <span class="howSectionContent">When it comes to sharing a business card, we all want to get as many important details as possible on it. Forget about this and start sharing your ConnSuite card instead!
                                 <br><br>Move all your offline cards on ConnSuite where you will have 24/7 access to them, without having to carry 1000 around with you, 'just in case'.
</span>
                         </div>

                     </div>

                 </div>


                 <div class="howContainer container-fluid row animatedParent animateOnce"  >

                     <div class="howSection" style="width: 100%; justify-content: center; align-items: center;padding-left: 15px; padding-right: 15px;">
                         <p class="howSectionTitle">Any further questions? Let us help!</p>
                         <span class="howSectionContent" style="text-align: center; max-width: 500px;"><a href="#reasonContainer" class="colorPrimary" style="font-weight: 500;">Send us your thoughts</a> or check out the Frequently Asked Questions section.</span>
                        <div style="margin-top: 30px;margin-bottom: 20px;display: flex; flex-direction: row; align-items: center;">
                            <div class="buttonTypeOutlinePrimary playVideoButton" style="margin-right: 20px;">
                                <div class="playVideoButtonOutlinePrimary"><i style="font-size: 12pt;line-height: 1;" class="material-icons">&#xE037;</i></div>
                                <span style="padding-right: 12px;"> Play video</span>
                            </div>

                            <a href="ask.php" class="buttonTypeOutlinePrimary"><span>View FAQ</span></a> </div>
                     </div>
                 </div>
             </div>


            <div style="position: relative; " class="animatedParent animateOnce">
                <div class="animated fadeInRight blobBackShape">
                    <img src="../image/backshape-17.svg"/>
                </div>
                <div class="animated fadeInRight" style="width: 100%; display: flex; justify-content: center">
                <div class=" customContainerPadding" style="height: auto;display: flex; flex-direction: column; align-items: center">
                    <p class="introSectionTitle" id="who" >Who</p>
                    <div style="width: 100%; position: relative;padding: 60px 0 0 0;">
                        <div class="container-fluid row " style="z-index:100;width: 100%; margin: 0;">
                            <div class="col-lg-6 col-sm-12" style="margin-left: 0; margin-right: 0;    display: flex; justify-content: center; align-items: center; padding: 0;">
                                <div class='businessCard' id="businessCardFront" >
                                    <div class='businessCardLeft'>
                                        <div id="selfBusinessCardPictureContainer">
                                            <img id="selfBusinessCardPicture" src="../image/small_self_body.png"/>
                                            <img id="selfBusinessCardIcon" src="../image/connsuite_icon_inverted_rounded.png"  />
                                        </div>
                                    </div>
                                    <div class='businessCardRight'>
                                        <div style="display: flex; flex-direction: column; justify-content: center">
                                            <span class="businessCardRightName">Razvan Gabriel Apostu</span>
                                            <span class="businessCardRightUsername"></span>
                                            <div id="businessCardSelfNetworks">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12">
                                <p id="whoSectionContentHi">Hi there! ... and also thank you!</p>
                                <p id="whoSectionContent">We live in a time where creating a new account on a website or social network is almost part of our daily routine. We try new things, we put our time into them and we finally manage to get so close to being present and making use of every important network, tool or social-stream out there.
                                But when it comes to presenting yourself to a future business connection you want them to know where to find you and what your story is, without having to say too little or too much. Sometimes, a business card, or the time making a decision whether to share your Twitter account or your Linkedin one or all 100 of your other accounts is just simply not enough.
                                    With ConnSuite I wanted to tackle this small issue that could improve your business flow and also your personal one, by offering smart features you can play with, that you can use to make the process of sharing a "way to connect" smarter than before.
                                    <br><br> Thank you a lot for giving it a shot, and I hope you'll take a bit of your time to help me improve this tool and bring value to it on a larger scale! <a style="color:#ffffff; font-weight: 600; " target="_blank" href="../razgraf">Find</a> me on ConnSuite.

                                </p>
                                    </div>
                        </div>
                    </div>


                </div>
                </div>
            </div>
         </div>


         <div style="width: 100%;margin:70px 0 0 0; padding-bottom: 10px; display: flex; flex-direction: column; align-items: center;justify-content: center;" class="gradient">

             <div id="cscontact" class="customContainerPadding"  style="padding:20px 0 0 0;height: auto;display: flex; flex-direction: column; align-items: center">
                 <p class="introSectionTitle" id="messageMeTitle" >Send Us a Message</p>
                 <div class="container-fluid row" style="width: 100%; padding: 0; margin: 0; min-height: 500px;">
                     <div class="col-sm-8 col-xs-12">
                         <div id="leftContainer" style="width: 100%; display: flex; flex-direction: column;">
                             <p class="rightFormTitle" style="padding-left: 5px; margin-bottom: 10px;">Your Reasons</p>
                             <div id="reasonContainer" style="display: block"></div>
                             <div id="nameEmailContainer">
                                 <div style="flex: 1;">
                                     <p class="rightFormTitle">Your Name</p>
                                     <div style="display: flex; flex-direction: row;align-items: center">
                                         <input maxlength="80" style="flex: 1" class="rightFormInput" type="text" name="name" id="name" title="Your Full Name i.e. George Smith" placeholder="Who are you?" required>
                                     </div>
                                 </div>
                                 <div style="width: 30px; height: 100%;"></div>
                                 <div style="flex: 1;">
                                     <p class="rightFormTitle">Your Email</p>
                                     <div style="display: flex; flex-direction: row;align-items: center">
                                         <input maxlength="100" style="flex: 1" class="rightFormInput" type="email" name="email" id="email" title="Your email i.e. george@example.com" placeholder="What's your email address?" required>
                                     </div>
                                 </div>
                             </div>
                             <div >
                                 <p class="rightFormTitle" style="padding-left: 5px; margin-bottom: 10px;">Your Message</p>
                                 <div id="editorContainer">
                                     <div style="min-height: 140px;">
                                         <textarea spellcheck="true" style="height: 140px; width: 100%; max-width: 100%;background: transparent" class="rightFormInput" type="text" name="message" id="message" title="Your Description" rows="1" placeholder="What is your message for the ConnSuite Team?" ></textarea>
                                     </div>
                                 </div>
                             </div>

                             <div id="sendButtonContainer">
                                <span class="sendButton">Send Message</span>
                             </div>


                         </div>


                     </div>
                     <div class="col-sm-4 col-xs-12" style="margin-top: 20px;">
                         <div id="contactHelperBefore" style="width: 100%; margin-bottom: 10px;padding-left: 10px; padding-right: 10px;">
                             <script>
                                 $(function(){printHelper($("#contactHelperBefore"),"We want to offer you more of the power of ConnSuite based on what you like the most. Offer your feedback or ideas and start a conversation with us right away.",true)});
                             </script>
                         </div>
                         <div id="contactHelper" style="width: 100%; margin-bottom: 40px;padding-left: 10px; padding-right: 10px;">
                             <script>
                                 $(function(){printHelper($("#contactHelper"),"Example : Hi ConnSuite Team! I am George and I would like to talk to you about the following : ",true)});
                             </script>
                         </div>
                     </div>
                 </div>
             </div>

            <div style="margin-top: 40px; margin-bottom: 20px">
                <a href="http://www.connsuite.com"><span style="color: #ffffff">© ConnSuite <?php echo date("Y"); ?></span></a>

            </div>
         </div>



    </div>

    </div>



<!-- SENT -->
<div class="modal fade" id="messageModal"  data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header">
                <a  href="../intro/index.php" type="button" class="close"  aria-label="Close"> <span aria-hidden="true">&times;</span></a>
                <h4 class="modal-title" id="myModalLabel">Message Sent!</h4>
            </div>
            <div class="modal-body">
                <span>
                Thank you for taking the time to send this message. Our team will be back soon with a reply. <br>Have an awesome day!
                </span>

            </div>
            <div class="modal-footer">
                <a href="../intro/index.php"  class="modalButtonCancel" >Close</a>
            </div>
        </div>
    </div>
</div>




<script src="../js/util.js"></script>
<script src="../base/config.js"></script>
<script src="../js/model/network.js"></script>
<script src="../js/model/conn_user.js"></script>
<script src="../js/intro.js"></script>
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
