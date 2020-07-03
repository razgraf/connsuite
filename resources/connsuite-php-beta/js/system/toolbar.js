/**
 * Created by razvan on 14/08/2017.
 */



function loadToolbar(depthToRoot, username, page, profilePicture, extra) {
    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";
    $('head').append('<link rel="stylesheet" href="'+prePath+'css/system/toolbar.css" type="text/css">');
    var print = '  <div id="desktopToolbar" class="customContainer container-fluid row" style="padding-right: 0; padding-left: 0" > ' +
        '<div class="col-sm-1 col-xs-12" style="height: 100%;padding-left: 12px;"> ' +
        '<a  href="'+prePath+'p/dashboard.php"  style="display: flex; height: 100%; align-items: center;"> ' +
        '<img src="'+prePath+'image/connsuite_icon_inverted_rounded.png" id="toolbarLogo"> ' +
        '</a> ' +
        '</div> ' +
        '<div class="col-sm-6 col-xs-12" style="height: 100%;"> ' +
        '<div class="searchContainer"> ' +
        '<div style="display: flex;flex-direction: column"> ' +
        '<div  style="display: flex; flex-direction: row"> ' +
        '<div style="position: relative;"><input name="toolbarSearchInput" id="toolbarSearchInput" class="searchInput" placeholder="Search for a company or a person" style="flex: 1;" > ' +
        '<div class="toolbarSearchResultsContainer">' +
            //here come the search results
        '</div>' +
        '</div>' +
        '<div style="width: inherit"> ' +
        '<div id="searchButtonDesktop" class="searchButton"> ' +
        '<img src="'+prePath+'image/ic_search_white_48px.svg" style="width: 100%; height: 100%;"> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '<div style="width: 100%; margin-top: 2px; height: 1px;background: #ffffff"></div> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '<div class="col-sm-5 col-xs-12" style="height: 100%;" > ' +
        '<div id="accountOuterContainer"> ' +
        '<div class="toolbarNotificationsContainer">' +
        '<a title="Notifications" href="'+prePath+'p/notifications.php">' +
        '<div style="position: relative">' +
        '<div class="toolbarNotificationsBadge"><span></span></div>' +
        '<div class="toolbarNotificationsBubble"><i style="font-size: 15pt;" class="material-icons">&#xE7F4;</i></div>' +
        '</div>' +
        '</a>' +
        '</div>'+
        '<div id="accountContainer"  class="dropDownContainer" > ' +
        '<div id="accountUserPictureContainer"><img id="accountUserPicture"/> </div>' +
        '<div  style="height: 100%; display: flex; flex-direction: row; align-items: center;width: 100%;"> ' +
        '<div style="height: 100%; display: flex;flex-direction: column; justify-content: center ;padding-left: 10px;"> ' +
        '<span class="colorPrimary" style="font-size: 9pt; line-height: 1.3; font-weight: 500">ConnSuite</span> ' +
        '<span id="accountUserName">'+username+'</span> ' +
        '</div> ' +
        '<div  style="height: 100%;  width:100%;display: flex; justify-content: flex-end;align-items: center;"> ' +
        '<i class="material-icons" id="accountArrow">&#xE5C5;</i> ' +
        '<div class="dropDownContent"> ' +
        '<a id="toolbarButtonPublicProfile"><span>Public Profile</span></a>' +
        '<a id="toolbarButtonEditProfile" href="#"><span>Edit Profile</span></a>' +
        '<a id="toolbarButtonIntro"><span>About</span></a>' +
        '<a id="toolbarButtonBadge"><span>Badge</span></a>' +
        '<a id="toolbarButtonFAQ"><span>FAQ</span></a>' +
        '<a href="'+prePath+'session/log-out.php"><span>Log Out</span></a>' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>' +
        '</div> ' +
        '</div> ' +
        '</div>';

    print+= buildMobileToolbar(depthToRoot,username,page,extra);

    var toolbar = $("#toolbar");
    toolbar.hide();
    toolbar.html(print);
    $('<div id="toolbarBeneath"><div>').insertAfter(toolbar);
    /**
     * We insert a 'dumb toolbar' beneath the real one to help with
     * 1. Loading and styling
     * 2. Pushing down the rest of the content
     */
    toolbar.fadeIn();
    if(page!=null)
    switch (page){
        case PAGE_DASHBOARD : $("#PAGE_DASHBOARD_MOBILE").removeClass("mobileIconElement").addClass("mobileIconElementChosen");break;
        case PAGE_PUBLIC_PROFILE : $("#PAGE_PUBLIC_PROFILE_MOBILE").removeClass("mobileIconElement").addClass("mobileIconElementChosen");break;
        case PAGE_BUSINESS_BOOK : $("#PAGE_BUSINESS_BOOK_MOBILE").removeClass("mobileIconElement").addClass("mobileIconElementChosen");break;

    }
    headerUserButtons(prePath,extra);
    doToolbarSearch(prePath,$("#toolbarSearchInput"));

    imageExists(profilePicture,function(callback){
        if(!callback) profilePicture = prePath+"image/no_people_o.png";
        $("#accountUserPicture").attr("src", profilePicture);
    });

    doToolbarSearch(prePath,$(".searchInputMobile"));

    $("#searchButtonDesktop").on("click",function(){
        transitionPageLeave(prePath+"p/search.php?q="+$("#toolbarSearchInput").val().trim(),depthToRoot);
    });

    $("#searchButtonMobile").on("click",function(){
        transitionPageLeave(prePath+"p/search.php?q="+$(".searchInputMobile").val().trim(),depthToRoot);
    });
}




