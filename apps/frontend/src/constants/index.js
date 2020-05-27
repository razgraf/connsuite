import IconDashboard from "@material-ui/icons/HomeRounded";
import IconPortfolio from "@material-ui/icons/FolderSpecialRounded";
import IconBusiness from "@material-ui/icons/BusinessRounded";
import IconStatistics from "@material-ui/icons/MultilineChartRounded";
import IconProfile from "@material-ui/icons/PersonRounded";

import status from "./httpcodes";

export { status };

export const pages = {
  landing: {
    Icon: null,
    root: "/",
    title: "Landing",
  },
  profile: {
    Icon: IconProfile,
    root: "/",
    route: "/[id]",
    builder: id => `/${id}`,
    title: "Profile",
  },
  dashboard: {
    Icon: IconDashboard,
    root: "/dashboard",
    title: "Dashboard",
  },
  portfolio: {
    Icon: IconPortfolio,
    root: "/portfolio",
    title: "Portfolio",
  },
  business: {
    Icon: IconBusiness,
    root: "/business",
    title: "Business Book",
  },
  statistics: {
    Icon: IconStatistics,
    root: "/statistics",
    title: "Statistics",
    isPrivate: true,
  },
  about: {
    Icon: null,
    root: "/about",
    title: "About",
  },
  network: {
    root: "/network",
    create: {
      root: "/network",
      title: "Create a new Network",
    },
    edit: {
      root: "/network/edit",
      route: "/network/edit/[id]",
      builder: id => `/network/edit/${id}`,
      title: "Edit the Network",
    },
  },
  article: {
    root: "/article",
    create: {
      root: "/article",
      title: "Create a new Article",
    },
    view: {
      root: "/article",
      route: "/article/[id]",
      builder: id => `/article/${id}`,
    },
    edit: {
      root: "/article/edit",
      route: "/article/edit/[id]",
      builder: id => `/article/edit/${id}`,
    },
  },
};

export const subpages = {};

export const vendors = {};

export const redux = {
  SET: "store_SET",
  CHECK: "store_CHECK",

  AUTH_USER_SET: "store_AUTH_USER_SET",
  AUTH_TOKEN_SET: "store_AUTH_TOKEN_SET",

  COVER_OPEN: "store_COVER_OPEN",
  COVER_CLOSE: "store_COVER_CLOSE",
  COVER_TOGGLE: "store_COVER_TOGGLE",
  COVER_NETWORK_CLEAR: "store_COVER_NETWORK_CLEAR",
  COVER_NETWORK_SET: "store_COVER_NETWORK_SET",

  HISTORY_PUSH: "store_HISTORY_PUSH",
  HISTORY_POP: "store_HISTORY_POP",
  HISTORY_CLEAR: "store_HISTORY_CLEAR",

  NETWORKS_SET: "store_NETWORKS_SET",
  NETWORKS_SET_IS_LOADING: "store_NETWORKS_SET_IS_LOADING",
  NETWORKS_SET_IS_FETCHED: "store_NETWORKS_SET_IS_FETCHED",
  NETWORKS_SET_LIST: "store_NETWORKS_SET_LIST",
  NETWORKS_CLEAR_LIST: "store_NETWORKS_CLEAR_LIST",
  NETWORKS_PUSH_LIST: "store_NETWORKS_PUSH_LIST",

  ARTICLES_SET: "store_ARTICLES_SET",
  ARTICLES_SET_IS_LOADING: "store_ARTICLES_SET_IS_LOADING",
  ARTICLES_SET_IS_FETCHED: "store_ARTICLES_SET_IS_FETCHED",
  ARTICLES_SET_LIST: "store_ARTICLES_SET_LIST",
  ARTICLES_CLEAR_LIST: "store_ARTICLES_CLEAR_LIST",
  ARTICLES_PUSH_LIST: "store_ARTICLES_PUSH_LIST",

  RESOURCE_EXTERNAL_NETWORKS_SET: "store_RESOURCE_EXTERNAL_NETWORKS_SET",
  RESOURCE_EXTERNAL_NETWORKS_SET_IS_LOADING: "store_RESOURCE_EXTERNAL_NETWORKS_SET_IS_LOADING",
  RESOURCE_EXTERNAL_NETWORKS_SET_IS_FETCHED: "store_RESOURCE_EXTERNAL_NETWORKS_SET_IS_FETCHED",
  RESOURCE_EXTERNAL_NETWORKS_SET_LIST: "store_RESOURCE_EXTERNAL_NETWORKS_SET_LIST",

  MODAL_RESET: "store_MODAL_RESET",
  MODAL_OPEN: "store_MODAL_OPEN",
  MODAL_CLOSE: "store_MODAL_CLOSE",
  MODAL_REGISTER: "store_MODAL_REGISTER",
  MODAL_UNREGISTER: "store_MODAL_UNREGISTER",
};

export const sagas = {
  NETWORKS_LIST: "saga_NETWORKS_LIST",
  ARTICLES_LIST: "saga_ARTICLES_LIST",
};

export const types = {
  nav: {
    appearance: {
      platform: "platform",
      presentation: "presentation",
      profile: "profile",
      secondary: "secondary",
    },
    accent: {
      transparent: "transparent",
      white: "white",
      dark: "dark",
    },
  },
  network: {
    manager: {
      create: "create",
      edit: "edit",
    },
    type: {
      external: "external",
      internal: "internal",
    },
  },
  article: {
    type: {
      external: "external",
      internal: "internal",
    },
  },
};

export const API = {
  root: "http://localhost:3002",
  authGoogle: () => `${API.root}/auth/google`,
  authStatus: () => `${API.root}/auth/status`,
  authRegister: () => `${API.root}/auth/classic/register`,
  authLogin: () => `${API.root}/auth/classic/login`,
  authLogout: () => `${API.root}/auth/logout`,

  networkCreate: () => `${API.root}/networks`,
  networkGet: id => `${API.root}/networks/${id}`,
  networkEdit: id => `${API.root}/networks/${id}`,
  networkRemove: id => `${API.root}/networks/${id}`,
  networkList: () => `${API.root}/networks`,
  networkListExternal: () => `${API.root}/networks/external`,

  articleCreate: () => `${API.root}/articles`,
  articleGet: id => `${API.root}/articles/${id}`,
  articleEdit: id => `${API.root}/articles/${id}`,
  articleRemove: id => `${API.root}/articles/${id}`,
  articleList: () => `${API.root}/articles`,
};

export const links = {
  van: {
    account: "https://www.connnsuite.com/van",
    landing: "https://www.vansoftware.ro",
  },
};

export const footer = [
  [
    {
      title: "Profile",
      url: pages.profile.root,
    },
    {
      title: "Dashboard",
      url: pages.dashboard.root,
    },
    {
      title: "Portfolio",
      url: pages.portfolio.root,
    },
  ],
  [
    {
      title: "About",
      url: pages.about.root,
    },
    {
      title: "FAQ",
      url: pages.profile.root, // TODO
    },
    {
      title: "Badge",
      url: pages.profile.root, // TODO
    },
  ],
  [
    {
      title: "View on Product Hunt",
      url: pages.profile.root, // TODO
    },
    {
      title: "View on Twitter",
      url: pages.profile.root, // TODO
    },
  ],
];

export const MODAL_PORTAL = "van-modal__container";

export const modals = {
  networkRemove: "modalNetworkRemove",
};

const constants = {
  API,
  modals,
  redux,
  pages,
  subpages,
  links,
  types,
  sagas,
  status,
  vendors,
  footer,
};

export default constants;
