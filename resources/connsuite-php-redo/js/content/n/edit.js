/**
 * Created by @VanSoftware on 25/08/2018.
 */


let n = new Network();
/**
 *
 * @type {Array<Network>}
 */
let defaults = [];
/**
 *
 * @type {Array<NetworkLabel>}
 */
let labels = [];

let customIcon = null;
let customName = null;

let initialPicture = null;


$(function(){



    Structure.initSecondary(PAGE_IDENTIFIER_SECONDARY_EDIT_NETWORK,API);
    disableButtonClick($("main"));
    showLoadingToast("Loading Network...",100000);


    Network.initCover(function(){
        $("section.structure-network-cover .structure-network-cover-card-info-wrapper").append("<label></label>");

        $("section.structure-network-cover .structure-network-cover-section.actions").remove();

        $("section.structure-network-cover .structure-network-cover-header-toggle").unbind();
        $("section.structure-network-cover .structure-network-cover-header-toggle-container").unbind().addClass("dummy");


    });

    Network.requestRetrieve(
        API["networkAID"],
        function(response){
            //doOk
            n = new Network(response);


            initSection1();
            initSection2();


            $("#finalButtonSave").unbind().on("click",function(){
                prepareSave();
            });

            $("#finalButtonPreview").unbind().on("click",function(){
                prepareSave(true);
            });


        },
        function(){
            //doNegative
            window.location.href = API["PAGE_IDENTIFIER_DASHBOARD"];
        },
        function(){
            showAlert("Fail.");
        },
        function(){
            //doAlways
            hideLoadingToast();
            enableButtonClick($("main"));
        }

    );




});




function prepareSave(preview = false){

    let button = $("#finalButtonSave");

    n.dangers = [];
    n.labels = [];
    n.username = "";
    n.description = "";
    n.icon = null;
    n.url = null;
    n.visible = true;


    //n.ID is in USE


    /**
     * TYPE SPECIFIC
     */

    if(n.type === NETWORK_TYPE_CUSTOM){
        n.name = "";


        if(customName !== null){
            let value = customName.getValueFromElement();
            n.name = value;
            if(isEmpty(value) || value.length < 2)
            {
                customName.warn();
                customName.element.focus();
                n.dangers.push(new DangerItem(NETWORK_KEY_NAME));
            }
            else customName.restore();
        } //NETWORK_KEY_NAME
        if(customIcon !== null) n.icon = customIcon.getValueFromElement(); //NETWORK_KEY_ICON
        for(let i = 0; i < n.inputs.length; i++) if(n.inputs[i].ID === NETWORK_KEY_URL){
            let value = n.inputs[i].getValueFromElement();
            n.url = value;
            if(isEmpty(value) || value.length < 2)
            {
                n.inputs[i].warn();
                n.dangers.push(new DangerItem(NETWORK_KEY_URL));
            }
            else n.inputs[i].restore();


            break;
        } //NETWORK_KEY_URL
    }

    /**
     * COMMON
     */

    for(let i =0; i < labels.length; i++) if(labels[i].selected === true) n.labels.push(labels[i]); //NETWORK_KEY_LABELS

    let toggle = $("#network-toggle"); if(!toggle.length) return;
    n.visible = toggle.is(":checked"); //NETWORK_KEY_VISIBLE


    for(let i = 0; i < n.inputs.length; i++) {
        let value = n.inputs[i].getValueFromElement();
        if (n.inputs[i].ID === NETWORK_KEY_USERNAME) {
            n.inputs[i].restore();
            n.username = value;

            if(n.type === NETWORK_TYPE_DEFAULT){
                if(isEmpty(value)){
                    n.inputs[i].warn();
                    n.dangers.push(new DangerItem(NETWORK_KEY_USERNAME));
                }
            }
        }
        else if (n.inputs[i].ID === NETWORK_KEY_DESCRIPTION) {
            n.description = value;
        }
    }


    if(n.dangers.length > 0){
         showAlert("You left some fields invalid. Fix them before saving/previewing!"); return;
    }


    if(preview) {

        let parameters = {};

        if(n.type === NETWORK_TYPE_DEFAULT){
            let chosen = (function () {for(let i =0; i <defaults.length;i++) if(String(defaults[i].AID) === String(n.ID)) {return defaults[i];} return null;}());
            if(chosen === null) return;
            n.url = chosen.getValue(chosen.PRIMARY_OBJECT, NETWORK_KEY_URL);
            n.icon = n.getParsedPictureIcon(chosen.getValue(chosen.PRIMARY_OBJECT, NETWORK_KEY_ICON));
            n.name = chosen.name;
        }
        else{
            if(customIcon && customIcon.getValueFromElement()!== null)  parameters[NETWORK_KEY_ICON] = customIcon.preview.attr("src");
        }

        $("section.structure-network-cover .structure-network-cover-card-info-wrapper label").text("Will link to: "+n.url);
        n.openCover(parameters);

    }
    else {

        disableButtonClick(button, true);
        n.requestSave(function () {
                disableButtonClick($("main"));
                showAlert("Network successfully added!", ALERT_TYPE_SUCCESS, 1200, function () {
                    window.location.href = API["PAGE_IDENTIFIER_DASHBOARD"];
                })
            },
            function () {
                showAlert("Something happened. Please check the submitted details again.");
            },
            null,
            function () {
                enableButtonClick(button, true);
            })
    }

}


