export { default as atoms } from "./atoms";
export { default as routes } from "./routes";
export { default as HTTP_CODE } from "./http";

import { UserTier } from "../models/atoms";

export const defaults = {
  agent: "Unknown",

  tier: {
    analytics: UserTier.Bronze,
  },
};
