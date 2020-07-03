/**
 * Created by razvan on 24/08/2017.
 */


/**
 *
 * @param depthToRoot
 * @param parent //$("#articleParent")
 * @param {Network} network
 */
function buildConnArticle(depthToRoot,parent,article,self){

    var prePath="";
    for (var i = 0; i < depthToRoot; i++) prePath += "../";


    var print = '<div class="col-sm-4 col-xs-12 connArticleOuterContainer" > ' +
            '<div class="connArticleContainer" > ' +
                '<div class="connArticleHeader"> ' +
                    '<div class="connArticleHeaderBackground" id="connArticleHeaderBackground-'+article.ID+'"></div> ' +
                    '<div class="connArticleHeaderOverlay"></div> ' +
                    '<div class="connArticleHeaderTitleContainer"> ';
        if(self && self === true)  print+= '<div onclick="showDeleteArticleModal(\''+article.ID+'\',\''+article.title+'\')" title="Remove Article" class="connArticleRemoveContainer"><i style="font-size: 17pt;" class="material-icons">&#xE15D;</i></div>';
        if(self && self === true)  print+= '<a href="'+prePath+'p/article/edit.php?articleID='+article.ID+'" title="Edit Article" class="connArticleEditContainer"><i style="font-size: 15pt; color: #ffffff;" class="material-icons">&#xE254;</i></a>';
    print+='<div class="connArticleHeaderRibbonContainer"> ' +
                    '<div class="connArticleHeaderRibbon"> ' +
                    '<img src="'+prePath+'image/connsuite_icon_rounded.png"/> ' +
                    '</div> ' +
                    '</div> ' +
                    '<span class="connArticleHeaderTitle">'+article.title+'</span> ' +
                    '</div> ' +
                '</div> ' +
                '<div class="connArticleContent"> ' +
                    '<p class="connArticleContentTitle" title="'+article.title+'">'+(article.title).substring(0,70)+'</p> ' +
                    '</div> ' +
                    '<div class="connArticleFooter"> ' +
                    '<p class="connArticleContentDate">'+article.date+'</p> ' +
                    '<div> ' +
                    '<a href="'+prePath+'p/article/view.php?articleID='+article.ID+'" class="connArticleMoreButton"><span>Read More</span></a> ' +
                    '</div> ' +
                '</div> ' +
            '</div> ' +
        '</div>';



    parent.append(print);

    imageExists(article.thumbnailURL,function(callback){
        if(!callback) article.thumbnailURL = prePath+"image/background.jpg";
        $("#connArticleHeaderBackground-"+article.ID).css("background-image","url('"+article.thumbnailURL+"')");
    });


}




