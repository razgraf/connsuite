/**
 * Created by @VanSoftware on 23/08/2018.
 */

const NETWORK_DEFAULT_POSITION = 99999;
const NETWORK_DEFAULT_ICON_TYPE = ".png";
const NETWORK_DEFAULT_THUMBNAIL_TYPE = ".png";

const NETWORK_KEY_ID = "ID";

const NETWORK_KEY_LINK_AID = "AID";
const NETWORK_KEY_USER_ID = "userID";
const NETWORK_KEY_USERNAME = "username";
const NETWORK_KEY_INSTANTIATED  = "instantiated";
const NETWORK_KEY_POSITION = "position";
const NETWORK_KEY_VISIBLE = "visible";

const NETWORK_KEY_NAME = "name";
const NETWORK_KEY_TYPE = "type";
const NETWORK_KEY_ICON = "icon";
const NETWORK_KEY_URL = "url";
const NETWORK_KEY_VERSION = "version";

const NETWORK_KEY_DESCRIPTION = "description";
const NETWORK_KEY_LABELS = "labels";

const NETWORK_TYPE_DEFAULT  = 1;
const NETWORK_TYPE_CUSTOM = 2;

const NETWORK_KEY_CLICK = "click";

class Network extends ClassHelper{
    get PRIMARY_OBJECT() {
        return this._PRIMARY_OBJECT;
    }

    set PRIMARY_OBJECT(value) {
        this._PRIMARY_OBJECT = value;
    }
    get element() {
        return this._element;
    }

    set element(value) {
        this._element = value;
    }
    /**
     *
     * @returns {Array<NetworkLabel>}
     */
    get labels() {
        return this._labels;
    }
    /**
     *
     * @param {Array<NetworkLabel>} value
     */
    set labels(value) {
        this._labels = value;
    }

    /**
     *
     * @returns {Array<DangerItem>}
     */
    get dangers() {
        return this._dangers;
    }

    /**
     *
     * @param {Array<DangerItem>} value
     */
    set dangers(value) {
        this._dangers = value;
    }

    /**
     *
     * @returns {Array<Field>}
     */
    get fields() {
        return this._fields;
    }

    /**
     *
     * @param {Array<Field>} value
     */
    set fields(value) {
        this._fields = value;
    }

    /**
     *
     * @returns {Array<Input>}
     */
    get inputs() {
        return this._inputs;
    }

    /**
     *
     * @param {Array<Input>} value
     */
    set inputs(value) {
        this._inputs = value;
    }
    /**
     *
     * @returns {int|null}
     */
    get clicks() {
        return this._clicks;
    }


    /**
     *
     * @param {int|null} value
     */
    set clicks(value) {
        this._clicks = value !== null ? parseInt(value) : value;
    }


    get description() {
        return isEmpty(this._description) ? "" : this._description;
    }

    set description(value) {
        this._description = value;
    }

    /**
     *
     * @returns {bool|int|null}
     */
    get visible() {
        return this._visible;
    }
    /**
     *
     * @param {bool|int|null} value
     */
    set visible(value) {
        this._visible = value !== true && value !== false ? (value !== null && parseInt(value) === 1) : value;
    }
    /**
     *
     * @returns {int|null}
     */
    get position() {
        return this._position;
    }

