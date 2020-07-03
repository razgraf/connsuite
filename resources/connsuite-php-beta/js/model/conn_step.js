/**
 * Created by razvan on 07/02/2018.
 */
const STEP_TYPE_REDIRECT = 1;
const STEP_TYPE_ACTION_WITHIN = 2; //will have html in extra

function ConnStep(step){
    /**
     * TUTORIAL STEP ANATOMY
     */



    let ID;
    let miniTitle;
    let miniDescription;
    let maxTitle;
    let maxDescription;
    let extra; //will store functions.
    let type; //STEP_TYPE
    let stickyFlag = null; //if step is sticky (not null), it will open every time user will have a stickyFlag string in his url.
    let buttonText;
    let closable;
    let passed;

    if(step) this.set(step);

}

ConnStep.prototype.set = function(step) {
    this.ID = step.hasOwnProperty("ID") && Number.isInteger(step['ID']) ? step['ID'] : null;
    this.miniTitle = step.hasOwnProperty("miniTitle") && step['miniTitle'].length > 0 ? step['miniTitle'] : "";
    this.miniDescription = step.hasOwnProperty("miniDescription") && step['miniDescription'].length > 0 ? step['miniDescription'] : "";
    this.maxTitle = step.hasOwnProperty("maxTitle") && step['maxTitle'].length > 0 ? step['maxTitle'] : "";
    this.maxDescription = step.hasOwnProperty("maxDescription") && step['maxDescription'].length > 0 ? step['maxDescription'] : "";
    this.extra = step.hasOwnProperty("extra") ? step['extra'] : null;
    this.type = step.hasOwnProperty("type") && Number.isInteger(step['type']) ? step['type'] : 1;
    this.stickyFlag = step.hasOwnProperty("stickyFlag") && step['stickyFlag'].length > 0 ? step['stickyFlag'] : false;
    this.buttonText = step.hasOwnProperty("buttonText") && step['buttonText'].length > 0 ? step['buttonText'] : null;
    this.closable = step.hasOwnProperty("closable") ? Boolean(step['closable']) : true;
    this.passed = step.hasOwnProperty("passed") && step['passed'].length > 0 ? step['passed'] : "Congratulations for passing the previous step!";

};


ConnStep.prototype.buildHTML = function(currentStepID,position){
    let i = position;
    currentStepID = parseInt(currentStepID);
    let completedCheck = this.ID < currentStepID ? '<i class="material-icons">&#xE5CA;</i>' : '';
    let index = this.ID === TUTORIAL_STEP_WELCOME ? '<span style=""><i class="em em-star2"></i></span>' : (this.ID === TUTORIAL_STEP_END) ? '<span style=""><i class="em em-trophy"></i></span>': this.ID;
    return this.ID === currentStepID ?
                '<div onclick="showTutorialModal('+i+')" class="tutorialMiniCardContainer"> ' +
                '<div class="tutorialMiniCardActive"> ' +
                '<div onclick="showTutorialModal('+i+')" class="tutorialMiniIndex"><i class="material-icons">&#xE5C8;</i></div> ' +
                '<div class="tutorialMiniContent"> ' +
                '<p class="tutorialMiniTitle">'+this.miniTitle+'</p> ' +
                '<span class="tutorialMiniDescription">'+this.miniDescription+'</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>'
        : (this.ID < currentStepID) ?
        '<div onclick="showTutorialModalIf('+i+')" class="tutorialMiniCardContainer" style="padding-top: 10px;"> ' +
        '<div class="tutorialMiniCard"> ' +
        '<div onclick="showTutorialModal('+i+')" class="tutorialMiniIndex"><span>'+index+'</span></div> ' +
        '<div class="tutorialMiniContent"> ' +
        '<p class="tutorialMiniTitle">'+this.miniTitle + completedCheck+'</p> ' +
        '<span class="tutorialMiniDescription">'+this.miniDescription+'</span> ' +
        '</div> ' +
        '</div> ' +
        '</div>'
    :
                '<div onclick="showTutorialModalIf('+i+')" class="tutorialMiniCardContainer" style="padding-top: 10px;"> ' +
                '<div class="tutorialMiniCard tutorialMiniCardNext"> ' +
                '<div onclick="showTutorialModal('+i+')" class="tutorialMiniIndex"><span>'+index+'</span></div> ' +
                '<div class="tutorialMiniContent"> ' +
                '<p class="tutorialMiniTitle">'+this.miniTitle + completedCheck+'</p> ' +
                '<span class="tutorialMiniDescription">'+this.miniDescription+'</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>'
    ;


};



