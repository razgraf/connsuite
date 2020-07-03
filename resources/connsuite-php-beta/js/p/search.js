/**
 * Created by razvan on 30/08/2017.
 */


var limit = 20;
var offset = 0;
var searching = false;
var count = 0;

$(function(){
    ONESIGNAL(depthToRoot);
    transitionPageEnter(depthToRoot);
    doSearch();




    $(window).on("scroll",function(){
        //console.log(lazyLoadDocument(200));
        if(!searching && lazyLoadDocument(200)){
            doSearch();
        }
    });

    let searchClicked = false;
    $("#headerSearchButtonContainer").on("click",function(){
        if(!searchClicked){
            searchClicked = true;
            let key = $("#headerSearchBarInput").val();
            let href = "search.php?q="+key;
            $("#headerSearchButtonContainer").prop("href", href);
            $("#headerSearchButtonContainer").click();
        }

    });

});


function doSearch(){
    //console.log(query);
    Pace.restart();
    searching = true;
    var parent = $("#searchResultParent");
    var req =   $.ajax({
            url : doRetrieveUserList,
            type : "GET",
            data : {
                query : query,
                limit : limit,
                offset : offset
            },
        headers : buildHeaders(token, userID) //token and userID must be variables declared in all pages and kept untouched.
    });

    req.done(function(response){

        try {
            response = JSON.parse(response);


            if (response['response'] === kCSResponseNegative) {
                if (count == 0 || count == '0') {
                    parent.html('<div style="width: 100%; padding: 20px; border-radius: 30px; border: 1px solid #eeeeee;color: #aaaaaa; display: flex; align-items: center; justify-content: center;"><span>There are no users right now that match your search.</span></div>')
                }
            }
            else if (response['response'] === kCSResponseOk) {
                searching = false;
                var result = response['result']['users'];
                for (var i = 0; i < result.length; i++) {
                    var user = new ConnUser();
                    user.set(result[i]);
                    printUser(user, parent);
                }
                if (result.length < limit) searching = true; //stop the scroll
                offset += limit;

                if (response['result']['count'] == '1') $("#resultsCountText").text("1 Result");
                else $("#resultsCountText").text(response['result']['count'] + " Results");

                count = response['result']['count'];


            }
        }catch (err){ console.log(response);}
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });


}

/**
 *
 * @param {ConnUser} user
 */
function printUser(user,parent){

    var print = ' ' +
        '<div class="col-sm-3 col-xs-6 col-6 searchItemOuterContainer" > ' +
        '<div class="searchItemPositionContainer"> ' +
        '<a  href="../'+user.username+'"  class="searchItemContainer"> ' +
            '<div class="searchItemPictureContainer"> ' +
            '<img class="searchItemPicture" id="searchItemPicture-'+user.ID+'"> ' +
            '</div> ' +

            '<div class="searchItemMainContainer"> ' +
            '<span class="searchItemMainName">'+user.name+'</span> ' +
            '</div> ' +

        '<div class="searchItemBottomContainer"> ' +
                '<div style="width: 100%; background: #eeeeee; height: 1px;margin-bottom: 10px;"></div> ' +

                '<span class="searchItemBottomUsername">@'+user.username+'</span> ' +

                '<div class="searchItemBottomLastContainer"> ' +
                    '<div class="searchItemBottomLastNetworksContainer"> ';



                if(user.networks && (user.networks).length > 0){
                    for(var i=0; i< (user.networks).length; i++){
                        print+='<div class="searchItemNetworkContainer"> ' +
                            '<img src="'+user.networks[i].image.thumbnail+'" class="searchItemNetworkImage" /> ' +
                            '</div> ';
                    }
                }

    print+=
                    '</div>' +
                    '<div href="../'+user.username+'" class="searchItemViewButton">Visit</div> ' +
                '</div> ' +

        '</div> ' +

        '</a> ' +
        '</div> ' +
        '</div>' ;

    parent.append(print);

    imageExists(user.thumbnailURL,function(callback){
        if(!callback) user.thumbnailURL = "../image/no_people_o.png";
        $("#searchItemPicture-"+user.ID).attr("src", user.thumbnailURL);
    });



}