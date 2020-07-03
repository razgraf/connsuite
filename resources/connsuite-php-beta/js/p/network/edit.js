/**
 * Created by razvan on 18/08/2017.
 */

var labelList = [];

var globalNetwork = new Network();
var globalNetworkUntouched = new Network();
var publicToggle = true;
var chosenNetworkID;
var custom = false;
var pictureChanged = false;



$(function(){
  $("#C_additionalFields").hide();
  transitionPageEnter(depthToRoot);
  doRetrieveLabels(function(){
      doRetrieveNetwork();
  });

  $("#addNetworkButton").on("click",function(){

      if(!custom) {if(checkDefaultFormFields()){doEditNetwork();}}
      else if( checkCustomFormFields() ) {doEditCustomNetwork();}
  });

    $("#publicToggle").on("change",function(){
        toggleVisible($(this).is(":checked"));
    });

    if($(window).width() < 970){
        $("#description").prop("rows","3");
    }

    setCustomClicks();
});

function doRetrieveNetwork(){

    var cards = $(".cardNetworksProducts");
    var req = $.ajax({
        url : requestNetworkURL,
        type : "GET",
        data : {
            networkID : networkID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error regarding this action. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {

            var result = response['result'];
            if(result.length === 0) return;
            chosenNetworkID = result[0]['ID'];
            globalNetwork.set(result[0]);
            globalNetworkUntouched = globalNetwork;
            bindNetworkData();



        }

    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        window.location.href = ROOT;

    });
}



function bindNetworkData(){
    console.log(globalNetwork);

    $("#username").val(globalNetwork.username);
    if(globalNetwork.image.custom == '1') {
        showCustom();
        $("#C_networkName").val(globalNetwork.name);

        $("#outputContainer").css("height", "auto").show();
        $("#noPictureContainer").hide();

        imageExists(globalNetwork.image.url,function(callback){
            if(!callback) globalNetwork.image.url = "../../image/network/normal/icon_default.png";
            $("#output").attr("src", globalNetwork.image.url);
        });


        $("#accountName").val(globalNetwork.username);
        $("#username").val(globalNetwork.userlink);


    }
    else {
        hideCustom();
        $("#rightFormUserlink").text(globalNetwork.link);

        imageExists(globalNetwork.image.url,function(callback){
            if(!callback) globalNetwork.image.url = "../../image/network/normal/icon_default.png";
            $("#networkChosenPicture").attr("src", globalNetwork.image.url);
        });
    }



    $(".cardNetworksTitle").text(globalNetwork.name);


    toggleVisible( globalNetwork.visible === '1');
    globalNetwork.visible === '1' ?  $("#publicToggle").prop("checked",true) : $("#publicToggle").prop("checked",false);


    var i ;
    for(i = 0; i< globalNetwork.labels.length; i++){
        selectLabel(globalNetwork.labels[i].labelID);
    }

    if(globalNetwork.description!==null && globalNetwork.description.length !== 0) {
        $("#description").text(globalNetwork.description);
        if (globalNetwork.description.length > 50) $("#description").prop("rows", 2);
    }

}



function doRetrieveLabels(callback){
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

        callback();

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



function doEditNetwork(){

    var username = $("#username").val();
    var description = $("#description").val();
    var labelIDs = [];
    var publicStatus = publicToggle ? '1' : '0';
    var i,j;
    for(i = 0; i < labelList.length ;i++){
        if(labelList[i].selected === true) labelIDs.push(labelList[i].ID);
    }


    var network = globalNetwork;
    var special = network.special;

    var create = $.ajax({
        url : doNetworkEditURL,
        type : "POST",
        data : {
            username : username,
            userID : userID,
            special : special,
            visible : publicStatus,
            labelIDs : JSON.stringify(labelIDs),
            ID : networkID,
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
            showToast("This network was successfully edited.",1000);
            $('body').attr("disabled",true);
            setTimeout(function() {
                $('body').attr("disabled",false);
                window.location.href = "../../p/dashboard.php";
            }, 1000);
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


function doEditCustomNetwork(){

    var weblink = ($("#username").val()).toLowerCase();
    var description = $("#description").val();
    var networkName = $("#C_networkName").val();
    var accountName = $("#accountName").val();
    var userlink = ($("#username").val()).toLowerCase();
    let special = '0';


    var image = pictureChanged ? $("#customImage")[0].files[0] : null;

    var labelIDs = [];
    var publicStatus = publicToggle ? '1' : '0';
    var i,j;
    for(i = 0; i < labelList.length ;i++){
        if(labelList[i].selected === true) labelIDs.push(labelList[i].ID);
    }




    if(!accountName || accountName.length === 0){
        accountName = firstname.substr(0,firstname.indexOf(' '));
        accountName = accountName.toLowerCase();
        accountName+= "'s account";
        special = '0';
    }
    else{
        special = '1';
    }


    let data = {
        username : accountName,
        userID : userID,
        special : special,
        visible : publicStatus,
        labelIDs : JSON.stringify(labelIDs),
        networkName : networkName,
        link : weblink,
        userlink : userlink,
        description : description,
        custom : '1',
        image : image,
        ID: networkID
    };

    var formData = new FormData();
    for(var key in data) formData.append(key, data[key]);



    var create = $.ajax({
        url : doNetworkEditURL,
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
            showToast("This network was successfully edited.",1000);
            $('body').attr("disabled",true);
            setTimeout(function() {
                $('body').attr("disabled",false);
                window.location.href = "../../p/dashboard.php";
            }, 1000);
        }

    });

    create.fail(function(e){
        console.log("fail");
        showToast("Server error.");

    });





}

function checkCustomFormFields(){
    var usernameField = $("#username");

    usernameField.css("background", "#ffffff");

    if(!usernameField || usernameField.val().length < 2){
        usernameField.css("background", "#f9f9f9");
        showToast("Please add a valid link for the website.",1400);
        return false;
    }

    let username = usernameField.val();
    let matches = username.match(/^https?\:\/\/([^.][a-zA-Z0-9-_.]+)[^/^./](?:[\/?#]|$)/i);
    let finalHTTP_HTTPS = matches && matches[0];


    let matchesW = username.match(/[w]{3}[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    let finalWWW = matchesW && matchesW[0];


    if(finalHTTP_HTTPS === null && finalWWW === null){ //does not match https/https and does not match www
        usernameField.css("background", "#f9f9f9");
        showToast("You are missing something! Try 'www.domain.com/extra' (you can also specify if it is http/https).", 1200);
        return false;
    }
    else if(finalWWW && finalHTTP_HTTPS === null ) {
        username = "http://"+username;
        usernameField.val(username);
        usernameField.css("background", "#f3f8fa");
    }

    var C_networkName = $("#C_networkName");
    C_networkName.css("background", "#ffffff");

    if(!C_networkName || C_networkName.val().length < 1){
        C_networkName.css("background", "#f9f9f9");
        showToast("Please add a valid name for the network.",1400);
        return false;
    }




    var accountName = $("#accountName");
    accountName.css("background", "#ffffff");

    if(!accountName || accountName.val().length < 3 && accountName.val().length > 0){
        accountName.css("background", "#f9f9f9");
        showToast("Please add a valid username or leave field empty.",1400);
        return false;
    }



    var customImage = $("#customImage");

    if(pictureChanged) {
        if (!customImage.val() ||
            customImage.val().length === 0 ||
            (customImage[0].files).length === 0) {
            showToast("Please add a valid logo for the network", 1400);

            return false;
        }
    }


    return true;


}



/**
 * Custom Styling
 */
function showCustom(){
    custom = true;
    $("#C_networkNameContainer").show('normal');
    $(".cardNetworksProducts").hide();
    $(".cardNetworksFooter").hide();
    $("#rightFormUserlink").hide("slow");
    $("#leftChoseHelperText").hide();


    $("#C_choosePictureContainer").show('normal',function(){
        $("#C_choosePictureContainer").css("display","flex");
    });

    $("#C_additionalFields").show('normal');

    if($(window).width() > 970) { $("#rightAddNetworkButtonContainer").animate({"margin-top": 30},200)}

    $("#rightFormTitleUsername").text("Full Link to Website (*)");
    $("#username").prop("placeholder","e.g. https://www.connsuite.com/razgraf");
    $("#accountNameField").show("normal");



}

function hideCustom(){
    custom = false;
    $("#C_networkNameContainer").hide('normal');

    $(".cardNetworksProducts").show();
    $("#rightFormUserlink").show("slow");

    $("#C_choosePictureContainer").hide();
    $("#C_additionalFields").hide('normal');
    $("#leftChoseHelperText").show();
    $("#accountNameField").hide();

    if($(window).width() > 970) { $("#rightAddNetworkButtonContainer").animate({"margin-top": 70},200)}


    $("#rightFormTitleUsername").text("Username (*)");
    $("#username").prop("placeholder","Username/Identifier here");
}


function setCustomClicks(){
    $( "#chooseThumbnailButton" ).click(function() {
        $( "#customImage" ).click();
    });

    $("#cancelButton").on("click",function(){
        window.location.href = "../dashboard.php";
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