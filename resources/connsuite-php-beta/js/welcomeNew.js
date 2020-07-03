/**
 * Created by razvan on 17/02/2018.
 */

let owl = null;
$(function(){

    disableButtonClick($(".customLinkedInButton"));

    DRIFT();
  initOwl();
  $(window).resize(function(){
        owl.trigger('destroy.owl.carousel');
        initOwl();
  });

    doToolbarSearch("",$("#desktopSearchInput"));
    doToolbarSearch("",$("#mobileSearchInput"));


    initForm();


    $("a.csVideo").YouTubePopUp();
    $("#playVideoButton").on("click",function(){
        $("a.csVideo").click();
    })

});


function initForm(){
    $("#card").flip({
        trigger: 'manual'
    });
    $(".newAccountButton").on("click",function(){
        $("#card").flip(true);
    });

    $("#backToLogButton").on("click",function(){
        $("#card").flip(false);
    });

    $("#card").css("min-height","450");
    $("#formRegisterIndex").css("display","block");




    $('#joinFirstname').keyup(function(event) {
        if(! $("#customUsername").is(":checked")) return;
        var username = createUsername();
        $('#joinUsername').val(username);
    });

    $('#joinLastname').keyup(function(event) {
        if(! $("#customUsername").is(":checked")) return;
        var username = createUsername();
        $('#joinUsername').val(username);
    });

    $('#joinUsername').keyup(function(event) {
        $("#customUsername").prop('checked', false);
    });


    $("#formLoginButton").on("click",function(){
        var email = $("#email").val();
        var password = $("#password").val();
        if(!email || !validateEmail(email)){showToast("Please add a valid email.",600);return;}
        if(!password || password.length < 5) {showToast("Please add a password.",600);return;}

        if(email && password && validateEmail(email)){
            password = md5(password);
            $("#formLoginButton").prop("disabled",true);
            doLogIn(email,password);
        }

    });

    $("#formRegisterButton").on("click",function(){
        var email = $("#joinEmail").val();
        var username = $("#joinUsername").val();
        var firstname = $("#joinFirstname").val();
        var lastname = $("#joinLastname").val();
        var password = $("#joinPassword").val();

        if(checkRegisterData(email, username, firstname, lastname, password)){
            doRegister(email, username, firstname, lastname, password);
        }
    });


    $("#forgotPasswordButton").on("click",function(){
        initForgotPassword();
    });


    if(getflip === "true") {  $("#card").flip(true);}

}



function doLogIn(email, password){
    Pace.restart();
    var login = $.ajax({
        url: ROOT+"session/log-in.php",
        type:"POST" ,
        data : {
            email : email,
            password : password
        }
    });

    login.done(function(msg){
        console.log(msg);
        msg = JSON.parse(msg);
        if(msg.response === kCSResponseOk){
            showToast("Welcome!",800);
            setTimeout(transitionPageLeave("p/dashboard.php?stickyTutorial=true",depthToRoot), 700 );

        }
        else if(msg.response === kCSResponseVisible){
            showBootstrapModal(
                1,
                "Ups.",
                "It looks like out admins found something wrong with your account. Please try again later or get in touch with us to solve the issue. Meanwhile, your account will still be available for everyone else to visit",
                [
                    {
                        "title":"Go to Contact",
                        "callback": function(buttonID){ if(buttonID)  window.location.href = ROOT+"intro/index.php?#cscontact"; }
                    },

                ],
                true
            )
        }
        else showToast("Wrong credentials. Try Again!",600)
    });
    login.fail(function(){
        showToast("Server Error.",600);
    });
    login.always(function(){
        $("#formLoginButton").prop("disabled",false);
    });


}


function doRegister(email, username, firstname, lastname, password){
    refreshFields();
    password = md5(password);
    $("#formRegisterButton").prop("disabled",true);
    var reg = $.ajax({
        url : ROOT+"session/register.php",
        type : "POST",
        data:{
            email : email,
            username : username,
            firstname : firstname,
            lastname : lastname,
            password : password
        }
    });
    reg.done(function(msg){
        console.log(msg);
        msg = JSON.parse(msg);
        if(msg.response === kCSResponseEmail){
            showToast("This email is already in use. Try another one!",1000);
            $("#joinEmail").focus().css("background","#eeeeee");
        }
        else if(msg.response === kCSResponseUsername){
            showToast("This username is already in use. Try another one!",1000);
            $("#joinUsername").focus().css("background","#eeeeee");
        }
        else if(msg.response === kCSResponseOk){
            showToast("Welcome!",600);
            setTimeout(transitionPageLeave("p/dashboard.php?stickyTutorial=true",depthToRoot), 700 );

        }
        else showToast("Incorrect data. Try Again!"+msg.result,600)
    });
    reg.fail(function(){
        showToast("Server Error.",600);
    });
    reg.always(function(){
        $("#formRegisterButton").prop("disabled",false);
    });

}


