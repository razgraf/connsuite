/**
 * Created by razvan on 22/08/2017.
 */

let facebookFirst = false;

$(function(){
    transitionPageEnterLoad(depthToRoot);
    printHelper($("#profileHelperContainer"),
        "Once you change your password, you will be logged out of your account from all your devices and the new-password will become your main one. Be careful when choosing your password and be sure to remember it."
        ,true);


    $("#changePasswordButton").on("click",function(){
        if(checkData()) {
            $('#checkModal').modal('show');
            $("#checkChangeButton").unbind().on("click",function(){
                changePassword();
            });
        }
    });

    $("#cancelChangeButton").on("click",function(){
       window.location.href = "../dashboard.php";
    });

    checkPasswordExistence();

});


function checkPasswordExistence(){
    let req = $.ajax({
        url : doPasswordExistenceCheck,
        type : "GET",
        data : {
            userID : userID,
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        console.log(response);
        response = JSON.parse(response);


        if(response['response'] === kCSResponseNegative){

        }
        else if(response['response'] === kCSResponseOk) {
            let result = response['result'];
            if(result['password'] == "0") {
                facebookFirst = true;
                $("#oldPasswordField").hide();
            }
            else{
                facebookFirst = false;
            }
            console.log(facebookFirst);
        }
    });
    req.fail(function(e){
        console.log("fail");
        showToast("Server error.");
        window.location.href = "edit.php";
    });

    req.always(function(){
        transitionPageEnterLoadEnd();
        DRIFT();
    })

}

function checkData(){
    let newPassword = $("#newpass").val();
    let newPassword2 = $("#newpass2").val();


    if(newPassword !== newPassword2){
        showToast("The new password fields do not match.",800);
        return false;
    }
    if(!newPassword || newPassword.length < 5){
        showToast("Please add a valid password ( min 5 characters).",800);
        return false;
    }
    if(!newPassword2 || newPassword2.length < 5){
        showToast("Please add a valid password ( min 5 characters).",800);
        return false;
    }


    if(!facebookFirst){
        let oldPassword =  $("#oldpass").val();

        if( (oldPassword===null || (oldPassword.trim()).length < 5) || (newPassword===null || (newPassword.trim()).length < 5) || (newPassword2===null || (newPassword2.trim()).length < 5)  ){
        showToast("Please add a valid passwords! (at least 5 characters)",800);
        return false;}

        if(newPassword === oldPassword){
        showToast("Your new password cannot be the same as your old one.",800);
        return false;
        }

    }



    return true;

}

function changePassword(){

    Pace.restart();
   // showToast("Loading changes...",10000);
    if(!checkData()) return;
    let oldPassword = !facebookFirst ? $("#oldpass").val() : null;
    let newPassword = $("#newpass").val();
    let newPassword2 = $("#newpass2").val();


    $("#rightAddNetworkButtonContainer").addClass("disableClick");

    let req = $.ajax({
        url : doPasswordChange,
        type : "POST",
        data : {
            userID : userID,
            newPassword : md5(newPassword),
            oldPassword : md5(oldPassword),
            newPassword2 : md5(newPassword2),
            facebookFirst : facebookFirst ? "1" : "0"
        },
        headers : buildHeaders(token, userID)
    });

    req.done(function(response){
        hideToast();
        response = JSON.parse(response);
        console.log(response);

        if(response['response'] === kCSResponseNegative){
            showToast("The data you entered is not correct. Please try again!",800);
            $("#rightAddNetworkButtonContainer").removeClass("disableClick");
        }
        else if(response['response'] === kCSResponseOldPassword){
            console.log("old");
            showToast("Your old password is not right. Please try again!",800);
            $("#oldpass").val("");
            $("#oldpass").css("background","#EBF9FF");
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