import _ from "lodash";
import { types } from "../../../constants";
import official from "../../../guards";

/**
 * ATOMS
 */

function isTitleAcceptable(__, event) {
  return official.isNetworkTitleAcceptable(_.get(event, "payload.title.value"), false);
}

function isIconAcceptable(__, event) {
  return official.isNetworkIconAcceptable(_.get(event, "payload.icon.value"), false);
}

function isExternalIdAcceptable(__, event) {
  return official.isNetworkExternalIdAcceptable(_.get(event, "payload.externalId.value"), false);
}

function isUrlAcceptable(__, event) {
  return official.isNetworkUrlAcceptable(_.get(event, "payload.url.value"), false);
}

function isUsernameAcceptable(__, event) {
  return official.isNetworkUsernameAcceptable(_.get(event, "payload.username.value"), false);
}

function isUsernameOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.username.value") && _.get(event, "payload.username.value").length > 200) return false;
  return true;
}

function isDescriptionOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.description.value") && _.get(event, "payload.description.value").length > 200) return false;
  return true;
}

function isNetworkTypeInternal(__, event) {
  return _.get(event, "payload.type.value") === types.network.source.internal;
}

function isNetworkTypeExternal(__, event) {
  return _.get(event, "payload.type.value") === types.network.source.external;
}

/**
 * GUARDS
 */

function isInternalChooseAcceptable(context, event) {
  return isNetworkTypeInternal(context, event) && isTitleAcceptable(context, event) && isIconAcceptable(context, event);
}

function isExternalChooseAcceptable(context, event) {
  return isNetworkTypeExternal(context, event) && isExternalIdAcceptable(context, event);
}

function isInternalCredentialsAcceptable(context, event) {
  return isNetworkTypeInternal(context, event) && isUrlAcceptable(context, event) && isUsernameOptionallyAcceptable(context, event);
}

function isExternalCredentialsAcceptable(context, event) {
  return isNetworkTypeExternal(context, event) && isUsernameAcceptable(context, event);
}

function isLiveAcceptable(context, event) {
  return isDescriptionOptionallyAcceptable(context, event);
}

const guards = {
  isInternalChooseAcceptable,
  isExternalChooseAcceptable,
  isInternalCredentialsAcceptable,
  isExternalCredentialsAcceptable,
  isLiveAcceptable,
};

export default guards;
