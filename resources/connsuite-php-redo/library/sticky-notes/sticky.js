/**
 * Created by @VanSoftware on 15/06/2018.
 */


const STICKY_LIBRARY_KEY_ID = "ID";
const STICKY_LIBRARY_KEY_PARENT_ID = "parentID";
const STICKY_LIBRARY_KEY_TITLE = "title";
const STICKY_LIBRARY_KEY_CONTENT = "content";
const STICKY_LIBRARY_KEY_DATE_CREATED = "instantiated";
const STICKY_LIBRARY_KEY_DATE_EDITED = "edited";
const STICKY_LIBRARY_KEY_INDEX = "index";

const STICKY_LIBRARY_KEY_TYPE = "type";
const STICKY_LIBRARY_TYPE_EMPLOYEE = 1;
const STICKY_LIBRARY_TYPE_JOB = 2;

class Sticky {
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
    }

    get URLRemove() {
        return this._URLRemove;
    }

    set URLRemove(value) {
        if(value !== null && value.length === 0) value = null;
        this._URLRemove = value;
    }
    get URLEdit() {
        return this._URLSave;
    }

    set URLEdit(value) {
        if(value !== null && value.length === 0) value = null;
        this._URLSave = value;
    }

    get URLAdd() {
        return this._URLAdd;
    }

    set URLAdd(value) {
        if(value !== null && value.length === 0) value = null;
        this._URLAdd = value;
    }

    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }
    get parentID() {
        return this._parentID;
    }

    set parentID(value) {
        this._parentID = value;
    }
    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    constructor(URLAdd ,URLEdit ,URLRemove, parentID,type) {
        this.title = null;
        this.content = null;
        this.ID = null;
        this.index = null;
        this.parentID = parentID;
        this.URLAdd = URLAdd;
        this.URLEdit = URLEdit;
        this.URLRemove = URLRemove;
        this.type = type;
        return this;
    }

    static print() {
        let code = '<div class="sticky-library-environment"> ' +
            '<div class="sticky-library-environment-content"> ' +
            '<div class="sticky-library-modal"> ' +
            '<div class="sticky-library-modal-header"> ' +
            '<p class="sticky-library-modal-header-title-index"></p>'+
            '<input maxlength="200" title="Title" placeholder="Note title" class="sticky-library-modal-header-title" value=""> ' +
            '<div class="sticky-library-modal-header-close"><span>X</span></div> ' +
            '</div> ' +
            '<div class="sticky-library-modal-content"> ' +
            '<div class="sticky-library-modal-content-card"> ' +
            '<textarea data-gramm_editor="false" maxlength="2000" title="Content" placeholder="Note content here..."></textarea> ' +
            '</div> ' +
            '</div> ' +
            '<div class="sticky-library-modal-footer"> '+
            '<div class="sticky-library-modal-footer-info">' +
            '<span class="sticky-library-modal-info-field" data-name="'+STICKY_LIBRARY_KEY_DATE_CREATED+'"></span>' +
            '<span class="sticky-library-modal-info-field" data-name="'+STICKY_LIBRARY_KEY_DATE_EDITED+'"></span>' +
            '</div>'+
            '<div class="sticky-library-button-container">'+
            '<div class="sticky-library-button-save"><span>Save Changes</span></div> ' +
            '<div class="sticky-library-button-remove"><span>Remove</span></div> ' +
            '<div class="sticky-library-button-close"><span>Close</span></div> ' +
            '</div>'+
            '</div> ' +
            '</div> ' +
            '</div> ' +
            '</div>';

        $("body").append(code);
        return this;
    };

    static manageSaveButton(){
        let environment = $(".sticky-library-environment");
        if (environment === null || environment.length === 0) return;

        let title = environment.find(".sticky-library-modal-header-title").length > 0 ? environment.find('.sticky-library-modal-header-title').val() : null;
        let content = environment.find(".sticky-library-modal-content-card > textarea").length > 0 ? environment.find('.sticky-library-modal-content-card > textarea').val() : null;

        if(title === null || title.length === 0 || content === null || content.length === 0 ) StickyRow.disableButtonClick(environment.find(".sticky-library-button-save"));
        else StickyRow.enableButtonClick(environment.find(".sticky-library-button-save"));
    };

    save(newNote = null){


        let environment = $(".sticky-library-environment");
        if (environment === null || environment.length === 0) return;

        let title = environment.find(".sticky-library-modal-header-title").length > 0 ? environment.find('.sticky-library-modal-header-title').val() : null;
        let content = environment.find(".sticky-library-modal-content-card > textarea").length > 0 ? environment.find('.sticky-library-modal-content-card > textarea').val() : null;

        if(title === null || title.length === 0 || content === null || content.length === 0 ) StickyAlert.showAlert("The content/title of the note is not valid.",ALERT_TYPE_FAILURE,600);

        this.title = title;
        this.content = content;

        if(this.parentID === null || this.URLAdd === null || this.URLEdit === null){
            StickyAlert.showAlert("Issue with parentID or URL.",ALERT_TYPE_FAILURE,1000);
            return;
        }


        let saveRequest =
            $.ajax({
                type : "POST",
                url : this.URLEdit,
                data : {
                    AID : this.parentID,
                    ID : this.ID,
                    title : this.title,
                    content : this.content,
                    type : this.type
                }
            });
        if(newNote !== null) saveRequest =
            $.ajax({
                type : "POST",
                url : this.URLAdd,
                data : {
                    AID : this.parentID,
                    title : this.title,
                    content : this.content,
                    type : this.type
                }
            });

        saveRequest.done(function(response){
            let result = Request.manage(response);
            if(result && result.length > 0){
                if($("main").length > 0) StickyRow.disableButtonClick($("main"));
                Sticky.hide();
                StickyAlert.showAlert("Your note has been saved.",STICKY_LIBRARY_ALERT_TYPE_SUCCESS,800,function(){window.location.reload(true);});
            }
            else  StickyAlert.showAlert("Error on saving note.",STICKY_LIBRARY_ALERT_TYPE_FAILURE,600);
        });

        saveRequest.fail(function(e){
            StickyAlert.showAlert("Connection Error.",STICKY_LIBRARY_ALERT_TYPE_FAILURE,600);
            Sticky.hide();
        });

    };


    remove(){

        let self = this;
        let environment = $(".sticky-library-environment");
        if (environment === null || environment.length === 0) return;

        if(this.ID === null || this.URLRemove === null){
            StickyAlert.showAlert("Issue with note ID.",STICKY_LIBRARY_ALERT_TYPE_FAILURE,1000);
            return;
        }


        let removeRequest = $.ajax({
            type : "POST",
            url : self.URLRemove,
            data : {
                ID : self.ID
            }
        });

        removeRequest.done(function(response){
            console.log(response);
            let result = Request.manage(response);
            if(result && result.length > 0){
                Sticky.hide();
                let element = $(".sticky-library-note-card-container[data-parent='"+self.parentID+"-"+self.index+"']");
                if(element.length > 0) element.hide(150);
                if($("main").length > 0) StickyRow.disableButtonClick($("main"));
                StickyAlert.showAlert("The note has been removed.",STICKY_LIBRARY_ALERT_TYPE_SUCCESS,800,function () {
                    window.location.reload(true);
                });}
            else  StickyAlert.showAlert("Error on removing note.",STICKY_LIBRARY_ALERT_TYPE_FAILURE,600);
            console.log(result);
        });

        removeRequest.fail(function(e){
            StickyAlert.showAlert("Connection Error.",STICKY_LIBRARY_ALERT_TYPE_FAILURE,600);
            Sticky.hide();
        })

    };


    /**
     *
     * @param {Object} object
     * @param {String|int} object.ID
     * @param {String|int} object.ID
     * @param {String} object.title
     * @param {String} object.content
     *
     */
    show(object = {}) {

        if(isDataSetInObject(STICKY_LIBRARY_KEY_ID,object)) this.ID = object[STICKY_LIBRARY_KEY_ID];
        if(isDataSetInObject(STICKY_LIBRARY_KEY_PARENT_ID,object)) this.parentID = object[STICKY_LIBRARY_KEY_PARENT_ID];
        if(isDataSetInObject(STICKY_LIBRARY_KEY_TITLE,object)) this.title = object[STICKY_LIBRARY_KEY_TITLE]; else return;
        if(isDataSetInObject(STICKY_LIBRARY_KEY_CONTENT,object)) this.content = object[STICKY_LIBRARY_KEY_CONTENT]; else return;
        if(isDataSetInObject(STICKY_LIBRARY_KEY_INDEX,object)) this.index = object[STICKY_LIBRARY_KEY_INDEX]; else return;


        let environment = $(".sticky-library-environment");
        let self = this;

        try {
            if (environment === null || environment.length === 0) {
                Sticky.print();
                environment = $(".sticky-library-environment");
            }

            //NOTE CONTENT
            environment.find(".sticky-library-environment-content").unbind().on("click",function(e){ if(e.target !== this) return; Sticky.hide(); });

            environment.find(".sticky-library-modal-header-title").val(this.title).unbind().on("keyup", function () {
                Sticky.manageSaveButton();
            });

            environment.find(".sticky-library-modal-content-card  textarea").val(this.content).unbind().on("keyup", function () {
                Sticky.manageSaveButton();
            });

            //NOTE HEADER BUTTONS
            environment.find(".sticky-library-modal-header-close").unbind().on("click", function () {
                Sticky.hide();
            });

            //NOTE FOOTER BUTTONS
            environment.find(".sticky-library-button-close").unbind().on("click", function () {
                Sticky.hide();
            });

            environment.find(".sticky-library-button-save").unbind().on("click", function () {
                self.save();
            });
            StickyRow.disableButtonClick(environment.find(".sticky-library-button-save"));

            let buttonRemove = environment.find(".sticky-library-button-remove");
            if(!buttonRemove.is(":visible")) buttonRemove.show();
            buttonRemove.unbind().on("click", function () {
                self.remove();
            });


            if(object !== null){
                if(isDataSetInObject(STICKY_LIBRARY_KEY_INDEX,object)){environment.find(".sticky-library-modal-header-title-index").show().text(object[STICKY_LIBRARY_KEY_INDEX]);}
                let footerInfo =  environment.find(".sticky-library-modal-footer-info");
                if(isDataSetInObject(STICKY_LIBRARY_KEY_DATE_CREATED,object))
                    footerInfo.find(".sticky-library-modal-info-field[data-name='"+STICKY_LIBRARY_KEY_DATE_CREATED+"']").show().text("Created: "+Sticky.getParsedDate(object[STICKY_LIBRARY_KEY_DATE_CREATED]));
                if(isDataSetInObject(STICKY_LIBRARY_KEY_DATE_EDITED,object))
                    footerInfo.find(".sticky-library-modal-info-field[data-name='"+STICKY_LIBRARY_KEY_DATE_EDITED+"']").show().text("Last Edit: "+Sticky.getParsedDate(object[STICKY_LIBRARY_KEY_DATE_EDITED]));

            }

            $("body").addClass("stickyShowing");
            environment.fadeIn(150);


        }
        catch (err) {
            this.ID = null;
            console.log(err);
            if (environment.length > 0) environment.remove();
        }
    };



    showAdd() {

        /**
         * parentID should be stored in object(this)
         * @type {*}
         */

        if(this.parentID === null) return;
        let self = this;

        let environment = $(".sticky-library-environment");

        try {
            if (environment === null || environment.length === 0) {
                Sticky.print();
                environment = $(".sticky-library-environment");
            }

            //NOTE CONTENT
            environment.find(".sticky-library-environment-content").unbind().on("click",function(e){ if(e.target !== this) return; Sticky.hide(); });

            environment.find(".sticky-library-modal-header-title").val("").unbind().on("keyup", function () {
                Sticky.manageSaveButton();
            });
            environment.find(".sticky-library-modal-header-title-index").text("NEW");

            environment.find(".sticky-library-modal-content-card > textarea").val("").unbind().on("keyup", function () {
                Sticky.manageSaveButton();
            });

            //NOTE HEADER BUTTONS
            environment.find(".sticky-library-modal-header-close").unbind().on("click", function () {
                Sticky.hide();
            });

            //NOTE FOOTER BUTTONS
            environment.find(".sticky-library-button-close").unbind().on("click", function () {
                Sticky.hide();
            });

            environment.find(".sticky-library-button-save").unbind().on("click", function () {
                self.save("NEW");
            });
            let buttonRemove = environment.find(".sticky-library-button-remove");
            if(buttonRemove.is(":visible")) buttonRemove.hide();



            let footerInfo =  environment.find(".sticky-library-modal-footer-info");
            footerInfo.find(".sticky-library-modal-info-field[data-name='"+STICKY_LIBRARY_KEY_DATE_CREATED+"']").hide();
            footerInfo.find(".sticky-library-modal-info-field[data-name='"+STICKY_LIBRARY_KEY_DATE_EDITED+"']").hide();

            $("body").addClass("stickyShowing");
            environment.fadeIn(150);


        }
        catch (err) {
            this.ID = null;
            console.log(err);
            if (environment.length > 0) environment.remove();
        }
    };




    static hide() {
        this.ID = null;
        this.parentID = null;
        this.title = null;
        this.content = null;

        $("body").removeClass("stickyShowing");
        let environment = $(".sticky-library-environment");
        if (environment !== null && environment.length > 0) {
            environment.find(".sticky-library-modal-content-card > textarea").val("");
            environment.find(".sticky-library-modal-header-title").val("");
            environment.fadeOut(150,function(){environment.removeClass("show").removeClass("hiding");});
        }
    }


    static getParsedDate(date){
        let dateCopy = date;
        try{
            moment.locale('en-gb');

            return moment(date).format('DD MMMM YYYY HH:mm');
        }
        catch(e){console.log(e);}
        return dateCopy;
    }
}



