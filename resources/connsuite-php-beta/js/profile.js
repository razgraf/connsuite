/**
 * Created by razvan on 22/08/2017.
 */

var globalUser = new ConnUser();
var limit = 12;
var offset = 0;

var articleLimit = 9;
var articleOffset = 0;

var selectedUserID = null;

var networks = [];
var networksCount = 0;
var globalNetworkID = null;


var businessPartner = false;

$(function(){
   transitionPageEnterLoad(depthToRoot);
   checkMainAlias(function(){
       /**
        * Users can have more than one username each. The extra usernames are called aliases.
        */
       retrieveRequestStatus(true);
       handleSideBar();
       $("#loadMoreNetworksButton").on("click",function(){
           retrieveMoreNetworks();
       });

       $("#loadMoreArticlesButton").on("click",function(){
           retrieveMoreArticles();
       });

       if(username && username === selectedUsername && $(window).width() > 756 ) $("#mainContentContainer").css("padding","0px 15px 40px 15px");
   });
});



function checkMainAlias(callback){
    let req = $.ajax({
        url : retrieveMainUsernameURL,
        type : "GET",
        data : {username : selectedUsername},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
         //console.log(response);
        if(response['response'] === kCSResponseNegative){
            window.location.href = "welcome.php"
        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            selectedUsername = result['username'];
            if(isRelease()) window.history.replaceState('profile', "ConnSuite", selectedUsername);
            callback();

        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}


function retrieveProfile(){



    var visible = username && self ? null : true;
    /**
     * If it's me, give all of them to me (visible = false/null, i do not want only the visible ones)
     */
    if(visible){ //if visible is true, so someone else is here asking only for visible networks, test business connection
        if(businessPartner) visible = null;
        /**
         * If it is not me, BUT it is a business partner, he would want them all
         */
    }


    var req = $.ajax({
        url : retrieveUserURL,
        type : "GET",
        data : {username : selectedUsername, limit: limit, visible : visible},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        try {
            response = JSON.parse(response);

            if (response['response'] === kCSResponseNegative) {
                // showToast("There was an error fetching this user. Try again!");
                window.location.href = "welcome.php"
            }
            else if (response['response'] === kCSResponseOk) {
                var result = response['result'];
                globalUser.set(result);
                networksCount = result['networksCount'];
                bindUserData();

            }
        }catch (err){console.log(response);}
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
}

function retrieveMoreNetworks(){
    $("#loadMoreNetworksButton").prop("enabled",false);
    Pace.restart();

    var visible = username && self ? null : true;
    /**
     * If it's me, give all of them to me (visible = false/null, i do not want only the visible ones)
     */
    if(visible){ //if visible is true, so someone else is here asking only for visible networks, test business connection
        if(businessPartner) visible = null;
        /**
         * If it is not me, BUT it is a business partner, he would want them all
         */
    }

    var req = $.ajax({
        url : retrieveMoreNetworksURL,
        type : "GET",
        data : {userID : selectedUserID, limit : limit, offset : offset, visible : visible},
        headers : buildHeaders(token, userID)

    });

    req.done(function(response){
        response = JSON.parse(response);
        //console.log(response);

        if(response['response'] === kCSResponseNegative){
            $("#loadMoreContainer").hide();
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];


            for(var i=0; i<result.length; i++){
                var network = new Network();
                network.set(result[i]);
                if(self && visible === null && network.visible !== '1')buildPrivateConnItem(depthToRoot, $("#connItemsParent"), network);
                else buildConnItem(depthToRoot, $("#connItemsParent"), network);

                networks.push(network)
            }
            if(result.length < limit || networks.length == networksCount) {
                $("#loadMoreContainer").fadeOut(200);
            }

            else{
                offset += limit;
            }
        }
    });
    req.fail(function(e){
        $("#loadMoreContainer").hide();
        console.log("fail");
        showToast("Server error.");
    });
    req.always(function(){
        $("#loadMoreNetworksButton").prop("enabled",true);
    })
}


function retrieveArticles(){

    var req = $.ajax({
        url : retrieveArticleListURL,
        type : 'GET',
        data : {
            userID : selectedUserID,
            limit : articleLimit,
            offset : 0
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
      //  console.log(response);
        if(response['response'] === kCSResponseNegative){
            $("#loadMoreArticlesContainer").hide();

        }
        else if(response['response'] === kCSResponseOk) {
            $("#articleParent").html("");
            var result = response['result'];

            for(var i = 0; i< result.length; i++) {
                var article = new Article();
                article.set(result[i]);
                buildConnArticle(depthToRoot, $("#articleParent"), article);
            }

            if(result.length < articleLimit) {
                $("#loadMoreArticlesContainer").hide();
            }
            else{
                articleOffset += articleLimit;
            }
        }


    });

    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });

}

function retrieveMoreArticles(){

    $("#loadMoreArticlesButton").prop("enabled",false);
    Pace.restart();

    var req = $.ajax({
        url : retrieveArticleListURL,
        type : "GET",
        data : {userID : selectedUserID, limit : articleLimit, offset : articleOffset},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
        console.log(response);
        if(response['response'] === kCSResponseNegative){
            $("#loadMoreArticlesContainer").hide();
        }
        else if(response['response'] === kCSResponseOk) {
            var result = response['result'];
            for(var i = 0; i<result.length; i++) {
                var article = new Article();
                article.set(result[i]);
                buildConnArticle(depthToRoot, $("#articleParent"), article);
            }
            if(result.length < articleLimit) {
                $("#loadMoreArticlesContainer").hide();
            }
            else{
                articleOffset += articleLimit;
            }
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        $("#loadMoreArticlesContainer").hide();

    });
    req.always(function(){
        $("#loadMoreArticlesContainer").prop("enabled",true);
    })
}

function retrieveRequestStatus(firstRequest){

    if(!username || !selectedUsername || selectedUsername == username) {
        //console.log("here");
        $("#profileRequestButton").hide();
        if(firstRequest) retrieveProfile();
        return;
    }



    var req = $.ajax({
        url : retrieveRequestStatusURL,
        type : "GET",
        data : {
            sourceName : username,
            targetName: selectedUsername },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        enableButtonClick( $("#profileRequestButton"), $("#profileRequestButton span"));
        response = JSON.parse(response);
        //console.log(response);

        if(response['response'] === kCSResponseNegative){
            if(firstRequest) retrieveProfile();
            $("#profileRequestButton").on("click",function(){
               doBusinessRequest();
            });

        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            if(result['status'] == kCSBusinessRequestAccepted){
                $("#profileRequestButton").text(selectedUsername+" is a Business Connection").removeClass().addClass('profileRequestButtonUnavailable');
                businessPartner = true;
            }
            else if(result['status'] == kCSBusinessRequestPending){
                $("#profileRequestButton").text("Business Request Sent").removeClass().addClass('profileRequestButtonUnavailable');
            }
            //console.log(businessPartner);
            if(firstRequest) retrieveProfile();

        }
    });
    req.fail(function(e){
        window.location.href = "p/dashboard.php";
        console.log("fail");
        showToast("Server error.");
        $("#profileRequestButton").hide();
    });


}

function doBusinessRequest(){

    disableButtonClick( $("#profileRequestButton"), $("#profileRequestButton span"));

    if(token === null || userID === null) return;
    var req = $.ajax({
        url : doBusinessRequestURL,
        type : "POST",
        data : {
            sourceID : userID,
            targetID: selectedUserID },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){

        response = JSON.parse(response);
       // console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("Functionality currently unavailable");
            enableButtonClick( $("#profileRequestButton"), $("#profileRequestButton span"));

        }
        else if(response['response'] === kCSResponseOk) {
            retrieveRequestStatus(false);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        enableButtonClick( $("#profileRequestButton"), $("#profileRequestButton span"));
    });
}

function bindUserData(){



    transitionPageEnterLoadEnd();

    selectedUserID = globalUser.ID;
    retrieveArticles();
    $("#profileName").text(globalUser.name);
    $("#profileTagline").text(globalUser.tagline);
    $("#profileDescription").text(globalUser.description);
    $("#accountUserName").val(globalUser.name);


    document.title = globalUser.name + " | ConnSuite";


    if(globalUser.networks == null || globalUser.networks.length == 0){
        $("#loadMoreContainer").hide();

    }else {
        $("#connItemsParent").html("");
        for (var i = 0; i < globalUser.networks.length; i++) {

            let logClick = self? false : {networkID:globalUser.networks[i].ID,userID:userID,selectedUserID:selectedUserID};

            if(globalUser.networks[i].visible !== '1') {
                //if the network is not visible to everyone
                if (self) buildPrivateConnItem(depthToRoot, $("#connItemsParent"), globalUser.networks[i]); //if myself, print it but tell me it is private
                else { // it is not me, so i take the case of the FAKE business partner (business request is not present nor accepted)
                    if (!businessPartner) { } //do not print
                    else buildConnItem(depthToRoot, $("#connItemsParent"), globalUser.networks[i],logClick); // TRUE business partner
                    }
            }
            else buildConnItem(depthToRoot, $("#connItemsParent"), globalUser.networks[i],logClick);


            networks.push(globalUser.networks[i])
            if(!self) $("#connItemMainIndicator-"+globalUser.networks[i].ID).hide();
        }
    }
    if(globalUser.networks.length < limit || networks.length == networksCount){
        $("#loadMoreContainer").fadeOut(200);
    }

    $("#headingStory").text(globalUser.firstname + "\'s Story");

    $("#profilePicture").hide();
    imageExists(globalUser.imageURL,function(callback){
        if(!callback) globalUser.imageURL = "image/network/normal/icon_default.png";
        $("#profilePicture").attr("src", globalUser.imageURL).fadeIn(400);
    });


}




/**
 Right

 */


function viewNetworkDetails(ID){
    if(!self) $("#rightDetailToggleOuterContainer").hide();
    globalNetworkID = ID;
    bindRightDetailWidth();
    var right =  $( '#rightDetailContainer' );
    var cover = $("#rightDetailPageCover");

    var network = findNetworkByID(ID);
    if(network === null) return;

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
    let ID = globalNetworkID;
    var right =  $( '#rightDetailContainer' );
    var cover = $("#rightDetailPageCover");
    $('body').attr("disabled",true);


    if( right.hasClass('fadeInRight')) {
        right.removeClass('fadeInRight ').addClass('fadeOutRight ');
    }

    cover.fadeOut(200);
    globalNetworkID = null;

}

function bindNetworkData(network){
    var visitButton = $("#visitAccountButton");


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
    if(network.userlink) visitButton.prop("href",network.userlink);
    else if(network.link) {visitButton.prop("href",network.link);}
    else {
        visitButton.removeProp("href");
        visitButton.hide();
    }


    let maxUsernameLength = 30;
    if(isMobileSize()) maxUsernameLength = 22;

    if(username.length > maxUsernameLength){
        username = username.substr(0,maxUsernameLength)+"...";
    }

    if(self && network.click) $("#rightDetailClickContainer span").text(network.click.approximation);
    else $("#rightDetailClickContainer").hide();

    $("#rightDetailAccountCardCredentialsUsername").text(username);



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


function bindRightOnClick(){



    $("#rightDetailActionShare").on("click",function(){

        $('#shareModal').modal('show');

    });
    $('#shareModal').on('shown.bs.modal', function (e) {
        var link = findNetworkByID(globalNetworkID).userlink;
        if(link == null || link.length == 0) link =  findNetworkByID(globalNetworkID).username;
        $('#shareModalURL').text(link);

        var print =  '<div  id="modalShareOptions" data-a2a-url="'+link+'" class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-title="Hi! Check out this account I saved on ConnSuite : "> ' +
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
    return $(window).width() / 2 - 40;

}
function bindRightDetailWidth(){
    if ($(window).width() > 970) {
        if (measureRightDetailWidth() !== null) $("#rightDetailInnerContainer").width(measureRightDetailWidth());
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


function handleSideBar(){
    if($(window).width() > 1000){
        $('#leftSideBarInnerContainer').css("position","relative");
        $(window).scroll(function(e){
            var $el = $('#leftSideBarInnerContainer');
            var isPositionFixed = ($el.css('position') == 'fixed');
            if ($(this).scrollTop() > $("#userHeaderContainer").height() && !isPositionFixed){
                $('#leftSideBarInnerContainer').css({'position': 'fixed', 'top': '85px'});
            }
            if ($(this).scrollTop() < $("#userHeaderContainer").height()  && isPositionFixed)
            {
                $('#leftSideBarInnerContainer').css({'position': 'static', 'top': '85px'});
            }
        });
    }
}