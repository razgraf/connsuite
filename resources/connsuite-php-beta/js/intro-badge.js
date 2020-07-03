/**
 * Created by razvan on 14/10/2017.
 */
$(function(){

    let rows = $(window).width() < COL_SIZE_MAX_MD ? 2 : 1;
    let rows2 = $(window).width() < COL_SIZE_MAX_MD ? 3 : 2;

   printHelper($(".helperScriptPrint"),"<textarea rows='"+rows2+"' disabled style='width: 100%; text-align: center; border: 0; resize: none; background: transparent; color: #03A0DC'>&lt;script src='https://www.connsuite.com/badge/conn-badge-small.js' async> &lt;/script></textarea>",false);

   printHelper($("#helperBadgeWhitePrint"),"<textarea rows='"+rows+"' disabled style='width: 100%; text-align: center; border: 0; resize: none; background: transparent; color: #03A0DC'><div class='connsuite-badge' data-client-bg='0' data-client-id='"+userID+"'></div></textarea>",false);
   printHelper($("#helperBadgeGPrint"),"<textarea rows='"+rows+"' disabled style='width: 100%; text-align: center; border: 0; resize: none; background: transparent; color: #03A0DC'><div class='connsuite-badge' data-client-bg='1' data-client-id='"+userID+"'></div></textarea>",false);



});