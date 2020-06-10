import _ from "lodash";
import shortid from "shortid";
import { Request } from "express";
import { defaults } from "../constants";

export function getUserAgent(req: Request): string {
  let value = _.attempt(() => req.get("User-Agent"));
  if (_.isError(value) || _.isNil(value)) value = defaults.agent;
  return value;
}

export function isShortId(id: string): boolean {
  return !_.isNil(id) && shortid.isValid(id) && String(id).charAt(String(id).length - 1) === "_";
}

export function isSelf(
  resource: any,
  res: {
    locals: {
      identity: {
        user: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  },
): boolean {
  return (
    _.get(resource, "user._id") &&
    _.toString(_.get(res, "locals.identity.user")) === _.toString(_.get(resource, "user._id"))
  );
}
