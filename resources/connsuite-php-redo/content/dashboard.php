<?php
/**
 * Create by @VanSoftware
 * Date: 28/05/2018
 * Time: 14:26
 */



include_once("../base/config.php");
$conn = $E->validateConnection(
        PAGE_IDENTIFIER_DASHBOARD,
        true,
        true,
        true);
$E->addAPI(array(
        "AID" => $E->user->getData()->getAID(),
        "username" => $E->user->getUsername(),
        "name" => $E->user->getData()->getName(),
        "version" => $E->user->getData()->getVersion(),
));



?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <title><?php echo WEBSITE_NAME?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">



    <script language="JavaScript" type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
    <script src="../base/config.js"></script>




    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700|Raleway:200,300,400,500,600,700,800,900&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="../support/fonts/custom-icon/css/conn-custom.css" >

    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="preload" as="style" onload="this.rel='stylesheet'">
    <link href="../support/emoji/main.css" rel="stylesheet">

    <script src="../support/bootstrap/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../support/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../support/bootstrap/css/bootstrap-grid.css">
    <link rel="stylesheet" href="../support/bootstrap/css/bootstrap-reboot.css">
    <script src="../support/bootstrap/js/bootstrap.js"></script>


    <link rel="stylesheet" href="../support/ytpop/YouTubePopUp.css" >
    <script src="../support/ytpop/YouTubePopUp.jquery.js"></script>


    <link rel="stylesheet" href="../css/content/dashboard.css">




</head>
<body id="body" class="primary">





<main>
    <div class="structure-main">
      <section class="section-tutorial">
          <div class="sectionTitle"><p>Your ConnSuite Experience</p><div class="sectionButton"><i class="icon-conn-05"></i><span>View intro video</span></div></div>
          <div class="tutorial"></div>
      </section>

        <section class="section-networks">
            <div class="sectionTitle"><p>Your Networks</p><div class="sectionButton"><i class="material-icons">autorenew</i><span>Reorder</span></div></div>
            <div class="networks"></div>
        </section>

        <section class="section-articles">
            <div class="sectionTitle"><p>Your Story</p></div>
            <div class="articles"></div>
        </section>


    </div>
</main>




<script>
    let API = parseAPI('<?php echo $E->printAPI() ?>');
</script>


<script src="../js/util.js"></script>
<script src="../js/structure.js"></script>

<script src="../js/model/ClassHelper.js"></script>
<script src="../js/model/Input.js"></script>
<script src="../js/model/User.js"></script>
<script src="../js/model/Network.js"></script>

<script src="../js/content/dashboard.js"></script>

</body>
</html>