class StickyRow{
    get count() {
        return this._count;
    }

    set count(value) {
        this._count = value;
    }
    /**
     *
     * @returns {Sticky | null}
     */
    get modal() {
        return this._modal;
    }
    /**
     *
     * @param {Sticky | null} value
     */
    set modal(value) {
        this._modal = value;
    }
    get URLRetrieveList() {
        return this._URLRetrieveList;
    }

    set URLRetrieveList(value) {
        this._URLRetrieveList = value;
    }
    get URLRemove() {
        return this._URLRemove;
    }

    set URLRemove(value) {
        this._URLRemove = value;
    }
    get URLEdit() {
        return this._URLEdit;
    }

    set URLEdit(value) {
        this._URLEdit = value;
    }
    get URLAdd() {
        return this._URLAdd;
    }

    set URLAdd(value) {
        this._URLAdd = value;
    }
    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }
    get parentID() {
        return this._parentID;
    }

    set parentID(value) {
        this._parentID = value;
    }

    get offset() {
        return this._offset;
    }

    set offset(value) {
        this._offset = value;
    }
    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }

    get URLRetrieve() {
        return this._URLRetrieve;
    }

    set URLRetrieve(value) {
        this._URLRetrieve = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    /**
     *
     * @param {String | int} type
     * @param {Element} parent
     * @param {String | int} parentID
     * @param {Object} API
     * @returns {*}
     */
    constructor(type, parent, parentID, API){

        let self  = this;

        this.URLRetrieveList = isDataSetInObject("URL_NOTE_RETRIEVE_LIST",API) ? API["URL_NOTE_RETRIEVE_LIST"] : null;
        this.URLRetrieve = isDataSetInObject("URL_NOTE_RETRIEVE",API) ? API["URL_NOTE_RETRIEVE"] : null;
        this.URLRemove = isDataSetInObject("URL_NOTE_REMOVE",API) ? API["URL_NOTE_REMOVE"] : null;
        this.URLEdit = isDataSetInObject("URL_NOTE_EDIT",API) ? API["URL_NOTE_EDIT"] : null;
        this.URLAdd = isDataSetInObject("URL_NOTE_ADD",API) ? API["URL_NOTE_ADD"] : null;
        this.type = type;
        this.limit = 4;
        this.offset = 0;
        this.count = null;
        this.parent = parent;
        this.parentID = parentID;


        this.modal = new Sticky(this.URLAdd ,this.URLEdit ,this.URLRemove, parentID, this.type);


        if(!this.parent.length > 0 ) return;
        if(!this.parent.hasClass("sticky-library-row")) this.parent.addClass("sticky-library-row");
        this.manageLoadButton();
        this.printCardAdd().manageCardAdd();





        this.retrieve();


        return this;
    }


    printCardAdd(){
        let code =  '<div class="sticky-library-note-card-container"> ' +
            '<div class="sticky-library-note-card-add"> ' +
            '<p>+</p> ' +
            '<span>Add New Note</span> ' +
            '</div> ' +
            '</div>';
        this.parent.append(code);
        return this;
    }


    manageCardAdd(){
        let self = this;
        this.parent.find(".sticky-library-note-card-add").unbind().on("click",function(){
            self.modal.showAdd();
        });
        return this;
    }



    printCard(index,object){
        let self = this;
        let title = isDataSetInObject(STICKY_LIBRARY_KEY_TITLE,object) ? object[STICKY_LIBRARY_KEY_TITLE] : "-";
        let content = isDataSetInObject(STICKY_LIBRARY_KEY_CONTENT,object) ? object[STICKY_LIBRARY_KEY_CONTENT] : "-";
        let edit = isDataSetInObject(STICKY_LIBRARY_KEY_DATE_EDITED,object) ? object[STICKY_LIBRARY_KEY_DATE_EDITED] : "-";

        let code = ' <div class="sticky-library-note-card-container" data-parent="'+this.parentID+'-'+index+'"> ' +
            '<div class="sticky-library-note-card"> ' +
            '<div class="sticky-library-note-card-inner"> ' +
            '<div class="sticky-library-note-card-header"><div class="sticky-library-note-card-header-title"><span class="sticky-library-note-card-header-index"></span><p></p></div></div> ' +
            '<div class="sticky-library-note-card-content"> ' +
            '<div></div> ' +
            '<div><span></span></div> ' +
            '</div> ' +
            '<div class="sticky-library-note-card-footer"> <p class="sticky-library-note-card-footer-date"></p><div class="sticky-library-note-card-footer-button"><i class="material-icons">edit</i></div></div> ' +
            '</div> ' +
            '</div> ' +
            '</div>';
        this.parent.append(code);

        let element =  this.parent.find(".sticky-library-note-card-container[data-parent='"+this.parentID+'-'+index+"']");

        element.find(".sticky-library-note-card-header-title p").text(title);
        element.find(".sticky-library-note-card-header-index").text(index);
        element.find(".sticky-library-note-card-footer-date").text("Edited: "+ Sticky.getParsedDate(edit));
        element.find(".sticky-library-note-card-content span").text(content);


        element.find(".sticky-library-note-card-footer-button").unbind().on("click",function(){
            object[STICKY_LIBRARY_KEY_INDEX] = index;
            self.modal.show(object);
        });

        return this;
    }

    manageLoadButton(toggle = false){
        let self = this;
        try {
            let button = self.parent.siblings(".sticky-library-row-button-load");
            if (button === null || button.length === 0){
                self.parent.after('<div data-tooltip="Show more notes" class="sticky-library-row-button-load"><i class="material-icons">get_app</i><span>Load more</span></div>');
                self.parent.siblings(".sticky-library-row-button-load").unbind().on("click",function(){self.retrieve();})
                button = self.parent.siblings(".sticky-library-row-button-load");
            }
            if(toggle){
                if(button.is(":visible")){
                    button.hide();
                }
                else button.show();
            }


        }
        catch (err){
            console.log(err);
        }

    }



    retrieve(){
        let self = this;
        let button = this.parent.siblings(".sticky-library-row-button-load");
        if(button.length > 0) StickyRow.disableButtonClick(button);


        let getSticky = $.ajax({
            type : "GET",
            url : this._URLRetrieveList,
            data : {
                type : this.type,
                AID : this.parentID,
                limit : this.limit,
                offset : this.offset
            }
        });

        getSticky.done(function(response){
            let result = Request.manage(response);
            if(result && result.length > 0){
                self.count = self.count === null && result[0].hasOwnProperty('count') ? result[0]['count'] : self.count;
                for(let i=0; i < result.length; i++){
                    let index = parseInt(1+i+self.offset)+ "/" + self.count;
                    self.printCard(index,result[i]);
                }

                let firstChild =  self.parent.find(".sticky-library-note-card-container[data-parent='"+self.parentID+'-'+parseInt(1+self.offset)+ "/" + self.count+"']");
                if(firstChild.length > 0 && self.offset !== 0) {
                    self.parent.animate({
                        scrollLeft: firstChild.width() * (self.offset+1)
                    }, 1000);
                }
            }
            if(!result || result.length < self.limit || parseInt(self.offset+self.limit) === parseInt(self.count) ) self.manageLoadButton(true);
            self.offset += self.limit;
        });

        getSticky.fail(function(e){self.manageLoadButton(true);});

        getSticky.always(function(){
            if(button.length > 0) StickyRow.enableButtonClick(button);
        })
    }



    static disableButtonClick(element, loader = false){
        if(!element.hasClass("disableClick")) element.addClass("disableClick");
        if(loader) {
            if(! element.find(".loader").length > 0){
                element.append("<div class='loader'></div>")
            }
            element.find(".loader").show(150);
        }
    }

    static enableButtonClick(element,loader = false){
        if(element.hasClass("disableClick"))element.removeClass("disableClick");
        if(loader) {
            if(! element.find(".loader").length > 0){
                element.append("<div class='loader'></div>")
            }
            element.find(".loader").hide(150);
        }
    }


}