function checkRegisterData(email, username, firstname, lastname, password){
    var timeout = 1000;
    refreshFields();
    if( email===null || email.length < 3 || !validateEmail(email)){
        showToast("Please add a valid email address!",timeout);
        $("#joinEmail").focus().css("background","#eeeeee");
        return false;
    }

    var matches = email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i);
    let emailValid = matches && matches[0];

    if(!emailValid){
        showToast("Please add a valid email address!",timeout);
        $("#joinEmail").focus().css("background","#eeeeee");
        return false;
    }


    let specialChars = '/[#$%^&*()+=\-\[\]\';,\/{}|\":<>?~\\\\]/';
    let check = function(string){
        for(let i = 0; i < specialChars.length;i++){
            if(string.indexOf(specialChars[i]) > -1){
                return true
            }
        }
        return false;
    };
    if(check(username)){
        showToast("Please add a valid username!(without space, / , \' , \" or other special characters.  ",timeout);
        $("#joinUsername").focus().css("background","#eeeeee");
        return false;
    }

    if( firstname===null || firstname.length < 2){
        showToast("Please add a valid first name!",timeout);
        $("#joinFirstname").focus().css("background","#eeeeee");
        return false;
    }
    if( lastname===null || lastname.length < 2 ){
        showToast("Please add a valid last name!",timeout);
        $("#joinLastname").focus().css("background","#eeeeee");
        return false;
    }
    if( password===null || password.length < 5 ){
        showToast("Please add a valid password! (at least 5 characters)",timeout);
        $("#joinPassword").focus().css("background","#eeeeee");
        return false;
    }
    return true;

}


function createUsername(){
    var username = ""; var i;
    var firstname = ($("#joinFirstname").val()).toLowerCase();
    var lastname = ($("#joinLastname").val()).toLowerCase();
    var firstnames = firstname.split(" ");
    var lastnames = lastname.split(" ");

    if(firstname!=null && firstname.length!=0 && firstnames.length!==0) {
        username = firstnames[0];
        for (i = 1; i < firstnames.length; i++) {
            username += "." + firstnames[i];
        }
    }

    if(lastname!=null && lastname.length!=0 && lastnames.length!==0) {
        if (firstnames.length === 0) username = lastnames[0];
        else username += "." + lastnames[0];
        for (i = 1; i < lastnames.length; i++) {
            username += "." + lastnames[i];
        }
    }

    //console.log(username);
    return username;



}


/**
 Styling
 */

function refreshFields(){
    $("#joinUsername").css("background","transparent");
    $("#joinEmail").css("background","transparent");
    $("#joinFirstname").css("background","transparent");
    $("#joinLastname").css("background","transparent");
    $("#joinPassword").css("background","transparent");
}


function facebookLogIn(){
    FB.login(function (facebookResponse) {
        console.log(facebookResponse);

        if (facebookResponse.status === 'connected') {
            doFacebookLoad(facebookResponse);
        }
        else if (facebookResponse.status === 'not_authorized') {
            showToast("Please log in with facebook first.",1000); // The person is logged into Facebook, but not your app.
        }
        else { //status is 'unknown'
            showToast("Please log in with facebook first!",1000);
        }
    }, {scope: 'public_profile,email'});
}

function doFacebookLoad(facebookResponse){


    FB.api('/me',  { locale: 'en_US', fields: 'name,first_name,last_name,picture,email' }, function(user) {
        console.log(user);
        if(user === null || !user) { showToast("Error on facebook connect.");  return;}

        let name = user['name'];
        let firstname = user['first_name'];
        let lastname = user['last_name'];
        let picture = user['picture'];
        let facebookID = user['id'];
        let email = user['email'];

        let data = { name:name, email:email, firstname : firstname, lastname : lastname, picture:picture, facebookID:facebookID, facebookResponse: facebookResponse};
       //  console.log(data);

        let fb_req = $.ajax({
            url : ROOT+"session/facebook.php",
            type : "POST",
            data : data


        });
        fb_req.done(function(response){
            console.log(response);
            response = JSON.parse(response);
            if(response['response'] === kCSResponseNegative){
                showToast("Error while connecting with facebook.");
            }
            else if(response['response'] === kCSResponseVisible){
                showBootstrapModal(
                    1,
                    "Ups.",
                    "It looks like out admins found something wrong with your account. Please try again later or get in touch with us to solve the issue. Meanwhile, your account will still be available for everyone else to visit.",
                    [
                        {
                            "title":"Go to Contact",
                            "callback": function(buttonID){ if(buttonID) window.location.href = ROOT+"intro/index.php?#cscontact";  }
                        },

                    ],
                    true
                )
            }
            else if(response['response'] === kCSResponseOk){
                showToast("Welcome!", 800);
                setTimeout(transitionPageLeave("p/dashboard.php?stickyTutorial=true", depthToRoot), 700);
            }


        });
        fb_req.fail(function(){
            showToast("Server Error");
        });

    });

}

