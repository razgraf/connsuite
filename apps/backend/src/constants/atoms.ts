export const host: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3002}`,
  staging: "https://www.staging.api.connsuite.com",
  production: "https://connsuite-backend.herokuapp.com", // "https://www.api.connsuite.com",
};

export const root = host[process.env.NODE_ENV || "development"];
export const tree = {
  article: "public/data/article",
  externalNetwork: "public/static/network",
  internalNetwork: "public/data/network",
  user: "public/data/user",
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
