/**
 * Created by @VanSoftware on 27/05/2018.
 */

let owl = null;


let previewInfo = [
    '<div class="info"> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i class="em em-fire"></i><p class="title">All your social media links in one place</p></div> ' +
    '</div> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i class="em em-stars"></i><p class="title">Your ConnSuite username is your new business card</p></div> ' +
    '<div style="padding-left: 20px;margin-top:10px;width: 100%"><div style="width: 100%; border: 1px dashed #dddddd; border-radius: 5px; height: 40px; display: flex; padding: 0 10px;align-items: center"><a href="'+ROOT+'?u=john.smith" target="_blank" style="color: #aaaaaa; font-size: 10pt;">'+ROOT+'<span style="color: #04befe; font-weight: 500">john.smith</span></a></div></div> ' +
    '</div> ' +
    '</div>',

    '<div class="info" > ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i  class="em em-book"></i><p class="title">Your business card stack, out of the pocket and into your private online archive</p></div> ' +
    '</div> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i  class="em em-handshake"></i><p class="title">Request and gain access to more personal networks & accounts of your connections and partners.</p></div> ' +
    '</div> ' +
    '</div>',


    '<div class="info"> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i  class="em em-art"></i><p class="title">Showcase your work and achievements</p></div> ' +
    '</div> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i class="em em-linked_paperclips"></i><p class="title">Link to stuff from/about you from all over the internet (Medium,Magazines,Behance etc.)</p></div> ' +
    '</div> ' +
    '</div>',

    '<div class="info"> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i  class="em em-email"></i><p class="title">Search for your business connections and reach out</p></div> ' +
    '</div> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i class="em em-mailbox"></i><p class="title">Need to share business cards at an event? Share you username or scan a simple QR and voilà!</p></div> ' +
    '</div> ' +
    '</div>',


    '<div class="info"> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i class="em em-iphone"></i><p class="title">Your new business card stays with you 24/7, online or on your phone</p></div> ' +
    '</div> ' +
    '<div class="row"> ' +
    '<div style="display: flex"><i class="em em-mailbox"></i><p class="title">Need to share business cards at an event? Share you username or scan a simple QR and voilà!</p></div> ' +
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

const INPUT_USERNAME = "username";
const INPUT_PASSWORD = "password";
const INPUT_FIRSTNAME = "firstName";
const INPUT_LASTNAME = "lastName";
const INPUT_EMAIL = "email";

const INPUT_USERNAME_GENERATOR = "generator";


let usernameGenerator = null;
let u = new User();


$(function(){


    $("#logInButton").unbind().on("click",function(){ doLogIn();});
    $("#registerButton").unbind().on("click",function(){ doRegister();});



    initRegister();

    initScreen();
    initFlip();
    initSearch($("#searchBar"));
    initVideo();





});




function doLogIn(){



    let button = $("#logInButton");
    disableButtonClick(button,true);


    let email =  new TextInput({
            ID : INPUT_EMAIL,
            element : $("#email"),
            initialized : true,
            danger : INPUT_DANGER_BIG
        });
    let password =  new TextInput({
        ID : INPUT_PASSWORD,
        element : $("#password"),
        initialized : true,
        danger : INPUT_DANGER_BIG
    });



    if(isEmpty(email.getValueFromElement())) {email.warn();}
    if(isEmpty(password.getValueFromElement())) {password.warn();}


    if(isEmpty(email.getValueFromElement())) {showAlert("Please add a valid username.",ALERT_TYPE_FAILURE); return;}  else email.restore();
    if(isEmpty(password.getValueFromElement())) {showAlert("Please add a valid password.",ALERT_TYPE_FAILURE); return;}  else password.restore();


    let request = $.ajax({
        type : "POST",
        url : API["URL_SESSION_LOG_IN"],
        data : {
            email : email.getValueFromElement(),
            password : password.getValueFromElement()
        },
    });


    request.done(function(response){
        LOGGER.log(response);
        try{
            response = JSON.parse(response);
            if(Request.negative(response)){
                showAlert("Wrong credentials. Try again!",ALERT_TYPE_FAILURE,800);
            }
            else if(Request.ok(response)){
                let result = response['result'];
                showAlert("Welcome!",ALERT_TYPE_SUCCESS,800,function(){
                    window.location.href = API["PAGE_IDENTIFIER_DASHBOARD"];
                });
            }
        }
        catch (e){
            LOGGER.log(e);
        }
    });

    request.fail(function(response){
        LOGGER.log(response);
        showAlert("Connection Error");
    });
    request.always(function(){
        enableButtonClick(button,true);
    })



}



function initRegister(){
    u.inputs.push(
        new TextInput({
            key : INPUT_FIRSTNAME,
            element: $("#firstNameR"),
            initialized: true,
            danger: INPUT_DANGER_BIG,
        }),
        new TextInput({
            key : INPUT_LASTNAME,
            element: $("#lastNameR"),
            initialized: true,
            danger: INPUT_DANGER_BIG
        }),
        new TextInput({
            key : INPUT_EMAIL,
            element: $("#emailR"),
            initialized: true,
            danger: INPUT_DANGER_BIG,
            callback: function (self) {
            }
        }),
        new TextInput({
            key : INPUT_PASSWORD,
            element: $("#passwordR"),
            initialized: true,
            danger: INPUT_DANGER_BIG
        }),
        new TextInput({
            key : INPUT_USERNAME,
            element: $("#usernameR"),
            initialized: true,
            danger: INPUT_DANGER_BIG
        }),
    );

    u.inputs[0].element.unbind().on("input keypress blur",function(){
        if(usernameGenerator !== null && usernameGenerator.isChecked()) u.inputs[4].element.val(generateUsername(u.inputs[0].getValueFromElement(),u.inputs[1].getValueFromElement()));
    });
    u.inputs[1].element.unbind().on("input keypress blur",function(){
        if(usernameGenerator !== null && usernameGenerator.isChecked()) u.inputs[4].element.val(generateUsername(u.inputs[0].getValueFromElement(),u.inputs[1].getValueFromElement()));
    });
}


function doRegister(){



    let data = {};

    u.dangers = [];
    for(let i = 0; i < u.inputs.length; i++){
        let input = u.inputs[i];
        if(typeof input.getValueFromElement === "function") {
            let warned = false;
            let value = input.getValueFromElement();

            if(input.danger === INPUT_DANGER_BIG) {

                if (isEmpty(value) || value.length < 3) {
                    warned = true;
                    input.warn();
                }
                else {
                    if (input.key === INPUT_EMAIL && !isEmailValid(value)) {
                        warned = true;
                        input.warn();
                        showAlert("The email address you entered is not valid.");
                    }
                    else if(input.key === INPUT_USERNAME && !isUsernameValid(value)){
                        warned = true;
                        input.warn();
                        showAlert("A valid username cannot contain special characters.");
                    }
                    else input.restore();
                }

                if(warned) u.dangers.push(new DangerItem(input.key,INPUT_DANGER_BIG,"Invalid input: "+input.name));

            }


            data[input.key] = value;



        }
    }

    LOGGER.log(data);
    LOGGER.log(u.dangers);
    if(u.dangers.length > 0) return;



    let request = $.ajax({
        type : "POST",
        url : API["URL_SESSION_REGISTER"],
        data : data,
        dataType : 'json'
    });

    request.done(function(response){
        LOGGER.log(response);
        try{
            if(Request.negative(response)){showAlert("Connection error.");}
            else if(Request.email(response)){
                showAlert("This email is already in use.",ALERT_TYPE_FAILURE,1000);
                if(u.inputs !== null && u.inputs.length > 0){
                    let input = (function(){for(let i =0; i < u.inputs.length; i++){if(u.inputs[i].key === INPUT_EMAIL) return u.inputs[i];} return null; }());
                    if(input) input.warn();
                }
            }
            else if(Request.username(response)){
                showAlert("The chosen username is already in use.",ALERT_TYPE_FAILURE,1000);
                if(u.inputs !== null && u.inputs.length > 0){
                    let input = (function(){for(let i =0; i < u.inputs.length; i++){if(u.inputs[i].key === INPUT_USERNAME) return u.inputs[i];} return null; }());
                    if(input) input.warn();
                }
            }
            else if(Request.ok(response)){
                let result = response['result'];
                showAlert("Welcome!",ALERT_TYPE_SUCCESS,1000,function(){
                    //window.location.href = API["PAGE_IDENTIFIER_DASHBOARD"];
                });
            }
        }
        catch (e){
            LOGGER.log(e);
        }
    });

    request.fail(function(response){
        LOGGER.log("fail");
        LOGGER.log(response);
        showAlert("Connection Error");
    });

}



function generateUsername(first, last){
    first = !isEmpty(first) ?  String(first.trim().replace(/ /g, ".")).toLowerCase() : "";
    last =  !isEmpty(last) ?  String(last.trim().replace(/ /g, ".")).toLowerCase() : "";

    return isEmpty(first) && isEmpty(last) ? "" : first+"."+last;


}


/**
 *
 * ----------------------------------------------------------
 *
 * VIDEO SETUP
 *
 * ----------------------------------------------------------
 */

function initVideo(){



    $("a.video").YouTubePopUp();
    $("#watch").on("click",function(){
        $("a.video").click();
    })
}


/**
 *
 * ----------------------------------------------------------
 *
 * SEARCH SETUP
 *
 * ----------------------------------------------------------
 */

function manageSearchIcon(searching = true){
    if(searching){
       $(".search-button").addClass("active");
    }
    else{
        $(".search-button").removeClass("active");
    }
}

function initSearch(element){

    if(!element.length) return;


    let parent = $(".search-results");
    if(!parent.length) return;


    element.on("input keypress blur",function(){



        let key = $(this).val();
        if(isEmpty(key)) { parent.html("");  manageSearchIcon(false); return;}
        manageSearchIcon(true);





        let request = $.ajax({
            url : API["URL_COMMON_USER_SEARCH"],
            type : "GET",
            data : {
                key: key,
                limit : 10
            }
        });


        request.done(function(response){
            try{
                response = JSON.parse(response);
                if(Request.negative(response)){
                    parent.html("");
                    manageSearchIcon(false);
                }
                else if(Request.ok(response)){
                    let result = response['result'];
                    manageSearchIcon(false);

                    parent.html("");
                    for(let i =0; i < result.length; i++){
                        let user = new User(result[i]);
                        user.printSearchRow(parent);
                    }




                }
            }
            catch (e){
                LOGGER.log(e);
            }
        });

        request.fail(function(response){
            LOGGER.log("fail");
            LOGGER.log(response);
            parent.html("");
            manageSearchIcon(false);
            showAlert("Connection Error");
        });


    });



    $(document).click(function(event) {
        if(!$(event.target).closest('.search-results').length) {
            if(parent.is(":visible")) {
                parent.html("");
            }
        }
    });





}




/**
 *
 * ----------------------------------------------------------
 *
 * FLIP SETUP | ACCOUNT
 *
 * ----------------------------------------------------------
 */

function initFlip(){
    let card =   $("#c"); if(!card.length) return;
    card.flip({ trigger: 'manual'});

    setTimeout(function(){$(".credentials-card.back").css("display","flex");});

    $(".credentials-card.front .credentials-card-button.register").unbind().on("click",function(){
        card.flip(true);
    });

    $(".credentials-card.back  .credentials-card-button.back").unbind().on("click",function(){
        card.flip(false);
    });



    if(usernameGenerator === null){
        usernameGenerator = new CheckboxInput({
            ID : INPUT_USERNAME_GENERATOR,
            element : $("#usernameAutoR"),
            initialized : true,
            danger : INPUT_DANGER_SMALL,
            callback : function(self){
                self.element.unbind().on("change",function(){
                    LOGGER.log(self.isChecked());
                })
            }
        });


    }
}



/**
 *
 * ----------------------------------------------------------
 *
 * OWL SETUP | CUSTOM DESKTOP SCREEN
 *
 * ----------------------------------------------------------
 */




function initScreen(){

    $(window).resize(function(){if (owl !== null) owl.trigger('destroy.owl.carousel'); initScreen();});


    $(".screen .main .left .slide").width($(".screen .main .left").width());

    owl = $('.left.owl-carousel');
    owl.owlCarousel({
        onTranslated : onDraggedCallback,
        onInitialized : onInitializedCallback,
        stagePadding: 0,
        autoWidth : true,
        //autoplay : true,
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
    $(".screen").animate({"opacity":1},250);

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                if(owl)  owl.trigger('prev.owl.carousel');
                break;

            case 39: // right
                if(owl)  owl.trigger('next.owl.carousel');
                break;

            default: return; // exit this handler for other keys
        }
    });
}
function triggerSlide(left = true){
    if(owl !== null){
        if(left) owl.trigger('prev.owl.carousel');
        else owl.trigger('next.owl.carousel'); //right

    }
}
function setFirstPreview(){
    if(String($(".screen").css("opacity")) === "0") $(".screen").fadeIn(150);
    $(".screen .right .about").html(previewInfo[0]);
    $(".screen .top .title span").find("span").text(previewTabTitle[0]);

}
function onDraggedCallback(event){
    let position = event.item.index;
    $(".screen .top .title span").fadeOut(150);

    $(".screen .right .about").fadeOut(150,function(){
        setTimeout(function(){
            $(".screen .right .about").html(previewInfo[position]);
            $(".screen .right .about").fadeIn(150);
            $(".screen .top .title span").text(previewTabTitle[position]).fadeIn(150);
        },150);
    });
}