/**
 * LINKED IN
 */

function linkedInLogIn(){
    IN.User.authorize(function(){});

}
// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
    enableButtonClick($(".customLinkedInButton"));
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Profile("me").fields(["first-name", "last-name", "email-address","picture-url","id","headline"]).result(onSuccess).error(onError);
}


// Handle the successful return from the API call
function onSuccess(data) {

    let response = data.values[0];
    console.log(response);
    let lk_req = $.ajax({
        url : ROOT+"session/linked-in.php",
        type : "POST",
        data : {response : JSON.stringify(response)},

    });
    lk_req.done(function(response){
        console.log(response);
        response = JSON.parse(response);
        if(response['response'] === kCSResponseNegative){
            showToast("Error while connecting with LinkedIn.",800);
        }
        else if(response['response'] === kCSResponseProvider){
            let result = response['result'];
            try{
                result = JSON.parse(result);
                showBootstrapModal(
                    1,
                    "Email already linked to account!",
                    "It looks like your email is already linked to an existing user account. Would you add LinkedIn as a log-in method for that account?" +
                    "<br><br>" +
                    "<div style='width: 100%;padding-top: 20px; padding-bottom: 20px;display: flex; align-items: center;flex-direction: column;'>" +
                    "<img src='"+ROOT+"data/user/thumbnail/"+result['ID']+"-"+result['version']+".jpg'/>" +
                    "<span style='font-size: 12pt;color: #000000;font-family: Quicksand_Book sans-serif '>"+result['name']+"</span>" +
                    "<span class='colorPrimary' style='font-size: 10pt;font-family: Quicksand_Bold sans-serif '>"+result['username']+"</span>" +
                    "</div>",
                    [
                        {
                            "title":"Link Account",
                            "callback": function(buttonID){ if(buttonID) linkProviderLinkedInAccount();  }
                        },

                    ],
                    true
                )
            }
            catch (e){
                console.log(result);
                console.log(e);
                showToast("This account's email is already used. Contact the developer for further instructions or help.",700);
            }

        }
        else if(response['response'] === kCSResponseVisible){
            showBootstrapModal(
                1,
                "Oops.",
                "It looks like out admins found something wrong with your account. Please try again later or get in touch with us to solve the issue. Meanwhile, your account will still be available for everyone else to visit.",
                [
                    {
                        "title":"Go to Contact",
                        "callback": function(buttonID){ if(buttonID) window.location.href = ROOT+"intro/index.php?#cscontact";  }
                    },

                ],
                true
            )
        }
        else if(response['response'] === kCSResponseOk){
            showToast("Welcome!", 800);
            setTimeout(transitionPageLeave("p/dashboard.php?stickyTutorial=true", depthToRoot), 700);
        }


    });
    lk_req.fail(function(){
        showToast("Server Error");
    });




}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
    showToast("In order to register with LinkedIn you have to provide us access to some basic profile info.",700);
}









function initForgotPassword(){

    Pace.restart();

    $("#forgotPasswordModal").modal('show');
    $('#forgotPasswordModal').on('shown.bs.modal', function (e) {

        let button = $("#forgotPasswordRequestButton");
        button.unbind().on("click",function(){
            let email = $("#forgotEmail").val();
            if(!email || !validateEmail(email)){
                showToast("Please add a valid email first!",800);
                return;
            }
            //  button.addClass("disableClick");


            var req = $.ajax({
                url : doPasswordForgotRequest,
                type : "POST",
                data:{
                    email : email
                }
            });
            req.done(function(msg){

                msg = JSON.parse(msg);
                console.log(msg);
                if(msg.response === kCSResponseEmail){
                    showToast("Looks like we do not have this email in our database. Try again or register a new account!",1000);
                }
                else if(msg.response === kCSResponseOk){
                    $("#forgotPasswordModal").modal('hide');
                    showBootstrapModal(
                        MODAL_HEADER_TYPE_DONE,
                        "Good job! Check your email!",
                        "An activation link has been sent to your email address. Please enter the link and follow the steps to give your account a brand new password. After 60 minutes, the link will expire so be sure to use it while it lasts. Have a great day and hope to see you back soon!",
                        null,
                        true
                    )
                }

            });
            req.fail(function(){
                //button.removeClass("disableClick");
                showToast("Server Error.",600);
            });
            req.always(function(){
                // button.removeClass("disableClick");
            });


        });

    });

}



