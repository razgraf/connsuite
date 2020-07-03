/**
 * Created by razvan on 11/11/2017.
 */


let userID = null;

$(function(){
    transitionPageEnterLoad(depthToRoot);
    printHelper($("#profileHelperContainer"),
        "You are going to give your account a fresh new password. Choose it wisely. After the change is done, you will use the chosen password to access your account from any device you wish to use. Be careful, this link will only last for 60 minutes. After that, it will become invalid and you'll have to request a new password change."
        ,true);
    checkToken();


    $("#changePasswordButton").on("click",function(){
        if(checkData()) {
            $('#checkModal').modal('show');
            $("#checkChangeButton").unbind().on("click",function(){
                changePassword();
            });
        }
    });

    $("#cancelChangeButton").on("click",function(){
        window.location.href = ROOT;
    });

});



function checkData(){
    let newPassword = $("#newpass").val();
    let newPassword2 = $("#newpass2").val();


    if(!newPassword || newPassword.length < 5){
        showToast("Please add a valid password ( min 5 characters).",800);
        return false;
    }
    if(!newPassword2 || newPassword2.length < 5){
        showToast("Please add a valid password ( min 5 characters).",800);
        return false;
    }

    if(newPassword !== newPassword2){
        showToast("The new password fields do not match.",800);
        return false;
    }


    return true;

}


function checkToken(){
    let req = $.ajax({
        url : doTokenCheck,
        type : "GET",
        data : {
            token : token,
            email : email,
            insertID : insertID
        }
    });

    req.done(function(response){
        console.log(response);
        response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative || response['response'] === kCSResponseTokenExpired){
           showErrorModal();
        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            let user = new ConnUser();
            user.set(result);

            userID = user.ID;
            if(userID === null)  showErrorModal();



            imageExists(user.thumbnailURL,function(callback){
                if(!callback) user.thumbnailURL = prePath+"image/connsuite_icon_inverted_rounded.png";
                $("#accountUserPicture").prop("src",user.thumbnailURL);
            });

            $("#accountUserName").html('<span style="margin-right: 10px;">'+user.name+'</span>');


            transitionPageEnterLoadEnd();
            DRIFT();


        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        showErrorModal();

    });

    req.always(function(){
        transitionPageEnterLoadEnd();
    })

}


function changePassword(){

    Pace.restart();
    if(!checkData()) return;
    let newPassword = $("#newpass").val();
    let newPassword2 = $("#newpass2").val();


    $("#rightAddNetworkButtonContainer").addClass("disableClick");

    let req = $.ajax({
        url : doPasswordChange,
        type : "POST",
        data : {
            userID : userID,
            token : token,
            email :email,
            newPassword : md5(newPassword),
            newPassword2 : md5(newPassword2),
        }
    });

    req.done(function(response){
        hideToast();
        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("The data you entered is not correct. Please try again!",800);
            $("#rightAddNetworkButtonContainer").removeClass("disableClick");
        }
        else if(response['response'] === kCSResponseOk) {

            $('#changedModal').modal('show');

        }
    });
    req.fail(function(e){
        hideToast();
        console.log("fail");
        showToast("Server error.");
        $("#rightAddNetworkButtonContainer").removeClass("disableClick");
    });

    req.always(function(){
        $('#checkModal').modal('hide');
    })
}

function showErrorModal(){
    showBootstrapModal(
        MODAL_HEADER_TYPE_COMPLEMENTARY,
        "Wrong data",
        "It looks like the link you accessed has expired or is not valid. Please go back to the main page and re-take the steps necessary to replace a forgotten password.",
        [
            {
                "title":"Return to Main Page",
                "callback": function(buttonID){ if(buttonID)  window.location.href = ROOT; }
            },

        ],
        false
    );
}