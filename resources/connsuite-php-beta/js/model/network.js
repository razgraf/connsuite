/**
 * Created by razvan on 15/08/2017.
 */

function Network(){

    /**
     * in table : network
     */
    var ID;
    var username;
    var link;
    var userlink; // this is the full link to the user profile
    var image = new NetworkImage();
    var name; //in table network_default or network_custom

    var visible; // request only will be treated as invisible
    var description = null;

    var labels = [];
    /**
     * Special will show if the network is a simple one, so the
     * user-links will be like something like
     * -- http://www.facebook.com / username
     * or if the network is a special one like
     * -- gmail : email@gmail.com
     * So the username will not only store the username, but the full special link
     */
    var special;
    var position;

    var click;
    var custom;
    var hint;



}
Network.prototype.set = function (network) {
      /**
     * network example
     image : {
          ID: '21',
          name : 'Facebook',
          username : 'razvan.apostu'
          link : 'http://www.facebook.com',
          visible : '1',
          image : : {
             ID: '21',
             userID : '1',
             custom : '0',
             local: 'icon_facebook.png'
        }
        }
     */
    this.ID = network.hasOwnProperty('ID') ?  network['ID'] : null;
    this.name = network.hasOwnProperty('name') ? network['name'] : null;
    this.username = network.hasOwnProperty('username') ? network['username'] : null;
    this.position = network.hasOwnProperty('position') ? network['position'] : null;

    this.link = network.hasOwnProperty('link') ? network['link'] : null;

    this.userlink = network.hasOwnProperty('userlink') ? network['userlink'] : null;

    this.special = network.hasOwnProperty('special') ? network['special'] : '0';
    this.custom = network.hasOwnProperty('custom') ? network['custom'] : '0';
    if(this.custom === '0' && this.special === "0")  this.userlink = this.buildUserLink();

    this.image = new NetworkImage();
    if(network.hasOwnProperty('image')) this.image.set(network['image']);

    this.visible = network.hasOwnProperty('visible') ? network['visible'] : '0';
    this.click = network.hasOwnProperty('click') && network['click'] > 0 ? new Click(network['click']) : null;
    this.description = network.hasOwnProperty('description') && network['description'].length > 0 ? network['description'] : null;

    this.labels = [];
    if(network.hasOwnProperty('label')){
        if(network['label']!=null && network['label'].length!==0)
        for(var i = 0 ; i < network['label'].length; i++ ){
            var label = new NetworkLabel();
            label.set(network['label'][i]);
            this.labels.push(label);
        }
    }else this.labels = null;


    this.hint = network.hasOwnProperty('hint') && network['hint'].length > 0 ? network['hint'] : null;


};

Network.prototype.setArguments = function(ID, name, username,link, custom, image, visible, description, userlink, label,special,position,click){
    this.ID = ID;
    this.name = name;
    this.username = username;
    this.link = link;
    this.link = link;
    this.image = image;
    this.visible = visible;
    this.description = description && description.length > 0 ? description : null;
    this.labels = Array.from(label);
    this.special = special == null ? '0' : special;
    this.userlink = userlink;
    this.position = position;
    this.click = click;
    if(this.special === '0') this.userlink = this.buildUserLink();
};

Network.prototype.buildUserLink = function(){
  if(!this.username) return this.userlink; //FailSafe
  return this.userlink + this.username; //ex. https://www.linkedin.com/in/ + razgraf
};




/**
 * ------------------------------------------
 * Network Image
 */

