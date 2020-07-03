/**
 * Created by razvan on 24/08/2017.
 */


function Article(){
    let ID;
    let title;
    let content;
    let contentForEdit;
    let user = new ConnUser();
    let instantiated;
    let imageURL;
    let thumbnailURL;
    let date;
    let imageList = [];
    /**
     *
     * @type {Array} will store the LIST of identifiers matching one article.
     */
    let identifier = [];
}

Article.prototype.set = function(article){
    this.ID = article.hasOwnProperty("ID") ? article['ID'] : null;
    this.title = article.hasOwnProperty("title") ? article['title'] : null;
    this.content = article.hasOwnProperty("content") ? article['content'] : null;
    this.contentForEdit = article.hasOwnProperty("contentForEdit") ? article['contentForEdit'] : null;
    this.instantiated = article.hasOwnProperty("instantiated") ? article['instantiated'] : null;
    this.imageURL = article.hasOwnProperty("imageURL") ? article['imageURL'] : null;
    this.thumbnailURL = article.hasOwnProperty("thumbnailURL") ? article['thumbnailURL'] : null;
    this.user = new ConnUser();
    if(article.hasOwnProperty('user')) { this.user.set(article['user']); }

    this.date = "Now";
    if(this.instantiated) {
        this.date = this.instantiated;
        this.date = ((this.date).toDate("yyyy-mm-dd")).toLocaleString("en-US", options);
    }

    this.imageList = [];
    if(article.hasOwnProperty('imageList')){
        article['imageList'] = JSON.parse(article['imageList']);
        for(let i =0; i < article['imageList'].length; i++){
            (this.imageList).push(article['imageList'][i]);
        }
    }

    if(this.content && this.content.length > 0)
        try{this.content = JSON.parse(this.content);} catch (e){}

    if(this.contentForEdit && this.contentForEdit.length > 0)
        try{this.contentForEdit = JSON.parse(this.contentForEdit);} catch (e){}

    this.identifier = [];
    if(article.hasOwnProperty("identifier")) this.buildIdentifierList(article['identifier']);

};

Article.prototype.buildIdentifierList = function(response){
    this.identifier = [];
    if(response && response.constructor === Array){
        for(let i =0; i<  response.length;i++){
            this.identifier.push(response[i]);
        }
    }
};