function initSection2(){
    let parent = $(".section-info-fields-default");


    n.visible ? $("#network-toggle").prop("checked",true) : $("#network-toggle").prop("checked",false);


    n.inputs.push(
        new TextInput({
            ID : NETWORK_KEY_URL,
            parent : parent,
            value : n.url,
            label : "Network Website/URL",
            placeholder : "e.g. https://www.facebook.com/gabriel123 | Full link to your account/profile on that platform.",
            maxlength : 500,
            danger : INPUT_DANGER_BIG,
            callback : function(self){
                if(n.type === NETWORK_TYPE_DEFAULT) {
                    self.element.parent().addClass("force-active");
                    self.element.prop("disabled",true);
                }
            }
        }),
        new TextInput({
            ID : NETWORK_KEY_USERNAME,
            parent : parent,
            label : "Network Username/Identifier (~)",
            placeholder : "e.g. gabriel123 / +40123 456 | Your username, number or identifier on that platform",
            maxlength : 100,
            value : isEmpty(n.username) ? "" : n.username,
            danger : INPUT_DANGER_SMALL
        }),
        new TextInput({
            area : true,
            ID : NETWORK_KEY_DESCRIPTION,
            parent : parent,
            label : "Network Description (~)",
            placeholder : "e.g. You can find me here for...",
            maxlength : 5000,
            value : isEmpty(n.description) ? "" : n.description,
            danger : INPUT_DANGER_SMALL
        }),

    );




    Network.requestRetrieveLabelsAll(function(result) {

        for (let i = 0; i < result.length; i++) {
            let label = new NetworkLabel(result[i]);
            label.print($(".field-labels"), true);
            labels.push(label);
        }

        $(".networkLabel.selectable").on("click",function(){
            let ID = $(this).attr("data-id");
            if(ID) ID = parseInt(ID);
            for(let i =0 ; i < labels.length; i++) if(labels[i].ID === ID) labels[i].selected = !labels[i].selected;
            $(this).toggleClass("selected");
        });

       for(let i = 0 ; i < n.labels.length; i++) $(".networkLabel.selectable[data-id='"+n.labels[i].ID+"']").click();
    });
}
function initSection1(){



    if(n.type === NETWORK_TYPE_DEFAULT){
        initDefault();
        $(".section-network.default").addClass("active");
        $(".section-network.custom").remove();
    }
    else  if(n.type === NETWORK_TYPE_CUSTOM) {
        initCustom();
        $(".section-network.custom").addClass("active");
        $(".section-network.default").remove();
    }

}


function toggleFields(init = false){
    if(!init) {
        $(".tab-item").toggleClass("active");
        $(".section-network").toggleClass("active");
    }

    if(n.inputs.length > 0){
        let i = (function(){for(let i=0; i<n.inputs.length; i++) if(n.inputs[i].ID === NETWORK_KEY_URL) return i; return null; }()); if(i === null) return;
        if(n.type === NETWORK_TYPE_DEFAULT){

            let nChosen = $(".networks.icons.selectable .networkCard.selected"); if(!nChosen.length) return;
            let nAID = parseInt(nChosen.attr("data-aid"));
            let url = (function () {for(let i =0; i <defaults.length;i++) if(String(defaults[i].AID) === String(nAID)) {return defaults[i].url;} return null;}());

            if($("#name-default").length) n.inputs[i].element.val(isEmpty(url) ? "Special Network" : url);
            n.inputs[i].element.parent().addClass("force-active");
            n.inputs[i].element.prop("disabled",true);


            n.inputs[i].element.siblings("p").text("Short Network Website/URL");
        }
        else{
            n.inputs[i].element.val("");
            n.inputs[i].element.parent().removeClass("force-active");
            n.inputs[i].element.prop("disabled",false);

            n.inputs[i].element.siblings("p").text("Full Network Website/URL (including your username)");
        }
    }
}

function initDefault(){




        n.print($(".networks.icons.selectable"));


        let name = new TextInput({
            ID : "name-default",
            parent : $(".section-network-top-chosen-name"),
            label : "Network Name",
            placeholder : "e.g. Facebook",
            maxlength : 120,
            value : n.name,
            danger : INPUT_DANGER_SMALL,
            callback : function(self){
                self.element.parent().addClass("force-active");
                self.element.prop("disabled",true);
            }
        });




}

function initCustom(){
    let customParent = $(".section-network-custom-uploader");

    initialPicture = n.version && n.version !== 0 ? n.icon : null;

    if(customName === null)
        customName = new TextInput({
            ID : NETWORK_KEY_NAME,
            parent : customParent,
            value : n.name,
            label : "Network Name",
            placeholder : "e.g. My awesome Website",
            maxlength : 120,
            danger : INPUT_DANGER_BIG
        });
    if(customIcon === null)
        customIcon = new ImageInput({
            ID : NETWORK_KEY_ICON,
            parent : customParent,
            value : n.icon,
            label : "Network Icon (~)",
            danger : INPUT_DANGER_SMALL,
            defaultImage : ROOT+"image/icon_default.png"
        });





    }

