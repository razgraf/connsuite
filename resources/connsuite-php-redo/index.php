<?php
/**
 * Create by @VanSoftware
 * Date: 27/05/2018
 * Time: 14:40
 */
include_once ("base/config.php");
if($E->validateConnection(PAGE_IDENTIFIER_INDEX,false) != false) $E->redirectTo(PAGE_IDENTIFIER_INDEX,PAGE_IDENTIFIER_DASHBOARD);

$E->addAPI(array( "FLIP_FORCE" => getAPIParam($_GET["f"],DATA_TYPE_STRING,null,null,false) ? "true" : "false"));


?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Sign In | <?php echo WEBSITE_NAME?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">


    <script language="JavaScript" type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
    <script src="base/config.js"></script>




    <link href="support/emoji/main.css" rel="stylesheet">



    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700|Raleway:200,300,400,500,600,700,800,900&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="support/fonts/custom-icon/css/conn-custom.css" >
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <script src="support/bootstrap/popper/popper.min.js"></script>
    <link rel="stylesheet" href="support/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="support/bootstrap/css/bootstrap-grid.css">
    <link rel="stylesheet" href="support/bootstrap/css/bootstrap-reboot.css">
    <script src="support/bootstrap/js/bootstrap.js"></script>



    <link rel="stylesheet" href="support/animate-it/animations.css" >

    <link rel="stylesheet" href="support/owl-carousel/dist/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="support/owl-carousel/dist/assets/owl.theme.default.min.css">

    <link rel="stylesheet" href="support/ytpop/YouTubePopUp.css" >
    <script src="support/ytpop/YouTubePopUp.jquery.js"></script>


    <script src="support/flip/script.js"></script>
    <script src="support/owl-carousel/dist/owl.carousel.js"></script>
    <script src="support/animate-it/css3-animate-it.js"></script>


    <link rel="stylesheet" href="css/index.css">





