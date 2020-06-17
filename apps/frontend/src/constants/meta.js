import pages from "./pages";

const general = {
  title: "ConnSuite",
  baseUrl: "https://www.connsuite.com",
  creator: "@razgraf",
  site: "@connsuite",
  alt: "Preview of Van's cover",
  motto: "Your online business card",
  description: "Welcome to ConnSuite! Create the ultimate online business card. Link to all your public networks, accounts & stories.",
};

export default {
  general,
  dashboard: {
    title: `${pages.dashboard.title} | ${general.title}`,
  },
  business: {
    title: `${pages.business.title} | ${general.title}`,
  },
  portfolio: {
    title: `${pages.portfolio.title}  | ${general.title}`,
  },
  analytics: {
    title: `${pages.analytics.title}  | ${general.title}`,
  },
  network: {
    title: `Network  | ${general.title}`,
    create: {
      title: `${pages.network.create.title}  | ${general.title}`,
    },
    edit: {
      title: `${pages.network.edit.title}  | ${general.title}`,
    },
  },
  article: {
    title: `Article  | ${general.title}`,
    create: {
      title: `${pages.article.create.title}  | ${general.title}`,
    },
    edit: {
      title: `${pages.article.edit.title}  | ${general.title}`,
    },
  },
  profile: {
    title: "Profile",
    edit: {
      title: "Edit profile",
    },
  },
};
