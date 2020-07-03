<?php
/**
 * Create by @VanSoftware
 * Date: 27/05/2018
 * Time: 15:17
 */


/**
 * ! --- ADAPT TO PROJECT --- !
 */

const AUTH_COOKIE_JWT_KEY = "ck90WVaASaanBGMWQw";
const AUTH_COOKIE_NAME = "AA343rA";
const STORAGE_SESSION_KEY = "VANCS";
const STORAGE_SESSION_USER_KEY = "USERCS";


/**
 * DEFAULT CONSTANTS
 */



defined("kResponseOk") or define("kResponseOk", "response-ok");
defined("kResponseNegative") or define("kResponseNegative","response-negative");
defined("kResponseEmail") or define("kResponseEmail","response-email");
defined("kResponseUsername") or define("kResponseUsername","response-username");

const VICTORY = 'victory';
const DANGER = 'danger';


const ENVIRONMENT_KEY_PAGE_IDENTIFIER = "identifier";
const ENVIRONMENT_KEY_PAGE_PATH = "path";
const ENVIRONMENT_KEY_PAGE_DEPTH = "depth";
const ENVIRONMENT_KEY_PAGE_API = "API";


const DATA_TYPE_NUMERIC = 1;
const DATA_TYPE_STRING = 2;
const DATA_TYPE_EMAIL = 3;
const DATA_TYPE_HTML = 4;
const DATA_TYPE_USER_ID = 5;
const DATA_TYPE_BOOLEAN = 6;
const DATA_TYPE_ARRAY =7;
const DATA_TYPE_FILE_IMAGE = 8;
const DATA_TYPE_FILE_ANY = 9;

const CONNECTION_TYPE_GLOBAL = 1;
const CONNECTION_TYPE_AUTHENTICATED = 2;


const AUTH_COOKIE_EXPIRY_DATE = 86400 * 30;
const AUTH_COOKIE_REFRESH_INTERVAL = 86400 * 2;

const AUTH_COOKIE_KEY_USER_ID = "ID";
const AUTH_COOKIE_KEY_TOKEN = "token";
const AUTH_COOKIE_KEY_ISSUED = "issued";


const STORAGE_SESSION_EXPIRY_DATE = 3600 * 3; //3 hours



const ENVIRONMENT_SET_DATA_OPTION_FORCE_USER_RETRIEVE = 'forceUserReloadInSession';


const SYSTEM_IDENTIFIER_CONFIG = 'config';
const SYSTEM_IDENTIFIER_LIBRARY_IMAGE = 'library-image';


/**
 * PAGES
 */

const PAGE_IDENTIFIER_INDEX = 'index';
const PAGE_IDENTIFIER_PROFILE = 'profile';


const PAGE_IDENTIFIER_DASHBOARD = 'dashboard';
const PAGE_IDENTIFIER_NETWORK_ADD = 'network_add';
const PAGE_IDENTIFIER_NETWORK_EDIT = 'network_edit';

const PAGE_IDENTIFIER_ARTICLE_ADD = 'article_add';
const PAGE_IDENTIFIER_ARTICLE_EDIT = 'article_edit';

/**
 *
 * ----------------------------------------------------------
 *
 * PATHS
 *
 * ----------------------------------------------------------
 *
 */
const PATH_DATA_NETWORK_DEFAULT = "data/network/default/";
const PATH_DATA_NETWORK_CUSTOM = "data/network/custom/";


/**
 *
 * ----------------------------------------------------------
 *
 * FILENAME
 *
 * ----------------------------------------------------------
 *
 */

/**
 * API
 */


const URL_SESSION_LOG_IN = "log-in";
const URL_SESSION_LOG_OUT = "log-out";
const URL_SESSION_REGISTER = "register";


const URL_COMMON_USER_SEARCH = "common-user-search";



