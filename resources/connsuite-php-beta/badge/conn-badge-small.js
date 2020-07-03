/**
 * Created by razvan on 14/10/2017.
 */

window.onload = loadConnBadge();


function loadConnBadge() {

    let slides = document.getElementsByClassName("connsuite-badge");
    let server = "https://www.connsuite.com/";


    let font = document.createElement("link");
    font.setAttribute("href", "https://fonts.googleapis.com/css?family=Quicksand:500");
    font.setAttribute("rel", "stylesheet");
    document.head.appendChild(font);



    let i = 0;
    for (i = 0; i < slides.length; i++) {
        let el = slides[i];


        let connID = el.getAttribute("data-client-id");
        let connBG = el.getAttribute("data-client-bg");
        let connLocation = el.getAttribute("data-location");


        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {



                let result = JSON.parse(xmlHttp.responseText)['result'];
                let print = "";

                let url = server + 'data/user/thumbnail/' + result['ID'] + '-' + result['version'] + '.jpg';
                // console.log("URL:"+url);


                if (connBG === "1" || connBG === 1)
                    print =
                        '<a target="_blank" title="View ' + result['firstname'] + '\'s Profile" href="' + server + result['username'] + '" style="display: inline-block; text-decoration:none;"><div style="min-width: 220px; height: 66px; border-radius: 33px; padding: 0 16px 0 8px;cursor: pointer;  ' +
                        'display: flex; flex-direction: row;align-items: center; justify-content: flex-start;box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);' +
                        'background: #04befe;background: linear-gradient(15deg, #4481eb, #04befe);background: -webkit-linear-gradient(15deg, #4481eb, #04befe);background: -moz-linear-gradient(15deg, #4481eb, #04befe);background: -o-linear-gradient(15deg, #4481eb, #04befe);"> ' +
                        '<img data-client-bg="1" class="connsuite-client-profile-image-131232" style="height: 46px; width: 46px; border-radius: 25px; object-fit: cover; object-position: center; border: 1px solid #ffffff; background: #ffffff;" src="' +url+'" /> ' +
                        '<div style="height: 100%; padding-left: 10px; display: flex; flex-direction: column; justify-content: center;"> ' +
                        '<span style="text-decoration:none;color: #ffffff; font-family: \'Quicksand\', sans-serif; font-size: 8pt; line-height: 1; margin-bottom: 7px; font-weight: 400;">Find me on ConnSuite</span> ' +
                        '<div style="width: 100%; display: flex; align-items: center;"><img style="height: 18px; width: 18px; margin-right: 5px;" src="' + server + 'image/logo_icon_w.png" /><span style="color: #ffffff; text-decoration:none;font-family: \'Quicksand\', sans-serif; font-size: 11pt; white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-weight: 400;">/' + result['username'] + '</span></div> ' +
                        '</div> ' +
                        '</div></a>';
                else  if (connBG === "2" || connBG === 2)
                    print =
                        '<a target="_blank" title="View ' + result['firstname'] + '\'s Profile" href="' + server + result['username'] + '" style="display: inline-block; text-decoration:none;"><div style="min-width: 220px; height: 66px; border-radius: 33px; padding: 0 16px 0 8px;cursor: pointer;  ' +
                        'display: flex; flex-direction: row;align-items: center; justify-content: flex-start;box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);' +
                        'background: #272727;background: linear-gradient(15deg, #272727, #c4c4c4);background: -webkit-linear-gradient(15deg, #272727, #c4c4c4);background: -moz-linear-gradient(15deg, #272727, #c4c4c4);background: -o-linear-gradient(15deg, #272727, #c4c4c4);"> ' +
                        '<img data-client-bg="1" class="connsuite-client-profile-image-131232" style="height: 46px; width: 46px; border-radius: 25px; object-fit: cover; object-position: center; border: 1px solid #ffffff; background: #ffffff;" src="' +url+'" /> ' +
                        '<div style="height: 100%; padding-left: 10px; display: flex; flex-direction: column; justify-content: center;"> ' +
                        '<span style="text-decoration:none;color: #ffffff; font-family: \'Quicksand\', sans-serif; font-size: 8pt; line-height: 1; margin-bottom: 7px; font-weight: 400;">Find me on ConnSuite</span> ' +
                        '<div style="width: 100%; display: flex; align-items: center;"><img style="height: 18px; width: 18px; margin-right: 5px;" src="' + server + 'image/logo_icon_w.png" /><span style="color: #ffffff; text-decoration:none;font-family: \'Quicksand\', sans-serif; font-size: 11pt; white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-weight: 400;">/' + result['username'] + '</span></div> ' +
                        '</div> ' +
                        '</div></a>';
                else if (connBG === "0" || connBG === 0)
                    print =
                        '<a target="_blank" title="View ' + result['firstname'] + ' \'s Profile"  href="' + server + result['username'] + '" style="display: inline-block;text-decoration:none;"><div style="min-width: 220px; height: 66px; border-radius: 33px; padding: 0 16px 0 8px;cursor: pointer;  ' +
                        'display: flex; flex-direction: row;align-items: center; justify-content: flex-start;box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);' +
                        'background: #ffffff;"> ' +
                        '<img data-client-bg="0" class="connsuite-client-profile-image-131232" style="height: 46px; width: 46px; border-radius: 25px; object-fit: cover; object-position: center; border: 1px solid #04befe; background: #04befe;" src="'+ url+'" /> ' +
                        '<div style="height: 100%; padding-left: 10px; display: flex; flex-direction: column; justify-content: center;"> ' +
                        '<span style="color: #04befe;text-decoration:none; font-family: \'Quicksand\', sans-serif; font-size: 8pt; line-height: 1; margin-bottom: 7px; font-weight: 400;">Find me on ConnSuite</span> ' +
                        '<div style="width: 100%; display: flex; align-items: center;"><img style="height: 18px; width: 18px; margin-right: 5px;" src="' + server + 'image/logo_icon_gr.png" /><span style="color: #04befe; text-decoration:none;font-family: \'Quicksand\', sans-serif; font-size: 11pt; white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-weight: 400;">/' + result['username'] + '</span></div> ' +
                        '</div> ' +
                        '</div></a>';



                el.innerHTML += print;




            }

        };
        let link = server + "badge/get-user.php?userID=" + connID;
        if(connLocation) link+="&location=home";
        xmlHttp.open("GET", link, true); // true for asynchronous
        xmlHttp.send(null);
    }




    setTimeout(function(){


        let images = document.getElementsByClassName("connsuite-client-profile-image-131232");

        for (i = 0; i < images.length; i++) {
            let imgEl = images[i];
            let imgURL = imgEl.getAttribute("src");
            let imgBG = imgEl.getAttribute("data-client-bg");
            let fallback = (imgBG === "1" || imgBG === 1) ? server+"image/logo_bw.png" : server+"image/logo_bgr.png";


            let img = new Image();
            img.onload = function () {
                // console.log("load");
                //imgEl.setAttribute("src", url);
            };
            img.onerror = function () {
                //console.log("error");
                imgEl.setAttribute("src", fallback);
            };
            img.onabort = function () {
                // console.log("error");
                imgEl.setAttribute("src", fallback);
            };
            img.src = imgURL;

        }

    },1000);

}