/**
 * loadSecondaryToolbar
 */

function loadSecondaryToolbar(depthToRoot, username, activityName, profilePicture,extra) {
   // console.log(extra);
    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";
    $('head').append('<link rel="stylesheet" href="'+prePath+'css/system/toolbar.css" type="text/css">');
    var print = '  <div  id="desktopToolbar" class="customContainer container-fluid row" style="padding-right: 0; padding-left: 0" > ' +
        '<div class="col-sm-1 col-xs-12" style="height: 100%;padding-left: 12px;"> ' +
        '<a href="'+prePath+'p/dashboard.php" style="display: flex; height: 100%; align-items: center;"> ' +
        '<img src="'+prePath+'image/connsuite_icon_inverted_rounded.png" id="toolbarLogo"> ' +
        '</a> ' +
        '</div> ' +
        '<div class="col-sm-6 col-xs-12" style="height: 100%;"> ' +
        '<div class="secondaryToolbarTitleContainer"><i class="material-icons">&#xE315;</i> <p class="secondaryToolbarTitle" style=" display: flex;align-items: center;justify-content: center;">'+activityName+'</p>' +
        '</div>'+
        '</div> ' +
        '<div class="col-sm-5 col-xs-12" style="height: 100%;" > ' +
        '<div id="accountOuterContainer"> ' +
        '<a href="'+prePath+'welcome.php" id="connectSpecialToolbarButton"> ' +
        '<span>Connect with connsuite</span> ' +
        '</a>'+
        '<div class="toolbarNotificationsContainer">' +
        '<a title="Notifications" href="'+prePath+'p/notifications.php">' +
        '<div style="position: relative">' +
        '<div class="toolbarNotificationsBadge"><span>1</span></div>' +
        '<div class="toolbarNotificationsBubble"><i style="font-size: 15pt;" class="material-icons">&#xE7F4;</i></div>' +
        '</div>' +
        '</a>' +
        '</div>'+
        '<div id="accountContainer"  class="dropDownContainer" > ' +
        '<div id="accountUserPictureContainer"><img id="accountUserPicture"/></div> ' +
        '<div  style="height: 100%; display: flex; flex-direction: row; align-items: center;width: 100%;"> ' +
        '<div style="height: 100%; display: flex;flex-direction: column; justify-content: center ;padding-left: 10px;"> ' +
        '<span class="colorPrimary" style="font-size: 9pt; line-height: 1.3; font-weight: 500">ConnSuite</span> ' +
        '<span id="accountUserName">'+username+'</span> ' +
        '</div> ' +
        '<div  style="height: 100%;  width:100%;display: flex; justify-content: flex-end;align-items: center;"> ' +
        '<i class="material-icons" id="accountArrow">&#xE5C5;</i> ' +
        '<div class="dropDownContent"> ' +
        '<a id="toolbarButtonPublicProfile"><span>Public Profile</span></a>' +
        '<a id="toolbarButtonEditProfile"><span>Edit Profile</span></a>' +
        '<a id="toolbarButtonIntro"><span>About</span></a>' +
        '<a id="toolbarButtonBadge"><span>Badge</span></a>' +
        '<a id="toolbarButtonFAQ"><span>FAQ</span></a>' +
        '<a href="'+prePath+'session/log-out.php"><span>Log Out</span></a>' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>' +
        '</div> ' +
        '</div> ' +
        '</div>';

    var toolbar = $("#toolbar");
    toolbar.hide();

    print+=buildSecondaryMobileToolbar(depthToRoot,username,activityName,extra);
    toolbar.html(print);
    $('<div id="toolbarBeneath"><div>').insertAfter(toolbar);
    /**
     * We insert a 'dumb toolbar' beneath the real one to help with
     * 1. Loading and styling
     * 2. Pushing down the rest of the content
     */

    $("#connectSpecialToolbarButton").hide();
    $("#connectSpecialToolbarButtonMobile").hide();
    if(extra && extra!==null && extra!=="null") {
        headerUserButtons(prePath,extra);
    }

    else{
            $(".toolbarNotificationsContainer").hide();
            $(".dropDownContent").hide();
            $("#accountArrow").hide();
            $('#secondaryMobileMenu').hide();
            $("#connectSpecialToolbarButton").show();
            $("#connectSpecialToolbarButtonMobile").show();
    }
    toolbar.fadeIn();
    imageExists(profilePicture,function(callback){
        if(!callback) profilePicture = prePath+"image/no_people_o.png";
        $("#accountUserPicture").attr("src", profilePicture);
    });
    doToolbarSearch(prePath,$(".searchInputMobile"));

    $("#searchButtonMobile").on("click",function(){
        transitionPageLeave(prePath+"p/search.php?q="+$(".searchInputMobile").val().trim(),depthToRoot);
    });

    $("#secondaryMobileMenu").on("click",function(){});


}