let ConnTutorial = [
    {
        ID : TUTORIAL_STEP_WELCOME,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Welcome!",
        miniDescription : "Meet ConnSuite, your new Online Business Card.",
        maxTitle : "Welcome to ConnSuite!",
        maxDescription : "ConnSuite is an online platform that provides an upgrade to the classic business card. Link your social accounts and showcase articles about yourself all under one single username. Become a ConnSuite Star right now <i class=\"em em-star2\"></i>! <br><br>P.S. There is a prize waiting for you at the end of this tutorial <i class=\"em em-trophy\"></i>.",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div style="height: 100%; width: 100%;display: flex; justify-content: center; align-items: center; transform: scale(1.1);margin-top: -10px;"><img src="'+ROOT+'/image/tutorial/tutorial_welcome_animation.gif" style="width: 100%; height:200px; object-fit: contain"></div>';

            parent.html("");
            parent.append(print);

            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind()
                .on("click",function(){
                    doCompleteTutorialStep(stepID,true);
                });

        },
        stickyFlag : false,
        buttonText : "Show me more!",
        closable : true
    },
    {
        ID : TUTORIAL_STEP_PROFILE_PICTURE,
        type :STEP_TYPE_ACTION_WITHIN,
        miniTitle : "Profile Picture",
        miniDescription : "Upload a picture to fit your business profile.",
        maxTitle : "Add a profile picture to your ConnSuite account.",
        maxDescription : "Upload a profile picture so your business acquaintances can recognize you easier. Make it a cool one!",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div id="tutorialExtraPictureContainer" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;margin-top: 10px;"> ' +
                '<div id="pictureContainer" style="border: 1px solid #eeeeee; background: #f9f9f9;border-radius: 3px; padding: 5px;"> ' +
                '<div id="noPictureContainer"> ' +
                '<img src="../image/no_people_o.png" style="width: 120px; height: 120px;"> ' +
                '</div> ' +
                '<div id="outputContainer" style="display: none; width: 120px; height: 120px; justify-content: center; align-items: center;"> ' +
                '<img id="output" src="" style="object-position: center; max-height: 120px; max-width: 120px;/* Center the image within the element */" /> ' +
                '</div> ' +
                '</div> ' +
                '<input type="file" id="customImage" name="customImage" style="margin-top: 10px; z-index: 10; display: none" accept="image/*" onchange="loadProfileFile(event)"> ' +
                '<div style="width: 100%; display: flex; flex-direction: row; align-items: center;margin-top: 10px; justify-content: center;"> ' +
                '<span class="buttonTypeOutlineGray" id="chooseProfilePictureButton">Change the Picture</span> ' +
                '</div> ' +
                '</div>';

            parent.html("");
            parent.append(print);


            if(stepID === TUTORIAL_STEP_PROFILE_PICTURE) {
                $("#chooseProfilePictureButton").unbind().on("click", function () {
                    $("#customImage").click();
                });

            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind().on("click",function(e){
                e.preventDefault();
                if(tutorialPictureChanged) doUploadPicture();
                else showToast("You have to upload an image first.",800);
            });
            }
            else {
                $("#tutorialExtraPictureContainer").addClass(".disableClick");
                $("#chooseProfilePictureButton").hide();
            }

        },
        stickyFlag : false,
        buttonText : "Upload",
        closable : true,
        passed : "Welcome to ConnSuite!"
    },
    {
        ID : TUTORIAL_STEP_NETWORK,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Add Networks",
        miniDescription : "Link a few social profiles to your Connsuite username.",
        maxTitle : "Have at least 3 networks linked to your Profile.",
        maxDescription : "Start by creating/linking at least 3 social accounts to your online business card. Fill in the details or create custom network cards for your special accounts.. Make it a cool one!",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div style="height: 100%; width: 100%;display: flex; justify-content: center; align-items: center;"><img src="'+ROOT+'/image/tutorial/tutorial_network.gif" style="width: 200px; height:200px; object-fit: contain"></div>';

            parent.html("");
            parent.append(print);

            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind().on("click",function(){
                doCompleteTutorialStep(stepID);
                window.location.href = ROOT+"p/network/add.php";
            });

        },
        stickyFlag : false,
        buttonText : "Let's add some!",
        closable : true,
        passed  : "Your profile picture is on point <i class='em em-dark_sunglasses'></i>!"
    },
    {
        ID : TUTORIAL_STEP_BUSINESS_BOOK,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Business Book",
        miniDescription : "Create your business book and convert offline cards.",
        maxTitle : "Add one offline card to your Business Book",
        maxDescription : "As your business network grows, so will the stack of business contacts that you might need at any point in your day. Import your offline cards or request one from your partners on ConnSuite.",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div style="height: 100%; width: 100%;display: flex; justify-content: center; align-items: center;"><img src="'+ROOT+'/image/tutorial/tutorial_business_pocket.gif" style="width: 100%; height:200px; object-fit: contain"></div>';

            parent.html("");
            parent.append(print);

            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind().
                on("click",function(){
                doCompleteTutorialStep(stepID,false,ROOT + "p/business/book.php",{"tutorialAction":TUTORIAL_STEP_BUSINESS_BOOK});
            });

        },
        stickyFlag : false,
        buttonText : "Visit Business Book",
        closable : true,
        passed : "Good job! You have just finished adding your first networks!"
    },
    {
        ID : TUTORIAL_STEP_PROFILE_EXAMPLE,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Profile Example",
        miniDescription : "Need a few quick tips on how your profile should look like?",
        maxTitle : "Check some ConnSuite Business Cards.",
        maxDescription : "After you edit it and add a few networks or articles, your profile will become the <b>Ultimate Business Card</b>. Have a look at a few example profiles to get you started.",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let urlRazgraf = ROOT + 'image/tutorial/tutorial_icon_gradient_overlay.gif';
            let urlSmith = ROOT + 'image/tutorial/tutorial_picture_smith.png';
            let print = '<div  style="display: flex; flex-direction: column; width: 100%; height: 100%;">' +
                '<div id="visitProfile1" title="View Razvan\'s Profile" href="' + ROOT + 'razgraf' + '" style="display: inline-block; text-decoration:none;"><div style="min-width: 220px; height: 66px; border-radius: 33px; padding: 0 16px 0 8px;cursor: pointer;  ' +
                'display: flex; flex-direction: row;align-items: center; justify-content: flex-start;box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);' +
                'background: #04befe;background: linear-gradient(15deg, #4481eb, #04befe);background: -webkit-linear-gradient(15deg, #4481eb, #04befe);background: -moz-linear-gradient(15deg, #4481eb, #04befe);background: -o-linear-gradient(15deg, #4481eb, #04befe);"> ' +
                '<img data-client-bg="1" class="connsuite-client-profile-image-131232" style="height: 46px; width: 46px; border-radius: 25px; object-fit: cover; object-position: center; border: 1px solid #ffffff; background: #ffffff;" src="' +urlRazgraf+'" /> ' +
                '<div style="height: 100%; padding-left: 10px; display: flex; flex-direction: column; justify-content: center;"> ' +
                '<span style="text-decoration:none;color: #ffffff; font-family: \'Quicksand\', sans-serif; font-size: 8pt; line-height: 1; margin-bottom: 7px; font-weight: 400;">Find me on ConnSuite</span> ' +
                '<div style="width: 100%; display: flex; align-items: center;"><img style="height: 18px; width: 18px; margin-right: 5px;" src="' + ROOT + 'image/logo_icon_w.png" /><span style="color: #ffffff; text-decoration:none;font-family: \'Quicksand\', sans-serif; font-size: 11pt; white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-weight: 400;">/' + 'razgraf'+ '</span></div> ' +
                '</div> ' +
                '</div></div>'+

                '<div id="visitProfile2"   title="View John Smith\'s Profile" href="' + ROOT + 'john.smith' + '" style="display: inline-block; text-decoration:none;"><div style="min-width: 220px; height: 66px; border-radius: 33px; padding: 0 16px 0 8px;cursor: pointer;  ' +
                'display: flex; flex-direction: row;align-items: center; justify-content: flex-start;box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);' +
                ' background: #ffffff;"> ' +
                '<img data-client-bg="1" class="connsuite-client-profile-image-131232" style="height: 46px; width: 46px; border-radius: 25px; object-fit: cover; object-position: center; border: 1px solid #04befe; background: #04befe;" src="' +urlSmith+'" /> ' +
                '<div style="height: 100%; padding-left: 10px; display: flex; flex-direction: column; justify-content: center;"> ' +
                '<span style="text-decoration:none;color: #04befe; font-family: \'Quicksand\', sans-serif; font-size: 8pt; line-height: 1; margin-bottom: 7px; font-weight: 400;">Find me on ConnSuite</span> ' +
                '<div style="width: 100%; display: flex; align-items: center;"><img style="height: 18px; width: 18px; margin-right: 5px;" src="' + ROOT + 'image/logo_icon_gr.png" /><span style="color: #04befe; text-decoration:none;font-family: \'Quicksand\', sans-serif; font-size: 11pt; white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-weight: 400;">/' + 'john.smith' + '</span></div> ' +
                '</div> ' +
                '</div></div>'+
                '</div>';


            parent.html("");
            parent.append(print);

            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind().on("click",function(){
                doCompleteTutorialStep(stepID,false,ROOT+"p/search.php",{"tutorialAction":TUTORIAL_STEP_PROFILE_EXAMPLE});
            });

            if(stepID === TUTORIAL_STEP_PROFILE_EXAMPLE) {
                $("#visitProfile1").unbind().on("click", function () {
                    doCompleteTutorialStep(stepID,false,ROOT + "razgraf",{"tutorialAction":TUTORIAL_STEP_PROFILE_EXAMPLE});
                });
                $("#visitProfile2").unbind().on("click", function () {
                    doCompleteTutorialStep(stepID,false,ROOT + "john.smith",{"tutorialAction":TUTORIAL_STEP_PROFILE_EXAMPLE});
                });
            }
            else{
                $("#visitProfile1").unbind().css("filter","grayscale(100%)").on("click", function () {
                    window.location.href = ROOT + "razgraf";
                });
                $("#visitProfile2").unbind().css("filter","grayscale(100%)").on("click", function () {
                    window.location.href = ROOT + "john.smith";
                });
            }

        },
        stickyFlag : false,
        buttonText : "Search users",
        closable : true,
        passed : "Nice! You've just uploaded your first offline business cards!"
    },
    {
        ID : TUTORIAL_STEP_ARTICLE,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Add Article",
        miniDescription : "Showcase your skills and achievements through articles.",
        maxTitle : "Add articles about yourself and your work!",
        maxDescription : "Do more than you would with just a simple business card! Teach your audience by showcasing or linking towards websites or external articles about you & your work. Create one now with ConnSuite! <a href='https://www.connsuite.com/a/johns-awesome-article-29' target='_blank'>(example)</a>",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div style="height: 100%; width: 100%;display: flex; justify-content: center; align-items: center;"><img src="'+ROOT+'/image/tutorial/tutorial_article.gif" style="width: 100%; height:200px; object-fit: contain"></div>';

            parent.html("");
            parent.append(print);


            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind();

            $("#tutorialMagicButton").on("click",function(){
               window.location.href = ROOT+"p/article/add.php";
            });

        },
        stickyFlag : false,
        buttonText : "Add one article",
        closable : true,
        passed : "Nice! Keep searching for awesome people on ConnSuite!"
    },
    {
        ID : TUTORIAL_STEP_SHARE,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Share @connsuite",
        miniDescription : "Share ConnSuite with your friends and partners.",
        maxTitle : "What do your think about ConnSuite?",
        maxDescription : "Enjoying ConnSuite? Spread the word! Bring your connections on ConnSuite and help build a bigger community!",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div style="width: 100%;padding: 20px; background: #fafafa;border-radius: 10px;display: flex; flex-direction: column;border: 1px solid #eeeeee;">' +
                '<div><p id="tutorialShareText" style="font-size: 12pt; word-break: break-word">I\'ve just crated my online business card with @ConnSuite! Check it out! '+ROOT+myUsername+'</p></div>' +
                '<div style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: flex-end; cursor: pointer;"><span id="tutorialShareCopyText" style="font-size: 9pt; cursor: pointer;padding-right: 3px;">Copy to Clipboard</span><i style="font-size: 10pt;" class="material-icons">&#xE14D;</i></div>' +
                '</div>';




            parent.html("");
            parent.append(print);

            $("#tutorialShareCopyText").unbind().click(function(){
                $("#tutorialShareText").click();
            });

            $("#tutorialShareText").on("click",function(){
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($("#tutorialShareText").text()).select();
                document.execCommand("copy");
                $temp.remove();
                showToast("Text copied to clipboard.");
            });



            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind()
                .on("click",function(){
                    doCompleteTutorialStep(stepID,true,null,{"tutorialAction":TUTORIAL_STEP_SHARE});
                });

        },
        stickyFlag : false,
        buttonText : "Next Step",
        closable : true,
        passed : "You are on fire<i class='em em-fire'></i> ! You just published your first article!"
    },
    {
        ID : TUTORIAL_STEP_END,
        type : STEP_TYPE_REDIRECT,
        miniTitle : "Become an official ConnSuite Star!",
        miniDescription : "",
        maxTitle : "<i class='em em-tada'></i> You are now an official ConnSuite Star!",
        maxDescription : "Congratulations for creating the ultimate online business card! We hope you enjoy using ConnSuite. We are not done yet! Soon we will be releasing premium features to enhance your business experience with ConnSuite. As a reward for finishing this tutorial, <b class='colorPrimary'>we will be offering you 2 months free access</b>. We'll let you know when ConnSuite will become even more amazing!",
        extra: function(){
            let parent = $("#tutorialExtraParent");
            let print = '<div style="height: 100%; width: 100%;display: flex; justify-content: center; align-items: center;"><img src="'+ROOT+'/image/tutorial/tutorial_congrats_animation.gif" style="width: 100%; height:300px; object-fit: contain"></div>';

            parent.html("");
            parent.append(print);





            /** Take care of the button.UNBIND and add HREF if necessary */
            $("#tutorialMagicButton").removeProp("href").unbind()
                .on("click",function(){
                    doPremiumList();
                });

        },
        stickyFlag : false,
        buttonText : "I want 2 free months",
        closable : true,
        passed : "<i class='em em-trophy'></i><i class='em em-star'></i><i class='em em-tada'></i> You are awesomeeeeee !"
    },
];



