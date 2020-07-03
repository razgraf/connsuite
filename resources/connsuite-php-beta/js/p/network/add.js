/**
 * Created by razvan on 18/08/2017.
 */

var labelList = [];
var networkList = [];
var chosenNetworkID;
var publicToggle = true;

var custom = false;
var pictureChanged = false;



$(function(){
  $("#C_additionalFields").hide();
  transitionPageEnterLoad(depthToRoot);
  doRetrieveNetworks();
  doRetrieveLabels();

  $("#addNetworkButton").on("click",function(){

      if(!custom) {if(checkDefaultFormFields()){doAddNetwork();}}
      else if( checkCustomFormFields() ) {doAddCustomNetwork();}
  });

    $("#publicToggle").on("change",function(){
        toggleVisible($(this).is(":checked"));
    });

    if($(window).width() < 970){
        $("#description").prop("rows","3");
    }

    setCustomClicks();


});

function doRetrieveNetworks(){
    var parent = $("#leftNetworksTable");
    var cards = $(".cardNetworksProducts");
    var req = $.ajax({
        url : requestNetworkListURL,
        type : "GET",
        data : {},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        // console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error regarding this action. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {

            var result = response['result'];
            if(result.length === 0) return;
            chosenNetworkID = result[0]['ID'];
            for(var i = 0; i< result.length ; i++){
                var tempNetwork = new Network();
                tempNetwork.set(result[i]);


                if(!tempNetwork.hint) {
                    if (tempNetwork.special === '0') tempNetwork.hint =  "e.g. john123";
                    else  tempNetwork.hint = "Username/identifier e.g. john123";
                }



                networkList.push(tempNetwork);

                var networkImage = new NetworkImage();
                networkImage.set(result[i]);
                var print = ' <div class="leftNetworksTableItemContainer" onclick="selectNetworkByPosition(\''+networkImage.ID+'\')" title="Select '+networkImage.name+'"> ' +
                    '<div class="leftNetworksTableItemImageContainer">' +
                    '<img class="leftNetworksTableItemImage" src="'+networkImage.thumbnail+'"/> ' +
                    '</div>' +
                    '</div>';
                parent.hide().append(print).fadeIn(450);




                var cardNetworkProduct = '  <div class="cardNetworksProduct" id="cardNetworksProduct-'+networkImage.ID+'" product-id="'+networkImage.ID+'" > ' +
                    '<div class="cardNetworksThumbnail"  style="border: 0;"><img src="'+networkImage.url+'"/></div> ' +
                    '<h1 class="cardNetworksTitle">'+networkImage.name+'</h1> ' +
                    '</div>';
                cards.append(cardNetworkProduct);
            }
            $("#cardNetworksProduct-"+result[0].ID).addClass("active");
            $("#rightFormUserlink").text(result[0].link);
            initCards();
            //give first card the "active" status

            transitionPageEnterLoadEnd(); /**--------__END LOAD__-----------*/
            var arrows = true;
            var centerMode = false;
            var slidesToScroll = 2;
            if(result.length < 6) {
                arrows = false;
                centerMode = true;
                slidesToScroll = result.length < 2 ? result.length : 2;
                parent.not('.slick-initialized').slick({slidesToShow: result.length});
            }
            parent.not('.slick-initialized').slick({
                arrows : arrows,
                centerMode: centerMode,
                swipe : true,
                variableWidth :true,
                slidesToScroll :slidesToScroll,
                prevArrow:'<button type="button" class="slick-prev pull-left"><i class="material-icons slickArrow">&#xE314;</i></button>',
                nextArrow:'<button type="button" class="slick-next pull-right"><i class="material-icons slickArrow">&#xE315;</i></button>'
            });


        }

    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        parent.html("No networks available.")

    });
}

function selectNetworkByPosition(ID){
    let rightFormUserlink = $("#rightFormUserlink");

    chosenNetworkID = ID;

        $(".cardNetworksProduct").removeClass("active");
        $("#cardNetworksProduct-" + ID).addClass("active");

    let network = networkList[findNetworkPosByID(ID)];

    $("#username").prop("placeholder",network.hint);

    if(network.special === '0'){
        rightFormUserlink.show();
        rightFormUserlink.text(network.userlink);
    }else{
        rightFormUserlink.hide();
    }



}


