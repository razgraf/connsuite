/**
 * Created by razvan on 22/08/2017.
 */

var globalUser = new ConnUser();
var pictureChanged = false;

$(function(){
    ONESIGNAL(depthToRoot);
    transitionPageEnterLoad(depthToRoot);
    retrieveProfile();


    $("#cancelButton").on("click",function(){
       transitionPageLeave("../../index.php?self=1");
    });

    $("#addNetworkButton").on("click",function(){
        if(checkData()) doEditProfile();
    });


});

function retrieveProfile(){
    var req = $.ajax({
        url : retrieveUserURL,
        type : "GET",
        data : {userID : userID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        //console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error fetching this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            globalUser.set(result);
            bindUserData();

        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


function bindUserData(){
    transitionPageEnterLoadEnd();
    DRIFT();

    $("#username").val(globalUser.username);

    if(globalUser.facebookID == null) {
        $("#fbEmailTitle").text("Email");
        $("#fbemail").val(globalUser.email);
    }
    else{
        $("#fbEmailTitle").text("FacebookID");
        $("#fbemail").val(globalUser.facebookID);
    }
    $("#description").val(globalUser.description);
    $("#tagline").val(globalUser.tagline);

    $("#firstname").val(globalUser.firstname);
    $("#lastname").val(globalUser.lastname);


    $("#topProfilePictureOutput").prop("src",globalUser.imageURL);


    $("#editProfilePictureContainer" ).on("click",function() {
        $( "#customImage" ).click();
    });
    updatePlaceholders();

}

function checkData(){
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var tagline = $("#tagline").val();
    var description = $("#description").val();

    let timeout =  600;

    if( firstname === null || firstname.length < 2){
        showToast("Please add a valid first name!",timeout);
        $("#firstname").focus();
        return false;
    }
    if( lastname===null || lastname.length < 2 ){
        showToast("Please add a valid last name!",timeout);
        $("#lastname").focus();
        return false;
    }

    if( tagline === null || tagline.length < 2){
        showToast("Please add a valid tagline",timeout);
        $("#tagline").focus();
        return false;
    }
    if( description===null || description.length < 2 ){
        showToast("Please add a valid description",timeout);
        $("#description").focus();
        return false;
    }

    var customImage = $("#customImage");

    if(pictureChanged) {
        if (!customImage.val() ||
            customImage.val().length === 0 ||
            (customImage[0].files).length === 0) {
            showToast("Please add a valid profile picture", 1000);

            return false;
        }
    }

    return true;
}


function doEditProfile(){


    Pace.restart();
    showToast("Loading changes...",10000);
    $("#rightAddNetworkButtonContainer").addClass("disableClick");



    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let tagline = $("#tagline").val();
    let description = $("#description").val();

    let image = pictureChanged ? $("#customImage")[0].files[0] : null;

    let data = {
        userID : userID,
        image : image,
        firstname : firstname.trim(),
        lastname : lastname.trim(),
        tagline : tagline,
        description : description
    };

    let formData = new FormData();
    for(let key in data) formData.append(key, data[key]);


    var req = $.ajax({
        url : editUserURL,
        type : "POST",
        data : formData,
        headers : buildHeaders(token, userID),
        cache: false,
        contentType: false,
        processData: false
    });

    req.done(function(response){
        console.log(response);
        response = JSON.parse(response);
        hideToast();
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error updating this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {

            transitionPageLeave("../../index.php?"+globalUser.username);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        $("#rightAddNetworkButtonContainer").removeClass("disableClick");
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
        $("#topProfilePictureOutput").prop("src",profilePicturePrimaryURL);
        return;
    }
    else {
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('topProfilePictureOutput');
            output.src = reader.result;
        };

        pictureChanged = true;

        if ( $("#editProfilePictureContainer" ).is(":visible") ) {

            $("#changePictureButton").fadeIn(150).on("click", function (e) {
                e.preventDefault();
                $("#customImage").click();
            });
        }

        $("#editProfilePictureContainer" ).hide();

        reader.readAsDataURL(event.target.files[0]);

    }
};


function sendRemoveRequest(){

    let send = $.ajax({
        url : sendMessageURL,
        type : "POST",
        headers : buildHeaders(token, userID),
        data : {

        }
    });

    send.done(function(response){
        console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error sending the request. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
           showBootstrapModal(MODAL_HEADER_TYPE_DELETE,"Sorry to see you go :(",
               "The request has been sent. You will no longer be able to access your account after we remove it.",);
        }
    });
    send.fail(function(e){
        console.log("fail");
        showToast("Server error. Message was not sent.");
    });
    send.always(function(){
        $('body').prop("disabled",false);
    })
}
