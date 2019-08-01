import NetworkModel from "../model/NetworkModel";
import {matchPath} from "react-router-dom";
import {Helper} from "./Util";
import Dashboard from "../components/Page/Dashboard/Dashboard";
import Portfolio from "../components/Page/Portfolio/Portfolio";
import BusinessBook from "../components/Page/BusinessBook/BusinessBook";
import Statistics from "../components/Page/Statistics/Statistics";
import NetworkManagerEdit from "../components/Page/NetworkManager/NetworkManagerEdit/NetworkManagerEdit";
import NetworkManagerAdd from "../components/Page/NetworkManager/NetworkManagerAdd/NetworkManagerAdd";
import Profile from "../components/Page/Profile/Profile";
import {ArticleCategoryModel, ArticleModel} from "../model/ArticleModel";
import SkillModel from "../model/SkillModel";
import ArticlePreview from "../components/Page/ArticlePreview/ArticlePreview";
import ArticleManager from "../components/Page/ArticleManager/ArticleManager";

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


    static DUMMY_SKILLS = (() => {
        let a = [
            {
                AID: "#1",
                title: "UI/UX"
            },
            {
                AID: "#2",
                title: "Branding",
            },
            {
                AID: "#3",
                title: "ReactJS"
            },
            {
                AID: "#4",
                title: "Full Stack",
            }
        ];

        let n = [];

        a.forEach(element => {
            n.push(new SkillModel(element))
        });
        return n;


    })();

    static DUMMY_CATEGORIES = (() => {
        let a = [
            {
                AID: "#1",
                title: "Design"
            },
            {
                AID: "#2",
                title: "Development"
            },
            {
                AID: "#3",
                title: "Web Development"
            }
        ];

        let n = [];

        a.forEach(element => {
            n.push(new ArticleCategoryModel(element))
        });
        return n;


    })();

    static DUMMY_ARTICLES = (() => {
        let a = [
            {
                AID: "AA1",
                title: "Company documents generator | Dedicated Software",
                image: {
                    source: require("../assets/images/project-1.png"),
                },
                categories: [
                    {
                        AID: "#1",
                        title: "Design"
                    }
                ],
                skills: [
                    {
                        AID: "#2",
                        title: "Branding"
                    },
                    {
                        AID: "#1",
                        title: "UI/UX"
                    },
                    {
                        AID: "#4",
                        title : "Full Stack"
                    },
                ],
                type : ArticleModel.TYPE_INTERNAL,
            },
            {
                AID: "AA2",
                title: "Educational Platform (Brightture) | UI / UX",
                image: {
                    source: require("../assets/images/project-2.png"),
                },
                categories: [
                    {
                        AID: "#1",
                        title: "Design"
                    },
                    {
                        AID: "#2",
                        title: "Development"
                    },
                ],
                skills: [
                    {
                        AID: "#2",
                        title: "Branding"
                    },
                    {
                        AID: "#1",
                        title: "UI/UX"
                    },
                    {
                        AID: "#3",
                        title: "ReactJS"
                    },
                ],
                type : ArticleModel.TYPE_EXTERNAL,
                source : "behance.net/razgraf"
            },
            {
                AID: "AA3",
                title: "Event Planning (Epic) | Branding & Social Media",
                image: {
                    source: require("../assets/images/project-3.png"),
                },
                categories: [
                    {
                        AID: "#1",
                        title: "Design"
                    },
                    {
                        AID: "#3",
                        title: "Web Development"
                    },
                ],
                skills: [
                    {
                        AID: "#1",
                        title: "UI/UX"
                    },
                    {
                        AID: "#3",
                        title : "ReactJS"
                    },
                ],
                type : ArticleModel.TYPE_INTERNAL,
            },
            {
                AID: "AA4",
                title: "Highway Maintenance Co. (MJQuinn) | Logo",
                image: {
                    source: require("../assets/images/project-4.png"),
                },
                categories: [
                    {
                        AID: "#1",
                        title: "Development"
                    },
                ],
                skills: [
                    {
                        AID: "#2",
                        title: "Branding"
                    },
                ],
                type : ArticleModel.TYPE_EXTERNAL,
                source : "www.behance.net/razgraf"
            },
            {
                AID: "AA5",
                title: "Industrial automation (Scadarama) | Web",
                image: {
                    source: require("../assets/images/project-5.png"),
                },
                categories: [
                    {
                        AID: "#1",
                        title: "Design"
                    },
                    {
                        AID: "#3",
                        title: "Web Development"
                    },
                    {
                        AID: "#2",
                        title: "Development"
                    }
                ],
                skills: [
                    {
                        AID: "#4",
                        title : "Full-Stack"
                    },
                ],
                type : ArticleModel.TYPE_EXTERNAL,
                source : "https://www.behance.net/razgraf"
            },
        ];


        let n = [];

        a.forEach(element => {
            n.push(new ArticleModel(element))
        });
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

    static ROUTE_PAGE_ARTICLE_CLEAN = '/article/view/';
    static ROUTE_PAGE_ARTICLE = Config.ROUTE_PAGE_ARTICLE_CLEAN + ":AID/:title";

    static ROUTE_PAGE_ARTICLE_ADD = '/article/add';

    static ROUTE_PAGE_ARTICLE_EDIT_CLEAN = '/article/edit/';
    static ROUTE_PAGE_ARTICLE_EDIT = Config.ROUTE_PAGE_ARTICLE_EDIT_CLEAN + ":AID/";


    static ROUTE_PAGE_PROFILE_CLEAN = '/';
    static ROUTE_PAGE_PROFILE = Config.ROUTE_PAGE_PROFILE_CLEAN + ':username';

    static ROUTE_PAGE_NETWORK_ADD = '/network/add';

    static ROUTE_PAGE_NETWORK_EDIT_CLEAN = '/network/edit/';
    static ROUTE_PAGE_NETWORK_EDIT = Config.ROUTE_PAGE_NETWORK_EDIT_CLEAN + ':AID';


    static DUMMY_USERS = {
        self : {
            AID : "RAZ1",
            username : {
                main : "razgraf",
                alias : ["razvy123"]
            },
            firstName : "Razvan",
            lastName : "Apostu",
            image : {
                source :  require("../assets/images/me-1.png"),
            },
            networks : (()=>{ return Config.DUMMY_NETWORKS.map(element => element.toObject())  })(),
            articles : (()=>{ return Config.DUMMY_ARTICLES.map(element => element.toObject())  })()
        },
        others : [
            {
                AID : "VAN1",
                username : {
                    main : "vansoftware",
                    alias : ["van"]
                },
                firstName : "Van",
                lastName : "Software",
                image : {
                    source :  require("../assets/images/user-1.png"),
                    // source :  require("../assets/images/me-2.png"),
                },
                networks : (()=>{ return Config.DUMMY_NETWORKS.map(element => element.toObject())  })(),
                articles : (()=>{ return Config.DUMMY_ARTICLES.map(element => element.toObject())  })()
            }
        ]
    };



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
            route : this.ROUTE_PAGE_ARTICLE,
            title : 'Article',
            depth : 2,

            routeBack : this.ROUTE_PAGE_PORTFOLIO,
            component : () => ArticlePreview,
            public : true,
        },

        {
            exact : true,
            route : this.ROUTE_PAGE_ARTICLE_ADD,
            title : "Create article",
            depth : 2,

            routeBack : this.ROUTE_PAGE_PORTFOLIO,
            component : () => ArticleManager
        },
        {
            exact : true,
            route : this.ROUTE_PAGE_ARTICLE_EDIT,
            title : "Edit Article",
            depth : 2,

            routeBack : this.ROUTE_PAGE_PORTFOLIO,
            component : () => ArticleManager
        },

        {
            exact : false,
            route : this.ROUTE_PAGE_PROFILE,
            title : 'Profile',
            depth : 1,
            icon : 'person',
            component : () => Profile,
            public : true,
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
    static REDUX_ACTION_VIEW_NAVIGATOR_SET_HISTORY = 'REDUX_ACTION_VIEW_NAVIGATOR_SET_HISTORY';

    static REDUX_ACTION_VIEW_PROFILE_SET_STEP = 'REDUX_ACTION_VIEW_PROFILE_SET_STEP';

    /**
     *
     * MODEL
     *
     */

    static REDUX_ACTION_MODEL_COVER_NETWORK_CHOOSE = 'REDUX_ACTION_MODEL_COVER_NETWORK_CHOOSE';

    static REDUX_ACTION_MODEL_USER_SET_SELF = 'REDUX_ACTION_MODEL_USER_SET_SELF';
    static REDUX_ACTION_MODEL_USER_SET_ACTIVE = 'REDUX_ACTION_MODEL_USER_SET_ACTIVE';

    /**
     *
     * CONTROLLER
     *
     */

    static REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE = 'REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE';
    static REDUX_ACTION_CONTROLLER_COVER_CLOSE = 'REDUX_ACTION_CONTROLLER_COVER_CLOSE';





}

export default Config;