function initOwl(){
    let width = $("#previewScreenLeft").width();
    $(".itemP").width(width);
    owl = $('#previewScreenLeft');
    owl.owlCarousel({
        onTranslated : onDraggedCallback,
        onInitialized : onInitializedCallback,
        stagePadding: 0,
        autoWidth : true,
        autoplay : true,
        rewind : true,
        autoplayTimeout : 5000,
        startPosition : 0,
        margin:0,
        nav:false,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            }
        }
    });

    setFirstPreview();
}


function onInitializedCallback(){
    setFirstPreview();
    $("#previewScreen").animate({"opacity":1},250);

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                owl.trigger('prev.owl.carousel');
                break;

            case 39: // right

                owl.trigger('next.owl.carousel');
                break;

            default: return; // exit this handler for other keys
        }
    });
}

function setFirstPreview(){
    $("#previewScreenRightContent").html(previewInfo[0]);
    $("#previewScreenMacTab").find("span").text(previewTabTitle[0]);

}

function onDraggedCallback(event){
    let position = event.item.index;
    $("#previewScreenMacTab").find("span").fadeOut(150);
  //  console.log(position);

    $("#previewScreenRightContent").fadeOut(150,function(){
        setTimeout(function(){
            $("#previewScreenRightContent").html(previewInfo[position]);
            $("#previewScreenRightContent").fadeIn(150);
            $("#previewScreenMacTab").find("span").text(previewTabTitle[position]);
            $("#previewScreenMacTab").find("span").fadeIn(150);
        },150);
    });
}


let previewInfo = [
    '<div id="previewPart1Info"> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-fire"></i><p class="previewInfoTitle">All your social media links in one place</p></div> ' +
    '</div> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-stars"></i><p class="previewInfoTitle">Your ConnSuite username is your new business card</p></div> ' +
    '<div style="padding-left: 20px;width: 100%"><div style="width: 100%; border: 1px dashed #dddddd; border-radius: 5px; height: 40px; display: flex; padding: 0 10px;align-items: center"><a href="https://www.connsuite.com/john.smith" target="_blank" style="color: #aaaaaa; font-size: 10pt;">https://connsuite.com/<span style="color: #04befe; font-weight: 500">john.smith</span></a></div></div> ' +
    '</div> ' +
    '</div>',

    '<div id="previewPart2Info" > ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-book"></i><p class="previewInfoTitle">Your business card stack, out of the pocket and into your private online archive</p></div> ' +
    '</div> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-handshake"></i><p class="previewInfoTitle">Request and gain access to more personal networks & accounts of your connections and partners.</p></div> ' +
    '</div> ' +
    '</div>',


    '<div id="previewPart3Info"> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-art"></i><p class="previewInfoTitle">Showcase your work and achievements</p></div> ' +
    '</div> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-linked_paperclips"></i><p class="previewInfoTitle">Link to stuff from/about you from all over the internet (Medium,Magazines,Behance etc.)</p></div> ' +
    '</div> ' +
    '</div>',

    '<div id="previewPart4Info"> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-email"></i><p class="previewInfoTitle">Search for your business connections and reach out</p></div> ' +
    '</div> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-mailbox"></i><p class="previewInfoTitle">Need to share business cards at an event? Share you username or scan a simple QR and voilà!</p></div> ' +
    '</div> ' +
    '</div>',


    '<div id="previewPart5Info"> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-iphone"></i><p class="previewInfoTitle">Your new business card stays with you 24/7, online or on your phone</p></div> ' +
    '</div> ' +
    '<div class="previewInfoContainer"> ' +
    '<div style="display: flex"><i style="margin-right: 10px;" class="em em-mailbox"></i><p class="previewInfoTitle">Need to share business cards at an event? Share you username or scan a simple QR and voilà!</p></div> ' +
    '</div> ' +
    '</div>',


];

