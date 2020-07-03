/**
 * Created by razvan on 13/08/2017.
 */
/**
 * NETWORKING
 */
var networks = [];
var globalNetworkID = null;

var publicToggleGlobal = '1';





$(function(){
    ONESIGNAL(depthToRoot);
    transitionPageEnterLoad(depthToRoot);
    retrieveNetworks();
    retrieveArticles();
    retrieveNews();
    $("#connAddItemOuterContainer").on("click",function(e){
        e.preventDefault();
        transitionPageLeave("network/add.php",depthToRoot);
    });



    $("#reorderNetworksButton").on("click",function(){
        showReorderModal();
    });

    buildTutorial();



    $("a.csVideo").YouTubePopUp();
    $("#tutorialSectionHeadingIcon").on("click",function(){showTutorialVideo();});


});



function retrieveNetworks(){
    var req = $.ajax({
        url : retrieveNetworkListURL,
        type : 'GET',
        data : {
            userID : userID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        //console.log(response);
        response = JSON.parse(response);

        if(response['response'] === kCSResponseNegative){
            $("#reorderNetworksButton").hide();
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];


            for (var i = 0; i < result.length; i++) {
                var network = new Network();
                network.set(result[i]);
                buildConnItem(depthToRoot, $("#connItemsParent"), network);
                networks.push(network)
            }
        }
        printAddElement($("#connItemsParent"));


    });

    req.fail(function(e){
       console.log("fail");
       showToast("Server error.");
        $("#reorderNetworksButton").hide();
        printAddElement($("#connItemsParent"));
    });

    req.always(function(){
        setTimeout(function(){
            transitionPageEnterLoadEnd(depthToRoot);
            if(stickyTutorial) showTutorialModal(stepID,stickyPassed);
        },200);

    });
}

function retrieveArticles(){

    var req = $.ajax({
        url : retrieveArticleList,
        type : 'GET',
        data : {
            userID : userID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
         //console.log(response);
        if(response['response'] === kCSResponseNegative){


        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            for(var i = 0; i<result.length; i++) {
                var article = new Article();
                article.set(result[i]);
                //console.log(article);
                buildConnArticle(depthToRoot, $("#articleParent"), article,true);
            }
        }
        printAddArticleElement($("#articleParent"));

    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        printAddArticleElement($("#articleParent"));
    });

}

function viewNetworkDetails(ID){
    globalNetworkID = ID;
    bindRightDetailWidth();
    var right =  $( '#rightDetailContainer' );
    var cover = $("#rightDetailPageCover");

    var network = findNetworkByID(ID);
    if(network === null) return;



    publicToggleGlobal = network.visible;

    $('body').attr("disabled",true);



    cover.show();

    if( right.hasClass('fadeOutRight')) {
        right.removeClass('fadeOutRight ');
    }
    right.show().addClass( ' fadeInRight' );

    bindNetworkData(network);
    bindRightOnClick();


    $(".rightDetailCloseButton").unbind().on("click",function(){  closeCover();  });
    cover.unbind().on("click", function() {  closeCover();  });

}

function closeCover() {
    if(!globalNetworkID) return;
    let ID = globalNetworkID;
    var right =  $( '#rightDetailContainer' );
    var cover = $("#rightDetailPageCover");
    $('body').attr("disabled",true);

    var network = findNetworkByID(ID);

    if(publicToggleGlobal!==null && publicToggleGlobal !== network.visible) requestVisibleChange(network.ID, network.visible);

    if( right.hasClass('fadeInRight')) {
        right.removeClass('fadeInRight ').addClass('fadeOutRight ');
    }

    cover.fadeOut(200);
    globalNetworkID = null;

}

function bindNetworkData(network){
   // console.log(network);
    var visitButton = $("#visitAccountButton");

    if(network.visible == '1'){
        $("#publicToggle").prop("checked",true);
        toggleVisible(true);
    }else{
        $("#publicToggle").prop("checked",false);
        toggleVisible(false);

    }

    // Image

    imageExists(network.image.url,function(callback){
        if(!callback) network.image.url = +"../image/network/normal/icon_default.png";
        $("#rightDetailAccountIcon").attr("src", network.image.url);
    });

    //Title & Account
    $("#rightDetailAccountCardCredentialsNetworkURL").prop("href",network.link);
    $("#rightDetailAccountCardCredentialsNetwork").text(network.name);


    var username = network.username;


    visitButton.show();
    if(network.userlink && parseInt(network.special) === 0)visitButton.prop("href",network.userlink);
    else if(network.link) {visitButton.prop("href",network.link);}
    else {
        visitButton.removeProp("href");
        visitButton.hide();
    }


    let maxUsernameLenght = 30;
    if(isMobileSize()) maxUsernameLenght = 22;

    if(username.length > maxUsernameLenght){
        username = username.substr(0,maxUsernameLenght)+"...";
    }

    $("#rightDetailAccountCardCredentialsUsername").text(username);


    if(self && network.click && network.click.approximation) {
        $("#rightDetailClickContainer").show();
        $("#rightDetailClickContainer span").text(network.click.approximation);
    }
    else $("#rightDetailClickContainer").hide();


    if(network.description){
        $("#rightDetailInfo").text(network.description).css("opacity","1");

    }
    else  $("#rightDetailInfo").text("No description available.").css("opacity","0.5");


    printLabels(network.labels);

    visitButton.unbind().on("click",function(){
        if(!self)  {
            let body = {ID : network.ID, content : "ID column in network table"};
            addConnLog(LOG_TYPE_NETWORK_LINK_ACCESSED,userID,selectedUserID,body); }
    });

}





function requestVisibleChange(ID, visible){
    //console.log("requestVisibleChange");
    var reqP = $.ajax({
        url : doVisibleChangeURL,
        type : "POST",
        data : {
            visible : visible,
            ID : ID
           },
        headers : buildHeaders(token, userID)
    });

    reqP.done(function(response){
        response = JSON.parse(response);
       // console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("Connsuite was not able to change the public attribute.");
        }
        else if(response['response'] === kCSResponseOk) {
            var result = visible === '1' ? 'Public' : 'Private';
            showToast( findNetworkByID(ID).name+" is now "+ result , 800);
        }

    });

    reqP.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });


}

