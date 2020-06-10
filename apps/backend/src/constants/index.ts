export { default as atoms } from "./atoms";
export { default as routes } from "./routes";
export { default as HTTP_CODE } from "./http";
export { default as networks } from "./networks";
import { UserTier } from "../models/atoms";

export const defaults = {
  agent: "Unknown",
  username: "rockstar",
  description: "ConnSuite Rockstar",

  tier: {
    analytics: UserTier.Bronze,
  },
};

export const sizes = {
  network: {
    icon: {
      WIDTH: 1000,
      HEIGHT: 1000,
    },
    thumbnail: {
      WIDTH: 400,
      HEIGHT: 400,
    },
  },
  user: {
    picture: {
      WIDTH: 1200,
      HEIGHT: 1200,
    },
    thumbnail: {
      WIDTH: 400,
      HEIGHT: 400,
    },
  },
  article: {
    cover: {
      WIDTH: 1400,
      HEIGHT: 700,
    },
    thumbnail: {
      WIDTH: 900,
      HEIGHT: 450,
    },
  },
};