function doPremiumList(email = null){
    let data = {stepID : stepID};
    if(email) data.email = email;
    let req = $.ajax({
        url : ROOT+"core/tutorial/add-premium.php",
        type : "POST",
        data : data,
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        try {
            console.log(response);
            response = JSON.parse(response);
            if (response['response'] === kCSResponseNegative) { console.log(response);}
            else
            if (response['response'] === kCSResponseOk) {
                $("#tutorialModal").modal('hide');
                $("#emailModal").modal('hide');
                showBootstrapModal(MODAL_HEADER_TYPE_DONE,
                    "👑You have been added to the Premium waiting list!",
                    "Thank you for trying ConnSuite! We added your email & account to the list of premium users. This means that you will receive 2 months of free premium access to all the cool 'subscription based' features we wish to release soon. We will get in touch and let you know about them soon!",
                    [
                        {
                            "title":"Finish Tutorial",
                            "callback": function(buttonID){ if(buttonID) doCompleteTutorialStep(stepID,true,null,{"tutorialAction":TUTORIAL_STEP_END});   },
                        },

                    ],
                    false
                );
            }
             else if (response['response'] === kCSResponseEmail) {

                $("#tutorialModal").modal('hide');
                $("#emailModal").modal('show');
                $("#emailModal").on('shown.bs.modal',function(){
                   $("#emailModalSendButton").unbind().on("click",function(){

                       let email = $("#tutorialEmail").val();
                       if( email===null || email.length < 3 || !validateEmail(email)){
                           showToast("Please add a valid email address!",timeout);
                           $("#joinEmail").focus().css("background","#eeeeee");
                           return;
                       }

                       let matches = email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i);
                       let emailValid = matches && matches[0];

                       if(!emailValid){
                           showToast("Please add a valid email address!",timeout);
                           $("#joinEmail").focus().css("background","#eeeeee");
                           return;
                       }

                       /**
                        * Email is valid
                        */

                       doPremiumList(email);

                   });
                });


            }
        }catch(err){
            console.log(err);
            console.log(response);
        }

    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}






function showTutorialModalIf(position){
    if(isMobileSize()) showTutorialModal(position);
}

function showTutorialModal(position, passed = false){

    if(position === null || !Number.isInteger(position)) return;
    if(position >= ConnTutorial.length) return;


    let title = $("#tutorialModalTitle");
    let description = $("#tutorialModalDescription");
    let button = $("#tutorialMagicButton");
    let buttonText = $("#tutorialMagicButton span");
    let canvas = $("#tutorialExtraParent");
    let modal = $("#tutorialModal");

    $("#tutorialModalCloseButton").text("Later");
    $("#tutorialModalLastCardContainer").hide();



    let step = ConnTutorial[position];
    button.show();

    try{
        title.html(step.maxTitle);
        description.html(step.maxDescription);
        buttonText.text(step.buttonText);
        if(step.extra !== null) step.extra();

        if(step.ID !== stepID){
            button.hide();
            $("#tutorialModalCloseButton").text("Close");
        }


        if(passed && step.passed) {
            $("#tutorialModalLastCardContainer").show();
            $("#tutorialModalLastCardContent p").html(step.passed);
        }

        modal.modal('show');



        if(passed && position > 0) modal.on('shown.bs.modal',function(){
           setTimeout(function(){
               $("#tutorialModalLastCardContainer").fadeOut(1200);
           },4500);
        });


    }
    catch (err){
        console.log(err);
        modal.modal('hide');
    }


}

/**HELPER FUNCTIONS*/

let tutorialPictureChanged = false;






function doUploadPicture(){


    var image = $("#customImage")[0].files[0];
    if(!image || !tutorialPictureChanged){
        showToast("Please add an image first.",600);
        return;
    }

    var data = {userID : userID, image: image};
    var formData = new FormData();
    for(var key in data) formData.append(key, data[key]);

    showToast("Uploading Image...",50000);



    var req = $.ajax({
        url : doUploadPictureURL,
        type : 'POST',
        data : formData,
        headers : buildHeaders(token, userID),
        cache: false,
        contentType: false,
        processData: false
    });

    req.done(function(response){
        response = JSON.parse(response);
        //  console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("Upload Failed.")
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            doCompleteTutorialStep(stepID,true);
        }

    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        // $('#profileModal').modal('hide');
    });

    req.always(function(e){
        setTimeout(function(){
            hideToast();
        },500);
    })
}


// load image into output
let loadProfileFile = function(event) {

    var fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1200);
        $("#customImage").val("");
        tutorialPictureChanged = false;
        return;
    }
    else  if (event.target.files[0].size > 6000000){
        showToast("Please upload an image smaller than 5MB",1200);
        $("#customImage").val("");
        tutorialPictureChanged = false;
        $("#output").prop("src",profilePicturePrimaryURL);
        return;
    }
    else {
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('output');
            output.src = reader.result;
        };

        tutorialPictureChanged = true;
        $("#outputContainer").fadeIn().css("display", "flex");
        $("#noPictureContainer").hide();
        $("#uploadProfilePictureButton").fadeIn(200).css("display", "flex");


        reader.readAsDataURL(event.target.files[0]);

    }
};