function requestDeleteNetwork(ID,custom) {
    if(custom == null || ID == null) return;
   // console.log(custom);
    var reqD = $.ajax({
        url :doNetworkDeleteURL,
        type : 'POST',
        data : {
            ID : ID,
            custom : custom,
            userID : userID
        },
        headers : buildHeaders(token, userID)
    });
    reqD.done(function(response){
        response = JSON.parse(response);
        //console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error regarding this action. Try again!",800);
        }
        else if(response['response'] === kCSResponseOk) {
            window.location.reload(true);
        }

    });

    reqD.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


/**
 * Bind on Clicks
 */



function bindRightOnClick(){

    $("#publicToggle").on("change",function(){
        toggleVisible($(this).is(":checked"));
        let connItemIndicator = $("#connItemMainIndicator-"+globalNetworkID);
        let connItemIndicatorColor = (networks[findPositionByID(globalNetworkID)].visible === '1') ? "#04befe" : "#dddddd";
        connItemIndicator.css("background",connItemIndicatorColor);
    });


    $("#rightDetailActionShare").on("click",function(){

        $('#shareModal').modal('show');

    });
    $('#shareModal').on('shown.bs.modal', function (e) {
        var link = networks[findPositionByID(globalNetworkID)].userlink;
        if(link == null || link.length == 0)  link = networks[findPositionByID(globalNetworkID)].username;
        $('#shareModalURL').text(link);


        var print =  '<div  id="modalShareOptions" data-a2a-url="'+link+'" class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-title="Hi! Check out this account I saved on connsuite : "> ' +
            '<a class="a2a_button_facebook"></a> ' +
            '<a class="a2a_button_twitter"></a> ' +
            '<a class="a2a_button_linkedin"></a> ' +
            '<a class="a2a_button_whatsapp"></a> ' +
            '<a class="a2a_button_copy_link"></a> ' +
            '<a class="a2a_button_facebook_messenger"></a> ' +
            '<a class="a2a_button_google_plus"></a> ' +
            '<a class="a2a_button_yahoo_mail"></a> ' +
            '<a class="a2a_button_email"></a> ' +
            '<a class="a2a_button_skype"></a> ' +
            '<a class="a2a_button_evernote"></a> ' +
            '<a class="a2a_button_flipboard"></a> ' +
            '<a class="a2a_button_reddit"></a> ' +
            '</div> <script async src="https://static.addtoany.com/menu/page.js"></script>';
        $("#addAnyContainer").html(print);

        var a2a_config = a2a_config || {};
        a2a_config.num_services = 12;
        a2a_config.linkurl = link;

    });



    $("#rightDetailActionDelete").on("click",function(){


        showBootstrapModal(MODAL_HEADER_TYPE_DELETE,
            "Delete this account from your Profile?",
            "Are you sure you want to delete this network from your ConnSuite profile? This action is permanent.",
            [
                {
                    "title":"Delete",
                    "callback": function(buttonID){ if(buttonID)   requestDeleteNetwork(globalNetworkID,findNetworkByID(globalNetworkID).image.custom); },
                    "color" : MODAL_BUTTON_COLOR_TYPE_DELETE
                },

            ],
            true
        );

    });








    $("#rightDetailActionEdit").on("click",function(){
       transitionPageLeave("network/edit.php?networkID="+findNetworkByID(globalNetworkID).ID , depthToRoot)
    });




}