/**
 * Mobile Toolbar
 */


function buildMobileToolbar(depthToRoot, username, page,extra) {
    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";
    var print =
        ' <nav id="mobileToolbar" role = "navigation" style="height: 100%; width: 100%; margin-bottom: 0;">' +

        ' <div class="customContainer container-fluid row" style="display: flex; margin: 0; flex-direction: row; width: 100%;" > ' +
        '<div  style="height: 100%; flex: 1;"> ' +
        '<div style="width: 100%; height: 100%; display: flex; flex-direction: row; align-items: center;">'+
        '<div class="mobileIconElementContainer"> ' +
        '<div class="mobileIconElement" id="PAGE_DASHBOARD_MOBILE" ><i class="icon-conn-06 mobileIconElementIcon"></i></div>' +
        '<span class="mobileIconElementTitle">Dashboard</span>'+
        '</div>'+

        '<div class="mobileIconElementContainer"> ' +
        '<div class="mobileIconElement" id="PAGE_PUBLIC_PROFILE_MOBILE" ><i class="icon-conn-01 mobileIconElementIcon"></i></div>' +
        '<span class="mobileIconElementTitle">Public Profile</span>'+
        '</div>'+

        '<div class="mobileIconElementContainer"> ' +
        '<div class="mobileIconElement" id="PAGE_BUSINESS_BOOK_MOBILE" ><i class="icon-conn-08 mobileIconElementIcon"></i></div>' +
        '<span class="mobileIconElementTitle">Business Book</span>'+
        '</div>'+


        '<div class="mobileIconElementContainer" data-toggle = "collapse" data-target = "#example-navbar-collapse" > ' +
        '<div class="mobileIconElement" id="PAGE_MENU_MOBILE" ><i class="material-icons mobileIconElementIcon">&#xE5D2;</i></div>' +
        '<span class="mobileIconElementTitle">Menu</span>'+
        '</div>'+

        '</div>' +
        '</div> ' +

        '</div>'+
        '<div style="box-shadow: 0 0 10px 0 rgba(0,0,0,.08);background: #ffffff;padding-right: 0px; padding-left: 0px;" class = "collapse navbar-collapse" id = "example-navbar-collapse">' +




        '<div class="mobileMenuOption" style="padding: 10px;"><div class="searchContainerMobile" > ' +
        '<div style=" flex: 1; display: flex;flex-direction: column"> ' +
        '<div  style="display: flex; flex-direction: row"> ' +
        '<div style="flex: 1; position: relative">' +
        '<input class="searchInputMobile" placeholder="Search " style="flex: 1;" > ' +
        '<div class="toolbarSearchResultsContainer">' +
        //here come the search results
        '</div></div>' +
        '<div style="width: inherit"> ' +
        '<div id="searchButtonMobile" class="searchButton"> ' +
        '<img src="'+prePath+'image/ic_search_white_48px.svg" style="width: 100%; height: 100%;"> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>' +
        '</div>'+

        '<div style="width: 100%; height: 1px; background: #eeeeee"></div>'+
        '<a id="toolbarButtonNotificationsM" ><p  class="mobileMenuOption" style="background: #fff;"><span>Notifications</span></p></a>' +
        '<a id="toolbarButtonPublicProfileM" ><p  class="mobileMenuOption" style="background: #fff;"><span>Public Profile</span></p></a>' +
        '<a id="toolbarButtonEditProfileM"><p  class="mobileMenuOption" style="background: #fff;"><span>Edit Profile</span></p></a>' +
        '<a id="toolbarButtonIntroM"><p  class="mobileMenuOption" style="background: #fff;"><span>About</span></p></a>' +
        '<a id="toolbarButtonBadgeM"><p  class="mobileMenuOption" style="background: #fff;"><span>Badge</span></p></a>' +
        '<a id="toolbarButtonFAQM"><p  class="mobileMenuOption" style="background: #fff;"><span>FAQ</span></p></a>' +
        '<a href = "'+prePath+'session/log-out.php" ><p  class="mobileMenuOption" style="background: #fff;"><span>Log Out</span></p></a>' +
        '</div>'+
        '</nav>';

    return print;
}




