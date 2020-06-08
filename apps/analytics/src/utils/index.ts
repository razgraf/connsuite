import _ from "lodash";
import dayjs from "dayjs";
import { Request } from "express";
import { defaults } from "../constants";

export function getUserAgent(req: Request): string {
  let value = _.attempt(() => req.get("User-Agent"));
  if (_.isError(value) || _.isNil(value)) value = defaults.agent;
  return value;
}

export function isISODate(source: string): boolean {
  if (_.isNil(source)) return false;
  const interpreted = _.attempt(() => dayjs(source).toISOString());
  return !_.isError(interpreted);
}

export function toISODate(source: string): any {
  if (_.isNil(source)) return null;
  const interpreted = _.attempt(() => dayjs(source).toISOString());
  return !_.isError(interpreted) ? interpreted : null;
}
