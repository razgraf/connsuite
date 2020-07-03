/**
 * Created by razvan on 25/08/2017.
 */

let CASE_PICTURE_UNCHANGED = 0;
let CASE_PICTURE_CHANGED = 1;
let CASE_PICTURE_DELETED = 2;

let MAX_CUSTOM_BUSINESS_CARD_NUMBER = 30;
let CUSTOM_BUSINESS_CARD_NUMBER = 0;

let self = new ConnUser();
let networkLimit;
let connectList = [];
let customList = [];
let picture1Changed = CASE_PICTURE_UNCHANGED;
let picture2Changed = CASE_PICTURE_UNCHANGED;




$(function(){
    ONESIGNAL(depthToRoot);
    transitionPageEnterLoad(depthToRoot);
    retrieveSelf();
    retrieveConnects();
    retrieveCustomCards();
    $("#pendingRequestsButton").hide();
    if($(window).width() > 970) networkLimit = 11;
    else networkLimit = 8;




});



function retrieveSelf(){

    let req = $.ajax({
        url : retrieveUserURL,
        type : "GET",
        data : {username : username, visible : true},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        // console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("There was an error fetching this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            self.set(result);
            bindSelfUser();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}



function bindSelfUser(){



     let print;
    console.log(self);
    $("#selfBusinessCardPicture").prop("src",self.imageURL);

    let networksParent = $("#businessCardSelfNetworks");


  

    let localLimit  = networkLimit;
    if(self.networks.length < networkLimit) localLimit = self.networks.length;


    console.log(localLimit);


    for(let i=0; i< localLimit; i++){
        print = '<div class="leftNetworksTableItemContainer" > ' +
            '<div class="leftNetworksTableItemImageContainer">' +
            '<img id="leftNetworksTableItemImage-'+i+'" class="leftNetworksTableItemImage" src="' + self.networks[i].image.thumbnail + '"/> ' +
            '</div>' +
            '</div>';
        networksParent.append(print);
        self.networks[i].image.updateImage(NETWORK_IMAGE_TYPE_THUMBNAIL, "#leftNetworksTableItemImage-"+i);

    }

    print = ' <div data-tooltip="See more networks" class="leftNetworksTableItemContainer tool"  > ' +
        '<a  id="leftNetworksTableItemVisitContainer">' +
        '<span>...</span> ' +
        '</a>' +
        '</div>';
    networksParent.append(print);

    $("#leftNetworksTableItemVisitContainer").prop("href","../../"+username);
    $(".businessCardRightUsername").html('<span id="businessCardRightUsernameHelper">Username : </span>'+self.username);
    $(".businessCardRightName").text(self.name);

    $("#pendingRequestsNumber").text(self.requestsCount);
    if(self.requestsCount > 0) $(".pendingRequestCounterContainer").css("color","#04BEFE").css("font-weight","400");
    if(self.requestsCount == 1){
        $("#pendingRequestsHelper").text("Pending Request");
    }
    else $("#pendingRequestsHelper").text("Pending Requests");



}



function retrieveConnects(){

    let req = $.ajax({
        url: retrieveConnectListURL,
        type: "GET",
        data: {userID: userID, limit: 100, offset: 0},
        headers: buildHeaders(token, userID)
    });

    req.done(function(response){
        try {
        response = JSON.parse(response);

        if (response['response'] === kCSResponseNegative) {
            $("#bcParent").html("<span style='color: #aaaaaa;font-size: 10pt;padding-bottom: 20px;'>You currently have 0 connections. Visit someone's profile to request their card.</span>")
        }
        else if (response['response'] === kCSResponseOk) {
            var result = response['result'];
            for (var i = 0; i < result.length; i++) {
                var user = new ConnUser();
                user.set(result[i]['user']);
                connectList.push(user);
                buildBusinessCard(depthToRoot, user, $("#bcParent"), result[i]['ID']);
            }


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

    req.always(function(){
        transitionPageEnterLoadEnd();
    })
}

function buildBusinessCard(depthToRoot,user,parent,ID){

    var prePath="";
    for (var i = 0; i < depthToRoot; i++) prePath += "../";


    var print = ' <div class="col-lg-4 col-md-6 col-sm-12 connCardContainer" id="connCardContainer-'+ID+'"> ' +
        '<div class="connCard"  > ' +
        '<div class="connCardLeft"> ' +
        '<div onclick="showDeleteModal(\''+ID+'\',\''+user.ID+'\')" title="Remove Connection" class="connCardRemoveContainer"><i style="font-size: 17pt;" class="material-icons">&#xE15D;</i></div>'+
        '<div class="connCardPictureContainer"> ' +
    '<img id="connCardPicture-'+ID+'" class="connCardPicture"/> ' +
    '</div> ' +
    '</div> ' +
    '<div class="connCardRight"> ' +
    '<div style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;"> ' +
    '<div><span class="connCardName">'+user.name+'</span></div>' +
    '<div><span class="connCardUsername"><span class="connCardUsernameHelper">Username : </span>'+user.username+'</span> </div>' +
    '<div class="connCardTaglineContainer"><span class="connCardTaglineHelper">Tagline : </span><span id="connCardTagline-'+ID+'" class="connCardTagline" title="'+user.tagline+'">'+(user.tagline)+'</span> </div>' +
    '<div style="display: flex; flex: 1; flex-direction: row;align-items: center; width: 100%;"> ' +
    '<div class="connCardInfoContainer"> ' +
    '<span class="connCardInfoCount">'+user.networksCount+'</span> ' +
    '<i style="  font-size: 13pt;" class="icon-conn-05"></i> ' +
    '</div> ' +
    '<div class="connCardInfoContainer"> ' +
    '<span class="connCardInfoCount">'+user.articlesCount+'</span> ' +
    '<i style="  font-size: 13pt;" class="icon-conn-02"></i> ' +
    '</div> ' +
    '</div> ' +
    '<div style="width: 100%; margin-top: 10px; display: flex; align-items: flex-end; justify-content: flex-end;"> ' +
    '<a href="'+prePath+user.username+'" class="connCardViewButton" >Visit Profile</a> ' +
    '</div> ' +
    '</div> ' +
    '</div> ' +
    '</div> ' +
    '</div>';

    parent.append(print);

    imageExists(user.imageURL,function(callback){
        if(!callback) user.imageURL = "../../image/network/normal/icon_default.png";
        $("#connCardPicture-"+ID).attr("src", user.imageURL);
    });

    $("#connCardTagline-"+ID).dotdotdot({
        ellipsis: '... ',
        height :  20,
        wrap		: 'letter'
    });


}


function showDeleteModal(cardID, userID){
    $('#deleteModal').modal('show');

    $('#deleteModal').on('shown.bs.modal', function (e) {

        var name = connectByID(userID).name;
        $("#deleteModalContent").text("Are you sure that you want to remove "+name+" from your business book?");
        $("#deleteModalDeleteButton").unbind().on("click",function(){
            doRemoveBusinessConnection(cardID,userID);
        });
    });

}


function doRemoveBusinessConnection(cardID,targetID){
    var req = $.ajax({
        url : removeBusinessConnectionURL,
        type : "POST",
        data : {sourceID : userID, targetID : targetID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
       // console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("Operation not possible right now. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            $("#connCardContainer-"+cardID).fadeOut(300);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


function connectByID(ID){
    for(var i = 0; i<connectList.length;i++){
        if(connectList[i].ID == ID) return connectList[i];
    }
    return null;
}









/**
 Custom
 */




function retrieveCustomCards(){

    var req = $.ajax({
        url : retrieveCustomBusinessCardsURL,
        type : "GET",
        data : {userID : userID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
       // console.log(response);

        if(response['response'] === kCSResponseNegative){
             printAddCustom($("#offlineParent"));
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result']['cards'];
            $("#customNumber").text(response['result']['count']);
            $("#customLimit").text(response['result']['max']);
            MAX_CUSTOM_BUSINESS_CARD_NUMBER = parseInt(response['result']['max']);
            CUSTOM_BUSINESS_CARD_NUMBER = parseInt(response['result']['count']);
            for(var i=0; i< result.length; i++){
                var card = new CustomCard(result[i]);
                customList.push(card);
                buildCustomBusinessCard(depthToRoot,card,$("#offlineParent"));
            }


           if( CUSTOM_BUSINESS_CARD_NUMBER < MAX_CUSTOM_BUSINESS_CARD_NUMBER ) printAddCustom($("#offlineParent"));
        }
    });
    req.fail(function(e){
       // printAddCustom($("#offlineParent"));
        console.log("fail");
        showToast("Server error.");
    });
}



/**
 *
 * @param depthToRoot
 * @param {CustomCard} customCard
 * @param parent
 * @param ID
 */
function buildCustomBusinessCard(depthToRoot,customCard,parent){

    var prePath="";
    for (var i = 0; i < depthToRoot; i++) prePath += "../";


    var print = '<div class="col-lg-4 col-md-6 col-sm-12 connCardContainer" id="connCardContainer-'+customCard.ID+'"> ' +
        '<div class="customConnCard" > ' +
        '<div class="customConnCardLeft"> ' +
        '<div onclick="showDeleteCustomModal(\''+customCard.ID+'\')" title="Remove Connection" class="customConnCardRemoveContainer"><i style="font-size: 17pt;" class="material-icons">&#xE15D;</i></div> ' +
        '<div class="customConnCardPictureContainer"> ' +
        '<div class="customConnCardPicture"> ';
    if(customCard.initials)print+='<span>'+customCard.initials+'</span> ';
    print+='</div> ' +
        '</div> ' +
        '</div> ' +
        '<div class="customConnCardRight"> ' +
        '<div style="display: flex; flex-direction: column; justify-content: center; width: 100%; height: 100%;"> ' +
        '<div style="width: 100%;"><span class="customConnCardName">'+customCard.name+'</span></div> ' +
        '<div style="display: flex; flex: 1; margin-top: 10px; flex-direction: column;align-items: flex-start; width: 100%;"> ';
        if(customCard.phone) print+=
        '<div class="customConnCardSection"> ' +
        '<i style="font-size: 13pt" class="icon-conn-03 customConnCardSectionIcon"></i> ' +
        '<span class="customConnCardSectionText">'+customCard.phone+'</span> ' +
        '</div> ';
       if(customCard.email) print+=
        '<div class="customConnCardSection"> ' +
        '<i class="icon-conn-04 customConnCardSectionIcon"></i> ' +
        '<span class="customConnCardSectionText">'+customCard.email+'</span> ' +
        '</div> ';
       if(customCard.website) print+=
        '<div class="customConnCardSection"> ' +
        '<i class="icon-conn-05 customConnCardSectionIcon"></i> ' +
        '<span class="customConnCardSectionText">'+customCard.website+'</span> ' +
        '</div> ';
       print+=
        '</div> ' +
        '<div style="width: 100%; margin-top: 10px; padding-left: .15em; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;"> ';
    if(customCard.picture2) print+=
        '<div style="margin-right: 5px;"><i style="color: #dddddd; font-size: 14pt;" class="material-icons">&#xE3C4;</i></div>';
    if(customCard.picture1) print+=
        '<div style="margin-right: 5px;"><i style="color: #dddddd; font-size: 14pt;" class="material-icons">&#xE3C4;</i></div>';
    print+=
        '<div style="flex: 1; justify-content: flex-end; display: flex"><a onclick="showCustomModal(\''+customCard.ID+'\')" class="customConnCardViewButton" ><span>View More</span></a></div>' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>';

    if(parent) parent.append(print);
    else return print;
}



function printAddCustom(parent){
    var print = '<a  onclick="showAddCustomModal()" class="col-lg-4 col-md-6 col-sm-12 connCardContainer" id="customConnAddItemOuterContainer"> ' +
        '<div class="customConnAddItemContainer" > ' +
        '<div class="customConnAddItemMainContainer"> ' +
        '<div style="flex: 1; width: 100%; display: flex; justify-content: center; align-items: center;"> ' +
        '<img class="customConnAddItemIcon" src="../../image/add.png"/> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '<div class="customConnItemCredentialsContainer" style="min-height: 50px;"> ' +
        '<div class="customConnAddItemDetailButton" title="Add Custom Card"> ' +
        '<span style="width: 100%; text-align: center">Add Custom Card</span> ' +
        '</div> ' +
        '</div> ' +
        '</a>';

    parent.append(print);
}

function showCustomModal(ID){
    /**
     * @param {CustomCard} card
     */
    let card = null;
    card = customByID(ID);
    $("#editButton").show();
    $("#saveButton").hide();
    $('#customModal').modal('show');
    $('#customModalName').val(card.name).prop("disabled",true);

    $("#picturesShowcaseContainer").hide();
    $("#editCustomModalPictureContainer").hide();

    $("#customModalName").css("border","none");
    $("#addCustomModalName").css("background","#ffffff").css("opacity","1");

    $("#customModalEmail").prop("disabled",true).css("background","transparent");
    $("#customModalPhoneNumber").prop("disabled",true).css("background","transparent");
    $("#customModalWebsite").prop("disabled",true).css("background","transparent");
    $("#customModalDescription").prop("disabled",true).css("background","transparent");

    if(card.email)  $("#customModalEmail").val(card.email).css("opacity","1");
    else $("#customModalEmail").val("Empty").css("opacity","0.4");

    if(card.phone)  $("#customModalPhoneNumber").val(card.phone).css("opacity","1");
    else $("#customModalPhoneNumber").val("Empty").css("opacity","0.4");

    if(card.website)  $("#customModalWebsite").val(card.website).css("opacity","1");
    else $("#customModalWebsite").val("Empty").css("opacity","0.4");

    if(card.description)  $("#customModalDescription").val(card.description).css("opacity","1");
    else $("#customModalDescription").val("Empty").css("opacity","0.4");


    $("#picture1Showcase").hide();
    $("#picture1Showcase").prop("src","");
    if(card.picture1) {
        imageExists(card.picture1,function(callback){
           if(callback) {
               $("#picturesShowcaseContainer").show();
               $("#picture1Showcase").prop("src",card.picture1);
               $("#picture1Showcase").fadeIn(250);

           }
        });
    }
    $("#picture2Showcase").hide();
    $("#picture2Showcase").prop("src","");

    if(card.picture2) {
        imageExists(card.picture2,function(callback){

            if(callback) {
                $("#picturesShowcaseContainer").show();
                $("#picture2Showcase").prop("src",card.picture2);
                $("#picture2Showcase").fadeIn(250);
            }
        });
    }





    $('#customModal').on('shown.bs.modal', function (e) {

        $("#editButton").unbind().on("click",function(){
           $("#editButton").hide();
           $("#saveButton").show();

           $("#picturesShowcaseContainer").hide();
           $("#editCustomModalPictureContainer").show().css("display","flex");


            picture1Changed = CASE_PICTURE_UNCHANGED;
            picture2Changed = CASE_PICTURE_UNCHANGED;

            /**
             * Picture 1
             */

            let addButton = $("#addButtonEditPicture1");
            let target = $("#targetEditPicture1");
            let element = $("#elementEditPicture1");
            let deleteButton = $("#deleteButtonEditPicture1");


            /**
             * Refresh states
             */

            target.hide(); target.prop("src","");
            element.val(""); deleteButton.hide();



            if(card.picture1) {
                imageExists(card.picture1,function(callback){
                    if(callback) {
                        target.prop("src",card.picture1);
                        target.fadeIn(250);
                        deleteButton.show();
                        deleteButton.unbind().on("click",function(){
                            picture1Changed = CASE_PICTURE_DELETED;
                            element.val("");
                            target.hide();
                            deleteButton.hide();
                        });
                    }
                    else {
                        target.hide();
                        target.prop("src","");
                    }
                });
            }



            if(!card.picture1) target.hide();
            element.on("change",function(event){
                loadImageFile(
                    1,
                    event,
                    element,
                    target,
                    deleteButton);
            });
            addButton.on("click",function(){
                element.click();
            });


            /**
             * Picture 2
             */
            let addButton2 = $("#addButtonEditPicture2");
            let target2 = $("#targetEditPicture2");
            let element2 = $("#elementEditPicture2");
            let deleteButton2 = $("#deleteButtonEditPicture2");

            /**
             * Refresh states
             */

            target2.hide(); target2.prop("src","");
            element2.val(""); deleteButton2.hide();

            if(card.picture2) {
                imageExists(card.picture2,function(callback){
                    if(callback) {
                        target2.prop("src",card.picture2);
                        target2.fadeIn(250);
                        deleteButton2.show();
                        deleteButton2.unbind().on("click",function(){
                            picture2Changed = CASE_PICTURE_DELETED;
                            element2.val("");
                            target2.hide();
                            deleteButton2.hide();
                        });
                    }
                    else{
                        target2.hide();
                        target2.prop("src","");
                    }
                });
            }


        if(!card.picture2) target2.hide();

            element2.on("change",function(event2){
                loadImageFile(
                    2,
                    event2,
                    element2,
                    target2,
                    deleteButton2);
            });
            addButton2.on("click",function(){
                element2.click();
            });




            $("#customModalName").prop("disabled",false);
            $("#customModalEmail").prop("disabled",false).css("background","#f9f9f9").css("opacity","1").focus();
            $("#customModalPhoneNumber").prop("disabled",false).css("background","#f9f9f9").css("opacity","1");
            $("#customModalWebsite").prop("disabled",false).css("background","#f9f9f9").css("opacity","1");
            $("#customModalDescription").prop("disabled",false).css("background","#f9f9f9").css("opacity","1");
            if($("#customModalEmail").val() == "Empty") $("#customModalEmail").val("");
            if($("#customModalPhoneNumber").val() == "Empty") $("#customModalPhoneNumber").val("");
            if($("#customModalWebsite").val() == "Empty") $("#customModalWebsite").val("");
            if($("#customModalDescription").val() == "Empty") $("#customModalDescription").val("");

            $("#saveButton").unbind().on("click",function(){
                if(($("#customModalName").val()).length < 5){
                    showToast("Please add a longer name",1000);
                    return;
                }

                card.email = $("#customModalEmail").val();
                card.phone = $("#customModalPhoneNumber").val();
                card.website = $("#customModalWebsite").val();
                card.name = $("#customModalName").val();
                card.description = $("#customModalDescription").val();
                card.picture1 = (picture1Changed===CASE_PICTURE_CHANGED && ($("#elementEditPicture1").val()).length > 0 ) ? $("#elementEditPicture1")[0].files[0] : null;
                card.picture2 = (picture2Changed===CASE_PICTURE_CHANGED  && ($("#elementEditPicture2").val()).length > 0 ) ? $("#elementEditPicture2")[0].files[0] : null;
                card.picture1Changed =picture1Changed;
                card.picture2Changed =picture2Changed;

                doSaveCustomCard(card);
                $('#customModal').modal('hide');

            });
        });
    });
}

let areImageContainersCreated = false;


function showAddCustomModal(){


    picture1Changed = CASE_PICTURE_UNCHANGED;
    picture2Changed = CASE_PICTURE_UNCHANGED;


    if(customList && customList.length >= 30){
        showToast("You have reached the maximum numbers of allowed business cards. Contact the team for an account upgrade!");
        return;
    }


    if(!areImageContainersCreated){


        areImageContainersCreated = true;

        /**
         * Picture 1
         */

        let addButton = $("#addButtonPicture1");
        let target = $("#targetPicture1"); target.hide();
        let element = $("#elementPicture1");
        let deleteButton = $("#deleteButtonPicture1"); deleteButton.hide();
        element.on("change",function(event){
       // console.log("change1");
        loadImageFile(
                1,
                event,
                element,
                target,
                deleteButton);
        });
        addButton.on("click",function(){
            element.click();
        });


        /**
         * Picture 2
         */

        let addButton2 = $("#addButtonPicture2");
        let target2 = $("#targetPicture2"); target2.hide();
        let element2 = $("#elementPicture2");
        let deleteButton2 = $("#deleteButtonPicture2");  deleteButton2.hide();
        element2.on("change",function(event2){
      //  console.log("change2");
        loadImageFile(
                2,
                event2,
                element2,
                target2,
                deleteButton2);
        });
        addButton2.on("click",function(){
            element2.click();
        });


    }


    /**
     * @param {CustomCard} card
     */



    var card =  new CustomCard({});

    $('#addCustomModal').modal('show');
    $("#addCustomModalEmail").css("background","#f9f9f9").css("opacity","1").focus();
    $("#addCustomModalPhoneNumber").css("background","#f9f9f9").css("opacity","1");
    $("#addCustomModalWebsite").css("background","#f9f9f9").css("opacity","1");
    $("#addCustomModalDescription").css("background","#f9f9f9").css("opacity","1");
    $("#addCustomModalName").css("background","#f9f9f9").css("opacity","1");


    $('#addCustomModal').on('shown.bs.modal', function (e) {

        $("#addButton").unbind().on("click",function(){

            if(($("#addCustomModalName").val()).length < 5){
                showToast("Please add a longer name",1000);
                return;
            }
            card.email = $("#addCustomModalEmail").val();
            card.phone = $("#addCustomModalPhoneNumber").val();
            card.website = $("#addCustomModalWebsite").val();
            card.name = $("#addCustomModalName").val();
            card.description = $("#addCustomModalDescription").val();
            card.picture1 = (picture1Changed == CASE_PICTURE_CHANGED && ($("#elementPicture1").val()).length > 0 ) ? $("#elementPicture1")[0].files[0] : null;
            card.picture2 = (picture2Changed == CASE_PICTURE_CHANGED && ($("#elementPicture2").val()).length > 0 ) ? $("#elementPicture2")[0].files[0] : null;
            doAddCustomCard(card);
            $('#addCustomModal').modal('hide');
        });
    });
}

function doAddCustomCard(card){

    let data = {
        userID: userID,
        name : card.name,
        phone : card.phone,
        email : card.email,
        website : card.website,
        description : card.description,
    };

    if(card.picture1) data.picture1 = card.picture1;
    if(card.picture2){
        if(!card.picture1)  data.picture1 = card.picture2;
        else  data.picture2 = card.picture2;
    }

    let formData = new FormData();
    for(let key in data) formData.append(key, data[key]);

    let req = $.ajax({
        url : addCustomBusinessCardURL ,
        type : "POST",
        data : formData,
        cache: false,
        contentType: false,
        processData: false,
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        try {
            response = JSON.parse(response);


            if (response['response'] === kCSResponseNegative) {
                showToast("Update could not be done successfully.");
            }
            else if (response['response'] === kCSResponseOk || response['response'] === kCSResponseReload) {
                showToast("New offline card has been added.", 800);
                console.log(stepID === TUTORIAL_STEP_BUSINESS_BOOK);
                if (stepID === TUTORIAL_STEP_BUSINESS_BOOK) {
                    setTimeout(function () {
                        doCompleteTutorialStep(stepID, false, ROOT + "p/business/book.php", {"tutorialAction": TUTORIAL_STEP_BUSINESS_BOOK});
                    }, 800);
                }
                else setTimeout(function () {
                    window.location.reload(true);
                }, 800);
            }
        }catch (err){
            console.log(response);
            console.log(err);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}

function showDeleteCustomModal(ID){
    $('#deleteCustomModal').modal('show');
    $("#deleteCustomModalName").text("Remove "+customByID(ID).name + " from the list?");
    $('#deleteCustomModal').on('shown.bs.modal', function (e) {
        $("#deleteModalDeleteCardButton").unbind().on("click",function(){
            doDeleteCustomCard(ID);
        });
    });
}

function doDeleteCustomCard(ID){
    var req = $.ajax({
        url : deleteCustomBusinessCardURL,
        type : "POST",
        data : {
            userID: userID,
            cardID : ID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
      //  console.log(response);
        response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative){
            showToast("Delete action failed.");
        }
        else if(response['response'] === kCSResponseOk) {
            showToast("The offline business card has been deleted.",800);
            setTimeout(function(){window.location.reload(true);},800);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}



function doSaveCustomCard(card){

    let data = {
        userID: userID,
        cardID : card.ID,
        name : card.name,
        phone : card.phone,
        email : card.email,
        website : card.website,
        description : card.description,
        picture1Changed : card.picture1Changed,
        picture2Changed : card.picture2Changed
    };


    if(card.picture1) data.picture1 = card.picture1;
    if(card.picture2) data.picture2 = card.picture2;


    let formData = new FormData();
    for(let key in data) formData.append(key, data[key]);


    var req = $.ajax({
        url : editCustomBusinessCardURL ,
        type : "POST",
        data : formData,
        cache: false,
        contentType: false,
        processData: false,
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
       // console.log(response);

        if(response['response'] === kCSResponseNegative){
        showToast("Update failed.");
        }
        else if(response['response'] === kCSResponseOk || response['response'] === kCSResponseReload) {
        if(response['response'] === kCSResponseReload){
            showToast("Card info had been updated!",800);
            setTimeout(function(){window.location.reload(true);},800);
        }
        doUpdateLocalCard(card);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}

/**
 *
 * @param {CustomCard} card
 */
function doUpdateLocalCard(card){
    if(customPosByID(card.ID) === null) return;
    customList[customPosByID(card.ID)] = card;
    var newPrint = buildCustomBusinessCard(depthToRoot,card, null);
    $("#connCardContainer-"+card.ID).replaceWith(newPrint);
    showToast("Card info had been updated!",800);

}


function customPosByID(ID){
    for(var i = 0; i<customList.length;i++){
        if(customList[i].ID == ID) return i ;
    }
    return null;
}

function customByID(ID){
    for(var i = 0; i<customList.length;i++){
        if(customList[i].ID == ID) return customList[i];
    }
    return null;
}











let loadImageFile = function(pictureID,event,element,target,deleteButton) {

    let fileExtension = ['jpeg', 'jpg', 'png'];
    if (event.target.files.length > 0 && $.inArray(event.target.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
        showToast("Only formats are allowed : "+fileExtension.join(', '),1800);
        element.val("");
        pictureID === 1 ? picture1Changed = CASE_PICTURE_UNCHANGED : picture2Changed = CASE_PICTURE_UNCHANGED;
        return false;

    }
    else  if (event.target.files[0].size > 3500000){
        showToast("Please upload an image smaller than 3MB",1800);
        element.val("");
        pictureID === 1 ? picture1Changed = CASE_PICTURE_UNCHANGED : picture2Changed = CASE_PICTURE_UNCHANGED;
        return false;

    }
    else {
        let reader = new FileReader();
        reader.onload = function () {
            target.prop("src",reader.result);
            target.src = reader.result;

        };
        reader.readAsDataURL(event.target.files[0]);

        pictureID === 1 ? picture1Changed = CASE_PICTURE_CHANGED : picture2Changed = CASE_PICTURE_CHANGED;

            target.show();
            deleteButton.show();
            deleteButton.unbind().on("click",function(){
                pictureID === 1 ? picture1Changed = CASE_PICTURE_DELETED : picture2Changed = CASE_PICTURE_DELETED;
                element.val("");
                target.hide();
                deleteButton.hide();

            });

            //  console.log(picture1Changed); console.log($("#elementPicture1").val());
            // console.log(picture2Changed); console.log($("#elementPicture2").val());

        return true;

    }


};
