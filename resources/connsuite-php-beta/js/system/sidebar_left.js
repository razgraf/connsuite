/**
 * Created by razvan on 14/08/2017.
 */

function loadLeftSideBar(depthToRoot, page,extra){

    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";
    $('head').append('<link rel="stylesheet" href="'+prePath+'css/system/sidebar_left.css" type="text/css">');

    let userLink = isRelease() ? prePath+extra['username'] : prePath+"?username="+extra['username'];

    var print = '<div id="leftSideBarInnerContainer"> <div class="leftSideBarElementContainer">' +
        '<a href="'+prePath+'p/dashboard.php" class="leftSideBarElement labelThis" id="PAGE_DASHBOARD"> ' +
        '<div style="left: 10px;"><span>Dashboard </span></div>' +
        '<i class="icon-conn-06 leftSideBarElementIcon"></i> ' +
        '</a>' +
        '</div>' +
        '<div class="leftSideBarElementContainer"> ' +
        '<a href="'+userLink+'" class="leftSideBarElement labelThis" id="PAGE_PUBLIC_PROFILE" > ' +
        '<div style="left: 10px;"><span>Public<br>Profile</span></div> ' +
        '<i class="icon-conn-01 leftSideBarElementIcon"></i> ' +
        '</a>' +
        '</div>' +
        '<div class="leftSideBarElementContainer"> ' +
        '<a href="'+prePath+'p/business/book.php" class="leftSideBarElement labelThis"  id="PAGE_BUSINESS_BOOK"> ' +
        '<div style="left: 10px;"><span>Business<br>Book</span></div> ' +
        '<i class="icon-conn-08 leftSideBarElementIcon"></i> ' +
        '</a>'+
        '</div>'+
        '</div>';

    var sidebar = $("#leftSideBar");
    sidebar.hide();
    sidebar.html(print);

    switch (page){
        case PAGE_DASHBOARD : $("#PAGE_DASHBOARD").removeClass("leftSideBarElement").addClass("leftSideBarElementChosen"); break;
        case PAGE_PUBLIC_PROFILE : $("#PAGE_PUBLIC_PROFILE").removeClass("leftSideBarElement").addClass("leftSideBarElementChosen");break;
        case PAGE_BUSINESS_BOOK : $("#PAGE_BUSINESS_BOOK").removeClass("leftSideBarElement").addClass("leftSideBarElementChosen");break;
        case PAGE_STAR : $("#PAGE_STAR").removeClass("leftSideBarElement").addClass("leftSideBarElementChosen");break;

    }

   // $("#PAGE_DASHBOARD").on("click",function(){ transitionPageLeave(prePath+"p/dashboard.php", depthToRoot) });
    //$("#PAGE_PUBLIC_PROFILE").on("click",function(){ transitionPageLeave(prePath+extra['username'], depthToRoot) });
   // $("#PAGE_BUSINESS_BOOK").on("click",function(){ transitionPageLeave(prePath+"p/business/book.php", depthToRoot) });
    sidebar.fadeIn().removeAttr( 'style' );

}


