<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 19/12/2017
 * Time: 14:43
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
    <title>FAQ | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">

    <!--CONNSUITE META-->
    <?php printMeta_Description("Frequently asked questions about how ConnSuite works. Find out how you can take full advantage of your online business card with @connsuite!");printMeta_Image(); ?>

    <script language="JavaScript" type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>


    <script src="../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../support/bootstrap4/css/bootstrap.css">
    <script src="../support/bootstrap4/js/bootstrap.js"></script>


    <script src="../support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../css/intro-ask.css">
    <link rel="stylesheet" href="../css/util.css">



    <link rel="stylesheet" href="../support/animate-it/animations.css" >






</head>


<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #ffffff; overflow-x: hidden"  >

<script>

    var depthToRoot = <?php echo $depthToRoot[PAGE_INTRO_ASK] ?> ;
    var userID = null;
    var token  = null;
    <?php if($user && $user->getID()) echo "userID =".$user->getID().";";?>
    <?php if($user && $user->getToken()) echo "token ='".$user->getToken()."';";  ?>

</script>


<div  class="background">
    <div style="width: 100%; padding-bottom: 100px;">

        <div id="introHeader" style="width: 100%;">

            <div id="introToolbar" >
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

                                <span id="introHeadline">ConnSuite Frequently Asked Questions (FAQ)</span>



                            </div>
                               </div>
                    </div>
                    <div class="col-lg-6 col-md-12" style="height: 100%;" id="introPlanetContainer">
                        <div id="introPlanetParent">
                            <img id="introPlanet" src="../image/intro/faq_illustration_white.png">
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div style="width: 100%;display: flex; flex-direction: column; justify-content: center;">
            <section class="customContainer" style="height: auto;display: flex; padding-left: 15px; padding-right: 15px; flex-direction: column; align-items: center">
                <p class="stepSectionTitle" >Introducing ConnSuite</p>
                <div style="display: flex; justify-content: center; align-items: center;width: 100%;">
                <div id="videoWrapperContainer">
                <div id="videoWrapper">
                    <iframe src='https://www.youtube.com/embed/s-mP22EkCfM' frameborder='0' related="0" gesture="media" allow="encrypted-media" allowfullscreen>
                    </iframe>
                </div>
                </div>
                </div>
            </section>





            <section class="customContainer" style="height: auto;display: flex; padding-left: 15px; padding-right: 15px; flex-direction: column; align-items: center">
                <p class="stepSectionTitle" id="features">FAQ, tips & tricks</p>


                <section id="how-do-i-create-an-account" class="questionContainer">
                    <div class="questionTitleContainer">
                        <span class="questionTitle">1. How do I create a new account?</span>
                        <span class="questionExpandButton">Show More</span>
                    </div>
                    <div class="questionAnswerContainer">
                        <div class="questionAnswerInnerContainer">
                        <p class="questionAnswerSubtitle">Our solution:</p>
                        <span>You can create a new account in one of the 2 following ways:<br><br></span>
                        <ul>
                            <li>
                                <b>Regular registration</b><br>
                                <span>You can access ConnSuite by providing a small set of data which will be used to create and secure your account. A regular registration means that you will have to provide, step by step, your name, an email, a strong password and,
                                    most importantly, a unique  <a href="../welcome.php?f="><b>username</b></a>. This will be your personal identifier on ConnSuite, (ex. @johnsmith). You can share it with others, so they can easily find you on the platform. Choose it carefully as you are entitled to only a few changes (1 or more), based on your account type.</span>
                                If you are new to ConnSuite, you can create a new account by clicking <a href="../welcome.php?f="><b>here</b></a>!<br>
                            </li>

                            <li>
                                <b>External-account registration</b><br>
                                <span>You can bypass all the 'hard work' and connect to ConnSuite with an external account! We will only use your public data, such as your name and profile picture to create a complete account on our platform.
                                    Next time you want to log in, just press the  <a href="../welcome.php?"><b>connect</b></a> button again. You can also add a classic email address and a password later to your account. Currently we only support Facebook Connect but we might implement LinkedIn & Google as well if requested.</span>
                                </li>

                        </ul>
                        <div class="questionAnswerButtonContainer">
                            <a href="../welcome.php" class="buttonTypeOutlineSecondary"><span>Create an account</span></a>
                        </div>
                        </div>

                    </div>

                </section>

                <section id="how-do-i-create-a-new-network" class="questionContainer">
                    <div class="questionTitleContainer">
                        <span class="questionTitle">2. How do I create a new network?</span>
                        <span class="questionExpandButton">Show More</span>
                    </div>
                    <div class="questionAnswerContainer">
                        <div class="questionAnswerInnerContainer">
                            <p class="questionAnswerSubtitle">Our solution:</p>
                            <span>On ConnSuite, creating a new network means linking a new existing social media account (or other) to your profile. These accounts/networks are all the places people can find you or see your work.
                            As a graphic designer, you might link from your <b>ConnSuite Online Business Profile</b> to your accounts on Behance, Dribble, DeviantArt or Instagram. As a public figure, you might want to link to your Facebook, Twitter, Reddit, Personal Website and so on. You get the point.<br><br></span>
                            <div class="questionAnswerSpecialContainerAdd">
                                <span>In order to add a new network to your list, connect to <i class="icon-conn-05"></i>ConnSuite, go to <i class="icon-conn-06"></i>Dashboard and look for the special 'Add Network' box in the "My Networks" section. </span>
                                <a target="_blank" id="connAddItemOuterContainer" href="../p/network/add.php">
                                    <div class="connAddItemContainer" >
                                        <div class="connAddItemMainContainer">
                                            <div style="flex: 1; width: 100%; display: flex; justify-content: center; align-items: center;">
                                                <img class="connAddItemIcon" src="../image/add.png"/>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="connItemCredentialsContainer" style="min-height: 50px;">
                                        <div class="connAddItemDetailButton" title="Add Network">
                                            <span>Add Network</span>
                                            </div>
                                        </div>
                                    </a>
                            </div>

                            <span>By doing this, you will reach the dedicated page for linking a new network. There you will be able to choose from some of our predefined 'default' networks or create a custom one, for cases such as a personal website, or a social network we forgot to include ourselves. You can also suggest a few websites you would like to see as defaults <a href="index.php#reasonContainer"><b>here</b></a>.</span>
                        </div>

                    </div>

                </section>

                <section id="how-do-i-create-a-new-article" class="questionContainer">
                    <div class="questionTitleContainer">
                        <span class="questionTitle">3. How do I create a new article?</span>
                        <span class="questionExpandButton">Show More</span>
                    </div>
                    <div class="questionAnswerContainer">
                        <div class="questionAnswerInnerContainer">
                            <p class="questionAnswerSubtitle">Our solution:</p>
                            <span>On ConnSuite, you can showcase your work or link to external resources & publications that you own or develop, such as apps, events or other articles. Attaching the most important achievements or personal details to your ConnSuite account will offer other users the possibility to find out more about you faster and from the most trusted source! Keep everyone up to date!</span>
                            <div class="questionAnswerSpecialContainerAdd">
                                <span>In order to add a new article to your profile, connect to <i class="icon-conn-05"></i>ConnSuite, go to <i class="icon-conn-06"></i>Dashboard and look for the special 'Add Article' box in the "My Story" section. </span>
                                <a target="_blank" id="connAddItemOuterContainer" href="../p/article/add.php">
                                    <div class="connAddItemContainer" style="width: 200px;" >
                                        <div class="connAddItemMainContainer">
                                            <div style="flex: 1; width: 100%; display: flex; justify-content: center; align-items: center;">
                                                <img class="connAddItemIcon" src="../image/add.png"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="connItemCredentialsContainer" style="min-height: 50px;">
                                        <div class="connAddItemDetailButton" title="Add Article">
                                            <span>Add Article</span>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <span>By doing this, you will reach the dedicated page for writing a new article. There you will be able to use an <a href="https://github.com/sparksuite/simplemde-markdown-editor"><b>awesome editor</b></a> to write your article and upload great pictures to add to its value.</span>
                        </div>

                    </div>

                </section>

                <section id="how-do-i-get-in-touch" class="questionContainer">
                    <div class="questionTitleContainer">
                        <span class="questionTitle">4. How do I get in touch with the ConnSuite Team?</span>
                        <span class="questionExpandButton">Show More</span>
                    </div>
                    <div class="questionAnswerContainer">
                        <div class="questionAnswerInnerContainer">
                            <p class="questionAnswerSubtitle">Our solution:</p>
                            <span>We are always open to discuss about and improve ConnSuite, so we would be more than glad to have a chat with you!<br>
                            To get in touch with us you can:<br><br> </span>
                                <ol>
                                    <li>Open a conversation in the chat from the bottom right corner (Please reload the page if the chat isn't there).</li>
                                    <li>Chat with us on social media (<a href="https://twitter.com/ConnSuite"><b>Twitter</b></a>,<a href="https://facebook.com/connsuite"><b>Facebook</b></a> and more on our <a href="https://connsuite.com/connsuite"><b>ConnSuite Page</b></a>).</li>
                                    <li>Talk to an email at contact@connsuite.com.</li>
                                    <li>Use the special contact <a href="index.php#reasonContainer"><b>form</b></a>.</li>

                                </ol>

                             </div>

                    </div>

                </section>

                <section id="how-do-i-offer-feedback-or-report-a-problem" class="questionContainer">
                    <div class="questionTitleContainer">
                        <span class="questionTitle">5. How do I offer feedback or report a problem?</span>
                        <span class="questionExpandButton">Show More</span>
                    </div>
                    <div class="questionAnswerContainer">
                        <div class="questionAnswerInnerContainer">
                            <p class="questionAnswerSubtitle">Our solution:</p>
                            <span>As we are always developing and improving, we take your feedback very seriously! Problem, suggestion or bug, don't hesitate to share it with us as soon as possible, in order to improve your overall experience with ConnSuite.<br>
                            To get in touch with us you can:<br><br>     </span>
                                <ol>
                                    <li>Open a conversation in the chat from the bottom right corner (Please reload the page if the chat isn't there).</li>
                                    <li>Talk to us on social media (<a href="https://twitter.com/ConnSuite"><b>Twitter</b></a>,<a href="https://facebook.com/connsuite"><b>Facebook</b></a> and more on our <a href="https://connsuite.com/connsuite"><b>ConnSuite Page</b></a>).</li>
                                    <li>Send us an email at contact@connsuite.com.</li>
                                    <li>Use the special contact <a href="index.php#reasonContainer"><b>form</b></a>.</li>

                                </ol>

                        </div>

                    </div>

                </section>


            </section>



            <div style="height: 50px; padding-top: 20px;" id="sendButtonContainer">

                <a href="../p/dashboard.php" ><span class="sendButton">Go back to the Dashboard</span></a>
            </div>
        </div>





    </div>

</div>



<script src="../base/config.js"></script>
<script src="../js/util.js"></script>




<script src="../js/model/network.js"></script>


<script src="../js/intro-ask.js"></script>
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