let previewTabTitle = [
    '/profile',
    '/business-book',
    '/article',
    '/search',
    '/show-and-scan'
];


let searching = false;


function doToolbarSearch(prePath,element){

    element.on("input",function(){
        var query = $(this).val();
        if(query.trim().length > 0){
            searching = true;
            setTimeout(function(){
                if(searching)
                $("#searchButtonIcon").attr("src","data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzBweCIgIGhlaWdodD0iMzBweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLWR1YWwtcmluZyIgc3R5bGU9ImJhY2tncm91bmQ6IG5vbmU7Ij4NCiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBuZy1hdHRyLXI9Int7Y29uZmlnLnJhZGl1c319IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgbmctYXR0ci1zdHJva2U9Int7Y29uZmlnLnN0cm9rZX19IiBuZy1hdHRyLXN0cm9rZS1kYXNoYXJyYXk9Int7Y29uZmlnLmRhc2hhcnJheX19IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHI9IjI1IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZT0iIzA0YmVmZSIgc3Ryb2tlLWRhc2hhcnJheT0iMzkuMjY5OTA4MTY5ODcyNDE2IDM5LjI2OTkwODE2OTg3MjQxNiIgdHJhbnNmb3JtPSJyb3RhdGUoMTk4IDUwIDUwKSI+DQogICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPg0KICAgIDwvY2lyY2xlPg0KICA8L3N2Zz4=");
            },200);
            var req = $.ajax({
                url : ROOT+"core/common/search-user.php",
                type : "GET",
                data : {
                    query: query
                }
            });

            req.done(function(response){

                try{
                response = JSON.parse(response);
                if(response['response'] === kCSResponseNegative){
                    $(".toolbarSearchResultsContainer").hide();
                }
                else if(response['response'] === kCSResponseOk) {

                    var result = response['result'];
                    $(".toolbarSearchResultsContainer").html("");
                    for (var i = 0; i < result.length; i++) {
                        var user = null;
                        user = new ConnUser();
                        user.set(result[i]);
                        var text = user.name + " ( "+ user.username + " )";
                        var element = '<a onclick="doSearchClickModal(\''+user.username+'\')" class="toolbarSearchResult">' +
                            '<img src="'+user.thumbnailURL+'" class="toolbarSearchResultPicture" id="toolbarSearchResultPicture-'+user.ID+'">' +
                            '<div class="toolbarSearchResultTextContainer">' +
                            '<span>'+text+'</span>' +
                            '</div>' +
                            '</a>';

                        $(".toolbarSearchResultsContainer").fadeIn(100);
                        $(".toolbarSearchResultsContainer").append(element);
                        console.log(user.thumbnailURL);
                        imageExists(user.thumbnailURL,function(callback){
                            if(!callback) $("#toolbarSearchResultPicture-"+user.ID).attr("src", prePath+"image/no_people_o.png");
                            $("#toolbarSearchResultPicture-"+user.ID).attr("src", user.thumbnailURL);
                        });
                    }

                }
                }catch(err){console.log(response); console.log(err);}
            });
            req.fail(function(e){
                console.log("fail");
                showToast("Server error.");
                $(".toolbarSearchResultsContainer").hide();
            });
            req.always(function(){
                $("#searchButtonIcon").attr("src","image/ic_search_blue_48px.svg");
                searching = false;
            })

        }
        else{
            $(".toolbarSearchResultsContainer").hide();
        }
    });

    $(document).click(function(event) {
        if(!$(event.target).closest('.toolbarSearchResultsContainer').length) {
            if($('.toolbarSearchResultsContainer').is(":visible")) {
                $('.toolbarSearchResultsContainer').hide();
            }
        }
    });
}



function doSearchClickModal(username){
    $(".toolbarSearchResultsContainer").hide();
    showBootstrapModal(
        2,
        "Welcome to ConnSuite <i class='em em-grinning_face_with_star_eyes'></i>!",
        "<p>Hi! You're awesome for being here and giving ConnSuite a shot! It looks like you want to check out @"+username+"'s profile!"+
        " It would help us a great deal if you'd like to become a registered ConnSuite user first. It only takes 20 seconds to create an account and discover what our tool can do! <span style='font-weight: 500;'>Become a ConnSuite Star by signing up.</span>"+
        "<br><br><i class='em em-sweat_smile'></i> P.S. If you still only want to visit this person's profile, click here: <a style='font-size: 16pt;' href='"+ROOT+username+"'>@"+username+"</a>.<br>Hope to see you back soon!</p>",
        null,
        true,
        1
    )
}
