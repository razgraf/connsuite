/**
 * Created by @VanSoftware on 10/06/2018.
 */

let u = new User();

$(function(){
    Structure.initPrimary(PAGE_IDENTIFIER_DASHBOARD,API);
    Network.initCover();


    initVideo($(".section-tutorial .sectionTitle .sectionButton"));
    doRetrieveNetworks();
});



function doRetrieveNetworks(){

    let request = $.ajax({
        type : "GET",
        url : API["URL_NETWORK_RETRIEVE_LIST"],
        data : {
            labels : true
        },
        dataType: 'json'
    });


    request.done(function(response){
        LOGGER.log(response);
        try{
            if(Request.negative(response)){
                showAlert("Wrong credentials. Try again!",ALERT_TYPE_FAILURE,800);
            }
            else if(Request.ok(response)){
                let result = response['result'];
                for(let i = 0; i < result.length; i++){
                    u.networks.push(new Network(result[i]));
                    u.networks[i].print($(".networks"));
                }
                $(".section-networks .sectionTitle p").text(  $(".section-networks .sectionTitle p").text() + " ("+result.length+")");
                Network.printAddItem($(".networks"));

                LOGGER.log(u.networks);
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



}


/**
 *
 * ----------------------------------------------------------
 *
 * VIDEO SETUP
 *
 * ----------------------------------------------------------
 */

function initVideo(trigger){


    if(!$("a.video").length){
        $("body").append('<a class="video" href="https://youtu.be/s-mP22EkCfM" style="z-index: 9999999; display: none;"></a>');
    }

    if(!trigger.length) return;

    $("a.video").YouTubePopUp();
    trigger.unbind().on("click",function(){
        $("a.video").click();
    })
}
