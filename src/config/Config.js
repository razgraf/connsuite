import PropTypes from "prop-types";
import NetworkModel from "../model/NetworkModel";

/**
 * Created by @VanSoftware on 2019-07-04.
 */

class Config{


    static DUMMY_NETWORKS =  (()=>{
        let a =  [
            {
                AID : "NET1",
                title : "Facebook",
                URL : "https://facebook.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_facebook.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET2",
                title : "Twitter",
                URL : "https://twitter.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_twitter.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET3",
                title : "Behance",
                URL : "https://behance.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_behance.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET4",
                title : "Pinterest",
                URL : "https://pinterest.com/",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_pinterest.png"),
                },
                username : "razgraf"
            },
            {
                AID : "NET5",
                URL : "https://github.com/",
                title : "GitHub  LALALALLALALL lalas dlsaldsald lsal",
                icon : {
                    source :  require("../assets/images/networks/normal/icon_github.png"),
                },
                username : "razgraf"
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
    static ROUTE_PAGE_NETWORK_EDIT = '/network/:AID';

    static getPageByRoute(page){
        switch (page) {
            case this.ROUTE_PAGE_DASHBOARD : return {
                route : this.ROUTE_PAGE_DASHBOARD,
                title : 'Dashboard',
                depth : 1,
                icon : 'home',
            };
            case this.ROUTE_PAGE_PORTFOLIO : return {
                route : this.ROUTE_PAGE_PORTFOLIO,
                title : 'Portfolio',
                depth : 1,
                icon : 'folder_special',
            };
            case this.ROUTE_PAGE_PROFILE : return {
                route : this.ROUTE_PAGE_PROFILE,
                title : 'Profile',
                depth : 1,
                icon : 'person',
            };
            case this.ROUTE_PAGE_BUSINESS_BOOK : return {
                route : this.ROUTE_PAGE_BUSINESS_BOOK,
                title : 'Business Book',
                depth : 1,
                icon : 'business',
            };
            case this.ROUTE_PAGE_STATISTICS : return {
                route : this.ROUTE_PAGE_STATISTICS,
                title : 'Statistics',
                depth : 1,
                icon : 'multiline_chart',
            };




            case this.ROUTE_PAGE_NETWORK_ADD : return {
                route : this.ROUTE_PAGE_NETWORK_ADD,
                title : "Add a new Network",
                depth : 2
            };
            case this.ROUTE_PAGE_NETWORK_EDIT : return {
                route : this.ROUTE_PAGE_NETWORK_ADD,
                title : "Edit this Network",
                depth : 2
            };


            default : return {
                route : null,
                title : null,
                depth : null
            }

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