    /**
     *
     * @param {int|null} value
     */
    set position(value) {
        this._position = value !== null ? parseInt(value) : value;
    }
    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(value) {
        this._thumbnail = value;
    }
    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }
    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
    }

    /**
     *
     * @returns {int|null}
     */
    get type() {
        return this._type;
    }

    /**
     *
     * @param {int|null} value
     */
    set type(value) {
        this._type = value !== null ? parseInt(value) :  value;
    }
    get icon() {
        return this._icon;
    }

    set icon(value) {
        this._icon = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    get instantiated() {
        return this._instantiated;
    }

    set instantiated(value) {
        this._instantiated = value;
    }
    get username() {
       return this._username;
    }

    set username(value) {
        this._username = value;
    }
    get userID() {
        return this._userID;
    }

    set userID(value) {
        this._userID = value;
    }
    get AID() {
        return this._linkAID;
    }

    set AID(value) {
        this._linkAID = value;
    }


    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }

    constructor(object){
        super();

        this.PRIMARY_OBJECT = object;

        this.type = this.getValue(object,NETWORK_KEY_TYPE);

        this.ID = this.getValue(object,NETWORK_KEY_ID);
        this.AID = this.getValue(object,NETWORK_KEY_LINK_AID);

        if(isEmpty(this.AID) && !isEmpty(this.ID) && this.type === NETWORK_TYPE_DEFAULT) this.AID = this.ID;

        this.userID = this.getValue(object,NETWORK_KEY_USER_ID);
        this.username = this.getValue(object,NETWORK_KEY_USERNAME);
        this.instantiated = this.getValue(object,NETWORK_KEY_INSTANTIATED);
        this.position = this.getValue(object,NETWORK_KEY_POSITION);
        this.visible = this.getValue(object,NETWORK_KEY_VISIBLE);
        this.description = this.getValue(object,NETWORK_KEY_DESCRIPTION);

        this.name = this.getValue(object,NETWORK_KEY_NAME);
        this.version = this.getValue(object,NETWORK_KEY_VERSION);
        this.url = this.getValue(object,NETWORK_KEY_URL);


        this.icon = this.getParsedPictureIcon(this.getValue(object,NETWORK_KEY_ICON));
        this.thumbnail = this.getParsedPictureThumbnail(this.getValue(object,NETWORK_KEY_ICON));


        this.clicks = this.getValue(object, NETWORK_KEY_CLICK);

        this.fields = [];
        this.inputs = [];
        this.dangers = [];
        this.labels = this.parseArrayElementWithClass(this.getArray(object, NETWORK_KEY_LABELS),function(el, pos){
            return new NetworkLabel(el,pos);
        });

        this.element = null;

    }


    /**
     *
     *
     * ----------------------------------------------------------
     *
     * PICTURE & THUMBNAIL
     *
     * ----------------------------------------------------------
     *
     *
     * @param value
     * @returns {string}
     */


    getParsedPictureIcon(value){

        if(this.type !== null)
            switch (this.type){
                case NETWORK_TYPE_DEFAULT : return !isEmpty(value) ? ROOT+"data/network/default/icon/"+value : ""; break;
                case NETWORK_TYPE_CUSTOM : return !isEmpty(this.AID) && !isEmpty(this.version) && this.version !== 0 ? ROOT+"data/network/custom/"+this.AID+"/icon-"+this.version+ NETWORK_DEFAULT_ICON_TYPE : ""; break;
            }


    }
    getParsedPictureThumbnail(value){

        if(this.type !== null)
            switch (this.type){
                case NETWORK_TYPE_DEFAULT : return !isEmpty(value) ? ROOT+"data/network/default/thumbnail/"+value : ""; break;
                case NETWORK_TYPE_CUSTOM : return !isEmpty(this.AID) && !isEmpty(this.version) && this.version !== 0 ? ROOT+"data/network/custom/"+this.AID+"/thumbnail-"+this.version+NETWORK_DEFAULT_THUMBNAIL_TYPE : ""; break;
            }

    }
    bindPictureIcon(parent = null){
        let self = this;
        if(!parent || !parent.length || (self.type === NETWORK_TYPE_CUSTOM && (isEmpty(self.version) || isEmpty(self.AID)  || self.version === 0 ) ) ||  isEmpty(self.icon) ) {
            self.icon = PATH_DEFAULT_PICTURE_NETWORK;
            parent.attr("src", PATH_DEFAULT_PICTURE_NETWORK).fadeIn(100);
            return;
        }
        parent.hide();
        imageExists(self.icon,function(callback){
            if(!callback) self.icon = PATH_DEFAULT_PICTURE_NETWORK;
            parent.attr("src", self.icon).fadeIn(100);
        });
    };
    bindPictureThumbnail(parent = null){
        let self = this;
        if(!parent || !parent.length || (self.type === NETWORK_TYPE_CUSTOM && (isEmpty(self.version) || isEmpty(self.AID)  || self.version === 0 ) ) ||  isEmpty(self.thumbnail) ) {
            self.thumbnail = PATH_DEFAULT_PICTURE_NETWORK;
            parent.attr("src", PATH_DEFAULT_PICTURE_NETWORK).fadeIn(100);
            return;
        }
        parent.hide();
        imageExists(self.thumbnail,function(callback){
            if(!callback) self.thumbnail = PATH_DEFAULT_PICTURE_NETWORK;
            parent.attr("src", self.thumbnail).fadeIn(100);
        });
    };



    getParsedUsername(){
        return isEmpty(this.username)
            ? ( API !== null && API.hasOwnProperty("username") && !isEmpty(API["username"]) ? "#" + API["username"]+"'s network" : "#"  )
            : ("@"+this.username);
    }


    getParsedURL(){
        return isEmpty(this.url) ?
            "" : this.url + ( (this.type === NETWORK_TYPE_DEFAULT && !isEmpty(this.username)) ? this.username : "" );
    }

    /**
     *
     *
     * ----------------------------------------------------------
     *
     * ELEMENT INITIALIZER
     *
     * ----------------------------------------------------------
     *
     */

    print(parent){
        let self = this;
        let print = '<div data-aid="'+this.AID+'" class="networkCard"> ' +
            '<div class="n-card"> ' +
            '<div class="n-main"> ' +
            '<div class="n-top"><div class="n-status '+ (this.visible ? "visible" : "" )+'" ></div></div> ' +
            '<div class="n-image"><img src=""></div> ' +
            '<div class="n-text"><span>View Details</span></div> ' +
            '</div> ' +
            '<div class="n-action"> ' +
            '<div class="n-action-content"> ' +
            '<a class="n-action-link"><i class="material-icons">link</i></a> ' +
            '<div class="n-action-view"><span>View Network</span></div> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '<div class="n-info"> ' +
            '<div class="n-title"><p>LinkedIn</p></div> ' +
            '<div class="n-username"><p>@salut</p></div> ' +
            '</div> ' +
            '</div>';

        if(parent === null || !parent.length) return;
        parent.append(print);

        let element = parent.find(".networkCard[data-aid='"+this.AID+"']");
        if(element === null || !element.length) return;

        this.element = element;

        if(parent.hasClass("mini") || parent.hasClass("icons")) this.bindPictureThumbnail(element.find(".n-image img"));
        else this.bindPictureIcon(element.find(".n-image img"));

        element.find(".n-title p").text(this.name);
        element.find(".n-username p ").text(this.getParsedUsername());

        element.find(".n-action .n-action-link").prop("href",self.getParsedURL());

        element.find(".n-action .n-action-view").unbind().on("click",function(){
            if($(".structure-network-cover").length){
                self.openCover();
            }
        });
        if(!parent.hasClass("selectable"))
            element.find(".n-card").on("click",function(){
            if(isMobileSize()){
                if($(".structure-network-cover").length){
                    self.openCover();
                }
            }
        })

    }
    static printAddItem(parent){
        let print = '<a href="'+ROOT+'content/n/add.php" class="networkCard add"> ' +
            '<div class="n-card"> ' +
            '<div class="n-main"> ' +
            '<img src="'+ROOT+'image/add.png"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="n-info"> ' +
            '<div class="n-text"><p>Add Network</p></div> ' +
            '</div> ' +
            '</a>';

        if(parent === null || !parent.length) return;
        parent.append(print);

        let element = parent.find(".networkCard.add");
        if(element === null || !element.length) return;

        element.on("click",function(){
            disableButtonClick(element.find(".n-text"),true);
        });

    }


    /**
     *
     *
     * ----------------------------------------------------------
     *
     * NETWORK COVER
     *
     * ----------------------------------------------------------
     *
     */


    static initCover(callback = null){


        let print = '<section class="structure-network-cover"> ' +
            '<div class="structure-network-cover-wrapper-container"> ' +
            '<div class="structure-network-cover-wrapper"> ' +
            '<div class="structure-network-cover-header"> ' +
            '<p class="structure-network-cover-header-title">Network Details</p> ' +
            '<div class="structure-network-cover-header-toggle-container"> ' +
            '<p data-tooltip="By turning off the toggle, this network will be made available only to those who requested your business card. If turned on, everyone will be able to see this network. (Changes will apply when you close the cover)">Public Network</p> ' +
            '<input id="structure-network-cover-header-toggle" type="checkbox" checked/> ' +
            '<label for="structure-network-cover-header-toggle"></label> ' +
            '</div> ' +
            '</div> ' +
            '<div class="structure-network-cover-card"> ' +
            '<div class="structure-network-cover-card-icon"> ' +
            '<img> ' +
            '<div data-tooltip="Number of views" class="structure-network-cover-card-icon-count"><span></span></div> ' +
            '</div> ' +
            '<div class="structure-network-cover-card-info"> ' +
            '<div class="structure-network-cover-card-info-wrapper"> ' +
            '<p></p> ' +
            '<span></span> ' +
            '</div> ' +
            '</div> ' +
            '<div class="structure-network-cover-card-button"> ' +
            '<a title="Visit Network"><i class="material-icons">arrow_forward</i></a> </div> ' +
            '</div> ' +
            '<div class="structure-network-cover-section description"> ' +
            '<p class="structure-network-cover-section-title">Description</p> ' +
            '<div class="structure-network-cover-section-content"> ' +
            '<p></p> ' +
            '</div> ' +
            '</div> ' +
            '<div class="structure-network-cover-section labels"> ' +
            '<p class="structure-network-cover-section-title">Labels</p> ' +
            '<div class="structure-network-cover-section-content"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="structure-network-cover-section actions"> ' +
            '<p class="structure-network-cover-section-title">Actions</p> ' +
            '<div class="structure-network-cover-section-content"> ' +
            '<div class="structure-network-cover-action edit"><i class="material-icons">edit</i><span>Edit this network</span></div> ' +
            '<div class="structure-network-cover-action remove"><i class="material-icons">remove_circle_outline</i><span>Remove this network</span></div> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '<div class="structure-network-cover-overlay"></div> ' +
            '</section>';

        if(!$("section.structure-network-cover").length) $("main").before(print);


        let close = $("section.structure-network-cover .structure-network-cover-header .structure-network-cover-header-title"); if(!close.length) return;
        let overlay = $("section.structure-network-cover .structure-network-cover-overlay"); if(!overlay.length) return;
        overlay.unbind().on("click",function(){close.click();});
        close.unbind().on("click",function(){Network.closeCover();});

        if(callback !== null && typeof callback === 'function') callback();

    }

    openCover(parameters = null){

        let self = this;
        if(isEmpty(this.AID)) return;

        let cover = $("section.structure-network-cover"); if(!cover.length) {LOGGER.log("Please init the cover first."); return;}
        let card = cover.find(".structure-network-cover-card"); if(!card.length) return;


        if(parameters !== null && parameters.hasOwnProperty(NETWORK_KEY_ICON) && ! isEmpty(parameters[NETWORK_KEY_ICON])) card.find(".structure-network-cover-card-icon img").attr("src",parameters[NETWORK_KEY_ICON]);
        else this.bindPictureIcon(card.find(".structure-network-cover-card-icon img"));


        card.find(".structure-network-cover-card-info-wrapper p").text(this.name);
        card.find(".structure-network-cover-card-info-wrapper span").text(this.getParsedUsername());

        if(this.clicks) {
            card.find(".structure-network-cover-card-icon .structure-network-cover-card-icon-count").show();
            card.find(".structure-network-cover-card-icon .structure-network-cover-card-icon-count span").text(this.clicks);}
        else { card.find(".structure-network-cover-card-icon .structure-network-cover-card-icon-count").hide();}

        cover.find(".structure-network-cover-section.description .structure-network-cover-section-content p")
            .text(isEmpty(this.description) ? "You can find me on "+(isEmpty(this.name) ? "this network." : this.name+".") : this.description );


        cover.find(".structure-network-cover-card-button a").attr("href", this.getParsedURL() );


        let labels = cover.find(".structure-network-cover-section.labels .structure-network-cover-section-content");
        if(labels.length) {
            labels.html("");
            if (this.labels !== null && this.labels.length > 0) for (let i = 0; i < this.labels.length; i++) this.labels[i].print(labels);
            else labels.html("<span class='dummy' style='padding-left: 5px'><i>No labels available.</i></span>")
        }


        let actions = cover.find(".structure-network-cover-section.actions .structure-network-cover-section-content");
        actions.find(".structure-network-cover-action.edit").unbind().on("click",function(){
           disableButtonClick($(this),true);
           window.location.href = ROOT+"content/n/edit.php?n="+self.AID;
        });

        actions.find(".structure-network-cover-action.remove").unbind().on("click",function(){
            self.requestRemove();
        });


        this.toggleVisibility(true);

        let toggle = $("section.structure-network-cover .structure-network-cover-header #structure-network-cover-header-toggle");
        toggle.unbind().on("change",function(){
            self.toggleVisibility();
        });


        let overlay = $("section.structure-network-cover .structure-network-cover-overlay");
        if(!overlay.length) return;
        $("body").addClass("cover-visible");
        overlay.fadeIn(300);
    }

    static closeCover(){
        let overlay = $("section.structure-network-cover .structure-network-cover-overlay"); if(!overlay.length) return;
        $("body").removeClass("cover-visible");
        overlay.fadeOut(300);
    }


    toggleVisibility(initial = false){
        let self = this;
        let toggle = $("section.structure-network-cover .structure-network-cover-header #structure-network-cover-header-toggle"); if(!toggle.length) return;
        if(initial){
            if(this.visible) toggle.prop("checked",true);
            else toggle.prop("checked",false);
            return; //BRANCH : this is just for init. end here.
        }

        this.visible = toggle.is(":checked");
        let icon = $(".networks .networkCard[data-aid='"+this.AID+"'] .n-top .n-status");
        if(icon.length){
            if(this.visible && !icon.hasClass("visible")) icon.addClass("visible");
            else if(!this.visible) icon.removeClass("visible");
        }
        if (typeof API === 'undefined' || API === null || !API.hasOwnProperty("URL_NETWORK_VISIBILITY_CHANGE")){ LOGGER.log("No API."); return;}

        let request = $.ajax({
            url : API["URL_NETWORK_VISIBILITY_CHANGE"],
            type : "POST",
            data : {
                AID : self.AID
            },
            dataType : 'json'
        });

        request.done(function(response){
            LOGGER.log(response);
        });

        request.fail(function(response){
            LOGGER.log(response);
            showAlert("Connection Error");
        });

    }


    /**
     *
     *
     * ----------------------------------------------------------
     *
     * NETWORKING
     *
     * ----------------------------------------------------------
     *
     */


    requestRemove(){
        let self = this;
        showModal(
            "removeNetworkModal",
            "Are you sure you want to remove " + (isEmpty(self.name) ? "this network" : self.name) + "?",
            "<p>If you do this, you will remove this element from your profile. All the data associated with this network will be removed. Are you sure?</p>",
            [
                bootstrapButton(
                    "Remove it",
                    COLOR_RED,
                    function(button, modal){
                        if (typeof API === 'undefined' || API === null || !API.hasOwnProperty("URL_NETWORK_REMOVE")){ LOGGER.log("No API."); return;}
                        disableButtonClick(button,true);
                        disableButtonClick($("main"));
                        let request = $.ajax({
                            url : API["URL_NETWORK_REMOVE"],
                            type : "POST",
                            data : {
                                AID : self.AID
                            },
                            dataType : 'json'
                        });

                        request.done(function(response){
                            LOGGER.log(response);

                            try{
                                if(Request.negative(response)){
                                    showAlert("Wrong credentials. Try again!",ALERT_TYPE_FAILURE,800);
                                    enableButtonClick(button,true);
                                    enableButtonClick($("main"));
                                }
                                else if(Request.ok(response)){
                                    showAlert("Network removed.",ALERT_TYPE_SUCCESS,1400,function(){
                                        window.location.reload(true);
                                    })
                                }
                            }
                            catch (e){
                                LOGGER.log(e);
                            }


                        });

                        request.fail(function(response){
                            enableButtonClick(button,true);
                            enableButtonClick($("main"));
                            LOGGER.log(response);
                            showAlert("Connection Error");
                        });


                    }
                )
            ],
            MODAL_TYPE_DELETE
        )

    }

    requestSave(callbackOk = null, callbackNegative = null, callbackFail = null, callbackAlways = null){

        let self = this;
        let data = {};
        data[NETWORK_KEY_TYPE] = this.type;
        data[NETWORK_KEY_VISIBLE] = this.visible ? 1 : 0;
        data[NETWORK_KEY_DESCRIPTION] = !isEmpty(this.description) ? this.description : "";
        data[NETWORK_KEY_LABELS] = JSON.stringify((function(){let a = []; for(let i = 0; i < self.labels.length; i++) a.push(self.labels[i].ID); return a;}()));
        data[NETWORK_KEY_USERNAME] = !isEmpty(this.username) ? this.username : "";

        if(this.type === NETWORK_TYPE_DEFAULT){
            data[NETWORK_KEY_ID] = this.ID;
        }else if(this.type === NETWORK_TYPE_CUSTOM){
            if(!isEmpty(this.name)) data[NETWORK_KEY_NAME] = this.name; else return;
            if(!isEmpty(this.url)) data[NETWORK_KEY_URL] = this.url; else return;
            if(this.icon !== null) data[NETWORK_KEY_ICON] = this.icon;
        }


        let formData = new FormData(); for(let key in data) if(data.hasOwnProperty(key)) formData.append(key, data[key]);


        if (typeof API === 'undefined' || API === null || !API.hasOwnProperty("URL_NETWORK_ADD")){ LOGGER.log("No API."); return;}
        let request = $.ajax({
            url : API["URL_NETWORK_ADD"],
            type : "POST",
            data : formData,
            dataType : 'json',
            cache: false,
            contentType: false,
            processData: false
        });

        request.done(function(response){
            LOGGER.log(response);
            try{
                if(Request.negative(response)){
                    LOGGER.log("Error on retrieving network");
                    if(callbackNegative !== null && typeof callbackNegative === 'function') callbackNegative(response);
                }
                else if(Request.ok(response)){
                    if(callbackOk !== null && typeof callbackOk === 'function') callbackOk(Request.result(response));
                }
            }
            catch (e){
                LOGGER.log(e);
                return null;
            }
        });


        request.fail(function(response){
            LOGGER.log(response);
            showAlert("Connection Error");
            if(callbackFail !== null && typeof callbackFail === 'function') callbackFail(response);
        });

        request.always(function(){
            if(callbackAlways !== null && typeof callbackAlways === 'function') callbackAlways();
        })
    }


    /**
     *
     * @param AID
     * @param callbackOk
     * @param callbackNegative
     * @param callbackFail
     * @param callbackAlways
     * @returns {Network|null}
     */
    static requestRetrieve(AID, callbackOk = null, callbackNegative = null, callbackFail = null, callbackAlways = null){

        if (typeof API === 'undefined' || API === null || !API.hasOwnProperty("URL_NETWORK_RETRIEVE")){ LOGGER.log("No API."); return;}
        let request = $.ajax({
            url : API["URL_NETWORK_RETRIEVE"],
            type : "GET",
            data : {
                AID : AID
            },
            dataType : 'json'
        });

        request.done(function(response){
            LOGGER.log(response);
            try{
                if(Request.negative(response)){
                    LOGGER.log("Error on retrieving network");
                    if(callbackNegative !== null && typeof callbackNegative === 'function') callbackNegative(response);
                }
                else if(Request.ok(response)){
                    if(callbackOk !== null && typeof callbackOk === 'function') callbackOk(Request.result(response));
                    else return new Network(Request.result(response));
                }
            }
            catch (e){
                LOGGER.log(e);
                return null;
            }
        });

        request.fail(function(response){
            LOGGER.log(response);
            showAlert("Connection Error");
            if(callbackFail !== null && typeof callbackFail === 'function') callbackFail(response);
        });

        request.always(function(){
            if(callbackAlways !== null && typeof callbackAlways === 'function') callbackAlways();
        })
    }


     /**
     *
     * @param callbackOk
     * @param callbackNegative
     * @param callbackFail
     * @param callbackAlways
     * @returns {Array<Network>|null}
     *
     */
    static requestRetrieveDefaults(callbackOk = null, callbackNegative = null, callbackFail = null, callbackAlways = null){

        if (typeof API === 'undefined' || API === null || !API.hasOwnProperty("URL_NETWORK_RETRIEVE_LIST_DEFAULT")){ LOGGER.log("No API."); return;}
        let request = $.ajax({
            url : API["URL_NETWORK_RETRIEVE_LIST_DEFAULT"],
            type : "GET",
            data : {
            },
            dataType : 'json'
        });

        request.done(function(response){
            try{
                if(Request.negative(response)){
                    LOGGER.log("Error on retrieving network");
                    if(callbackNegative !== null && typeof callbackNegative === 'function') callbackNegative(response);
                }
                else if(Request.ok(response)){
                    if(callbackOk !== null && typeof callbackOk === 'function') callbackOk(Request.result(response));
                    else {
                        let result = Request.result(response);
                        let def = [];
                        for(let i = 0 ; i < result.length; i++) def.push(new Network(result[i]));
                        return def;
                    }
                }
            }
            catch (e){
                LOGGER.log(e);
                return null;
            }
        });


        request.fail(function(response){
            LOGGER.log(response);
            showAlert("Connection Error");
            if(callbackFail !== null && typeof callbackFail === 'function') callbackFail(response);
        });

        request.always(function(){
            if(callbackAlways !== null && typeof callbackAlways === 'function') callbackAlways();
        })
    }


    /**
     *
     * @param callbackOk
     * @param callbackNegative
     * @param callbackFail
     * @param callbackAlways
     * @returns {Array<Network>|null}
     *
     */
    static requestRetrieveLabelsAll(callbackOk = null, callbackNegative = null, callbackFail = null, callbackAlways = null){

        if (typeof API === 'undefined' || API === null || !API.hasOwnProperty("URL_NETWORK_LABEL_RETRIEVE_LIST")){ LOGGER.log("No API."); return;}
        let request = $.ajax({
            url : API["URL_NETWORK_LABEL_RETRIEVE_LIST"],
            type : "GET",
            data : {
            },
            dataType : 'json'
        });

        request.done(function(response){
            try{
                if(Request.negative(response)){
                    LOGGER.log("Error on retrieving network");
                    if(callbackNegative !== null && typeof callbackNegative === 'function') callbackNegative(response);
                }
                else if(Request.ok(response)){
                    if(callbackOk !== null && typeof callbackOk === 'function') callbackOk(Request.result(response));
                    else {
                        let result = Request.result(response);
                        let def = [];
                        for(let i = 0 ; i < result.length; i++) def.push(new NetworkLabel(result[i]));
                        return def;
                    }
                }
            }
            catch (e){
                LOGGER.log(e);
                return null;
            }
        });


        request.fail(function(response){
            LOGGER.log(response);
            showAlert("Connection Error");
            if(callbackFail !== null && typeof callbackFail === 'function') callbackFail(response);
        });

        request.always(function(){
            if(callbackAlways !== null && typeof callbackAlways === 'function') callbackAlways();
        })
    }






}





const NETWORK_LABEL_KEY_ID = "ID";
const NETWORK_LABEL_KEY_NAME = "name";
const NETWORK_LABEL_KEY_COLOR = "color";


class NetworkLabel extends ClassHelper{

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }

    constructor(object){
        super();
        this.ID = this.getValue(object,NETWORK_LABEL_KEY_ID);
        this.name =  this.getValue(object,NETWORK_LABEL_KEY_NAME);
        this.color =  this.getValue(object,NETWORK_LABEL_KEY_COLOR);
        this.selected = false;

    }

    print(parent, selectable = false){

        if(parent === null || !parent.length) return;
        let print = '<div data-id="'+this.ID+'" class="networkLabel '+(selectable ? "selectable" : "")+' "><div class="nl-card"><span></span></div></div>';
        parent.append(print);

        let element = parent.find(".networkLabel[data-id='"+this.ID+"']"); if(!element.length) return;

        element.find(".nl-card").css("background-color",this.color);
        element.find(".nl-card span").text(this.name);

    }


}