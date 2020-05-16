export const host: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3000}`,
  staging: "https://www.staging.connsuite.com",
  production: "https://www.connsuite.com",
};

export const root = host[process.env.NODE_ENV || "development"];
export const tree = {
  externalNetwork: `${root}/data/static/network`,
  internalArticle: `${root}/data/content/article`,
  internalNetwork: `${root}/data/content/network`,
};

export default {
  host,
  root,
  tree,
};
