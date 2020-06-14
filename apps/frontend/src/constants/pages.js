import IconDashboard from "@material-ui/icons/HomeRounded";
import IconPortfolio from "@material-ui/icons/FolderSpecialRounded";
import IconBusiness from "@material-ui/icons/BusinessRounded";
import IconAnalytics from "@material-ui/icons/PollRounded";
import IconProfile from "@material-ui/icons/PersonRounded";

export default {
  landing: {
    Icon: null,
    root: "/",
    route: "/",
    title: "Landing",
  },
  profile: {
    root: "/",
    view: {
      Icon: IconProfile,
      root: "/",
      route: "/[id]",
      builder: id => `/${id}`,
      title: "Your Profile",
    },
    edit: {
      root: "/edit",
      route: "/edit",
      title: "Edit Profile",
    },
  },
  dashboard: {
    Icon: IconDashboard,
    root: "/dashboard",
    route: "/dashboard",
    title: "Dashboard",
  },
  portfolio: {
    Icon: IconPortfolio,
    root: "/portfolio",
    route: "/portfolio",
    title: "Portfolio",
  },
  business: {
    Icon: IconBusiness,
    root: "/business",
    route: "/business",
    title: "Business Book",
  },
  analytics: {
    Icon: IconAnalytics,
    root: "/analytics",
    route: "/analytics",
    title: "Analytics",
    isPrivate: true,
  },
  about: {
    Icon: null,
    root: "/about",
    route: "/about",
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
    view: {
      root: "/network",
      route: "/network/[id]/[[...slug]]",
      builder: (id, extra) => `/network/${id}${extra ? `/${extra}` : ""}`,
    },
  },
  article: {
    root: "/article",
    create: {
      root: "/article",
      title: "Create a new Article",
      route: "/article",
    },
    view: {
      title: "Article",
      root: "/article",
      route: "/article/[id]/[[...slug]]",
      builder: (id, extra) => `/article/${id}${extra ? `/${extra}` : ""}`,
    },
    edit: {
      title: "Edit Artcle",
      root: "/article/edit",
      route: "/article/edit/[id]",
      builder: id => `/article/edit/${id}`,
    },
  },
};
