import _ from "lodash";
import official from "@connsuite/guards";
import { types } from "../../../constants";

/**
 * ATOMS
 */

function isIdProvided(__, event) {
  return !_.isNil(_.get(event, "payload.articleId"));
}

function isTypeInternal(__, event) {
  return _.get(event, "payload.type.value") === types.article.type.internal;
}

function isTypeExternal(__, event) {
  return _.get(event, "payload.type.value") === types.article.type.external;
}

function isTitleAcceptable(__, event) {
  return official.isArticleTitleAcceptable(_.get(event, "payload.title.value"), false);
}

function isCoverAcceptable(__, event) {
  return official.isArticleCoverAcceptable(_.get(event, "payload.cover.value"), false);
}

function isUrlAcceptable(__, event) {
  return official.isArticleUrlAcceptable(_.get(event, "payload.url.value"), false);
}

function isContentAcceptable(__, event) {
  return official.isArticleContentAcceptable(_.get(event, "payload.content.value"), false);
}

function isSkillListAcceptable(__, event) {
  return official.isArticleSkillListAcceptable(_.get(event, "payload.skills.value"), false);
}

function isCategoryListAcceptable(__, event) {
  return official.isArticleCategoryListAcceptable(_.get(event, "payload.categories.value"), false);
}

function isInternalBodyAcceptable(context, event) {
  return (
    isTypeInternal(context, event) &&
    isCoverAcceptable(context, event) &&
    isTitleAcceptable(context, event) &&
    isSkillListAcceptable(context, event) &&
    isCategoryListAcceptable(context, event) &&
    isUrlAcceptable(context, event)
  );
}

function isExternalBodyAcceptable(context, event) {
  return (
    isTypeExternal(context, event) &&
    isCoverAcceptable(context, event) &&
    isTitleAcceptable(context, event) &&
    isSkillListAcceptable(context, event) &&
    isCategoryListAcceptable(context, event) &&
    isContentAcceptable(context, event)
  );
}

export { isIdProvided, isTypeInternal, isTypeExternal, isInternalBodyAcceptable, isExternalBodyAcceptable };
