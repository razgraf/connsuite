import _ from "lodash";
import { types } from "../../../constants";

function isTitleValid(context, event) {
  return true;
}

function isIconValid(context, event) {
  return true;
}

function isExternalIdValid(context, event) {
  return true;
}

function isUrlValid(context, event) {
  return true;
}

function isUsernameValid(context, event) {
  return true;
}

function isUsernameAcceptable(context, event) {
  return true;
}

function isDescriptionAcceptable(context, event) {
  return true;
}

function isTypeInternal(__, event) {
  return _.get(event, "type") === types.network.source.internal;
}

function isTypeExternal(__, event) {
  return _.get(event, "type") === types.network.source.external;
}

const guards = {
  isTypeInternal,
  isTypeExternal,

  isTitleValid,
  isIconValid,
  isExternalIdValid,
  isUrlValid,
  isUsernameValid,

  isUsernameAcceptable,
  isDescriptionAcceptable,
};

export default guards;
