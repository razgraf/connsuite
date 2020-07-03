/**
 * Created by razvan on 13/10/2017.
 */


const TYPE_WORLD_NEWS = '1';
const TYPE_SPONSORED = '2';
const TYPE_HOT = '3';
function News(){
    let ID;
    let typeID;
    let type = new Type();
    let title;
    let url;
    let imageURL;
    let version;
    let instantiated;
    let date;
}

News.prototype.set = function(item){
    if(item === null) return;
    this.type = new Type();
    this.ID = item.hasOwnProperty("ID") ? item['ID'] : null;
    this.type.ID  = item.hasOwnProperty("typeID") ? item['typeID'] : null;

    this.findType(this.type.ID);


    this.title = item.hasOwnProperty("title") ? item['title'] : null;
    this.url = item.hasOwnProperty("url") ? item['url'] : null;
    this.version = item.hasOwnProperty("version") ? item['version'] : null;
    this.url = item.hasOwnProperty("url") ? item['url'] : null;


    this.instantiated = item.hasOwnProperty("instantiated") ? item['instantiated'] : null;


    this.date = this.instantiated;
    this.date =  ((this.date).toDate("yyyy-mm-dd")).toLocaleString("en-US",options);

    this.imageURL = this.buildImageURL(this.ID,this.version)

};


News.prototype.buildImageURL = function(ID,version){
    return (version == "0" || version == 0) ? ROOT+"image/profile_background.png" : ROOT+"data/news/"+ID+'-'+version+".jpg";

};


News.prototype.findType = function(ID){
    let list = createTypeList();
    for(let i = 0; i< list.length; i++) if(parseInt(list[i].ID) === parseInt(ID)){
        this.type.color = list[i].color;
        this.type.name = list[i].name;
    }
};

function Type(aID = null,aName = null,aColor = null){
    let ID;
    let color;
    let name;

    if(aID && aName && aColor) this.set(aID,aName,aColor);
}
Type.prototype.set = function(ID, name,color){
    this.ID = ID;
    this.name = name;
    this.color = color;
};

function createTypeList(){
    let list = [];
    list.push(new Type(TYPE_HOT,"Hot Now","#F44336"));
    list.push(new Type(TYPE_SPONSORED,"Sponsored","#FF9800"));
    list.push(new Type(TYPE_WORLD_NEWS,"World News","#2196F3"));
    return list;
}