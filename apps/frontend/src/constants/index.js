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
      route: "/network/edit/:id",
      builder: id => `/network/edit/${id}`,
      title: "Edit the Network",
    },
  },
  article: {
    route: "/:id",
    root: "/article",
    create: {
      root: "/article",
      title: "Create a new Article",
    },
    view: {
      root: "/article",
      route: "/article/:id",
      builder: id => `/article/${id}`,
    },
    edit: {
      root: "/article/edit",
      route: "/article/edit/:id",
      builder: id => `/article/edit/${id}`,
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

  COVER_OPEN: "COVER_OPEN",
  COVER_CLOSE: "COVER_CLOSE",
  COVER_TOGGLE: "COVER_TOGGLE",
  COVER_NETWORK_CLEAR: "COVER_NETWORK_CLEAR",
  COVER_NETWORK_SET: "COVER_NETWORK_SET",

  HISTORY_PUSH: "HISTORY_PUSH",
  HISTORY_POP: "HISTORY_POP",
  HISTORY_CLEAR: "HISTORY_CLEAR",
};

export const sagas = {
  TEST: "TEST",
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
    source: {
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

  networkCreate: () => `${API.root}/network`,
  networkGet: id => `${API.root}/network/${id}`,
  networkEdit: id => `${API.root}/network/${id}`,
  networkRemove: id => `${API.root}/network/${id}`,
  networkList: () => `${API.root}/network`,
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

export const DUMMY = {
  NETWORKS: [
    {
      _id: "NET1",
      title: "Facebook 😅👨‍💻",
      type: "default",
      description: "Hi 👋! You can also find me on Facebook.",
      URL: "https://facebook.com/",
      icon: {
        source: require("../assets/networks/normal/icon_facebook.png"),
      },
      username: "razgraf",
    },
    {
      _id: "NET2",
      title: "Twitter",
      type: "default",
      URL: "https://twitter.com/",
      icon: {
        source: require("../assets/networks/normal/icon_twitter.png"),
      },
      username: "razgraf",
    },
    {
      _id: "NET3",
      title: "Behance",
      type: "default",
      URL: "https://behance.com/",
      icon: {
        source: require("../assets/networks/normal/icon_behance.png"),
      },
      username: "razgraf",
    },
    {
      _id: "NET4",
      title: "Pinterest",
      type: "default",
      URL: "https://pinterest.com/",
      icon: {
        source: require("../assets/networks/normal/icon_pinterest.png"),
      },
      username: "razgraf",
    },
    {
      _id: "NET5",
      URL: "https://github.com/",
      type: "default",
      title: "GitHub  LALALALLALALL lalas dlsaldsald lsal",
      icon: {
        source: require("../assets/networks/normal/icon_github.png"),
      },
      username: "razgraf",
    },
    {
      _id: "NET6C",
      URL: "https://www.vansoftware.ro/",
      type: "custom",
      title: "Van Software",
      icon: {
        name: "icon_custom.png",
        source: require("../assets/networks/normal/icon_github.png"),
      },
      username: "@Razvan",
    },
  ],

  ARTICLES: [
    {
      _id: "AA1",
      title: "Company documents generator | Dedicated Software",
      image: {
        source: require("../assets/projects/project-1.png"),
      },
      categories: [
        {
          _id: "#1",
          title: "Design",
        },
      ],
      skills: [
        {
          _id: "#2",
          title: "Branding",
        },
        {
          _id: "#1",
          title: "UI/UX",
        },
        {
          _id: "#4",
          title: "Full Stack",
        },
      ],
      type: "internal",
    },
    {
      _id: "AA2",
      title: "Educational Platform (Brightture) | UI / UX",
      image: {
        source: require("../assets/projects/project-2.png"),
      },
      categories: [
        {
          _id: "#1",
          title: "Design",
        },
        {
          _id: "#2",
          title: "Development",
        },
      ],
      skills: [
        {
          _id: "#2",
          title: "Branding",
        },
        {
          _id: "#1",
          title: "UI/UX",
        },
        {
          _id: "#3",
          title: "ReactJS",
        },
      ],
      type: "external",
      source: "behance.net/razgraf",
    },
    {
      _id: "AA3",
      title: "Event Planning (Epic) | Branding & Social Media",
      image: {
        source: require("../assets/projects/project-3.png"),
      },
      categories: [
        {
          _id: "#1",
          title: "Design",
        },
        {
          _id: "#3",
          title: "Web Development",
        },
      ],
      skills: [
        {
          _id: "#1",
          title: "UI/UX",
        },
        {
          _id: "#3",
          title: "ReactJS",
        },
      ],
      type: "internal",
    },
    {
      _id: "AA4",
      title: "Highway Maintenance Co. (MJQuinn) | Logo",
      image: {
        source: require("../assets/projects/project-4.png"),
      },
      categories: [
        {
          _id: "#1",
          title: "Development",
        },
      ],
      skills: [
        {
          _id: "#2",
          title: "Branding",
        },
      ],
      type: "external",
      source: "www.behance.net/razgraf",
    },
    {
      _id: "AA5",
      title: "Industrial automation (Scadarama) | Web",
      image: {
        source: require("../assets/projects/project-5.png"),
      },
      categories: [
        {
          _id: "#1",
          title: "Design",
        },
        {
          _id: "#3",
          title: "Web Development",
        },
        {
          _id: "#2",
          title: "Development",
        },
      ],
      skills: [
        {
          _id: "#4",
          title: "Full-Stack",
        },
      ],
      type: "external",
      source: "https://www.behance.net/razgraf",
    },
  ],

  CATEGORIES: [
    {
      _id: "#1",
      title: "Design",
    },
    {
      _id: "#2",
      title: "Development",
    },
    {
      _id: "#3",
      title: "Web Development",
    },
  ],

  SKILLS: [
    {
      _id: "#1",
      title: "UI/UX",
    },
    {
      _id: "#2",
      title: "Branding",
    },
    {
      _id: "#3",
      title: "ReactJS",
    },
    {
      _id: "#4",
      title: "Full Stack",
    },
  ],
};

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
