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
    route: "/:id",
    title: "Profile",
    isPrefetched: true,
  },
  dashboard: {
    Icon: IconDashboard,
    root: "/dashboard",
    title: "Dashboard",
    isPrefetched: true,
  },
  portfolio: {
    Icon: IconPortfolio,
    root: "/portfolio",
    title: "Portfolio",
    isPrefetched: true,
  },
  business: {
    Icon: IconBusiness,
    root: "/business",
    title: "Business Book",
    isPrefetched: true,
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
    route: "/:id",
    root: "/network",
    create: {
      root: "/network",
    },
    edit: {
      root: "/network",
      route: "/network/:id",
    },
  },
};

export const subpages = {};

export const vendors = {};

export const redux = {
  SET: "SET",
  CHECK: "CHECK",

  AUTH_USER_SET: "AUTH_USER_SET",
  AUTH_TOKEN_SET: "AUTH_TOKEN_SET",
};

export const sagas = {
  TEST: "TEST",
};

export const types = {
  nav: {
    platform: "platform",
    presentation: "presentation",
    profile: "profile",
  },
};

export const API = {
  root: "http://localhost:3002",
  authGoogle: () => `${API.root}/auth/google`,
  authStatus: () => `${API.root}/auth/status`,
  authRegister: () => `${API.root}/auth/classic/register`,
  authLogin: () => `${API.root}/auth/classic/login`,
  authLogout: () => `${API.root}/auth/logout`,
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

const constants = {
  API,
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
