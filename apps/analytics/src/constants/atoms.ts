export const host: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3005}`,
  staging: "https://www.staging.event.connsuite.com",
  production: "https://www.event.connsuite.com",
};

export const backend: { [key: string]: string } = {
  development: `http://localhost:${process.env.PORT || 3002}`,
  staging: "https://www.staging.api.connsuite.com",
  production: "https://www.api.connsuite.com",
};

const NODE_ENV = process.env.NODE_ENV || "development";
export const root = host[NODE_ENV];
export const dependency = {
  backend: backend[NODE_ENV],
};

export default {
  dependency,
  host,
  root,
};