const STICKY_LIBRARY_ALERT_TYPE_SUCCESS = 1;
const STICKY_LIBRARY_ALERT_TYPE_FAILURE = 2;


class StickyAlert{

    static initAlert(){
        let print = '<div id="customAlertContainer"> ' +
            '<div id="customAlertSuccess" class="customAlert" role="alert" style="display: none" ><span></span></div> ' +
            '<div id="customAlertFailure" class="customAlert" role="alert" style="display: none" ><div class="warnContainer"><i class="material-icons">warning </i></div><span></span></div> ' +
            '</div>';

        $("body").append(print);
    }

    static showAlert(text,type = STICKY_LIBRARY_ALERT_TYPE_SUCCESS,timeout = 1000,callback = null){

        if($("#customAlertContainer").length === 0) this.initAlert();

        if(type === STICKY_LIBRARY_ALERT_TYPE_SUCCESS){
            $("#customAlertSuccess span").text(text);
            $("#customAlertSuccess").fadeIn('normal');
            setTimeout(function () {
                $("#customAlertSuccess").fadeOut('slow');
            }, timeout);
        }
        else if (type === STICKY_LIBRARY_ALERT_TYPE_FAILURE){
            $("#customAlertFailure span").text(text);
            $("#customAlertFailure").fadeIn('normal');
            setTimeout(function () {
                $("#customAlertFailure").fadeOut('slow');
            }, timeout);
        }

        if(callback !== null) setTimeout(function () {callback();}, timeout);
    }

}

