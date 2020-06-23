import _ from "lodash";
import official from "@razgraf/connsuite-guards";
import { types } from "../../../constants";

/**
 * ATOMS
 */

function isIdProvided(__, event) {
  return !_.isNil(_.get(event, "payload.articleId"));
}

function isTypeInternal(__, event) {
  return _.get(event, "payload.article.type") === types.article.type.internal;
}

function isTypeExternal(__, event) {
  return _.get(event, "payload.article.type") === types.article.type.external;
}

function isTitleAcceptable(__, event) {
  return official.isArticleTitleAcceptable(_.get(event, "payload.article.title"), false);
}

function isCoverAcceptable(__, event) {
  return official.isArticleCoverAcceptable(_.get(event, "payload.article.cover"), false);
}

function isCoverOptionallyAcceptable(__, event) {
  if (_.get(event, "payload.article.cover.value")) return official.isCoverAcceptable(_.get(event, "payload.article.cover"), false);
  return true;
}

function isUrlAcceptable(__, event) {
  return official.isArticleUrlAcceptable(_.get(event, "payload.article.url"), false);
}

function isContentAcceptable(__, event) {
  return official.isArticleContentAcceptable(_.get(event, "payload.article.content"), false);
}

function isSkillListAcceptable(__, event) {
  return official.isArticleSkillListAcceptable(_.get(event, "payload.article.skills"), false);
}

function isCategoryListAcceptable(__, event) {
  return official.isArticleCategoryListAcceptable(_.get(event, "payload.article.categories"), false);
}

function isInternalBodyAcceptable(context, event) {
  return (
    isTypeInternal(context, event) &&
    isCoverAcceptable(context, event) &&
    isTitleAcceptable(context, event) &&
    isSkillListAcceptable(context, event) &&
    isCategoryListAcceptable(context, event) &&
    isContentAcceptable(context, event)
  );
}

function isExternalBodyAcceptable(context, event) {
  return (
    isTypeExternal(context, event) &&
    isCoverAcceptable(context, event) &&
    isTitleAcceptable(context, event) &&
    isSkillListAcceptable(context, event) &&
    isCategoryListAcceptable(context, event) &&
    isUrlAcceptable(context, event)
  );
}

function isInternalBodyAcceptableEdit(context, event) {
  return (
    isIdProvided(context, event) &&
    isTypeInternal(context, event) &&
    isCoverOptionallyAcceptable(context, event) &&
    isTitleAcceptable(context, event) &&
    isSkillListAcceptable(context, event) &&
    isCategoryListAcceptable(context, event) &&
    isContentAcceptable(context, event)
  );
}

function isExternalBodyAcceptableEdit(context, event) {
  return (
    isIdProvided(context, event) &&
    isTypeExternal(context, event) &&
    isCoverOptionallyAcceptable(context, event) &&
    isTitleAcceptable(context, event) &&
    isSkillListAcceptable(context, event) &&
    isCategoryListAcceptable(context, event) &&
    isUrlAcceptable(context, event)
  );
}

export default {
  isIdProvided,
  isTypeInternal,
  isTypeExternal,
  isInternalBodyAcceptable,
  isExternalBodyAcceptable,
  isInternalBodyAcceptableEdit,
  isExternalBodyAcceptableEdit,
};