function buildSecondaryMobileToolbar(depthToRoot, username, activityName,extra) {
    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";
    var print =
        ' <nav id="mobileToolbar" role = "navigation" style="height: 100%; margin-bottom: 0;width: 100%;">' +

        ' <div class="customContainer container-fluid row" style="display: flex; margin: 0; flex-direction: row; width: 100%;" > ' +
        '<div  style="height: 100%; flex: 1;display: flex; flex-direction: row;"> ' +
        '<div style="flex:3; height: 100%; display: flex; flex-direction: row; align-items: center;">'+
        '<div class="secondaryToolbarTitleContainer"><i  class="material-icons secondaryToolbarBackButton" onclick="mobileToolbarGoBack()">&#xE5C4;</i> <p class="secondaryToolbarTitle" style="padding-left: 0;">'+activityName.substr(0,80)+'</p></div>' +
        '</div>'+
        '<div style=" height: 100%; flex: 1; display: flex; flex-direction: row; align-items: center;">'+
        '<a href="'+prePath+'welcome.php" id="connectSpecialToolbarButtonMobile">' +
        '<span>Connect</span> ' +
        '</a>'+
        '<div id="secondaryMobileMenu" class="mobileIconElementContainer" style="align-items: flex-end; padding: 10px;" data-toggle = "collapse" data-target = "#example-navbar-collapse" > ' +
        '<div  id="PAGE_MENU_MOBILE" ><i class="material-icons" style="font-size: 17pt; color: #fff;">&#xE5D2;</i></div>' +
        '</div>'+

        '</div>' +

        '</div> ' +

        '</div>'+
        '<div style="box-shadow: 0 0 10px 0 rgba(0,0,0,.08);background: #ffffff;padding-right: 0px; padding-left: 0px;" class = "collapse navbar-collapse" id = "example-navbar-collapse">' +




        '<div class="mobileMenuOption" style="padding: 10px;"><div class="searchContainerMobile" > ' +
        '<div style=" flex: 1; display: flex;flex-direction: column"> ' +
        '<div  style="display: flex; flex-direction: row"> ' +
        '<div style="flex: 1; position: relative">' +
        '<input class="searchInputMobile" placeholder="Search " style="flex: 1;" > ' +
        '<div class="toolbarSearchResultsContainer">' +
        //here come the search results
        '</div></div>' +
        '<div style="width: inherit"> ' +
        '<div id="searchButtonMobile"   class="searchButton"> ' +
        '<img src="'+prePath+'image/ic_search_white_48px.svg" style="width: 100%; height: 100%;"> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>' +
        '</div>'+

        '<div style="width: 100%; height: 1px; background: #eeeeee"></div>'+
        '<a href = "'+prePath+'p/dashboard.php" ><p  class="mobileMenuOption" style="background: #fff;"><span>Dashboard</span></p></a>' +
        '<a id="toolbarButtonPublicProfileM" ><p  class="mobileMenuOption" style="background: #fff;"><span>Public Profile</span></p></a>' +
        '<a id="toolbarButtonBusinessBookM"  ><p  class="mobileMenuOption" style="background: #fff;"><span>Business Book</span></p></a>' +
        '<div style="width: 100%; height: 1px; background: #eeeeee"></div>'+
        '<a id="toolbarButtonNotificationsM" ><p  class="mobileMenuOption" style="background: #fff;"><span>Notifications</span></p></a>' +
        '<a id="toolbarButtonEditProfileM" ><p  class="mobileMenuOption" style="background: #fff;"><span>Edit Profile</span></p></a>' +
        '<a id="toolbarButtonIntroM"><p  class="mobileMenuOption" style="background: #fff;"><span>About</span></p></a>' +
        '<a id="toolbarButtonBadgeM"><p  class="mobileMenuOption" style="background: #fff;"><span>Badge</span></p></a>' +
        '<a id="toolbarButtonFAQM"><p  class="mobileMenuOption" style="background: #fff;"><span>FAQ</span></p></a>' +
        '<a href = "'+prePath+'session/log-out.php" ><p  class="mobileMenuOption" style="background: #fff;"><span>Log Out</span></p></a>' +
        '</div>'+
        '</nav>';

    return print;
}

