<?php
/**
 * User: "Razvan Gabriel Apostu"
 * Date: 22-Feb-17
 * Time: 2:46 PM
 */
include_once("base/config.php");
include_once ("base/user.php");

$user = (new User())->mapUser($_SESSION['user']);

if($user!=null && $user->ID!=null && $user->token!=null && $user->token->value!=null)
    header("Location: p/dashboard.php");


$flip = isset($_GET['f']) ? "true" : "false";


?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>ConnSuite | Your online business card</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">


    <!--CONNSUITE META-->
    <?php printMeta_Description();printMeta_Image(); ?>

    <script language="JavaScript" type="text/javascript" src="js/jquery-3.2.1.min.js"></script>


    <script src="support/popper/popper.js"></script>
    <link rel="stylesheet" href="support/bootstrap4/css/bootstrap.css">
    <script src="support/bootstrap4/js/bootstrap.js"></script>

    <script src="support/loading-pace/pace.min.js"></script>
    <link rel="stylesheet" href="support/loading-pace/pace.css">

    <script src="support/md5/md5.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="support/fonts/custom-icon/css/conn-custom.css" >

    <link rel="stylesheet" href="css/welcomeNew.css">
    <link rel="stylesheet" href="css/util.css">

    <script src="support/flip/script.js"></script>

    <link rel="stylesheet" href="support/animate-it/animations.css" >

    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">

    <script src="base/config.js"></script>
    <script src="js/util.js"></script>

    <link rel="stylesheet" href="support/owl-carousel/dist/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="support/owl-carousel/dist/assets/owl.theme.default.min.css">

    <link rel="stylesheet" href="support/ytpop/YouTubePopUp.css" >
    <script src="support/ytpop/YouTubePopUp.jquery.js"></script>

    <script type="text/javascript" src="//platform.linkedin.com/in.js">
        api_key: 77kpqqv1qspqjq
        onLoad: onLinkedInLoad
        scope: r_basicprofile r_emailaddress
    </script>

</head>



<body  style="min-height: 100%;min-width: 300px; display: block; height: 100%;"  >




<script>
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1611366028925821',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    var depthToRoot = <?php echo $depthToRoot[PAGE_WELCOME_KEY] ?> ;

    var doPasswordForgotRequest = "<?php echo ROOT.$pathFromRoot[CORE_DO_PASSWORD_FORGOT_REQUEST] ?>";
    var getflip = "<?php echo $flip ?>";


</script>

<a class="csVideo" href="https://youtu.be/s-mP22EkCfM" style="z-index: 9999999; display: none;"></a>
<div id="linkedInContainer" style="position: absolute; opacity: 0;">
    <script type="in/Login"></script>
</div>

