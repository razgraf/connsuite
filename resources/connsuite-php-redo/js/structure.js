/**
 * Created by @VanSoftware on 10/06/2018.
 */

class Structure{

    /**
     *
     * @param {string} identifier
     * @param {(Array|null)}  extra
     */
    static initPrimary(identifier, extra = null){


        let page = findPrimaryPageByID(identifier); if(page === null) return;


        let self = null;
        try{
            self = new User(extra);
        }catch (e){self = new User({})}



        let printHeader = '<header> ' +
            '<div class="structure-header-content"> ' +
            '<a href="'+ROOT+'" class="structure-header-logo"><img src="'+ROOT+'image/connsuite_icon_inverted_rounded.png"></a> ' +
            '<div class="structure-header-search"> ' +
            '<div class="structure-header-search-field"> ' +
            '<input type="text" title="Search in ConnSuite" placeholder="Search for a company or a person"> ' +
            '<div class="structure-header-search-button"><i class="material-icons">search</i></div> ' +
            '</div> ' +
            '<div class="structure-header-search-line"></div> ' +
            '</div> ' +
            '<div class="structure-header-buttons"> ' +
            '<div class="structure-header-button"><i class="material-icons">notifications</i><div class="structure-header-button-badge"><span></span></div></div> ' +
            '</div> ' +
            '<div class="structure-header-account"> ' +
            '<div class="structure-header-account-picture"><img ></div> ' +
            '<div class="structure-header-account-name"><label>ConnSuite</label><p></p></div> ' + //name
            '<div class="structure-header-account-button"><i class="material-icons">arrow_drop_down</i></div> ' +
            '</div> ' +
            '<div class="structure-header-menu"></div> ' +
            '</div> ' +
            '<div class="structure-header-overlay"></div>'+
            '<div class="structure-header-mobile-content"> ' +
            '<div class="structure-header-mobile-menu-button"><i class="material-icons">menu</i></div>'+
            '<div class="structure-header-mobile-account-name"><label>ConnSuite<i class="icon-conn-05"></i></label><p>'+page.name+'</p></div> ' + //name
            '<a class="structure-header-mobile-account-picture"><img></a> ' +
            '<div class="structure-header-mobile-menu">' +
            '<div class="structure-header-mobile-menu-wrapper">' +
            '<div class="structure-header-mobile-menu-logo"><img src="'+ROOT+'image/connsuite_gradient_type.png"></div>'+
            '</div>'    +
            '</div>'    +
            '</div>'+
            '</header>' ;

        $("body").prepend(printHeader);

        /**
         * Bind Desktop Data
         */


        let header = $("body header"); if(!header.length) return;
        if(extra !== null && extra.hasOwnProperty("name")) header.find(".structure-header-content .structure-header-account-name p").text(extra["name"]);

        let account = $("header .structure-header-content .structure-header-account");
        if(account.length) account.find(".structure-header-account-button").unbind().on("click",function(){account.toggleClass("active");});


        $(document).click(function(event) {
            if(!$(event.target).closest("header .structure-header-content .structure-header-account .structure-header-account-button").length) {
                if(account.hasClass("active")) {
                    account.removeClass("active");
                }
            }
        });



        let accountMenu = $("header .structure-header-content .structure-header-menu");
        if(accountMenu.length) for(let i =0; i < SECONDARY_PAGES.length; i++) if(SECONDARY_PAGES[i].hasOwnProperty("menu") && SECONDARY_PAGES[i].menu) accountMenu.append(  '<a href="'+ROOT+SECONDARY_PAGES[i].url+'" class="structure-header-menu-item"><p>'+SECONDARY_PAGES[i].name+'</p></a> ');

        self.bindPictureThumbnail(account.find(".structure-header-account-picture img"));


        let printMenu = '<div class="structure-side"> ' + '<div class="structure-side-wrapper"> ';
        for(let i = 0; i < PRIMARY_PAGES.length; i++)
            printMenu+=  '<a href="'+ROOT+PRIMARY_PAGES[i].url+'" data-index="'+PRIMARY_PAGES[i].identifier+'" class="structure-side-item"> ' +
                '<div class="structure-side-item-container"><i class="'+PRIMARY_PAGES[i].icon+' leftSideBarElementIcon"></i></div> ' +
                '<span>'+PRIMARY_PAGES[i].name+'</span> ' +
                '</a> ';
         printMenu+= '</div> ' + '</div>';
        $("main").prepend(printMenu);
        let menu = $("body main .structure-side"); if(!menu.length) return;
        let item = menu.find(".structure-side-item[data-index='"+identifier+"']"); if(item.length) item.addClass("active");


        /**
         * Bind Mobile Data
         */


        let menuMobile = $("header .structure-header-mobile-content .structure-header-mobile-menu .structure-header-mobile-menu-wrapper");
        if(menuMobile.length){
            for(let i = 0; i < PRIMARY_PAGES.length; i++) menuMobile.append('<a data-index="'+PRIMARY_PAGES[i].identifier+'" href="'+PRIMARY_PAGES[i].url+'" class="structure-header-mobile-menu-item primary"><i class="'+PRIMARY_PAGES[i].icon+'"></i><span>'+PRIMARY_PAGES[i].name+'</span></a>')
            menuMobile.append('<div class="structure-header-mobile-menu-divider"></div>');
            for(let i = 0; i < SECONDARY_PAGES.length; i++)if(SECONDARY_PAGES[i].hasOwnProperty("menu") && SECONDARY_PAGES[i].menu) menuMobile.append('<a data-index="'+SECONDARY_PAGES[i].identifier+'" href="'+SECONDARY_PAGES[i].url+'" class="structure-header-mobile-menu-item secondary"><span>'+SECONDARY_PAGES[i].name+'</span></a>');

        }
        let itemMobile = menuMobile.find(".structure-header-mobile-menu-item[data-index='"+identifier+"']"); if(itemMobile.length) itemMobile.addClass("active");



        let openMenuButton = $(".structure-header-mobile-menu-button");
        let closeMenuButton = $(".structure-header-mobile-menu-logo");

        $(".structure-header-overlay").unbind().on("click",function(){closeMenuButton.click();});
        openMenuButton.unbind().on("click",function(){
            if( isMobileSize() && !$("body").hasClass("menu-visible"))
            {
                $("body").addClass("menu-visible");
                $(".structure-header-overlay").fadeIn(300);
            }
        });
        closeMenuButton.unbind().on("click",function(){
            if($("body").hasClass("menu-visible")){
                $("body").removeClass("menu-visible");
                $(".structure-header-overlay").fadeOut(300);
            }
        });


        self.bindPictureThumbnail($(".structure-header-mobile-account-picture img"));
        if(extra !== null && extra.hasOwnProperty("username"))  $(".structure-header-mobile-account-picture").attr("href", ROOT+"content/profile.php?u="+extra["username"]);





    }