function initCards(){
    var getProductHeight = $('.cardNetworksProduct.active').height();
    if(getProductHeight < 210) getProductHeight = 230;
    $('.cardNetworksProducts').css({
        height: getProductHeight
    });

    function calcProductHeight() {
        getProductHeight = $('.cardNetworksProduct.active').height();
        if(getProductHeight < 210) getProductHeight = 230;
        $('.cardNetworksProducts').css({
            height: getProductHeight
        });
    }

    var productItem = $('.cardNetworksProduct'),
        productCurrentItem = productItem.filter('.active');

    $('#next').on('click', function(e) {
        e.preventDefault();

        var nextItem = productCurrentItem.next();

        productCurrentItem.removeClass('active');

        if (nextItem.length) {

            productCurrentItem = nextItem.addClass('active');


        } else {
            productCurrentItem = productItem.first().addClass('active');
        }

        var elementID = productCurrentItem.prop("id");
        var ID = elementID.substr(elementID.indexOf("-") + 1);
         selectNetworkByPosition( ID);

        calcProductHeight();
    });

    $('#prev').on('click', function(e) {
        e.preventDefault();

        var prevItem = productCurrentItem.prev();

        productCurrentItem.removeClass('active');

        if (prevItem.length) {
            productCurrentItem = prevItem.addClass('active');
        } else {
            productCurrentItem = productItem.last().addClass('active');
        }

        calcProductHeight();

        var elementID = productCurrentItem.prop("id");
        var ID = elementID.substr(elementID.indexOf("-") + 1);
        selectNetworkByPosition( ID);

    });

    // Ripple
    $('[ripple]').on('click', function(e) {
        var rippleDiv = $('<div class="ripple" />'),
            rippleSize = 60,
            rippleOffset = $(this).offset(),
            rippleY = e.pageY - rippleOffset.top,
            rippleX = e.pageX - rippleOffset.left,
            ripple = $('.ripple');

        rippleDiv.css({
            top: rippleY - (rippleSize / 2),
            left: rippleX - (rippleSize / 2),
            background: $(this).attr("ripple-color")
        }).appendTo($(this));

        window.setTimeout(function() {
            rippleDiv.remove();
        }, 1900);
    });
}




function doRetrieveLabels(){
    var parent = $("#rightLabelContainer");

    var req = $.ajax({
        url : requestLabelListURL,
        type : "GET",
        data : {},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        // console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error regarding this action. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            if(result && result.length > 0) {
                printLabels(result);
            }
            else parent.html("No labels available.");
        }

    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        parent.html("No labels available.")

    });
}

function printLabels(labels){
    var print = '';
    var parent = $("#rightLabelContainer");
    if(labels == null || labels.length === 0) {parent.html("<p style='font-size: 9pt;color: #fff;font-weight: 400;opacity: 0.3;'>No labels available.</p>")}
    else {
        for (var i = 0; i < labels.length; i++) {
            var label = new NetworkLabel();
            label.set(labels[i]);
            labels[i] = label;
            labelList.push(label);
            print += '<div onclick ="selectLabel(\''+labels[i].ID+'\')" id="label-'+labels[i].ID+'" style="padding-right:10px; cursor: pointer;margin-bottom:15px;opacity: 0.3; display: inline-block;"> ' +
                '<span style="width: 100%; height: 30px; border-radius: 15px; ' +
                'color: #fff; font-size: 9pt; padding: 5px 15px; background: ' + labels[i].color + '">' + labels[i].name +
                '</span> ' +
                '</div>'
        }
        parent.html(print);
    }
}



function selectLabel(ID){
    var pos = findLabelPosByID(ID);
    if(pos!==null) {
        if(labelList[pos].selected === false){
            labelList[pos].selected = true;
            $("#label-"+ID).css("opacity",1);
        }
        else{
            labelList[pos].selected = false;
            $("#label-" + ID).css("opacity","0.3");
        }
    }
    }


function findLabelPosByID(ID){
    for(var i = 0; i< labelList.length; i++){
        if(labelList[i].ID == ID) return i;
    }
    return null;
}

function findNetworkPosByID(ID){
    if(networkList.length === 0) return null;
    for(var i = 0; i< networkList.length; i++){
        if(networkList[i].ID == ID) return i;
    }
    return null;
}



/**
 * ------
 * Network Checker
 */

