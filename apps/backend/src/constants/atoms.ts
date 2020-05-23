export const host: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3000}`,
  staging: "https://www.staging.connsuite.com",
  production: "https://www.connsuite.com",
};

export const root = host[process.env.NODE_ENV || "development"];
export const tree = {
  article: "public/data/article",
  externalNetwork: "public/static/network",
  internalNetwork: "public/data/network",
};

export const configs = {
  WITH_POLICY: false,
};

export default {
  host,
  root,
  tree,
  configs,
};
