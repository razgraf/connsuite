import _ from "lodash";
import { Request } from "express";
import { defaults } from "../constants";

export function getUserAgent(req: Request): string {
  let value = _.attempt(() => req.get("User-Agent"));
  if (_.isError(value) || _.isNil(value)) value = defaults.agent;
  return value;
}