<div class="background" style="min-height: 1000px;">
    <div style="width: 100%; position: relative;">
        <div id="homeHeaderSmall">
            <div class="customContainer" style="padding: 0; margin: 0;display: flex;flex-direction: row;align-items: center;" >
                <div style="height: 100%;width: 100px; ">
                    <a href="" style="display: flex; height: 100%; align-items: center;">
                        <img src="image/connsuite_full_horiz_white.png" id="homeHeaderLogoSmall">
                    </a>
                </div>
                <div style="flex: 1; height: 100%;">
                    <div style="display: flex; flex-direction: row;height: 100%; align-items: center;justify-content: flex-end">
                        <a style="margin-right: 5px;" href="https://www.producthunt.com/posts/connsuite" class="introToolbarButton"><span><i class="em em-sparkles"></i> PH</span></a>
                        <a style="margin-right: 10px;" href="https://www.connsuite.com/intro/" class="introToolbarButton"><span>About</span></a>
                        <a href="#card" id="introToolbarButtonConnect">
                            <div><span>Connect</span></div>
                        </a>
                    </div>
                </div>


            </div>
        </div>
        <div id="content">
            <div id="introToolbar" >
                <div class="customContainerS container-fluid row" id="introToolbarInnerContainer" >
                    <div id="introToolbarLogoContainer" class="col-md-6 col-sm-12" style="height: 100%;">
                        <a href="#" style="display: flex; height: 100%; align-items: center;">
                            <img src="image/connsuite_full_horiz_white.png" id="introToolbarLogo">
                        </a>
                    </div>

                    <div class="col-lg-6 col-md-12" style="">
                        <div id="introToolbarButtons">
                            <a href="https://www.producthunt.com/posts/connsuite" class="introToolbarButton"><span><i class="em em-sparkles"></i> Product Hunt</span><div class="introToolbarDivider"></div></a>
                            <a href="https://www.connsuite.com/intro/" class="introToolbarButton"><span>About</span><div class="introToolbarDivider"></div></a>
                            <a href="#card" id="introToolbarButtonConnect">
                                <div><span>Connect</span></div>
                            </a>
                        </div>
                    </div>




                </div>

            </div>

            <div class="customContainer" id="headerContainer">
                <div class="container-fluid row" style="margin: 0; padding: 0;">
                    <div  class="col-md-6 col-sm-12 col-12">
                        <div id="flexHeadlines">
                            <p id="headline1">Create the ultimate<br>online business card</p>
                            <p id="headline2">Link to all your public networks, accounts & stories</p>

                            <div id="flexBusinessSecondary">
                                <div class='businessCard' >
                                    <div class='businessCardLeft'>
                                        <img src="image/connsuite_icon_inverted_rounded.png" />
                                    </div>
                                    <div class='businessCardRight'>
                                        <div class="businessCardRightContainer">
                                            <span class="businessCardRightName">Razvan Gabriel</span>
                                            <div style="">
                                                <span class="seriousLink"  ><span>LinkedIn</span></span>
                                                <span class="seriousLink" ><span>Facebook</span></span>
                                                <span class="seriousLink" ><span>Twitter</span></span>
                                                <span class="seriousLink" ><span>Loom</span></span>
                                                <span class="seriousLink" ><span>Pinterest</span></span>
                                                <span class="seriousLink" ><span>Product Hunt</span></span>
                                            </div>
                                            <span class="businessCardRightSubtitle2">Find me on:</span>
                                            <div style="display: flex; flex-direction: row; align-items: center;width: 100%;">

                                                <span id="seriousSolution">connsuite.com<span>/razgraf</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        <div class="customContainer" id="headerButtonContainer">
                            <a href="#card" style="" id="logInRefButton" class="buttonTypeOutlineWhite"><span>Start Now</span></a>
                            <div style="margin-left: 30px;" id="playVideoButton" class="buttonTypeOutlineWhite"><i style="font-size: 12pt;margin-top:2px;margin-right: 3px" class="material-icons">&#xE037;</i><span>Watch</span></div>
                        </div>

                        </div>

                    </div>
                    <div  class="col-md-6 col-sm-12 col-12" style="margin: 0;padding: 0;">
                        <div style="display: flex;justify-content: center;width: 100%;">
                            <div id="cardRightContainer">
                                <div style="display: none; position: absolute; right: 250px;bottom: -5px;"><img id="cardRightHand" src="image/landing/hand.png"></div>
                                <div style="width: 400px;z-index: 2;position: relative;">
                                    <div id="flexBusiness" style="position: relative">
                                        <div class='businessCard'>
                                            <div class='businessCardLeft'>
                                                <img src="image/connsuite_icon_inverted_rounded.png" style="width: 80px; height: 80px;"/>
                                            </div>
                                            <div class='businessCardRight'>
                                                <div style="display: flex; flex-direction: column;">
                                                    <p id="businessCardBackName">Razvan Gabriel</p>
                                                    <span id="businessCardBackFind">Find me on connsuite.com</span>
                                                    <span id="businessCardBackLink"><span>/razgraf</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="" class='businessCard' id="businessCardFront" >
                                            <div class='businessCardLeft'>
                                                <img src="image/connsuite_icon_inverted_rounded.png" style="width: 80px; height: 80px;"/>
                                            </div>
                                            <div class='businessCardRight'>
                                                <div style="display: flex; flex-direction: column; justify-content: center">
                                                    <span class="businessCardRightName">Razvan Gabriel</span>
                                                    <span class="businessCardRightSubtitle">Find me on:</span>
                                                    <div style="line-height: 1.1">
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank" ><span class="businessCardLocation8" >LinkedIn</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation10">Facebook</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation9">Twitter</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation8"  >Loom</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation13" >Pinterest</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"> <span class="businessCardLocation10">Upwork</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation13" >Sycity</span> </a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation8">Github</span></a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation8">Reddit</span></a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank"><span class="businessCardLocation10">99Designs</span></a>
                                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank" style="display: block"> <span style="margin: 0; font-size: 10pt;" class="businessCardRightDots">+851 more</span> </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="customContainer">


                <p class="introSectionTitle">Let's fix the business card together<br><i class="em em-dark_sunglasses"></i></p>

                <div id="previewScreen" style="opacity: 0;">
                    <div id="previewScreenTopBar">
                        <div id="previewScreenMacButtonContainer">
                            <div style="background: #ff6868"></div>
                            <div style="background: #ffdb13"></div>
                            <div style="background: #5dd913"></div>
                        </div>
                        <div id="previewScreenMacTab"><span></span></div>
                    </div>



                    <div id="previewScreenContainer">
                        <div id="previewScreenLeft" class="owl-carousel">

                            <div class="itemP" id="previewPart1">
                                <img id="p1Image" src="image/tutorial/tutorial_picture_smith.png" />
                                <p id="p1Name">John Smith</p>
                                <span id="p1Tagline">Traveller / Mobile Developer</span>
                                <div style="width: 100%;padding-top: 30px" class="container-fluid row">


                                    <div class="col-md-3 col-sm-4 col-xs-4 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_linkedin.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">LinkedIn</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-xs-6 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_instagram.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Instagram</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-xs-6 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_skype.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Skype</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-xs-6 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_facebook.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Facebook</p>
                                        </div>
                                    </div>

                                    <div class="col-md-3 col-sm-4 col-xs-4 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_dribbble.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Dribbble</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-xs-4 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_twitter.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Twitter</p>
                                        </div>
                                    </div>
                                    <div id="p1Last1" class="col-md-3 col-sm-4 col-xs-4 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_pinterest.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Pinterest</p>
                                        </div>
                                    </div>
                                    <div id="p1Last2" class="col-md-3 col-sm-4 col-xs-4 col-4 connItemOuterContainer" >
                                        <div class="connItemContainer">
                                            <div class="connItemMainContainer">
                                                <div class="connItemMainIndicatorContainer">
                                                    <div class="connItemMainIndicator" style="background: #04befe">
                                                    </div>
                                                </div>
                                                <div class="connItemMainNetworkContainer">
                                                    <img style="object-fit: contain" src="image/network/thumbnail/icon_email.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="connItemCredentialsContainer">
                                            <p class="connItemCredentialsNetwork">Email</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div class="itemP" id="previewPart2">

                                <div id="previewPart2InnerContainer">

                                    <div class='selfbusinessCard' id="selfbusinessCardFront" >
                                        <div class='selfbusinessCardLeft'>
                                            <div id="selfBusinessCardPictureContainer">
                                                <img id="selfBusinessCardPicture" src="image/landing/jane.jpg"/>
                                                <img id="selfBusinessCardIcon" src="image/connsuite_icon_inverted_rounded.png"  />
                                            </div>
                                        </div>
                                        <div style="margin-bottom: 30px;" class='selfbusinessCardRight'>
                                            <div style="display: flex; flex-direction: column; justify-content: center">
                                                <span class="selfbusinessCardRightName">Jane Doe</span>
                                                <span class="selfbusinessCardRightUsername">@jane</span>
                                                <div id="selfbusinessCardSelfNetworks">
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_linkedin.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_instagram.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_skype.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_facebook.png"/>
                                                        </div>
                                                    </div>

                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_dribbble.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_twitter.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_pinterest.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_reddit.png"/>
                                                        </div>
                                                    </div>

                                                    <div class="selfleftNetworksTableItemContainer" id="p2Last1" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_producthunt.png"/>
                                                        </div>
                                                    </div>
                                                    <div class="selfleftNetworksTableItemContainer" id="p2Last2" >
                                                        <div class="selfleftNetworksTableItemImageContainer">
                                                            <img class="selfleftNetworksTableItemImage" src="image/network/thumbnail/icon_medium.png"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <span class="profileRequestButton"><i style="font-size: 12pt; margin-right: 5px;" class="material-icons">&#xE870;</i> Request Business Card</span>


                                    <div id="p2Divider"></div>
                                    <div class="container-fluid row" style="padding: 0; margin: 0;width: 100%;">

                                        <div id="p2Custom1" class="col-lg-6 col-md-6 col-sm-12 connCardContainer" style=" margin: 0;">
                                            <div class="customConnCard" >
                                                <div class="customConnCardLeft">
                                                    <div class="customConnCardPictureContainer">
                                                        <div class="customConnCardPicture">
                                                            <span>AD</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="customConnCardRight">
                                                    <div style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;">
                                                        <div style="width: 100%;"><span class="customConnCardName">Ane Doe (offline)</span></div>
                                                        <div style="display: flex; flex: 1; margin-top: 5px; flex-direction: column;align-items: flex-start; width: 100%;">
                                                            <div class="customConnCardSection">
                                                                <i class="icon-conn-04 customConnCardSectionIcon"></i>
                                                                <span class="customConnCardSectionText">ane.doe@gmail.com</span>
                                                            </div>
                                                            <div class="customConnCardSection">
                                                                <i class="icon-conn-05 customConnCardSectionIcon"></i>
                                                                <span class="customConnCardSectionText">www.anedoe.com</span>
                                                            </div>
                                                        </div>
                                                        <div style="width: 100%; margin-top: 5px; padding-left: .15em; display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                                                            <div style="margin-right: 5px;"><i style="color: #dddddd; font-size: 14pt;" class="material-icons">&#xE3C4;</i></div>
                                                            <div style="margin-right: 5px;"><i style="color: #dddddd; font-size: 14pt;" class="material-icons">&#xE3C4;</i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="p2Custom2" class="col-lg-6 col-md-6 col-sm-12 connCardContainer" style=" margin: 0;">
                                            <div class="customConnCard" >
                                                <div class="customConnCardLeft">
                                                    <div class="customConnCardPictureContainer">
                                                        <div class="customConnCardPicture">
                                                            <span>J</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="customConnCardRight">
                                                    <div style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;">
                                                        <div style="width: 100%;"><span class="customConnCardName">James (offline)</span></div>
                                                        <div style="display: flex; flex: 1; margin-top: 5px; flex-direction: column;align-items: flex-start; width: 100%;">
                                                            <div class="customConnCardSection">
                                                                <i style="font-size: 12pt" class="icon-conn-03 customConnCardSectionIcon"></i>
                                                                <span class="customConnCardSectionText">+309922345</span>
                                                            </div>
                                                            <div class="customConnCardSection">
                                                                <i class="icon-conn-04 customConnCardSectionIcon"></i>
                                                                <span class="customConnCardSectionText">james@connsuite.com</span>
                                                            </div>
                                                        </div>
                                                        <div style="width: 100%; margin-top: 5px; padding-left: .15em; display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                                                            <div style="margin-right: 5px;"><i style="color: #dddddd; font-size: 14pt;" class="material-icons">&#xE3C4;</i></div>
                                                            <div style="margin-right: 5px;"><i style="color: #dddddd; font-size: 14pt;" class="material-icons">&#xE3C4;</i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                </div>



                            </div>
                            <div class="itemP" id="previewPart3">

                                <div id="p3InnerContainer">

                                    <img id="p3ArticleImage" src="image/landing/landing3.png" />
                                    <p id="p3ArticleTitle">Article : Why I <i style="width: 20px;" class="em em-heartbeat"></i> ConnSuite</p>
                                    <span id="p3ArticleContent">I have a lot of personal accounts on social media networks and websites. I enjoy using them myself but also sharing them for others to know where to reach out and have a chat. <b>Wherever and Whenever!</b>...<br><br> But after a while I started to realise that I have no way of organising and linking them to one single account. All had different usernames, all had no ... </span>

                                </div>



                            </div>
                            <div class="itemP" id="previewPart5">

                                <div id="p4InnerContainer">

                                    <div class="container-fluid row" style="width: 100%;padding: 0; margin:0;">
                                        <div style="width: 100%; display: flex;flex-direction: column; align-items: center;">
                                            <p id="p4Text"><i class="em em-mag"></i> Your search results are :<br></p>


                                            <div class="container-fluid row" style="margin: 0; padding: 0;width: 100%;">

                                                <div class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div    class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/landing/razgraf.png" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">Razvan Gabriel</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@razgraf</span>
                                                            <div class="searchItemBottomLastContainer"
                                                            <div class="searchItemBottomLastNetworksContainer">
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_facebook.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_twitter.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_linkedin.png" class="searchItemNetworkImage" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div  class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/landing/mugur.jpg" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">Mugur Jr.</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@mugur</span>
                                                            <div class="searchItemBottomLastNetworksContainer">
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_sycity.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_twitter.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_facebook.png" class="searchItemNetworkImage" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >

                                                    <div   class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/landing/paul.jpg" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">Paul Berg</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@paulrberg</span>
                                                            <div class="searchItemBottomLastNetworksContainer">
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_behance.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_twitter.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_linkedin.png" class="searchItemNetworkImage" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div  class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/landing/catalin.jpg" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">Catalin Bahrin</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@catalin.bahrin</span>
                                                            <div class="searchItemBottomLastNetworksContainer">
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_gmail.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_instagram.png" class="searchItemNetworkImage" />
                                                                </div>
                                                                <div class="searchItemNetworkContainer">
                                                                    <img src="image/network/thumbnail/icon_github.png" class="searchItemNetworkImage" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>



                                                <div style="opacity: 0.5" class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/landing/jane.jpg" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">Jane Doe</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@jane</span>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="opacity: 0.5" class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/tutorial/tutorial_picture_smith.png" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">John Smith</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@john.smith</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="opacity: 0.5" class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/landing/meghan.png" class="searchItemPicture">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">Meghan</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@meghan30</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="opacity: 0.5" class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" >
                                                    <div class="searchItemContainer">
                                                        <div class="searchItemPictureContainer">
                                                            <img src="image/logo_icon_gr.png" class="searchItemPicture" style="padding: 12px;">
                                                        </div>

                                                        <div class="searchItemMainContainer">
                                                            <span class="searchItemMainName">ConnSuite</span>
                                                        </div>

                                                        <div class="searchItemBottomContainer">
                                                            <div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div>
                                                            <span class="searchItemBottomUsername">@connsuite</span>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>


                                </div>



                            </div>
                            <div class="itemP" id="previewPart4">

                                <div id="p4InnerContainer">

                                    <div class="container-fluid row" style="width: 100%;padding: 0; margin:0;">
                                        <div id="p4Col1" class="col-md-6 col-sm-12 col-12">
                                            <div id="scanSelfCard">
                                                <div id="scanSelfCardHeader">
                                                    <div id="p4SelfPictureContainer">
                                                        <div id="scanSelfCardPictureContainer">
                                                            <img src="image/tutorial/tutorial_icon_gradient_overlay.gif" id="scanSelfCardPicture"/>
                                                        </div>
                                                        <div id="scanSelfCardHeaderContent">
                                                            <p id="scanSelfCardName"></p>
                                                            <p id="scanSelfCardUsername"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="scanSelfCardBody">

                                                    <img src="image/landing/qr.png" style="width: 100%; object-fit: contain;"/>


                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-12 col-12" id="p4Col2">
                                            <div style="width: 100%;height: 100px;">
                                                <p id="p4Text">Notifications & Events<br><i class="em em-loudspeaker"></i></p>
                                                <div class="notificationsSingleContainer" style="margin-bottom: 15px;">
                                                    <div style="width: 100%; display: flex; flex-direction: row; align-items: center;">
                                                        <div class="businessRequestUserPictureOuterContainer">
                                                            <div class="businessRequestUserPictureContainer">
                                                                <img src="image/landing/jane.jpg" class="businessRequestUserPicture" />
                                                            </div>
                                                        </div>
                                                        <div class="businessRequestContentContainer">
                                                            <p class="businessRequestContent colorPrimary">You have just received a business card request from Jane!</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="notificationsSingleContainer" id="p4Notification2">
                                                    <div style="width: 100%; display: flex; flex-direction: row; align-items: center;">
                                                        <div class="businessRequestUserPictureOuterContainer">
                                                            <div class="businessRequestUserPictureContainer">
                                                                <img src="image/tutorial/tutorial_picture_smith.png" class="businessRequestUserPicture" />
                                                            </div>
                                                        </div>
                                                        <div class="businessRequestContentContainer">
                                                            <p class="businessRequestContent">John Smith has just accepted your business card request.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>



                            </div>


                        </div>
                        <div id="previewScreenRight">
                            <div id="previewScreenRightContent" >




                            </div>
                            <div id="previewArrowsContainer">
                                <img src="image/landing/arrows.png" style="object-fit: contain; height: 160px;" />
                            </div>
                        </div>


                    </div>

                </div>



                <p class="introSectionTitle">Find out how to reach someone<br><i style="font-size: 14pt;" class="em em-mag_right"></i></p>

                <div class="customContainer15" style="height: 200px;width: 100%;padding: 0 15px;">

                    <div  class="searchContainer2">
                        <div style=" flex: 1; display: flex;flex-direction: column">
                            <div  style="display: flex; flex-direction: row;align-items: center">
                                <div style="position: relative;flex: 1;">
                                    <input id="desktopSearchInput" class="searchInput" placeholder="Search for a company or a person" style="flex: 1;">
                                    <div class="toolbarSearchResultsContainer"></div>
                                </div>
                                <div style="width: inherit">
                                    <div class="searchButton">
                                        <img id="searchButtonIcon" src="image/ic_search_blue_48px.svg" style="width: 100%; height: 100%;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div id="landingBottomSection">
                <p class="introSectionTitle" style="color: #ffffff;padding-bottom: 0;">Connect to ConnSuite<br><i style="color: #ffffff;font-size: 30pt;" class="icon-conn-05 leftSideBarElementIcon"></i></p>
                <div style="width: 100%;max-width: 600px;">
                    <div  style="display: flex; align-items: center; height: 100%;width: 100%;margin: 0 auto;">




                        <div id="card">
                            <form class="formContainer front" id="formLoginIndex" method="post" enctype="multipart/form-data" autocomplete="off" >
                                <div class="formTitleContainer">
                                    <div class="formTitleImageContainer">
                                        <i  class="material-icons colorPrimary formTitleImage">&#xE898;</i>
                                    </div>
                                    <span class="formTitleText">Log into your Account</span>
                                </div>
                                <div class="formInputContainer">
                                    <div style="flex: 1; display: flex;flex-direction: column">
                                        <input class="homeFormInput" name="email" id="email" type="email" title="Your Email" placeholder="Your Email" required>
                                        <div class="divider"></div>
                                    </div>
                                    <div style="margin-top:30px; flex: 1; display: flex;flex-direction: column">
                                        <input class="homeFormInput" type="password" name="password" id="password" title="Your Password" placeholder="Your Password" required>
                                        <div class="divider"></div>
                                    </div>

                                    <div href="" style="margin-top:5px;text-decoration: none; flex: 1; display: flex; justify-content: flex-end">
                                        <span id="forgotPasswordButton" style="color: #000; font-weight: 500; margin-top: 3px; font-size: 12px" >Forgot Password ?</span>
                                    </div>


                                </div>

                                <div class="formButtonContainer">
                                    <div  id="formLoginButton"><span id="formLoginText" class="colorPrimary">Log In</span></div>

                                    <div class="customFacebookButton" onclick="facebookLogIn();">
                            <span style="color: #fff; font-size: 14px;">
                                Connect with Facebook
                            </span>
                                    </div>

                                    <div class="customLinkedInButton" onclick="linkedInLogIn();">
                            <span style="color: #fff; font-size: 14px;">
                                Connect with LinkedIn
                            </span>
                                    </div>

                                </div>


                                <div style="margin-top: 50px; text-align: center">
                                    <div style="display: flex; justify-content: center">
                                        <span class="newAccountButton" >Register a new account</span>
                                    </div>
                                </div>

                                <div style="width: 100%; margin-top: 10px; text-align: center;">
                                    <a href="https://www.connsuite.com/intro/terms.php" class="colorSecondary" style="color: #000; font-weight: 300; margin-top: 3px; font-size: 12px;" >
                                        <span> By signing up you accept ConnSuite's Terms and Privacy Policy.</span>
                                    </a>
                                </div>

                            </form>
                            <form class="formContainer back" style="display: none" id="formRegisterIndex" method="post" enctype="multipart/form-data" action="" autocomplete="nope" >
                                <div class="formTitleContainer">
                                    <div class="formTitleImageContainer">
                                        <i class="material-icons colorPrimary formTitleImage">&#xE148;</i>
                                    </div>
                                    <span class="formTitleText">Register Your Account</span>
                                </div>
                                <div class="formInputContainer" style="margin-top: 40px;">

                                    <div style="flex: 1; display: flex;flex-direction: column">
                                        <input class="homeFormInput" type="email" name="email" autocomplete="off" id="joinEmail" maxlength="200" title="Your Email" placeholder="Your Email" required>
                                        <div class="divider"></div>
                                    </div>


                                    <div style="display: flex; flex-direction: row">
                                        <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                            <input class="homeFormInput" name="firstname" autocomplete="off" type="text" maxlength="20" id="joinFirstname" title="Your First Name" placeholder="Your First Name" required>
                                            <div class="divider"></div>
                                        </div>
                                        <div style="width: 50px;"></div>

                                        <div style="flex: 1; margin-top:30px;  display: flex;flex-direction: column">
                                            <input class="homeFormInput" name="lastname"  autocomplete="off" type="text" maxlength="12" id="joinLastname" title="Your Last Name" placeholder="Your Last Name" required>
                                            <div class="divider"></div>
                                        </div>

                                    </div>

                                    <div style="margin-top:30px; flex: 1; display: flex;flex-direction: column">
                                        <div style="display: flex; flex-direction: row">
                                            <input style="flex: 1" class="homeFormInput" autocomplete="off" maxlength="40" type="text" name="username" id="joinUsername" title="Your Username (permanent)" placeholder="Your Username (permanent)" required>
                                            <input type="checkbox" name="customUsername" id="customUsername" checked/> <label for="customUsername" style="margin-left: 5px; font-weight: 300;">Autocomplete</label>
                                        </div>

                                        <div class="divider"></div>
                                    </div>



                                    <div style="margin-top:30px; flex: 1; display: flex;flex-direction: column">
                                        <input class="homeFormInput" name="password" autocomplete="off" type="password" id="joinPassword" title="Your Password" placeholder="Your Strongest Password" required>
                                        <div class="divider"></div>
                                    </div>



                                </div>

                                <div class="formButtonContainer" style="margin-top: 40px;">
                                    <div id="formRegisterButton"><span id="formRegisterText" class="colorPrimary">Register Now</span></div>

                                    <div class="customFacebookButton" onclick="facebookLogIn();">
                            <span style="color: #fff; font-size: 14px;">
                                Connect with Facebook
                            </span>
                                    </div>

                                    <div class="customLinkedInButton" onclick="linkedInLogIn();">
                            <span style="color: #fff; font-size: 14px;">
                                Connect with Facebook
                            </span>
                                    </div>




                                    <div style="margin-top: 20px;">
                                        <span id="backToLogButton">Back to Log In Screen</span>
                                    </div>


                                    <div style="width: 100%; margin-top: 10px; text-align: center;">
                                        <a href="https://www.connsuite.com/intro/terms.php" class="colorSecondary" style="color: #000; font-weight: 300; margin-top: 3px; font-size: 12px;" >
                                            <span> By signing up you accept ConnSuite's Terms and Privacy Policy.</span>
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div id="hBackground">

            <div id="hBackgroundTop"></div>
            <div id="hBackgroundCurve">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 340" preserveAspectRatio="none" style=" fill:#ffffff; position: absolute;height: 300px;width: 100%;" >
                    <path opacity="0.5"  d="M 1000 280 l 2 -253 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -235 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path>
                    <path opacity="0.6" d="M 1000 270 l 2 -222 c -157 -43 -312 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -153.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 16.61 v 22.39 z"></path>
                    <path  opacity="1" d="M 1000 290 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path>
                    <rect width="100%" height="400px" y="280"></rect>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 340" preserveAspectRatio="none" style=" fill:#ffffff; transform: scaleX(-1);position: absolute;height: 300px;width: 100%;bottom: -60px; " >
                    <path  opacity="1" d="M 1000 290 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path>
                    <path opacity="0.7"  d="M 1060 280 l 2 -253 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -235 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path>
                    <path opacity="0.6" d="M 1000 260 l 2 -222 c -157 -43 -312 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -153.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 16.61 v 22.39 z"></path>
                </svg>
            </div>
        </div>
    </div>



