/**
 * Created by razvan on 30/11/2017.
 */
$(function() {
    ONESIGNAL(depthToRoot);
    transitionPageEnterLoad(depthToRoot);
    printHelper($("#profileHelperContainer"),
        "If your username is not fitted for you anymore, you can choose to change it with a new one, an alias or to toggle between them to choose the primary one. Be careful! You have limited access to only one <b>main</b> username and one alias/extra username."
        , true);
    loadAliasList();
});

let aliasList = [];


function loadAliasList(){
    var req = $.ajax({
        url : doAliasRetrieveListURL,
        type : "GET",
        data : {userID : userID},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("There was an error fetching this user. Try again!");
        }
        else if(response['response'] === kCSResponseOk) {
            let aliasList = response['result']['alias'];
            for(let i = 0; i< aliasList.length; i++){
                buildAlias(aliasList[i]);
            }
            let aliasMaxCount = response['result']['MAX_ALIAS_NUMBER'];
            if(aliasMaxCount && (aliasList.length  < parseInt(aliasMaxCount)+1) ) addNewAliasContainer();


            transitionPageEnterLoadEnd();
            DRIFT();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        window.location.href = 'edit.php';
    });
}

function buildAlias(item){
    let alias = {"ID":item['aliasID'],"username":item['username']};
    if(globalUsername == alias.username || alias.ID == "-1") return;
    aliasList.push(alias);
    let print  = '<div class="col-sm-6 col-xs-12" style="margin-right: 0; margin-left: 0;"> ' +
        '<div class="uaContainer"> ' +
        '<div style="display: flex;width: 100%; flex-direction: row; height: 80px;"> ' +
        '<div style="flex: 1; display: flex;flex-direction: column;"> ' +
        '<p class="rightFormTitle">Your Alias</p> ' +
        '<p id="primaryUsername">'+alias.username+'</p> ' +
        '</div> ' +
        '</div> ' +
        '<div id="rightAddNetworkButtonContainer" style="display: flex;justify-content: center;margin-bottom: 0;"> ' +
        '<div onclick="setPrimary('+alias.ID+')" class="buttonTypeOutlineSecondary" style=" min-width: 160px; user-select: none">Set to Primary</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>';

    $("#aliasParent").append(print);

}


function setPrimary(ID){

    $('#primaryModal').modal('show');

    $("#setPrimaryButton").unbind().on("click",function(){

    let req = $.ajax({
        url : doSetPrimaryAliasURL,
        type : "POST",
        data : {
            aliasID : ID,
            userID: userID
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("This alias cannot be set to primary. Try again!",800);
            return;
        }
        else if(response['response'] === kCSResponseOk) {
            showToast("Alias was set to Primary!",500);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });
    });
}



function addNewAliasContainer(){

    let print = ' ' +
        '<div class="col-sm-6 col-xs-12" style="margin-right: 0; margin-left: 0;"> ' +
        '<div class="uaContainer"> ' +
        '<div id="newAliasContainer" style="display: flex;width: 100%;  height: 80px;flex-direction: row"> ' +
        '<div style="flex: 1; display: flex;flex-direction: column;"> ' +
        '<p class="rightFormTitle">Your new Alias</p> ' +
        '<input class="rightFormInput" name="alias" id="alias" autocomplete="off" maxlength="50" type="text"  title="Your alias / new username" placeholder="Your alias / new username" required> ' +
        '<div class="divider"></div> ' +
        '</div> ' +
        '</div> ' +
        '<div id="rightAddNetworkButtonContainer" style="display: flex;justify-content: center;margin-bottom: 0;"> ' +
        '<div  id="addAliasButton" class="buttonTypeOutlinePrimary" style=" min-width: 160px;">Add Alias</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>';


    $("#aliasParent").append(print);

    $("#addAliasButton").on("click",function(){
        addNewAlias();
    })
}

function addNewAlias(){
        checkAliasData(function(){

            $('#newAliasModal').modal('show');

            $("#registerAliasButton").unbind().on("click",function(){

                if(!$("#alias")) return false;
                let alias = $("#alias").val();


                let req = $.ajax({
                    url : doAliasAddURL,
                    type : "GET",
                    data : {alias : alias, userID : userID},
                    headers : buildHeaders(token, userID)
                });

                req.done(function(response){
                    response = JSON.parse(response);
                    console.log(response);
                    if(response['response'] === kCSResponseNegative){
                        showToast("Server error. Please try again!");
                    }
                    else if(response['response'] === kCSResponseOk) {
                        showToast("Alias added!",500);
                        setTimeout(function(){
                            window.location.reload(true);
                        },500);
                    }
                });
                req.fail(function(e){
                    console.log("fail");
                    showToast("Server error.");
                });


            });
        });

}


function checkAliasData(callback){

    let alias = $("#alias").val();
    console.log(alias);


    if(!alias || (alias.trim()).length < 3){
        showToast("Please add a longer alias/username in order to continue!",800);
        return;
    }


    let specialChars = '/[#$%^&*()+=\-\[\]\';,.\/{}|\":<>?~\\\\]/';
    let check = function(string){
        for(let i = 0; i < specialChars.length;i++){
            if(string.indexOf(specialChars[i]) > -1){
                return true
            }
        }
        return false;
    };
    if(check(alias)){
        showToast("Please add a valid alias, without special characters",800);
        return;
    }

    let req = $.ajax({
        url : doAliasCheckAvailableURL,
        type : "GET",
        data : {alias : alias},
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        response = JSON.parse(response);
        console.log(response);
        if(response['response'] === kCSResponseNegative){
            showToast("The chosen alias/username is already in use. Try another one!",800);
            return;
        }
        else if(response['response'] === kCSResponseOk) {
            callback();
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
    });

}