function toggleVisible(state){


    var publicToggleTitle = $("#publicToggleTitle");
    //console.log(state);
    //console.log("ID:"+globalNetworkID );
    if(state) {
        networks[findPositionByID(globalNetworkID)].visible = '1';
        publicToggleTitle.text("Public Conn");

    } else {
        networks[findPositionByID(globalNetworkID)].visible = '0';
        publicToggleTitle.text("Request Only");
    }

}


/**
 * HELPER
 */

function findNetworkByID(ID){

    if(networks !== null && networks.length > 0) {
        for (var i = 0; i < networks.length; i++) {
            if (ID == networks[i].ID) return networks[i];
        }
    }

    return null;
}

function findPositionByID(ID){

    if(networks !== null && networks.length > 0) {
        for (var i = 0; i < networks.length; i++) {
            if (ID == networks[i].ID) return i;
        }
    }

    return 1;
}





function doNewsVisit(ID){
    var req = $.ajax({
        url : doNewsVisitURL,
        type : "POST",
        data : {newsID : ID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        //console.log(response);

    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}



function retrieveNews(){
    var req = $.ajax({
        url : retrieveNewsListURL,
        type : 'GET',
        data : {},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        if(response['response'] === kCSResponseNegative){
            $("#newsSectionHeading").hide();
            $("#newsParent").hide();

        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            for(let i = 0; i<result.length; i++) {
                let item = new News();
                item.set(result[i]);
                $("#newsParentOwl").hide();
                buildConnNews(depthToRoot, $("#newsParentOwl"), item);
            }

            $("#newsParentOwl").append('<div class="item"> ' +
                '<div class="connNewsOuterContainer" > ' +
                '<div class="viewNewsContainer" style=" justify-content: center;"> ' +
                '<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"> ' +
                '<div style="display: flex; flex-direction: column; align-items: center"> ' +
                '<a href="'+ROOT+CONNSUITE_OFFICIAL_USERNAME+'" target="_blank" id="viewNewsButton"> ' +
                '<i class="material-icons colorPrimary" style="font-size: 25pt;">&#xE5C8;</i> ' +
                '</a> ' +
                '<span id="viewNewsButtonText">More News</span>'+
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '</div>');

            $("#newsParentOwl").fadeIn(250);
            if(result.length > 0) {
                initNews();
                $(window).resize(function(){
                    if($(window).width() > windowLastWidth+40 || $(window).width() < windowLastWidth-40 ){
                        windowLastWidth = $(window).width();
                        initNews();
                    }
                });
            }


        }




    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}

let windowLastWidth = 0;

function initNews(){




    let dimen = $(window).width() > COL_SIZE_MAX_MD?  $(window).width() / 2 - 100 : $(window).width()-80 ;
    $(".connNewsContainer").css("width",dimen);
    $(".connNewsImageContainer").css("height",dimen*9/16);


    let stagePadding = $(window).width() < COL_SIZE_MAX_MD ? 100 :  200;

    $('#newsParentOwl').owlCarousel({
        stagePadding: stagePadding,
        autoWidth : true,
        loop:false,
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
                items:2
            }
        }
    });


}



/**
 * Article Modal
 */

function showDeleteArticleModal(ID,title){

    showBootstrapModal(MODAL_HEADER_TYPE_DELETE,
        "Remove this article from the list?",
        "Are you sure that you want to remove the article : '"+title + "'",
        [
            {
                "title":"Delete",
                "callback": function(buttonID){ if(buttonID) doDeleteArticle(ID); },
                "color" : MODAL_BUTTON_COLOR_TYPE_DELETE
            },

        ],
        true
    );
}

function doDeleteArticle(ID){
    var req = $.ajax({
        url : removeArticleURL,
        type : "POST",
        data : {articleID : ID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        try{
        response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative){
            showToast("Operation not possible right now. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
          window.location.reload(true);
        }
        }
        catch(err){console.log(response);}
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}

/**
 * STYLING
 */
function printAddElement(parent){
    var print = '<a class="col-md-3 col-sm-4 col-xs-6 col-6" id="connAddItemOuterContainer" href="network/add.php"> ' +
        '<div class="connAddItemContainer" > ' +
        '<div class="connAddItemMainContainer"> ' +
        '<div style="flex: 1; width: 100%; display: flex; justify-content: center; align-items: center;"> ' +
        '<img class="connAddItemIcon" src="../image/add.png"/> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '<div class="connItemCredentialsContainer" style="min-height: 50px;"> ' +
        '<div class="connAddItemDetailButton" title="Add Network"> ' +
        '<span>Add Network</span> ' +
        '</div> ' +
        '</div> ' +
        '</a>';

    parent.append(print);
}

function printAddArticleElement(parent){
    var print = '<a class="col-sm-4 col-xs-12 col-12" id="connAddArticleOuterContainer" href="article/add.php"> ' +
        '<div class="connAddArticleContainer" > ' +
        '<div class="connAddArticleMainContainer"> ' +
        '<div style="flex: 1; width: 100%; display: flex; justify-content: center; align-items: center;"> ' +
        '<img class="connAddArticleIcon" src="../image/add.png"/> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '<div class="connArticleCredentialsContainer" style="min-height: 50px;"> ' +
        '<div class="connAddArticleDetailButton"> ' +
        '<span>Add Article</span> ' +
        '</div> ' +
        '</div> ' +
        '</a>';

    parent.append(print);
}

function printLabels(labels){
    var print = '';
    var parent = $("#rightLabelContainer");
    if(labels == null || labels.length === 0) {parent.html("<p style='font-size: 9pt;color: #fff;font-weight: 400;opacity: 0.5;'>No labels available.</p>")}
    else {
        for (var i = 0; i < labels.length; i++) {
            print += '<div style="padding-right:10px; margin-bottom:15px;display: inline-block"> ' +
                '<span style="width: 100%; height: 30px; border-radius: 15px; ' +
                'color: #fff; font-size: 9pt; padding: 5px 15px; background: ' + labels[i].color + '">' + labels[i].name +
                '</span> ' +
                '</div>'
        }
        parent.html(print);
    }


}


function measureRightDetailWidth(){
    var screenWidth = $(document).width();
    if(screenWidth > 1200){
        return  ($(".customContainer").width() -30 ) /  2 - 20;
    }
    return $(document).width() / 2 - 40;

}
function bindRightDetailWidth(){
    if ($(document).width() > 970) {
        if (measureRightDetailWidth() !== null) $("#rightDetailInnerContainer").width(measureRightDetailWidth());
    }
}






/**
 Reorder
 */

let areNetworksAlreadyBuiltForOrder = false;
let sort;
function showReorderModal(){
    $('#reorderModal').modal('show');

    $('#reorderModal').on('shown.bs.modal', function (e) {

        let parent = $("#reorderNetworkList");

        if(!areNetworksAlreadyBuiltForOrder){
        for(let i = 0; i< networks.length; i++) {

            let name =  (networks[i].name).length < 15 ? networks[i].name : (networks[i].name).substr(0,12)+"...";
            let username =  (networks[i].username).length < 18 ? networks[i].username : (networks[i].username).substr(0,15)+"...";


            let print = '<div data-id="' +i+ '" class="reorderNetworkItem"> ' +
                '<div class="reorderNetworkHandle"><i class="material-icons">&#xE25D;</i></div>'+
                '<div class="reorderNetworkItemInnerContainer"> ' +
                '<div class="reorderNetworkItemMain"> ' +
                '<img src="" id="reorderNetworkItemMainImage-' + i + '" class="reorderNetworkItemMainImage"> ' +
                '</div> ' +
                '<div style="display: flex; flex-direction: column; align-items: center"> ' +
                '<span class="reorderNetworkItemTitle">' + name + '</span> ' +
                '<span class="reorderNetworkItemUsername">' + username + '</span> ' +
                '</div> ' +
                '</div> ' +
                '</div>';

            let imgURL = networks[i].image.thumbnail;

            parent.hide();
            parent.append(print);

            imageExists(imgURL, function (callback) {
                if (!callback) imgURL = +"../image/network/normal/icon_default.png";
                $("#reorderNetworkItemMainImage-" + i).prop("src", imgURL);
            });
        }
            parent.fadeIn(250);

            areNetworksAlreadyBuiltForOrder = true;

            sort = Sortable.create(document.getElementById("reorderNetworkList"), {
                animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
                draggable: ".reorderNetworkItem",// Specifies which items inside the element should be sortable
                handle: ".reorderNetworkHandle", //  Drag handle selector within list items
                onUpdate: function (evt/**Event*/){
                    let order = sort.toArray();  // the current dragged HTMLElement
                    sort.sort(order);
                   // console.log(order);
                }
            });

        }



        $("#saveOrderModalReorderButton").unbind().on("click",function(){
            let order = sort.toArray();

            let reorder = [];
            for(let x = 0; x < networks.length; x++ ){
                reorder.push({
                    'ID' : networks[order[x]].ID,
                });
            }

       //    console.log(reorder);

           doSaveReorder(reorder);
        });


    });
}


function doSaveReorder(reorder){
    showToast("Loading Changes...",10000);
    var req = $.ajax({
        url : doReorderNetworksURL,
        type : "POST",
        data : {reorder : JSON.stringify(reorder), userID : userID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        console.log(response);
        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            hideToast();
            showToast("Operation not possible right now. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            window.location.reload(true);
        }
    });
    req.fail(function(e){

        console.log("fail");
        showToast("Server error.");
    });
}

/**
 * TUTORIAL
 */


function buildTutorial(){
        let tutorial = ConnTutorial;

        let parent =  $("#tutorialParentOwl");
        parent.append(tutorialVideoComponent());
        for(let i = 0; i<tutorial.length; i++) {
            let step = new ConnStep(tutorial[i]);
            parent.hide();
            let print = step.buildHTML(stepID,i);
            parent.append(print);
        }


            parent.fadeIn(250);

            initTutorial();
            $(window).resize(function(){
                if($(window).width() > windowLastWidth+40 || $(window).width() < windowLastWidth-40 ){
                    windowLastWidth = $(window).width();
                    initTutorial();
                }
            });




}

function initTutorial(){

    let startPosition = isMobileSize() ? stepID :
        (stepID === TUTORIAL_STEP_WELCOME ? 0 :
            (stepID > TUTORIAL_STEP_COUNT-3 ? TUTORIAL_STEP_COUNT-2
                : stepID-1
            )
        );

    $('#tutorialParentOwl').owlCarousel({
        stagePadding: 10,
        autoWidth : true,
        loop:false,
        startPosition : startPosition,
        margin:0,
        nav:false,
        dots: false,
        responsive:{
            0:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


}



function tutorialVideoComponent(){
    return  '<div onclick="showTutorialVideo()" class="tutorialMiniCardContainer" style="padding-top: 10px;"> ' +
        '<div class="tutorialMiniCard tutorialMiniCardNext"> ' +
        '<div onclick="showTutorialVideo()" class="tutorialMiniIndex"> <i style="color: #aaaaaa" class="icon-conn-05 leftSideBarElementIcon"></i></div> ' +
        '<div class="tutorialMiniContent"> ' +
        '<p class="tutorialMiniTitle">Watch a short video tutorial</p> ' +
        '</div> ' +
        '</div> ' +
        '</div>'
}

function showTutorialVideo(){
    $("a.csVideo").click();
}







