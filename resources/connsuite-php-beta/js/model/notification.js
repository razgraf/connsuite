/**
 * Created by razvan on 27/08/2017.
 */
function ConnNotification(response){
    var ID;
    var text;
    var sourceID;
    var requestID;
    var targetID;
    var type;
    var seen;
    var instantiated;
    var source; var target;
    var opposite = null;

    if(response.hasOwnProperty('type')) {
        try {
            this.type = parseInt(response['type']);
            switch (this.type){
                case kCSNotificationTypeBusinessRequest : this.setNotificationBusinessRequest(response); break;
                case kCSNotificationTypeBusinessRequestAccepted : this.setNotificationBusinessAccepted(response); break;
                case kCSNotificationTypeBusinessRequestSelfAccepted : this.setNotificationBusinessSelfAccepted(response); break;
                case kCSNotificationTypeTutorial : this.setNotificationCustom(response); break;
            }
        }catch(err){}
    }


}


ConnNotification.prototype.setNotificationBusinessRequest = function(response){
    this.ID = response.hasOwnProperty('ID') ? response['ID'] : null;
    this.sourceID = response.hasOwnProperty('sourceID') ? response['sourceID'] : null;
    this.targetID = response.hasOwnProperty('targetID') ? response['targetID'] : null;
    this.requestID = response.hasOwnProperty('requestID') ? response['requestID'] : null;
    this.type = response.hasOwnProperty('type') ? kCSNotificationTypeBusinessRequest : null;
    this.seen = response.hasOwnProperty('seen') ? response['seen'] : null;
    this.instantiated = response.hasOwnProperty('instantiated') ? response['instantiated'] : null;
    this.source = response.hasOwnProperty('source') ? new ConnUser() : null;
    if(this.source !== null) {
        this.source = new ConnUser();
        (this.source).set(response['source']);

        this.text = "You have received a business card request from " + (this.source).name + " (" + (this.source).username + ").";
    }

    this.opposite = response.hasOwnProperty('opposite') ? response['opposite'] : null;
    if(this.opposite == "null") this.opposite = null;

};

ConnNotification.prototype.setNotificationBusinessSelfAccepted = function(response){
    this.ID = response.hasOwnProperty('ID') ? response['ID'] : null;
    this.sourceID = response.hasOwnProperty('sourceID') ? response['sourceID'] : null;
    this.targetID = response.hasOwnProperty('targetID') ? response['targetID'] : null;
    this.type = response.hasOwnProperty('type') ? kCSNotificationTypeBusinessRequestSelfAccepted : null;
    this.seen = response.hasOwnProperty('seen') ? response['seen'] : null;
    this.instantiated = response.hasOwnProperty('instantiated') ? response['instantiated'] : null;
    this.source = new ConnUser();
    this.source = response.hasOwnProperty('source') ? new ConnUser() : null;
    if(this.source !== null) {
        this.source = new ConnUser();
        (this.source).set(response['source']);

        this.text = "You have accepted to share your business card with " + (this.source).name + " (" + (this.source).username + ").";
    }
};

ConnNotification.prototype.setNotificationBusinessAccepted = function(response){
    this.ID = response.hasOwnProperty('ID') ? response['ID'] : null;
    this.sourceID = response.hasOwnProperty('sourceID') ? response['sourceID'] : null;
    this.targetID = response.hasOwnProperty('targetID') ? response['targetID'] : null;
    this.type = response.hasOwnProperty('type') ? kCSNotificationTypeBusinessRequestAccepted : null;
    this.seen = response.hasOwnProperty('seen') ? response['seen'] : null;
    this.instantiated = response.hasOwnProperty('instantiated') ? response['instantiated'] : null;
    this.target = new ConnUser();
    this.target = response.hasOwnProperty('target') ? new ConnUser() : null;
    if(this.target !== null) {
        this.target = new ConnUser();
        (this.target).set(response['target']);

        this.text = (this.target).name + " (" + (this.target).username + ") " + "has accepted your business card request.";
    }

};

ConnNotification.prototype.setNotificationCustom = function(response){
    this.ID = response.hasOwnProperty('ID') ? response['ID'] : null;
    this.type = response.hasOwnProperty('type') ? kCSNotificationTypeCustom : null;
    this.seen = response.hasOwnProperty('seen') ? response['seen'] : null;
    this.instantiated = response.hasOwnProperty('instantiated') ? response['instantiated'] : null;
    this.target = new ConnUser();
    this.target = response.hasOwnProperty('target') ? new ConnUser() : null;
    this.text =  response.hasOwnProperty('text') ? response['text'] : null;
};