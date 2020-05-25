import _ from "lodash";
import official from "@connsuite/guards";
import { types } from "../../../constants";

/**
 * ATOMS
 */

function isNetworkIdProvided(__, event) {
  return !_.isNil(_.get(event, "payload.networkId"));
}

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
  if (_.get(event, "payload.username.value")) return official.isNetworkUsernameAcceptable(_.get(event, "payload.username.value"), false);
  return true;
}

function isDescriptionOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.description.value"))
    return official.isNetworkDescriptionsAcceptable(_.get(event, "payload.description.value"), false);
  return true;
}

function isIconOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.icon.value")) return official.isNetworkIconAcceptable(_.get(event, "payload.icon.value"), false);
  return true;
}

function isNetworkTypeInternal(__, event) {
  return _.get(event, "payload.type.value") === types.network.type.internal;
}

function isNetworkTypeExternal(__, event) {
  return _.get(event, "payload.type.value") === types.network.type.external;
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

function isInternalModifyAcceptable(context, event) {
  return (
    isNetworkTypeInternal(context, event) &&
    isNetworkIdProvided(context, event) &&
    isTitleAcceptable(context, event) &&
    isUrlAcceptable(context, event) &&
    isIconOptionallyAcceptable(context, event) &&
    isUsernameOptionallyAcceptable(context, event) &&
    isDescriptionOptionallyAcceptable(context, event)
  );
}

function isExternalModifyAcceptable(context, event) {
  return (
    isNetworkTypeExternal(context, event) &&
    isNetworkIdProvided(context, event) &&
    isUsernameAcceptable(context, event) &&
    isDescriptionOptionallyAcceptable(context, event)
  );
}

const guards = {
  isInternalChooseAcceptable,
  isExternalChooseAcceptable,
  isInternalCredentialsAcceptable,
  isExternalCredentialsAcceptable,
  isLiveAcceptable,

  isInternalModifyAcceptable,
  isExternalModifyAcceptable,

  isNetworkIdProvided,
};

export default guards;
