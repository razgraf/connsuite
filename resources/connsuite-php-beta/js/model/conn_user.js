/**
 * Created by razvan on 22/08/2017.
 */
function ConnUser(){
    var ID;
    var username;
    var facebookID = null;
    var name;
    var firstname;
    var lastname;
    var email;
    var phone;
    var tagline;
    var description;
    var instantiated;

    var networks = [];
    var version;
    var imageURL = null;
    var thumbnailURL = null;

    var networksCount = 0;
    var articlesCount = 0;
    var requestsCount = 0;
    var connectionsCount = 0;
}

ConnUser.prototype.set = function(user){

    this.ID = user.hasOwnProperty('ID') ?  user['ID'] : null;
    this.username = user.hasOwnProperty('username') && user['username']  ?  user['username'] : "removed";
    this.facebookID = user.hasOwnProperty('facebookID') ?  user['facebookID'] : null;
    this.firstname = user.hasOwnProperty('firstname') ?  user['firstname'] : null;
    this.lastname = user.hasOwnProperty('lastname') ?  user['lastname'] : null;
    this.name = user.hasOwnProperty('name') && user['name'] ?  user['name'] : "ConnUser";
    this.email = user.hasOwnProperty('email') ?  user['email'] : null;
    this.phone = user.hasOwnProperty('phone') ?  user['phone'] : null;
    this.tagline = user.hasOwnProperty('tagline') ?  user['tagline'] : null;
    this.description = user.hasOwnProperty('description') ?  user['description'] : null;
    this.instantiated = user.hasOwnProperty('instantiated') ?  user['instantiated'] : null;
    this.version = user.hasOwnProperty('version') ?  user['version'] : null;
    this.imageURL = this.buildProfileImageURL(this.ID, this.version);
    this.thumbnailURL = this.buildProfileThumbnailURL(this.ID,this.version);


    if(user.hasOwnProperty('networks')){
        var container = user['networks'];
        var localArray = [];
        for(var i = 0; i< container.length; i++){
            var network = new Network();
            network.set(container[i]);
            localArray.push(network);
        }

        this.networks = Array.from(localArray);
    }

    this.articlesCount = user.hasOwnProperty('articlesCount') ? user['articlesCount'] : 0;
    this.networksCount = user.hasOwnProperty('networksCount') ? user['networksCount'] : 0;
    this.requestsCount = user.hasOwnProperty('requestsCount') ? user['requestsCount'] : 0;
    this.connectionsCount = user.hasOwnProperty('connectionsCount') ? user['connectionsCount'] : 0;
};

ConnUser.prototype.buildProfileImageURL = function(userID , version){
    return (version == "0" || version == 0) ? ROOT+"image/no_people_o.png" : ROOT+"data/user/profile/"+userID+'-'+version+PROFILE_PICTURE_TYPE;
};
ConnUser.prototype.buildProfileThumbnailURL = function(userID , version){
    return (version == "0" || version == 0) ? ROOT+"image/no_people_o.png" : ROOT+"data/user/thumbnail/"+userID+'-'+version+PROFILE_PICTURE_TYPE;
};