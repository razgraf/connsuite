export const host: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3000}`,
  staging: "https://www.staging.connsuite.com",
  production: "https://www.connsuite.com",
};

export const root = host[process.env.NODE_ENV || "development"];
export const tree = {
  externalNetwork: "data/static/network",
  internalArticle: "data/content/article",
  internalNetwork: "data/content/network",
};

export default {
  host,
  root,
  tree,
};