    /**
     *
     * @param {string} identifier
     * @param {(Array|null)}  extra
     */
    static initSecondary(identifier, extra = null){


        let page = findSecondaryPageByID(identifier); if(page === null) return;


        let self = null;
        try{
            self = new User(extra);
        }catch (e){self = new User({})}



        let printHeader = '<header> ' +
            '<div class="structure-header-content"> ' +
            '<a href="'+ROOT+'" class="structure-header-logo"><i class="material-icons">arrow_back</i></a> ' +
            '<div class="structure-header-title"><i class="material-icons">keyboard_arrow_right</i><p>'+page.name+'</p></div>'+
            '<div class="structure-header-buttons"> ' +
            '<div class="structure-header-button"><i class="material-icons">notifications</i><div class="structure-header-button-badge"><span></span></div></div> ' +
            '</div> ' +
            '<div class="structure-header-account"> ' +
            '<a class="structure-header-account-picture"><img></a> ' +
            '<div class="structure-header-account-name"><label>ConnSuite</label><p></p></div> ' + //name
            '<div class="structure-header-account-button"><i class="material-icons">arrow_drop_down</i></div> ' +
            '</div> ' +
            '<div class="structure-header-menu"></div> ' +
            '</div> ' +
            '<div class="structure-header-overlay"></div>'+
            '</header>' ;

        $("body").prepend(printHeader);

        /**
         * Bind Desktop Data
         */


        let header = $("body header"); if(!header.length) return;
        if(extra !== null && extra.hasOwnProperty("name")) header.find(".structure-header-content .structure-header-account-name p").text(extra["name"]);

        let account = $("header .structure-header-content .structure-header-account");
        if(account.length) account.find(".structure-header-account-button").unbind().on("click",function(){account.toggleClass("active");});


        $(document).click(function(event) {
            if(!$(event.target).closest("header .structure-header-content .structure-header-account .structure-header-account-button").length) {
                if(account.hasClass("active")) {
                    account.removeClass("active");
                }
            }
        });



        let accountMenu = $("header .structure-header-content .structure-header-menu");
        if(accountMenu.length) for(let i =0; i < SECONDARY_PAGES.length; i++) if(SECONDARY_PAGES[i].hasOwnProperty("menu") && SECONDARY_PAGES[i].menu) accountMenu.append(  '<a href="'+ROOT+SECONDARY_PAGES[i].url+'" class="structure-header-menu-item"><p>'+SECONDARY_PAGES[i].name+'</p></a> ');

        self.bindPictureThumbnail(account.find(".structure-header-account-picture img"));
        if(extra !== null && extra.hasOwnProperty("username"))  $(".structure-header-account-picture").attr("href", ROOT+"content/profile.php?u="+extra["username"]);


        /**
         * Bind Mobile Data
         */







    }


    static commonInit(){



    }





}