function checkDefaultFormFields(){
    var usernameField = $("#username");


    usernameField.css("background", "#ffffff");

    if(usernameField.val().length < 2){
        usernameField.css("background", "#f9f9f9");
        showToast("Please add a valid username.",800);
        return false;
    }


    return true;


}



function doAddNetwork(){


    var username = $("#username").val();
    var description = $("#description").val();
    var labelIDs = [];
    var publicStatus = publicToggle ? '1' : '0';
    var i,j;
    for(i = 0; i < labelList.length ;i++){
        if(labelList[i].selected === true) labelIDs.push(labelList[i].ID);
    }
    if(chosenNetworkID === null) return;
    var network = networkList[findNetworkPosByID(chosenNetworkID)];

    var special = network.special;


    var create = $.ajax({
        url : doNetworkAddURL,
        type : "POST",
        data : {
            username : username,
            userID : userID,
            special : special,
            visible : publicStatus,
            labelIDs : JSON.stringify(labelIDs),
            networkID : chosenNetworkID,
            description : description,
            custom : '0'
        },
        headers : buildHeaders(token, userID)
    });

    create.done(function(response){

        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error regarding this action. Try again!",800);
        }
        else if(response['response'] === kCSResponseOk) {
            showToast("A new network has been added to your account",1000);
            $('body').attr("disabled",true);
            if(stepID === 2) doCompleteTutorialStep(stepID,true);
            else window.location.href = "../dashboard.php";
        }

    });

    create.fail(function(e){
        console.log("fail");
        showToast("Server error.");

    });





}

function toggleVisible(state){


    var publicToggleTitle = $("#publicToggleTitle");

    if(state) {

        publicToggleTitle.text("Public (On)");
        publicToggle = true;

    } else {

        publicToggleTitle.text("Public (Off)");
        publicToggle = false;
    }

}




/**
 -------------------------------
 CUSTOM
 -------------------------------
 */


$(function(){

   $("#createCustomNetworkButton").on("click",function(){
        showCustom();

       $("#chooseDefaultButton").on("click",function(){
        hideCustom()
       });
   }) ;

});


function doAddCustomNetwork(){



    var weblink = ($("#username").val()).toLowerCase();
    var description = $("#description").val();
    var networkName = $("#C_networkName").val();
    let userlink = ($("#username").val()).toLowerCase();
    let accountUsername = ($("#accountName").val());


    var image = $("#customImage")[0].files[0];

    var labelIDs = [];
    var publicStatus = publicToggle ? '1' : '0';
    var i,j;
    for(i = 0; i < labelList.length ;i++){
        if(labelList[i].selected === true) labelIDs.push(labelList[i].ID);
    }

    let special = '0';



    if(!accountUsername || accountUsername.length === 0){
        accountUsername = firstname.substr(0,firstname.indexOf(' '));
        accountUsername = accountUsername.toLowerCase();
        accountUsername+= "'s account";
        special = '0';
    }
    else{
        special = '1';
    }





    let data = {
        username : accountUsername, // will be converted to user's account
        userID : userID,
        special : special,
        visible : publicStatus,
        labelIDs : JSON.stringify(labelIDs),
        networkName : networkName,
        link : weblink,
        userlink : userlink,
        description : description,
        custom : '1',
        image : image
    };

    var formData = new FormData();
    for(var key in data) formData.append(key, data[key]);



    console.log(data);


    var create = $.ajax({
        url : doNetworkAddURL,
        type : "POST",
        data : formData,
        headers : buildHeaders(token, userID),
        cache: false,
        contentType: false,
        processData: false
    });

    create.done(function(response){
        console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error regarding this action. Try again!",800);
        }
        else if(response['response'] === kCSResponseOk) {
            showToast("A new network was successfully added to your account",1000);
            if(stepID === TUTORIAL_STEP_NETWORK) doCompleteTutorialStep(stepID,true);
            else window.location.href = "../dashboard.php";
        }

    });

    create.fail(function(e){
        console.log("fail");
        showToast("Server error.");

    });





}

