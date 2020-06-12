import meta from "./meta";
import pages from "./pages";
import status from "./httpcodes";
import types from "./types";
import { redux, sagas } from "./store";

export { status, types, pages, redux, sagas, meta };

export const host = {
  development: `http://localhost:${process.env.PORT || 3001}`,
  staging: "https://www.staging.connsuite.com",
  production: "https://www.connsuite.com",
};

export const root = host[process.env.NODE_ENV || "development"];

export const vendors = {};

export const API = {
  root: "http://localhost:3002",
  analytics: "http://localhost:3005",
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

  skillListDefault: () => `${API.root}/skills/default`,
  categoryListDefault: () => `${API.root}/categories/default`,

  userGet: id => `${API.root}/users/${id}`,
  userEdit: id => `${API.root}/users/${id}`,
  userListSkillsAndCategories: id => `${API.root}/users/${id}`,

  analyticsVisitCreate: () => `${API.analytics}/visits`,
  analyticsVisitGet: (type, id) => `${API.analytics}/visits/${id}?type=${type}`,
  analyticsVisitList: type => `${API.analytics}/visits?type=${type}`,
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
      url: pages.profile.view.root,
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
      title: "FAQ / Ask",
      url: "https://www.twitter.com/connsuite",
    },
  ],
  [
    {
      title: "View on Product Hunt",
      url: "https://producthunt.com/connsuite-beta",
    },
    {
      title: "View on Twitter",
      url: "https://www.twitter.com/connsuite",
    },
    {
      title: "Collaborations",
      url: "https://www.vansoftware.ro",
    },
  ],
];

export const MODAL_PORTAL = "van-modal__container";

export const modals = {
  networkRemove: "modalNetworkRemove",
  articleRemove: "modalArticleRemove",
  articleLeave: "modalArticleLeave",
  profileLeave: "modalProfileLeave",
};

const constants = {
  API,
  modals,
  redux,
  pages,
  links,
  types,
  meta,
  sagas,
  status,
  vendors,
  footer,
  root,
  host,
};

export default constants;
