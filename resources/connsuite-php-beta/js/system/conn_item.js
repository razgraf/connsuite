/**
 * Created by razvan on 15/08/2017.
 */

/**
 *
 * @param depthToRoot
 * @param parent
 * @param {Network} network
 * @param log
 */
function buildConnItem(depthToRoot,parent,network, log = false){

    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";

   var publicIndicatorColor = network.visible === '1' ? "#04befe" : "#dddddd";

   if(network.special === '0') network.username = "@" + network.username;


    var print = '<div class="col-md-3 col-sm-4 col-xs-6 col-6 connItemOuterContainer" > ' +
        '<div class="connItemContainer"   onclick="showMobileDetail(\''+network.ID+'\')"> ' +
        '<div class="connItemMainContainer"> ' +
        '<div class="connItemMainIndicatorContainer"> ' +
        '<div id="connItemMainIndicator-'+network.ID+'" class="connItemMainIndicator" style="background: '+publicIndicatorColor+'"> ' +
        '</div> ' +
        '</div> ' +
        '<div class="connItemMainNetworkContainer"> ' +
        '<img  id="connItemMainNetworkIcon-'+network.ID+'"   src="'+network.image.url+'" /> ' +
        '</div> ' +
        '<div class="connItemMainOptionsContainer" > ' +
        '<span class="connItemMainOptionsButton">View Details</span> ' +
        '</div> ' +
        '</div> ' +
        '<div class="connItemDetailContainer" id="connItemDetailContainer-'+network.ID+'"> ' +
        '<div class="connItemDetailInnerContainer"> ' +
        ' <div style="width: 96%;margin: 0 auto 15px;display: flex; align-items: center" id="connItemDetailLinkButtonContainer-'+network.ID+'"> ' +
        '<a id="connItemDetailLinkButton-'+network.ID+'" target="_blank"  href="'+network.userlink+'" class="connItemDetailLinkButton" title="Go to link" > ' +
        '<i style="font-size: 14pt;" class="material-icons">&#xE157;</i> ' +
        '</a> ' +
        '<span class="connItemDetailLinkButtonText">Visit this account</span> ' +
        '</div> ' +
        '<div onclick="viewNetworkDetails(\''+network.ID+'\')" class="connItemDetailButton" title="View Account Details"> ' +
        '<span >View Details</span> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>' +
        '<div class="connItemCredentialsContainer"> ' +
        '<a target="_blank"  href="'+network.link+'"><p class="connItemCredentialsNetwork">'+network.name+'</p></a> ' +
        '<p class="connItemCredentialsUsername">'+network.username+'</p> ' +
        '</div>' +
        '</div>';





    parent = $("#connItemsParent");
    parent.append(print);

    if(network.special === '1'){$("#connItemDetailLinkButtonContainer-"+network.ID).remove();}
    imageExists(network.image.url,function(callback){
        if(!callback) network.image.url = prePath+"image/network/normal/icon_default.png";
        $("#connItemMainNetworkIcon-"+network.ID).attr("src", network.image.url);
    });

    try{

    if(log){
            $("#connItemDetailLinkButton-"+network.ID).on("click",function(){
                let body = {ID : log.networkID, content : "ID column in network table"};
                addConnLog(LOG_TYPE_NETWORK_LINK_ACCESSED,log.userID,log.selectedUserID,body);
            });

    }
    }catch(err){console.log(err);}
}

function buildPrivateConnItem(depthToRoot,parent,network){

    var prePath="";
    var i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";

    var publicIndicatorColor = network.visible === '1' ? "#04befe" : "#dddddd";

    if(network.special === '0') network.username = "@" + network.username;


    var print =
        '<div class="col-md-3 col-sm-4 col-xs-6 col-6 connItemOuterContainer" > ' +
        '<div class="connItemContainer connItemContainerPrivate" > ' +
            '<div class="connItemMainContainer"> ' +
                '<div class="connItemMainIndicatorContainer"> ' +
                '<div id="connItemMainIndicator-'+network.ID+'" class="connItemMainIndicator" style="background: '+publicIndicatorColor+'"> </div> ' +
                '</div> ' +

                '<div class="connItemMainNetworkContainer"> ' +
                '<img class="connItemPrivateImage" id="connItemMainNetworkIcon-'+network.ID+'"   src="'+network.image.url+'" /> ' +
                '</div> ' +

                '<div class="connItemMainOptionsContainer" > ' +
                '<span class="connItemMainOptionsButtonPrivate">Request Only Item</span> ' +
                '</div> ' +
            '</div> ' +
            '</div>' +
            '<div class="connItemCredentialsContainer"  style="opacity: 0.8"> ' +
            '<p  class="connItemCredentialsNetwork">'+network.name+'</p> ' +
        '<p class="connItemCredentialsUsername">'+network.username+'</p> ' +
        '</div>' +
        '</div>';





    parent = $("#connItemsParent");
    parent.append(print);

    if(network.special === '1'){$("#connItemDetailLinkButtonContainer-"+network.ID).remove();}
    imageExists(network.image.url,function(callback){
        if(!callback) network.image.url = prePath+"image/network/normal/icon_default.png";
        $("#connItemMainNetworkIcon-"+network.ID).attr("src", network.image.url);
    });
}

function showMobileDetail(ID){

            if($(window).width() < 970) {
                viewNetworkDetails(ID);
            }
    }
