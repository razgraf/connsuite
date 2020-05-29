import _ from "lodash";
import * as limits from "./atoms/limits";
import articleGuards, { policy as articlePolicy } from "./article";
import networkGuards, { policy as networkPolicy } from "./network";
import userGuards, { policy as userPolicy } from "./user";

/**
 * Interpret the policy values for out atomic Inputs
 *
 * @param {function} gate
 * @param {*} value
 */
function interpret(gate: Function, value: any): any {
  if (_.isNil(value) || (_.isString(value) && _.isEmpty(value))) return null;
  if (!_.isFunction(gate)) throw new Error("Gate Method is not a function");
  const result = gate(value);
  return result === true ? null : result;
}

const policy = {
  article: articlePolicy,
  user: userPolicy,
  network: networkPolicy,
};

const guards = {
  interpret,
  ...articleGuards,
  ...userGuards,
  ...networkGuards,
};

export default guards;
export { limits, policy };
