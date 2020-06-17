export const host: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3005}`,
  staging: "https://www.staging.analytics.connsuite.com",
  production: "https://www.analytics.connsuite.com",
};

export const backend: { [key: string]: string } = {
  development: `http://localhost:3002`,
  staging: "https://www.staging.api.connsuite.com",
  production: "https://www.api.connsuite.com",
};

const NODE_ENV = process.env.NODE_ENV || "development";
export const root = host[NODE_ENV];
export const dependency: { [key: string]: { [key: string]: string } } = {
  backend: {
    root: backend[NODE_ENV],
    status: `${backend[NODE_ENV]}/auth/status`,
  },
};

export default {
  dependency,
  host,
  root,
};
