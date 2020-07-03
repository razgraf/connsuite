<?php
/**
 * Create by @VanSoftware
 * Date: 28/05/2018
 * Time: 14:26
 */



include_once("../../base/config.php");
$conn = $E->validateConnection(
    PAGE_IDENTIFIER_NETWORK_ADD,
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
    <title>Add Network | <?php echo WEBSITE_NAME?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <meta name="pinterest" content="nopin" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">



    <script language="JavaScript" type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>
    <script src="../../base/config.js"></script>



    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700|Raleway:200,300,400,500,600,700,800,900&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="../../support/fonts/custom-icon/css/conn-custom.css" >

    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="preload" as="style" onload="this.rel = 'stylesheet'">
    <link href="../../support/emoji/main.css" rel="stylesheet">
    <script src="../../support/bootstrap/popper/popper.min.js"></script>
    <link rel="stylesheet" href="../../support/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../support/bootstrap/css/bootstrap-grid.css">
    <link rel="stylesheet" href="../../support/bootstrap/css/bootstrap-reboot.css">
    <script src="../../support/bootstrap/js/bootstrap.js"></script>


    <link rel="stylesheet" href="../../css/content/n/add.css">




</head>
<body id="body" class="secondary manager">





<main>
    <div class="structure-main">

        <div class="section-title"><div><p>1</p></div><div></div></div>

        <section class="section-network-container">
            <div class="tab-container">
                <div class="tab-item active" data-id="1"><p>Use a Default Network</p></div>
                <div class="tab-item" data-id="2"><p>Use a Custom network</p></div>
                <div class="tab-line"><div><span></span></div></div>
            </div>
            <div class="section-network default active" data-id="1">
                <div class="section-network-top-info"><p>Choose one of the predefined networks from ConnSuite's archive. e.g. Facebook, Dribbble, Github ...</p></div>
                <div class="section-network-top-chosen-name"></div>
                <div class="networks icons selectable"></div>
            </div>
            <div class="section-network custom" data-id="2">
                <div class="section-network-top-info"><p>Create a custom network to showcase other accounts, websites and links. e.g. Your Website, A new Social Network ...</p></div>
                <div class="section-network-custom-uploader"></div>
            </div>
        </section>

        <div class="section-title"><div><p>2</p></div><div></div></div>

        <section class="section-info-container">

            <div class="section-info-title"><p>Fill in your network's details</p></div>
            <div class="section-info-fields">
                <div class="section-info-fields-default"></div>

                <div class="section-info-fields-extra">
                    <div class="field">
                        <p>Labels</p>
                        <div class="field-labels"></div>
                    </div>
                    <div class="field">
                        <p>Public/Private Network</p>
                        <div class="field-toggle">
                            <div class="network-toggle-container">
                                <p>Public Network</p>
                                <input id="network-toggle" type="checkbox" checked/>
                                <label for="network-toggle"></label>
                            </div>

                        <span>By turning off the toggle, this network will be made available only to those who requested your business card. If turned on, everyone will be able to see this network. (Changes will apply when you close the cover)</span>
                        </div>
                    </div>
                </div>

            </div>

        </section>

        <div class="section-title"><div><p>3</p></div><div></div></div>


        <section class="section-buttons-container">
            <div id="finalButtonSave"><span>Save Network</span></div>
            <div id="finalButtonPreview"><span>Preview the Network</span></div>
            <a href="../dashboard.php" id="finalButtonCancel"><span>Cancel</span></a>
        </section>


    </div>
</main>




<script>
    let API = parseAPI('<?php echo $E->printAPI() ?>');
</script>


<script src="../../js/util.js"></script>
<script src="../../js/structure.js"></script>

<script src="../../js/model/ClassHelper.js"></script>
<script src="../../js/model/Input.js"></script>
<script src="../../js/model/User.js"></script>
<script src="../../js/model/Network.js"></script>

<script src="../../js/content/n/add.js"></script>

</body>
</html>