</div>

<!-- FORGOT PASSWORD -->
<div class="modal fade" id="forgotPasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" >
        <div class="modal-content" >
            <div class="modal-header modal-headerComplementary">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Did you forget your ConnSuite Account's password?</h4>
            </div>
            <div class="modal-body">
                <span id="forgotPasswordModalContent">
                    Have no worries. Fill in the field below and check your email for a link. After you receive that link you have around 60 minutes to change your password, until it expires. Good Luck and hope to see you back really soon! <i class="em em-smiley"></i>
                </span>

                <div style="flex: 1; display: flex;flex-direction: column; margin-top: 30px; margin-bottom: 30px;">
                    <input class="homeFormInput" type="email" name="forgotEmail" autocomplete="off" id="forgotEmail" maxlength="200" title="Your Email" placeholder="Your Email" required>
                    <div class="divider"></div>
                </div>

            </div>
            <div class="modal-footer">
                <span  class="modalButtonCancel" data-dismiss="modal">Close</span>
                <span id="forgotPasswordRequestButton"  class="modalButton">Request Password Change</span>
            </div>
        </div>
    </div>
</div>



<script src="js/model/conn_user.js"></script>
<script src="support/owl-carousel/dist/owl.carousel.js"></script>
<script src="support/animate-it/css3-animate-it.js"></script>
<script src="js/welcomeNew.js"></script>
</body>
</html>
