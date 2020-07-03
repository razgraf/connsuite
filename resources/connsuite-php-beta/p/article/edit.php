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
extractSession(PAGE_ARTICLE_EDIT_KEY);

/**
 * ---------------------------------------
 */


$user = (new User())->mapUser($_SESSION['user']);

if(!isset($_GET['articleID'])) {
    header("Location: ../dashboard.php");
    exit();
}

$articleID = $_GET['articleID'];


?>


<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title>Edit Article | ConnSuite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">

    <!--CONNSUITE META-->
    <?php printMeta_Description();printMeta_Image(); ?>

    <script language="JavaScript" type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>

    <script src="../../support/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../../support/bootstrap/css/bootstrap.css">
    <script src="../../support/bootstrap/js/bootstrap.js"></script>

    <script src="../../support/loading-pace/pace.min.js"></script>
    <link rel="stylesheet" href="../../support/loading-pace/pace.css">



    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="../../support/fonts/custom-icon/css/conn-custom.css" >


    <link rel="stylesheet" href="../../css/util.css">
    <link rel="stylesheet" href="../../css/p/article/edit.css">

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
            echo 'loadSecondaryToolbar('.$depthToRoot[PAGE_ARTICLE_EDIT_KEY].',"'.$user->name.'","Edit this Article","'.$user->thumbnailURL.'", {username : "'.$user->username.'",notificationCount : "'.$user->notificationCount.'"  });';
            ?>
        });

        var depthToRoot = <?php echo $depthToRoot[PAGE_ARTICLE_EDIT_KEY] ?> ;
        var userID = <?php echo $user->ID ?>;

        var uploadArticleImageURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_UPLOAD_ARTICLE_IMAGE] ?>";
        var removeArticleImageURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_REMOVE_ARTICLE_IMAGE] ?>";
        var articleID = <?php echo $articleID ?>;
        var token = "<?php echo $user->getToken(); ?>";
        var username = "<?php echo $user->username ?>";
        var retrieveArticleURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_RETRIEVE_ARTICLE] ?>";
        var doEditArticleURL = "<?php echo ROOT.$pathFromRoot[CORE_DO_ARTICLE_EDIT] ?>";

    </script>

    <div style="width: 100%; flex: 1; display: flex; justify-content: center;align-items: center;">

        <div class="customContainer" style="background: #ffffff;min-height: 300px;">
            <div id="mainContentContainer">


                <div id="profileHelperContainer" style="width: 100%; margin-bottom: 10px;"></div>

                <div id="profileHelperContainer2" style="width: 100%; margin-bottom: 10px;"></div>

                <p class="sectionHeading">Cover picture for Article</p>

                <div id="C_choosePictureContainer">


                    <div id="outputContainer" style="">
                        <img id="output" src="" style="object-fit: cover;  width: 100%; max-height: 350px;  /* Center the image within the element */" />
                    </div>


                </div>


                <p class="sectionHeading">Give it a title</p>

                <div style="flex: 1; display: flex;flex-direction: column">
                    <div style="display: flex; flex-direction: row;align-items: center">
                        <input maxlength="150" style="flex: 1" class="rightFormInput" type="text" name="title" id="title" title="Title of the article" placeholder="This is awesome">
                    </div>
                    <div class="divider"></div>
                </div>


                <p style="margin-bottom: 10px;" class="sectionHeading">Write your new article below</p>
                <textarea style="font-size: 14pt" title="Content" id="customMDE"></textarea>



                <p class="sectionHeading">Add images at the end</p>

                <div class="imageContainer">
                    <div id="uploadedImages" style="width: 100%;">

                    </div>
                    <div>
                        <span id="addImageButton" class="buttonTypeOutlineGray">+ Add Image<span class="buttonCSLoaderGray"></span></span>
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








<script src="../../base/config.js"></script>
<script src="../../js/util.js"></script>


<script src="../../js/model/network.js"></script>
<script src="../../js/system/toolbar.js"></script>

<script src="../../js/model/conn_user.js"></script>
<script src="../../js/model/article.js"></script>


<script src="../../js/p/article/edit.js"></script>


</body>
</html>

