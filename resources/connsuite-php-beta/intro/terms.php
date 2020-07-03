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
    <title>Terms&Conditions | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">

    <!--CONNSUITE META-->
    <?php printMeta_Description("Terms and Conditions for ConnSuite.");printMeta_Image(); ?>

    <script language="JavaScript" type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>


    <script src="../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../support/bootstrap4/css/bootstrap.css">
    <script src="../support/bootstrap4/js/bootstrap.js"></script>


    <script src="../support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../css/intro-terms.css">
    <link rel="stylesheet" href="../css/util.css">



    <link rel="stylesheet" href="../support/animate-it/animations.css" >




</head>


<body  style="min-height:100vh;min-width: 300px; display: block; height: 100%; background: #ffffff; overflow-x: hidden"  >

<script>

    var depthToRoot = <?php echo $depthToRoot[PAGE_INTRO_TERMS] ?> ;
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

                <div class="customContainer container-fluid row" id="mainHeaderContent" style="">
                    <div class="col-lg-6 col-md-12" style="height: 100%;">
                        <div  style="height: 100%; display: flex; justify-content: center;flex-direction: column;">
                            <div class="mobileDivider"></div>
                            <div id="mainHeaderHeadlineContainer">
                                <div id="mobileIntroLogo" style="width: 100%; padding-top: 20px; padding-bottom: 20px;">
                                    <img src="../image/connsuite_full_horiz_white_x2.png" style="width: 80%;margin-left: 10%;">
                                </div>

                                <span id="introHeadline">Terms & Conditions<br>Privacy Policy</span>
                            </div>
                               </div>
                    </div>
                </div>

            </div>

        </div>


        <div style="width: 100%; display: flex; justify-content: center">
            <div class="customContainerPadding" style="padding-top: 50px;">
                <h2 class="colorPrimary">ConnSuite Terms & Conditions</h2>
                <h3>1. Terms</h3>
                <p>By accessing the website at <a href="https://www.connsuite.com">https://www.connsuite.com</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
                <h3>2. Use License</h3>
                <ol type="a">
                    <li>Permission is granted to temporarily download one copy of the materials (information or software) on ConnSuite's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        <ol type="i">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on ConnSuite's website;</li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                        </ol>
                    </li>
                    <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by ConnSuite at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
                </ol>
                <h3>3. Disclaimer</h3>
                <ol type="a">
                    <li>The materials on ConnSuite's website are provided on an 'as is' basis. ConnSuite makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
                    <li>Further, ConnSuite does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
                </ol>
                <h3>4. Limitations</h3>
                <p>In no event shall ConnSuite or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ConnSuite's website, even if ConnSuite or a ConnSuite authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
                <h3>5. Accuracy of materials</h3>
                <p>The materials appearing on ConnSuite website could include technical, typographical, or photographic errors. ConnSuite does not warrant that any of the materials on its website are accurate, complete or current. ConnSuite may make changes to the materials contained on its website at any time without notice. However ConnSuite does not make any commitment to update the materials.</p>
                <h3>6. Links</h3>
                <p>ConnSuite has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ConnSuite of the site. Use of any such linked website is at the user's own risk.</p>
                <h3>7. Modifications</h3>
                <p>ConnSuite may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
                <h3>8. Governing Law</h3>
                <p>These terms and conditions are governed by and construed in accordance with the laws of Romania and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>

                <h2 class="colorPrimary">Privacy Policy</h2>
                <p>Your privacy is important to us.</p>
                <p>We don’t ask for your personal information unless we truly need it.</p>
                <p>It is ConnSuite's policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://www.connsuite.com">https://www.connsuite.com</a>. </p>
                <h3>Personal Information</h3>
                <p>We may ask you for personal information, such as your name, email, address, contact details and payment details. We collect only the personal information relevant to providing you with a service, and use your information only to ensure the fulfilment of this service. You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services without this information.</p>
                <p>We do not share your personal information with third-parties, except where required by law or to protect our own rights. We will only retain personal information for as long as necessary to provide you with a service.</p>
                <h3>Cookies</h3>
                <p>We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit so we can understand how you use our site and serve you content based on preferences you have specified.</p>
                <p>If you do not wish to accept cookies from us, you should instruct your browser to refuse cookies from our website, with the understanding that we may be unable to provide you with some of your desired service without them. This policy covers only the use of cookies between your computer and our website; it does not cover the use of cookies by any advertisers.</p>
                <h3>Third-Party Services</h3>
                <p>We may employ third-party companies and individuals on our websites - for example, analytics providers and content partners. These third parties have access to your personal information only to perform specific tasks on our behalf, and are obligated not to disclose or use it for any other purpose.</p>
                <h3>Security</h3>
                <p>We take security seriously, and do what we can within commercially acceptable means to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use or modification. That said, we advise that no method of electronic transmission or storage is 100% secure, and cannot guarantee the absolute security of your data.</p>
                <h3>Links to Other Sites</h3>
                <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot assume responsibility for their treatment of your personal information. This privacy policy only covers our website and privacy practices.</p>
                <h3>Children’s Privacy</h3>
                <p>We do not knowingly collect or store personal information from children (visitors under the age of 13). If you believe your child has provided us with personal information, we encourage you to contact us immediately, and we will do our best to delete the data as quickly as possible.</p>
                <h3>Changes to our Privacy Policy</h3>
                <p>At our discretion, we may change our privacy policy from time to time. Any changes will be reflected here, so we encourage you to visit this page regularly. Your continued use of this site after any changes to this policy will be regarded as acceptance of our practices around privacy and personal information.</p>
                <h3>Business Transfers</h3>
                <p>If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include user information among our assets transferred to or acquired by a third party. You acknowledge that such transfers may occur, and that any parties who acquire us may continue to use your personal information according to this policy.</p>
                <h3>Email Sharing</h3>
                <p>By creating an account with ConnSuite you accept to be automatically subscribed to our user list and you will receive updates from and about this service. We will not disclose and/or share your email account with any third party and you will be able to un-subscribe at any time from our emailing list.</p>

            </div>
        </div>









            <div style="height: 50px; padding-top: 20px;" id="sendButtonContainer">

                <a href="../p/dashboard.php" ><span class="sendButton">Go back to the Dashboard</span></a>
            </div>
        </div>





    </div>




<script src="../base/config.js"></script>
<script src="../js/util.js"></script>




<script src="../js/model/network.js"></script>


<script src="../js/intro-terms.js"></script>
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
