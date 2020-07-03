/**
 * Created by razvan on 14/10/2017.
 */
$(function(){

   printHelper($(".helperScriptPrint"),"<textarea rows='2' disabled style='width: 100%; text-align: center; border: 0; resize: none; background: transparent; color: #03A0DC'>&lt;script src='https://www.connsuite.com/badge/conn-badge-small.js' async> &lt;/script></textarea>",false);

   $(".questionExpandButton").on("click",function(e){
       e.stopPropagation();
       let button = this;
       $(button).parent().parent().children(".questionAnswerContainer").animate({height : "toggle" },500,function(){
          console.log($(this).css("display"));
         if($(this).css("display") === "none") $(button).text("Show More");
         else $(button).text("Show Less");
      });
   });
    $(".questionTitleContainer").on("click",function(e){
        let button = $(this).children(".questionExpandButton");
        e.stopPropagation();
        $(button).parent().parent().children(".questionAnswerContainer").animate({height : "toggle" },500,function(){
            console.log($(this).css("display"));
            if($(this).css("display") === "none") $(button).text("Show More");
            else $(button).text("Show Less");
        });
    })

});