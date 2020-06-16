import _ from "lodash";
import official from "@connsuite/guards";

/**
 * ATOMS
 */

function isFistNameAcceptable(__, event) {
  return official.isNameAcceptable(_.get(event, "payload.profile.firstName"), false);
}

function isLastNameAcceptable(__, event) {
  return official.isNameAcceptable(_.get(event, "payload.profile.lastName"), false);
}

function isDescriptionAcceptable(__, event) {
  return official.isUserDescriptionAcceptable(_.get(event, "payload.profile.description"), false);
}

function isTaglineAcceptable(__, event) {
  return official.isUserTaglineAcceptable(_.get(event, "payload.profile.tagline"), false);
}

function isPictureNecessaryAcceptable(__, event) {
  return official.isUserPictureAcceptable(_.get(event, "payload.profile.picture"), false);
}

function isPictureOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.profile.picture")) return official.isUserPictureAcceptable(_.get(event, "payload.profile.picture"), false);
  return true;
}

function isPictureAcceptable(__, event) {
  if (_.get(event, "PICTURE_REQUIRED")) return isPictureNecessaryAcceptable(__, event);
  return isPictureOptionallyAcceptable(__, event);
}

function isCalendlyOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.profile.calendly")) return official.isUserCalendlyAcceptable(_.get(event, "payload.profile.calendly"), false);
  return true;
}

function isProfileAcceptable(context, event) {
  return (
    isFistNameAcceptable(context, event) &&
    isLastNameAcceptable(context, event) &&
    isDescriptionAcceptable(context, event) &&
    isTaglineAcceptable(context, event) &&
    isCalendlyOptionallyAcceptable(context, event) &&
    isPictureAcceptable(context, event)
  );
}

export default {
  isProfileAcceptable,
};