function NetworkImage(){
    var ID;
    var userID;

    /**
     * var custom
     * will decide if the picture is
     * 0 -> not custom, stored the image folder
     * 1 -> custom, stored in URL
     */
    this.custom = '0';

    var url = DEFAULT_NETWORK_ICON;
    var thumbnail = DEFAULT_NETWORK_ICON;
    var name = null;



    /**
     * var url
     * will be the built URL of the custom image
     * url will be used either if image IS CUSTOM OR NOT
     * image.url
     * if image is custom -> url will be from online
     * if image is not custom -> url will be local
     */




}
//set will receive an object
NetworkImage.prototype.set = function (image) {
     /**
     * image example
          image : {
          ID: '21',
          userID : '1',
          custom : '0',
          url: 'icon_facebook.png'
        }
     */
    if(image==null) return;

    this.ID = image.hasOwnProperty('ID') ? image['ID'] : null ;
    this.userID = image.hasOwnProperty('userID') ?  image['userID'] : null;
    this.custom = image.hasOwnProperty('custom') ? image['custom'] : '0' ;


    this.name = image.hasOwnProperty('name') ? image['name'] : null;

    this.url = image.hasOwnProperty('url')  && image['url'].length > 0  ? image['url']: DEFAULT_NETWORK_ICON;
    this.thumbnail = image.hasOwnProperty('url')  && image['url'].length > 0  ? image['url'] : DEFAULT_NETWORK_ICON;

    if(this.url === DEFAULT_NETWORK_ICON){
        this.thumbnail = this.buildLocalThumbnailURL();
        this.url = this.buildLocalURL() //local icon
    }
    else {
        if (this.custom === '1') {
            this.thumbnail = this.buildCustomThumbnailURL();
            this.url = this.buildCustomURL(); //custom icon
        }
        else if (this.custom === '0') {
            this.thumbnail = this.buildLocalThumbnailURL();
            this.url = this.buildLocalURL() //local icon
        }
    }




};

//setArguments will receive each arguments
NetworkImage.prototype.setArguments = function (ID, userID, custom, url,name) {
    this.ID = ID;
    this.userID = userID;
    this.custom = custom ? custom : '0';
    this.url  = url;
    this.thumbnail = this.url;
    this.name = name;


    if(this.custom === '1') {
        this.thumbnail = this.buildCustomThumbnailURL();
        this.url = this.buildCustomURL(); //custom icon
    }
    else if(this.custom === '0') {
        this.thumbnail = this.buildLocalThumbnailURL();
        this.url = this.buildLocalURL() //local icon
    }
};

NetworkImage.prototype.buildCustomURL = function () {
    return ROOT+'data/network/normal/'+this.url;
};

NetworkImage.prototype.buildLocalURL = function (){
    return ROOT+'image/network/normal/'+this.url;
};



NetworkImage.prototype.buildCustomThumbnailURL = function () {
    return ROOT+'data/network/thumbnail/'+this.thumbnail;
};

NetworkImage.prototype.buildLocalThumbnailURL = function (){
    return ROOT+'image/network/thumbnail/'+this.thumbnail;
};

const NETWORK_IMAGE_TYPE_THUMBNAIL =  1;
const NETWORK_IMAGE_TYPE_PROFILE = 2;

NetworkImage.prototype.updateImage = function(imageType = NETWORK_IMAGE_TYPE_THUMBNAIL ,elementID){
    let image = this;
    if(imageType === NETWORK_IMAGE_TYPE_THUMBNAIL)
        imageExists(image.thumbnail,function(callback){
            if(!callback) image.thumbnail = ROOT+"image/network/thumbnail/"+DEFAULT_NETWORK_ICON;
            $(elementID).attr("src", image.thumbnail);
        });
    else if(imageType === NETWORK_IMAGE_TYPE_PROFILE)
        imageExists(image.url,function(callback){
            if(!callback) image.url = ROOT+'image/network/normal/'+DEFAULT_NETWORK_ICON;
            $(elementID).attr("src", image.url);
        });
};



/**
 * ------------------------------------------
 * Network Label
 */

function NetworkLabel()
{
    var ID;
    var name;
    var networkID;
    var color;
    var selected = false;
    var labelID;
}

NetworkLabel.prototype.set = function(label){
    if(label == null) return;
    this.ID = label.hasOwnProperty('ID') ? label['ID'] : null;
    this.networkID = label.hasOwnProperty('networkID') ? label['networkID'] : null;
    this.name = label.hasOwnProperty('name') ? label['name'] : null;
    this.color = label.hasOwnProperty('color') ? label['color'] : null;
    this.labelID = label.hasOwnProperty('labelID') ? label['labelID'] : null;
    this.selected = false;
};



function Click(total){
    let number;
    let approximation;

    if(total && total > 0) this.set(total);
}

Click.prototype.set = function(total){
  this.number = total;
  this.approximation = total+"+";
  if(total > 10) {
      if (total < 100) this.approximation = (total - total % 10) + "+";
      else this.approximation = (total / 1000) + "k+";
  }
};