function mobileToolbarGoBack(){
    try{
    window.history.back();
    setTimeout(function(){
        window.location.href = ROOT+'p/dashboard.php';
    }, 500);
    }catch(err){
        setTimeout(function(){
            window.location.href = ROOT+'p/dashboard.php';
        }, 600);
    }
}

function headerUserButtons(prePath,extra){
    /**
     * Bind actions to buttons
     *
     * ------------------------
     * Account Container
     */

    var dropDownContent = $(".dropDownContent");
    var accountArrow  =  $("#accountArrow");

    accountArrow.on("click",function(){
        if( dropDownContent.css('display') !== 'block') {
            $(this).css('color','#04befe');
            dropDownContent.css("display", "block");
        }
        else  {
            dropDownContent.css("display", "none");
            $(this).css('color','#dddddd');
        }
    });
    $(document).on("mouseup", function(e)
    {

        if (!accountArrow.is(e.target) && accountArrow.has(e.target).length === 0)
        {
            if( dropDownContent.css('display') === 'block') {
                dropDownContent.css("display", "none");
                accountArrow.css('color','#dddddd');
            }
        }
    });
    accountArrow.on('mouseover', function(){
        $("#accountContainer").css("box-shadow","1px 1px 10px 3px rgba(0,0,0,.12)")
    }).on('mouseout', function(){
        $("#accountContainer").css("box-shadow","1px 1px 5px 0 rgba(0,0,0,.1)")
    });
    /**
     * ------------------------
     */

    if(extra && extra.hasOwnProperty('notificationCount')){
        var count = extra['notificationCount'];
        if(count == '0'){
            $(".toolbarNotificationsBubble").css("color","#eeeeee");
            $(".toolbarNotificationsBubble").css("background-color","#ffffff");
        }
        else{
            $(".toolbarNotificationsBadge span").text(count);
            $(".toolbarNotificationsBadge").fadeIn(100).css("display","flex");
            $(".toolbarNotificationsBubble").css("background-color","#F44336");
            $("#toolbarButtonNotificationsM p span").text("Notifications ( "+count+" New )")
        }
    }


    /**
     * ------------------------
     */



    onToolbarMenuClick( $("#toolbarButtonPublicProfile"),prePath+extra['username'],true);
    onToolbarMenuClick( $("#toolbarButtonEditProfile"),prePath+"p/profile/edit.php",false);
    onToolbarMenuClick( $("#toolbarButtonIntro"),prePath+"intro/",true);
    onToolbarMenuClick( $("#toolbarButtonBadge"),prePath+"intro/badge.php",true);
    onToolbarMenuClick( $("#toolbarButtonFAQ"),prePath+"intro/ask.php",true);
    onToolbarMenuClick( $("#toolbarButtonPublicProfileM"),prePath+extra['username'],true);
    onToolbarMenuClick( $("#toolbarButtonEditProfileM"),prePath+"p/profile/edit.php",false);
    onToolbarMenuClick( $("#toolbarButtonIntroM"),prePath+"intro/",true);
    onToolbarMenuClick( $("#toolbarButtonBadgeM"),prePath+"intro/badge.php",true);
    onToolbarMenuClick( $("#toolbarButtonFAQM"),prePath+"intro/ask.php",true);
    onToolbarMenuClick( $("#toolbarButtonNotificationsM"),prePath+"p/notifications.php",true);
    onToolbarMenuClick( $("#toolbarButtonBusinessBookM"),prePath+"p/business/book.php",true);


    $("#PAGE_DASHBOARD_MOBILE").on("click",function(){
        transitionPageLeave(prePath+"p/dashboard.php");
    });

    $("#PAGE_PUBLIC_PROFILE_MOBILE").on("click",function(){
        transitionPageLeave(prePath+extra['username']);
    });

    $("#PAGE_BUSINESS_BOOK_MOBILE").on("click",function(){
        transitionPageLeave(prePath+"p/business/book.php");
    });
}

