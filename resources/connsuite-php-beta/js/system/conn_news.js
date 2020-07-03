/**
 * Created by razvan on 13/10/2017.
 */

/**
 *
 * @param depthToRoot
 * @param parent
 * @param {News} news
 */
function buildConnNews(depthToRoot,parent,news) {

    let prePath = "";
    let i;
    for (i = 0; i < depthToRoot; i++) prePath += "../";



    let print = '<div class="item"><div class="connNewsOuterContainer" > ' +
        '<div class="connNewsContainer" > ' +
        '<div class="connNewsImageContainer"> ' +
        '<img id="connNewsImage-'+news.ID+'"/> ' +
        '</div> ' +
        '<div class="connNewsBottomContainer"> ' +
        '<div class="connNewsTitleContainer"> ' +
        '<p class="connNewsTitle">'+news.title+'</p> ' +
        '<div class="connNewsInfoContainer"> ' +
        '<span class="connNewsDate">'+news.date+'</span> ' +
        '<span class="connNewsBadge" style="color: '+news.type.color+'">· '+news.type.name+'</span> ' +
        '</div> ' +
        '</div> ' +
        '<a onclick="doNewsVisit('+news.ID+')" target="_blank" href="'+news.url+'" class="connNewsViewButtonContainer"><span class="connNewsViewButton">Read More</span></a> ' +
        '</div> ' +
        '</div> ' +
        '</div></div>';





    parent.append(print);
    imageExists(news.imageURL,function(callback){
        if(!callback) news.imageURL = prePath+"image/profile_background.png";
        $("#connNewsImage-"+news.ID).prop("src",news.imageURL)
    });



}