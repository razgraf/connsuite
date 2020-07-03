<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 24/08/2017
 * Time: 15:35
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
extractSession(PAGE_ARTICLE_ADD_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);





?>


<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Write an Article | ConnSuite</title>
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
    <link rel="stylesheet" href="../../css/p/article/add.css">

    <link rel="stylesheet" href="../../support/custom-ui/material_design_toggle.css">
    <link rel="stylesheet" href="../../support/animate/file.css" >



    <link rel="stylesheet" href="../../support/simpleMDE/simplemde.min.css">
    <script src="../../support/simpleMDE/simplemde.min.js"></script>

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
            echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_ARTICLE_ADD_KEY].',"'.$user->name.'","Write a New Article","'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
            ?>
        });

        var depthToRoot = <?php echo $depthToRoot[PAGE_ARTICLE_ADD_KEY] ?> ;
        var userID = <?php echo $user->ID ?>;
        var uploadArticleURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ARTICLE_ADD] ?>";
        var token = "<?php echo $user->getToken(); ?>";
        var uploadArticleImageURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_UPLOAD_ARTICLE_IMAGE] ?>";
        var removeArticleImageURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_REMOVE_ARTICLE_IMAGE] ?>";
        let stepID = "<?php echo $user->getStepID();?>"; try{stepID = parseInt(stepID);}catch(err){stepID = TUTORIAL_STEP_WELCOME;}

    </script>

    <div style="width: 100%; flex: 1; display: flex; justify-content: center;align-items: center;">

        <div class="customContainer" style="background: #ffffff;min-height: 300px;">
            <div id="mainContentContainer">


                <div id="profileHelperContainer" style="width: 100%; margin-bottom: 10px;"></div>

                <div  class="sectionHeading" style="margin-bottom: 10px;"><span data-tooltip="Please choose is wisely as you will not be able to change it afterwards">Give it a cover image ( tip: min 400x1000 )</span></div>

                <div id="C_choosePictureContainer">


                    <div id="noPictureContainer">
                        <span>UPLOAD YOUR COVER PICTURE HERE</span>
                    </div>
                    <div id="outputContainer" style="display: none">
                        <img id="output" src="" style="object-fit: cover;  width: 100%; max-height: 350px;  /* Center the image within the element */" />
                    </div>






                    <input type="file" id="customImage" name="customImage"
                           style="margin-top: 10px; z-index: 10; display: none" accept="image/*"
                           onchange="loadFile(event)">

                </div>

                <div style="width: 100%;display: flex; justify-content: center;margin-top: 20px;">
                    <span class="buttonTypeOutlineGray" id="chooseThumbnailButton" style="max-width: 300px;">Choose a cover image  <span class="buttonCSLoaderBlue"></span> </span>

                </div>


                <p class="sectionHeading">Give it a title</p>

                <div style="flex: 1; display: flex;flex-direction: column">
                    <div style="display: flex; flex-direction: row;align-items: center">
                        <input maxlength="150" style="flex: 1" class="rightFormInput" type="text" name="title" id="title" title="Title of the article" placeholder="This is awesome">
                    </div>
                    <div class="divider"></div>
                </div>

                <label for="customMDE" style="margin-bottom: 10px;" class="sectionHeading">Write your new article below</label>

                <textarea id="customMDE"></textarea>


                <div id="profileHelperContainerEye" style="width: 100%; margin-bottom: 10px;"></div>





                <p class="sectionHeading">Add images at the end</p>

                <div class="imageContainer">
                    <div id="uploadedImages" style="width: 100%;">

                    </div>
                    <div>
                    <span id="addImageButton" class="buttonTypeOutlineGray">+ Add Image</span>
                        <input type="file" id="customImageEnd" name="customImageEnd"
                               style="display: none" accept="image/*"  onchange="loadFileEnd(event)">
                    </div>

                </div>




                <div id="bottomButtonContainer">
                <span class="buttonTypeOutlinePrimary" id="saveArticleButton">Save This Article</span>
                </div>



            </div>
        </div>


    </div>




</div>










<script src="../../js/model/network.js"></script>
<script src="../../base/config.js"></script>
<script src="../../js/util.js"></script>

<script src="../../js/system/toolbar.js"></script>
<script src="../../js/model/conn_user.js"></script>
<script src="../../js/model/article.js"></script>
<script src="../../js/p/article/add.js"></script>



</body>
</html>