function onToolbarMenuClick (element,link, blank ) {

    if(blank)  element.prop("href",link);
    else {
        element.prop("href","#");
        element.on("click", function (e) {
            transitionPageLeave(link);
        });
    }
}


function doToolbarSearch(prePath, element){
    element.on("input",function(){
        var query = $(this).val();
        if(query.trim().length > 0){

            var req = $.ajax({
                url : ROOT+"core/common/search-user.php",
                type : "GET",
                data : {
                    query: query
                },
                headers : buildHeaders(token,userID)
            });

            req.done(function(response){

                response = JSON.parse(response);
               // console.log(response);

                if(response['response'] === kCSResponseNegative){
                    $(".toolbarSearchResultsContainer").html("");
                    let empty = '<div class="toolbarSearchResult">' +
                        '<div class="toolbarSearchResultTextContainer">' +
                        '<span style="padding-left: 10px; font-size: 0.8em">The one you\'re looking for is not a ConnSuite Star yet. Maybe you can tell them about it!</span>' +
                        '</div>' +
                        '</div>';

                    $(".toolbarSearchResultsContainer").fadeIn(100);
                    $(".toolbarSearchResultsContainer").append(empty);
                }
                else if(response['response'] === kCSResponseOk) {

                    var result = response['result'];
                    $(".toolbarSearchResultsContainer").html("");
                    for (var i = 0; i < result.length; i++) {
                    var user = null;
                    user = new ConnUser();
                    user.set(result[i]);
                    var text = user.name + " ( "+ user.username + " )";
                    let reference = isRelease() ? prePath+user.username : prePath+"?username="+user.username;
                    var element = '<a href="'+reference+'" class="toolbarSearchResult">' +
                        '<img src="'+user.thumbnailURL+'" class="toolbarSearchResultPicture" id="toolbarSearchResultPicture-'+user.ID+'">' +
                        '<div class="toolbarSearchResultTextContainer">' +
                        '<span>'+text+'</span>' +
                        '</div>' +
                        '</a>';

                    $(".toolbarSearchResultsContainer").fadeIn(100);
                    $(".toolbarSearchResultsContainer").append(element);

                    imageExists(user.thumbnailURL,function(callback){
                        if(!callback) $("#toolbarSearchResultPicture-"+user.ID).attr("src", prePath+"image/no_people_o.png");
                        $("#toolbarSearchResultPicture-"+user.ID).attr("src", user.thumbnailURL);
                    });
                }

                }
            });
            req.fail(function(e){
                console.log("fail");
                showToast("Server error.");
                $(".toolbarSearchResultsContainer").hide();
            });


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


    $(".searchButton").click()

}