function checkCustomFormFields(){


    var accountUsernameField = $("#accountName");

    accountUsernameField.css("background", "#ffffff");

    if(accountUsernameField && accountUsernameField.val().length < 3 && accountUsernameField.val().length > 0 ){
        accountUsernameField.css("background", "#f9f9f9");
        showToast("Please add a valid username or leave field empty.",1000);
        return false;
    }



    var weblinkField = $("#username");

    weblinkField.css("background", "#ffffff");

    if(!weblinkField || weblinkField.val().length < 2){
        weblinkField.css("background", "#f9f9f9");
        showToast("Please add a valid website link.",1000);
        return false;
    }


    let webLink = weblinkField.val();
    var matches = webLink.match(/^https?\:\/\/([^.][a-zA-Z0-9-_.]+)[^/^./](?:[\/?#]|$)/i);
    let finalHTTP_HTTPS = matches && matches[0];



    var matchesW = webLink.match(/[w]{3}[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    let finalWWW = matchesW && matchesW[0];


    if(finalHTTP_HTTPS === null && finalWWW === null){ //does not match https/https or www
        weblinkField.css("background", "#f9f9f9");
            showToast("You are missing something! Try 'www.domain.com/extra' (you can also specify if it is http/https).", 1200);
            return false;
    }
    else if(finalWWW && finalHTTP_HTTPS === null) {
            webLink = "http://"+webLink;
            weblinkField.val(webLink);
            weblinkField.css("background", "#f3f8fa");
    }



    var C_networkName = $("#C_networkName");
    C_networkName.css("background", "#ffffff");

    if(!C_networkName || C_networkName.val().length < 1){
        C_networkName.css("background", "#f9f9f9");
        showToast("Please add a valid name for the network.",1000);
        return false;
    }


    return true;


}



/**
 * Custom Styling
 */
function showCustom(){
    custom = true;
    $("#createCustomNetworkButton").hide();
    $("#C_networkNameContainer").show('normal');
    $("#C_networkDivider").show('normal');
    $("#chooseDefaultButton").removeClass("leftChoiceHeading").addClass("buttonTypeFullWhite");
    $("#leftNetworksTable").hide('normal');
    $("#C_or").hide();
    $(".cardNetworksProducts").hide();
    $(".cardNetworksFooter").hide();
    $("#rightFormUserlink").hide("normal");


    $("#C_choosePictureContainer").show('normal',function(){  $("#C_choosePictureContainer").css("display","flex"); });

    $("#C_additionalFields").show('normal');

    if($(window).width() > 970) { $("#rightAddNetworkButtonContainer").animate({"margin-top": 30},200)}

    $("#rightFormTitleUsername").text("Full Link - Username Included(*)");
    $("#username").prop("placeholder","e.g. https://www.connsuite.com/username");
    $("#accountNameField").show('normal');


}

function hideCustom(){
    custom = false;
    $("#chooseDefaultButton").addClass("leftChoiceHeading").removeClass("buttonTypeFullWhite");
    $("#leftNetworksTable").show('normal');
    $("#createCustomNetworkButton").show();
    $("#C_networkNameContainer").hide('normal');
    $("#C_networkDivider").hide('normal');
    $("#C_or").show();
    $(".cardNetworksProducts").show();
    $(".cardNetworksFooter").show();
    $("#rightFormUserlink").show("normal",function(){
        $("#rightFormUserlink").text((networkList[findNetworkPosByID(chosenNetworkID)]).userlink);
    });

    $("#accountNameField").hide('normal');
    $("#C_choosePictureContainer").hide();
    $("#C_additionalFields").hide('normal');

    $("#rightFormTitleUsername").text("Username (*)");
    $("#username").prop("placeholder",(networkList[findNetworkPosByID(chosenNetworkID)]).hint);

    if($(window).width() > 970) { $("#rightAddNetworkButtonContainer").animate({"margin-top": 70},200)}
}


function setCustomClicks(){
    $( "#chooseThumbnailButton" ).click(function() {
        $( "#customImage" ).click();
    });
}


// load image into output
var loadFile = function(event) {


    var fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1800);
        $("#customImage").val("");
        pictureChanged = false;
        return;
    }
    else  if (event.target.files[0].size > 3500000){
        showToast("Please upload an image smaller than 3MB",1800);
        $("#customImage").val("");
        pictureChanged = false;
        $("#output").prop("src","../../image/network/normal/icon_default.png");
        return;
    }
    else {
        $("#outputContainer").css("height", "auto").show();
        $("#noPictureContainer").hide();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('output');
            output.src = reader.result;
        };
        pictureChanged = true;
        reader.readAsDataURL(event.target.files[0]);

    }
};