</head>
<body>
<a class="video" href="https://youtu.be/s-mP22EkCfM" style="z-index: 9999999; display: none;"></a>
<main>


    <section class="header">
        <div class="content">
            <div class="toolbar">
                <div class="container">
                    <div class="logo"><img src="image/connsuite_full_horiz_white.png"></div>
                    <div class="menu">
                        <a href="https://www.producthunt.com/posts/connsuite" target="_blank" class="item"><span class="long"><i class="em em-sparkles"></i>Product Hunt</span><span class="short"><i class="em em-sparkles"></i>PH</span><div></div></a>
                        <a class="item"><span>About</span><div></div></a>
                        <a href="#c" class="item connect"><span>Connect</span></a>
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="side left">
                    <div class="headlines">
                        <p class="title">Create the ultimate<br>online business card</p>
                        <h5>Link to all your public networks, accounts & stories</h5>
                    </div>
                    <div class="buttons">
                        <a href="#c" class="buttonOutlineSpecialWhite"><span>Start Now</span></a>
                        <a id="watch" href="#" class="buttonOutlineSpecialWhite"><i class="material-icons">&#xE037;</i><span>Watch</span></a>
                    </div>
                </div>
                <div class="side right">
                    <div class="businessCardContainer" >
                        <div class="businessCard back">
                            <div class="left">
                                <img src="image/connsuite_icon_inverted_rounded.png"/>
                            </div>
                            <div class="right">
                                <div class="businessContainer">
                                    <span class="text">Find me on connsuite.com</span>
                                    <span class="username">/razgraf</span>
                                </div>
                            </div>


                        </div>
                        <div style="" class="businessCard front">
                            <div class="left">
                                <img src="image/connsuite_icon_inverted_rounded.png" />
                            </div>
                            <div class="right">
                                <div class="businessContainer">
                                    <span class="name">Razvan Gabriel</span>
                                    <span class="text">Find me on:</span>
                                    <div class="links">
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
                                        <a class="seriousLink" href="https://www.connsuite.com/razgraf" target="_blank" style="display: block"> <span class="dots">+851 more</span> </a>
                                    </div>
                                    <div class="solution"><p>connsuite.com/razgraf</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="background">
            <div class="top"></div>
            <div class="curve">
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
    </section>

    <section class="desktop">
        <div class="container">
        <p class="sectionTitle">Let's fix the business card together<br><i class="em em-dark_sunglasses"></i></p>


        <div style="opacity: 0;" class="screen">
            <div class="top">
                <div class="buttons">
                    <div style="background: #ff6868"></div>
                    <div style="background: #ffdb13"></div>
                    <div style="background: #5dd913"></div>
                </div>
                <div class="title"><span></span></div>
            </div>
            <div class="main">
                <div class="left owl-carousel">
                    <div class="slide slide1">
                        <img class="picture" src="image/tutorial/tutorial_picture_smith.png" />
                        <p class="name">John Smith</p>
                        <span class="short">Traveller / Mobile Developer</span>


                        <div class="networks mini">

                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status visible"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>LinkedIn</p></div>
                                </div>

                            </div>
                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status visible"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>Instagram</p></div>
                                </div>

                            </div>
                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>Skype</p></div>
                                </div>

                            </div>
                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status visible"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_facebook.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>Facebook</p></div>
                                </div>

                            </div>



                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status visible"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_dribbble.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>Dribbble</p></div>
                                </div>

                            </div>
                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status visible"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_twitter.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>Twitter</p></div>
                                </div>

                            </div>
                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_pinterest.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>Pinterest</p></div>
                                </div>

                            </div>
                            <div class="networkCard">
                                <div class="n-card">
                                    <div class="n-main">
                                        <div class="n-top"><div class="n-status"></div></div>
                                        <div class="n-image"><img src="image/network/normal/icon_github.png"></div>
                                    </div>
                                </div>
                                <div class="n-info">
                                    <div class="n-title"><p>GitHub</p></div>
                                </div>

                            </div>



                        </div>



                    </div>
                    <div class="slide slide2">


                        <div class="selfCard">
                            <div class="self-left">
                                <div class="self-picture">
                                    <img src="image/landing/jane.jpg">
                                    <div class="self-badge">
                                        <img src="image/logo_icon_gr.png">
                                    </div>
                                </div>
                            </div>
                            <div class="self-right">
                                <div class="self-name"><p>Jane Doe</p></div>
                                <div class="self-username"><p>@jane</p></div>
                                <div class="networks icons">

                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_facebook.png"></div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_dribbble.png"></div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_twitter.png"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_pinterest.png"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_behance.png"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_producthunt.png"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="networkCard">
                                        <div class="n-card">
                                            <div class="n-main">
                                                <div class="n-image"><img src="image/network/normal/icon_reddit.png"></div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>



                        <div class="button"><i class="material-icons">&#xE870;</i> <span>Request Business Card</span></div>
                        <div class="divider"></div>



                        <div class="offlineContainer">

                            <div class="offlineCard">
                                <div class="off-left">
                                    <div class="off-picture">
                                        <div><p>AD</p></div>
                                    </div>
                                </div>
                                <div class="off-divider"></div>
                                <div class="off-right">
                                    <div class="off-name"><p>Ane Doe</p></div>

                                    <div class="off-fields">
                                        <div class="off-field">
                                            <i class="icon-conn-04"></i>
                                            <span>ane.doe@gmail.com</span>
                                        </div>
                                        <div class="off-field">
                                            <i class="icon-conn-05"></i>
                                            <span>www.anedoe.com</span>
                                        </div>
                                        <div class="off-field">
                                            <i class="icon-conn-03"></i>
                                            <span>+40123456789</span>
                                        </div>
                                    </div>
                                    <div class="off-images">
                                        <div class="off-image"><i class="material-icons">&#xE3C4;</i></div>
                                        <div class="off-image"><i class="material-icons">&#xE3C4;</i></div>
                                    </div>

                                </div>
                            </div>


                            <div class="offlineCard">
                                <div class="off-left">
                                    <div class="off-picture">
                                        <div><p>JS</p></div>
                                    </div>
                                </div>
                                <div class="off-divider"></div>
                                <div class="off-right">
                                    <div class="off-name"><p>James Suite</p></div>

                                    <div class="off-fields">
                                        <div class="off-field">
                                            <i class="icon-conn-04"></i>
                                            <span>james@connsuite.com</span>
                                        </div>
                                        <div class="off-field">
                                            <i class="icon-conn-03"></i>
                                            <span>+309922345</span>
                                        </div>
                                    </div>
                                    <div class="off-images">
                                        <div class="off-image"><i class="material-icons">&#xE3C4;</i></div>
                                        <div class="off-image"><i class="material-icons">&#xE3C4;</i></div>
                                    </div>

                                </div>
                            </div>



                        </div>





                    </div>
                    <div class="slide slide3">


                        <img class="image" src="image/landing/landing3.png" />
                        <p class="title">Article : Why I <i class="em em-heartbeat"></i> ConnSuite</p>
                        <span class="content">I have a lot of personal accounts on social media networks and websites. I enjoy using them myself but also sharing them for others to know where to reach out and have a chat. <b>Wherever and Whenever!</b>...<br><br> But after a while I started to realise that I have no way of organising and linking them to one single account. All had different usernames, all had no ... </span>






                    </div>
                    <div class="slide slide4">
                            <p class="title"><i class="em em-mag"></i> Your search results are :<br></p>

                        <div class="searchContainer">
                            <div class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/small_self_body.png"></div>
                                    <div class="s-name">Razvan Gabriel</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@razgraf</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/landing/mugur.jpg"></div>
                                    <div class="s-name">Mugur Jr.</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@Mugur Jr.</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_sycity.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_twitter.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_facebook.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/landing/paul.jpg"></div>
                                    <div class="s-name">Paul Berg</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@paulrberg</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_github.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_twitter.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_medium.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/landing/catalin.jpg"></div>
                                    <div class="s-name">Catalin Bahrin</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@catalin.bahrin</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_facebook.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_behance.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div style="opacity:0.5;" class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/landing/jane.jpg"></div>
                                    <div class="s-name">Jane Doe</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@jane</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div style="opacity:0.5;" class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/landing/meghan.png"></div>
                                    <div class="s-name">Meghan</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@meg30</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div style="opacity:0.5;" class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/tutorial/tutorial_picture_smith.png"></div>
                                    <div class="s-name">John Smith</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@john.smith</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div style="opacity:0.5;" class="searchCard">
                                <div class="s-body">
                                    <div class="s-image"><img src="image/logo_icon_gr.png" style="padding: 12px"></div>
                                    <div class="s-name">ConnSuite</div>
                                    <div class="s-divider"></div>
                                    <div class="s-username">@connsuite</div>
                                </div>
                                <div class="s-footer">
                                    <div class="networks icons">
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_linkedin.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_instagram.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="networkCard">
                                            <div class="n-card">
                                                <div class="n-main">
                                                    <div class="n-image"><img src="image/network/normal/icon_skype.png"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>
                    <div class="slide slide5">



                        <div class="left5">
                            <div class="scanCard">
                                <div class="scan-header">
                                    <div class="scan-image">
                                        <img src="image/tutorial/tutorial_icon_gradient_overlay.gif"/>
                                    </div>
                                </div>
                                <div class="scan-body">

                                    <div class="scan-code">
                                        <img src="image/landing/qr.png" style="width: 100%; object-fit: contain;"/>
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div class="right5">

                            <p class="sectionTitle">Notifications & Events<br><i class="em em-loudspeaker"></i></p>
                            <div class="notifications">
                                <div class="notificationCard">
                                    <div class="notification-left">
                                        <div class="notification-image">
                                            <img src="image/landing/jane.jpg">
                                        </div>
                                    </div>
                                    <div class="notification-right">
                                        <div class="notification-content">
                                            <span>You have just received a business card request from Jane!</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="notificationCard">
                                    <div class="notification-left">
                                        <div class="notification-image">
                                            <img src="image/tutorial/tutorial_picture_smith.png">
                                        </div>
                                    </div>
                                    <div class="notification-right">
                                        <div class="notification-content">
                                            <span class="colorPrimary">John Smith has just accepted your business card request.</span>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>




                    </div>

                </div>





                <div class="right">
                    <div class="about" >




                    </div>
                    <div class="joystick">

                        <img src="image/landing/arrows.png" width="160" height="160" usemap="#joystickMap"/>
                        <map name="joystickMap">
                            <area shape="rect" coords="0,60,60,120" onclick="triggerSlide(true)" >
                            <area shape="rect" coords="100,60,160,160" onclick="triggerSlide(false)">
                        </map>


                    </div>
                </div>


            </div>

        </div>

        </div>
    </section>


    <section class="search">
        <div class="container">

            <p class="sectionTitle">Find out how to reach someone<br><i style="font-size: 14pt;" class="em em-mag_right"></i></p>

            <div class="searchBarCard">
                <div class="search-container">
                    <input id="searchBar" class="default" placeholder="Search by keyword" title="Search for people or companies">
                    <div></div>
                </div>
                <div class="search-button">
                    <div><i id="searchIconDefault" class="material-icons">search</i><i id="searchIconLoader" class="material-icons">autorenew</i></div>
                </div>
                <div class="search-results"></div>
            </div>






        </div>
    </section>




    <section class="credentials">
        <div class="credentials-divider">
            <div class="curve">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 340" preserveAspectRatio="none" >
                    <defs>
                        <linearGradient id="blueGR" x1="-10%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#4481EB"></stop>
                            <stop offset="100%" stop-color="#04befe"></stop>


                        </linearGradient>
                    </defs>
                    <path fill="url(#blueGR)" opacity="1" d="M 1000 290 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path>
                    <path fill="url(#blueGR)" opacity="0.7"  d="M 1000 280 l 2 -253 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -235 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path>
                    <path fill="url(#blueGR)" opacity="0.6" d="M 1000 260 l 2 -222 c -157 -43 -312 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -153.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 16.61 v 22.39 z"></path>
                </svg>
            </div>
        </div>
        <div class="container">

            <p class="sectionTitle" style="color: #ffffff">Connect to ConnSuite<br><i style="color: #ffffff;font-size: 30pt;" class="icon-conn-05 leftSideBarElementIcon"></i></p>

            <div class="credentials-card-container" id="c">

                <div class="credentials-card front">
                    <div class="credentials-card-header">
                        <div class="title"><p >Log into your Account</p></div>
                    </div>
                    <div class="credentials-card-body">
                        <div class="field">
                            <input id="email" placeholder="john.doe@gmail.com" type="text" autocomplete="off">
                            <label for="email">Email</label>
                        </div>
                        <div class="field">
                            <input id="password" type="password" autocomplete="new_password" placeholder="********">
                            <label for="password">Password</label>
                            <span>Forgot Password?</span>
                        </div>
                        <div class="credentials-card-buttons">

                            <div id="logInButton" class="credentials-card-button default"><span>Log In</span></div>
                            <div class="credentials-card-button round facebook"><img src="image/landing/facebook-128.png"></div>
                            <div class="credentials-card-button round linkedIn"><img src="image/landing/linkedin-128.png"></div>
                        </div>

                        <div class="divider"></div>
                    </div>

                    <div class="credentials-card-footer">
                        <span class="or">or</span>
                        <div class="credentials-card-button register"><span>Create a new account</span></div>
                        <p class="credentials-card-footer-terms">By signing up you accept ConnSuite's Terms and Privacy Policy.</p>
                    </div>

                </div>
                <div style="display: none" class="credentials-card back">
                    <div class="credentials-card-header">
                        <div class="title"><p>Register a new Account</p></div>
                    </div>
                    <div class="credentials-card-body">
                        <div class="field half">
                            <input id="firstNameR" placeholder="John" type="text" autocomplete="off">
                            <label for="firstNameR">First Name</label>
                        </div>
                        <div class="field half">
                            <input id="lastNameR" placeholder="Doe" type="text" autocomplete="off">
                            <label for="lastNameR">Last Name</label>
                        </div>
                        <div class="field half">
                            <input id="emailR" placeholder="john.doe@gmail.com" type="email" autocomplete="off">
                            <label for="emailR">Email</label>
                        </div>
                        <div class="field half">
                            <input id="passwordR" type="password" placeholder="password" >
                            <label for="passwordR">Password</label>
                        </div>
                        <div class="field">
                            <input id="usernameR" placeholder="john_is_awesome" type="text" autocomplete="off">
                            <label for="usernameR">Username</label>
                            <div class="checkbox">
                                <input id="usernameAutoR" title="Autocomplete" type="checkbox" value="1" checked>
                                <label for="usernameAutoR"></label>
                                <p>Auto-generate from name</p>
                            </div>
                        </div>

                        <div class="credentials-card-buttons">

                            <div id="registerButton" class="credentials-card-button default"><span>Create your profile</span></div>
                            <div class="credentials-card-button round facebook"><img src="image/landing/facebook-128.png"></div>
                            <div class="credentials-card-button round linkedIn"><img src="image/landing/linkedin-128.png"></div>
                        </div>

                        <div class="divider"></div>
                    </div>

                    <div class="credentials-card-footer">
                        <span class="or">or</span>
                        <div class="credentials-card-button back"><i class="material-icons">arrow_back_ios</i><span>Go Back</span></div>
                        <p class="credentials-card-footer-terms">By signing up you accept ConnSuite's Terms and Privacy Policy.</p>
                    </div>

                </div>



            </div>


        </div>
    </section>




</main>


<script>

    let kick = "<?php echo isDataSet($_GET['kick'],DATA_TYPE_STRING) ? "true" : "false" ?>";

    let API = parseAPI('<?php echo $E->printAPI() ?>');

</script>


<script src="js/model/ClassHelper.js"></script>
<script src="js/model/Input.js"></script>

<script src="js/model/User.js"></script>


<script src="support/flip/script.js"></script>

<script src="js/util.js"></script>
<script src="js/index.js"></script>


</body>
</html>
