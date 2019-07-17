import NetworkModel from "../model/NetworkModel";
import {matchPath} from "react-router-dom";
import {Helper} from "./Util";
import Dashboard from "../components/Page/Dashboard/Dashboard";
import Portfolio from "../components/Page/Portfolio/Portfolio";
import BusinessBook from "../components/Page/BusinessBook/BusinessBook";
import Statistics from "../components/Page/Statistics/Statistics";
import NetworkManagerEdit from "../components/Page/NetworkManager/NetworkManagerEdit/NetworkManagerEdit";
import NetworkManagerAdd from "../components/Page/NetworkManager/NetworkManagerAdd/NetworkManagerAdd";

/**
 * Created by @VanSoftware on 2019-07-04.
 */

class Config{


    static DUMMY_NETWORKS =  (()=>{
        let a =  [
            {
                AID : "NET1",
                title : "Facebook",
                type : "default",
                URL : "https://facebook.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_facebook.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET2",
                title : "Twitter",
                type : "default",
                URL : "https://twitter.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_twitter.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET3",
                title : "Behance",
                type : "default",
                URL : "https://behance.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_behance.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET4",
                title : "Pinterest",
                type : "default",
                URL : "https://pinterest.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_pinterest.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET5",
                URL : "https://github.com/",
                type : "default",
                title : "GitHub  LALALALLALALL lalas dlsaldsald lsal",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_github.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET6C",
                URL : "https://www.vansoftware.ro/",
                type : "custom",
                title : "Van Software",
                icon : {
                    name : "icon_custom.png",
                    source :  require("../assets/images/networks/normal/icon_github.png"),
                },
                username : "@Razvan"
            }
        ];
        let n = [];

        a.forEach(element => {n.push(new NetworkModel(element))});
        return n;
    })();



    /**
     *
     * ROUTES
     *
     *
     */


    static ROUTE_PAGE_DASHBOARD = '/dashboard';
    static ROUTE_PAGE_BUSINESS_BOOK = '/book';
    static ROUTE_PAGE_PORTFOLIO = '/portfolio';
    static ROUTE_PAGE_STATISTICS = '/statistics';
    static ROUTE_PAGE_PROFILE = '/:username';

    static ROUTE_PAGE_NETWORK_ADD = '/network';

    static ROUTE_PAGE_NETWORK_EDIT_CLEAN = '/network/';
    static ROUTE_PAGE_NETWORK_EDIT = Config.ROUTE_PAGE_NETWORK_EDIT_CLEAN + ':AID';


    static PAGES = [
        {
            exact : true,
            route: this.ROUTE_PAGE_DASHBOARD,
            title: 'Dashboard',
            depth: 1,
            icon: 'home',
            component: () => Dashboard,
        },
        {
            exact : true,
            route : this.ROUTE_PAGE_PORTFOLIO,
            title : 'Portfolio',
            depth : 1,
            icon : 'folder_special',
            component: () => Portfolio,
        },
        {
            exact : true,
            route : this.ROUTE_PAGE_BUSINESS_BOOK,
            title : 'Business Book',
            depth : 1,
            icon : 'business',
            component: () => BusinessBook,
        },
        {
            exact : true,
            route : this.ROUTE_PAGE_STATISTICS,
            title : 'Statistics',
            depth : 1,
            icon : 'multiline_chart',
            component : () => Statistics,
        },



        {
            exact : true,
            route : this.ROUTE_PAGE_NETWORK_EDIT,
            title : "Edit Network",
            depth : 2,

            routeBack : this.ROUTE_PAGE_PORTFOLIO,
            component : () => NetworkManagerEdit
        },
        {
            exact : true,
            route : this.ROUTE_PAGE_NETWORK_ADD,
            title : "Add a new Network",
            depth : 2,

            routeBack : this.ROUTE_PAGE_PORTFOLIO,
            component : () => NetworkManagerAdd
        },


        {
            exact : false,
            route : this.ROUTE_PAGE_PROFILE,
            title : 'Profile',
            depth : 1,
            icon : 'person',
            component : () => Dashboard
        },

    ];

    static getPageByRoute(route){
        let pages = Config.PAGES;


        for(let i = 0; i < pages.length; i++){
            if(pages[i].route === route)
                return pages[i];
        }

        return {
            exact : false,
            route : null,
            title : null,
            depth : null,
            routeBack : this.ROUTE_PAGE_DASHBOARD
        }
    }

    static getPageByPath(path){
        let pages = Config.PAGES;


        for(let i = 0; i < pages.length; i++){
            let match = matchPath(path,  {path : pages[i].route, exact : pages[i].exact});
            if(match && !Helper.isEmpty(match) && match.isExact)
                return pages[i];
        }

        return {
            exact : false,
            route : null,
            title : null,
            depth : null,
            routeBack : this.ROUTE_PAGE_DASHBOARD
        }




    }


    /**
     *
     * VIEW
     *
     */

    static REDUX_ACTION_VIEW_OVERLAY_TOGGLE = 'REDUX_ACTION_VIEW_OVERLAY_TOGGLE';
    static REDUX_ACTION_VIEW_OVERLAY_OPEN = 'REDUX_ACTION_VIEW_OVERLAY_OPEN';
    static REDUX_ACTION_VIEW_OVERLAY_CLOSE = 'REDUX_ACTION_VIEW_OVERLAY_CLOSE';
    static REDUX_ACTION_VIEW_OVERLAY_RESET = 'REDUX_ACTION_VIEW_OVERLAY_RESET';


    static REDUX_ACTION_VIEW_COVER_TOGGLE = 'REDUX_ACTION_VIEW_COVER_TOGGLE';
    static REDUX_ACTION_VIEW_COVER_OPEN = 'REDUX_ACTION_VIEW_COVER_OPEN';
    static REDUX_ACTION_VIEW_COVER_CLOSE = 'REDUX_ACTION_VIEW_COVER_CLOSE';
    static REDUX_ACTION_VIEW_COVER_RESET = 'REDUX_ACTION_VIEW_COVER_RESET';


    static REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_ENABLE = 'REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_ENABLE';
    static REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_DISABLE = 'REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_DISABLE';

    static REDUX_ACTION_VIEW_NAVIGATOR_SET_ROUTE_BACK = 'REDUX_ACTION_VIEW_NAVIGATOR_SET_ROUTE_BACK';

    /**
     *
     * MODEL
     *
     */

    static REDUX_ACTION_MODEL_COVER_NETWORK_CHOOSE = 'REDUX_ACTION_MODEL_COVER_NETWORK_CHOOSE';


    /**
     *
     * CONTROLLER
     *
     */

    static REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE = 'REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE';
    static REDUX_ACTION_CONTROLLER_COVER_CLOSE = 'REDUX_ACTION_CONTROLLER_COVER_CLOSE';





}

export default Config;