const URL_NETWORK_RETRIEVE_LIST = "url-network-retrieve-list";
const URL_NETWORK_RETRIEVE = "url-network-retrieve";
const URL_NETWORK_EDIT =  "url-network-edit";
const URL_NETWORK_ADD = "url-network-add";
const URL_NETWORK_REMOVE = "url-network-remove";
const URL_NETWORK_VISIBILITY_CHANGE = "url-network-visibility-change";
const URL_NETWORK_LABEL_RETRIEVE_LIST = "url-network-label-retrieve-list";
const URL_NETWORK_RETRIEVE_LIST_DEFAULT = "url-network-retrieve-list-defaultImage";




/**
 *
 * ----------------------------------------------------------
 *
 * VAN LIBRARY : STICKY
 *
 * ----------------------------------------------------------
 *
 */

const STICKY_LIBRARY_TYPE_EMPLOYEE = 1;
const STICKY_LIBRARY_TYPE_JOB = 2;


const URL_NOTE_RETRIEVE = "url-note-retrieve";
const URL_NOTE_RETRIEVE_LIST = "url-note-retrieve-list";
const URL_NOTE_ADD = "url-note-add";
const URL_NOTE_EDIT = "url-note-edit";
const URL_NOTE_REMOVE = "url-note-remove";


/**
 *
 * ----------------------------------------------------------
 *
 * MODEL USER
 *
 * ----------------------------------------------------------
 *
 */

const USER_KEY_ID = "ID";
const USER_KEY_USER_ID = "userID";
const USER_KEY_AID = "AID";
const USER_KEY_PASSWORD = "password";
const USER_KEY_USERNAME = "username";
const USER_KEY_FIRSTNAME = "firstName";
const USER_KEY_LASTNAME = "lastName";
const USER_KEY_NAME = "name";
const USER_KEY_FACEBOOK_ID = "facebook";
const USER_KEY_LINKEDIN_ID = "linkedinID";
const USER_KEY_TWITTER_ID = "twitterID";
const USER_KEY_EMAIL = "email";
const USER_KEY_PHONE = "phone";
const USER_KEY_VERSION = "version";
const USER_KEY_SHORT = "short";
const USER_KEY_DESCRIPTION = "description";
const USER_KEY_INSTANTIATED = "instantiated";

const USER_KEY_NETWORKS = "networks";
const USER_KEY_ARTICLES = "articles";
const USER_KEY_ALIASES = "aliases";


const USERNAME_DEFAULT_BLACKLIST = array(
    'self',
    'razgraf','razvangabriel','razvangabrielapostu',
    'van','vansoftware','connsuite','intro','js','conn',
    'session','libs','image','razvan','news','connnews',
);


/**
 *
 * ----------------------------------------------------------
 *
 * MODEL NETWORK
 *
 * ----------------------------------------------------------
 *
 */
const NETWORK_DEFAULT_POSITION = 999999;
const NETWORK_DEFAULT_ICON_TYPE = ".png";
const NETWORK_DEFAULT_THUMBNAIL_TYPE = ".png";

const NETWORK_DEFAULT_ICON_SIZE = 800;
const NETWORK_DEFAULT_THUMBNAIL_SIZE = 200;

const NETWORK_TYPE_DEFAULT  = 1;
const NETWORK_TYPE_CUSTOM = 2;

const NETWORK_KEY_ID = "ID";
const NETWORK_KEY_LINK_AID = "AID";
const NETWORK_KEY_USER_ID = "userID";
const NETWORK_KEY_USERNAME = "username";
const NETWORK_KEY_INSTANTIATED  = "instantiated";
const NETWORK_KEY_POSITION = "position";
const NETWORK_KEY_VISIBLE = "visible";
const NETWORK_KEY_NETWORK_ID = "networkID";

const NETWORK_KEY_NAME = "name";
const NETWORK_KEY_TYPE = "type";
const NETWORK_KEY_ICON = "icon";
const NETWORK_KEY_URL = "url";
const NETWORK_KEY_VERSION = "version";

const NETWORK_KEY_DESCRIPTION = "description";
const NETWORK_KEY_LABELS = "labels";
const NETWORK_KEY_CLICK = "click";