/* eslint-disable @typescript-eslint/camelcase */ /* -- validator {require_protocol} -- */
import _ from "lodash";
import validator from "validator";
import { limits, WITH_POLICY } from "./atoms";

export const policy = {
  root: "Articles must be valid",
  title: {
    root: `Titles must contain between ${limits.MIN_ARTICLE_TITLE_LENGTH} and ${limits.MAX_ARTICLE_TITLE_LENGTH} characters.`,
    1: `Please use between ${limits.MIN_ARTICLE_TITLE_LENGTH} and ${limits.MAX_ARTICLE_TITLE_LENGTH} characters for the title.`,
  },
  cover: {
    root: `Covers must be images (${limits.ALLOWED_ARTICLE_COVER_FORMAT.join(", ")}) and must have a maximum size of ${
      limits.MAX_ARTICLE_COVER_SIZE / (1024 * 1024)
    } MB.`,
    1: `Please use files that are images: (${limits.ALLOWED_ARTICLE_COVER_FORMAT.join(", ")}).`,
    2: `Please use files smaller than ${limits.MAX_ARTICLE_COVER_SIZE / (1024 * 1024)} MB.`,
    3: "Please add a file with a valid name.",
  },
  url: {
    root: "Websites and URLs have to contain http:// or https:// and be valid",
    1: "Please add http:// or https:// before your website or url.",
    2: "Please add a valid website or url.",
  },
  skills: {
    root: "You have to use valid skills for your article",
    1: `You can have at most ${limits.MAX_ARTICLE_SKILLS_COUNT} skills per article.`,
    2: `Custom skills should have between ${limits.MIN_ARTICLE_SKILLS_TITLE_LENGTH} and ${limits.MAX_ARTICLE_SKILLS_TITLE_LENGTH} characters`,
  },
};

function isArticleTitleAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [limits.MIN_ARTICLE_TITLE_LENGTH, limits.MAX_ARTICLE_TITLE_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value)))
    return withPolicy ? policy.title[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.title[1] : false;
}

function isArticleCoverAcceptable(
  value: { name: string; type: string; size: string | number; [key: string]: string | number } | Express.Multer.File,
  withPolicy = WITH_POLICY,
  options: { vendor: string; [key: string]: string },
): string | boolean {
  if (options && options.vendor === "multer") {
    /** Server Side */
    const name = _.get(value, "originalname");
    const type = _.attempt(() => _.toString(value.mimetype).split("/").pop());
    const size = _.toNumber(_.get(value, "size"));

    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name)) return withPolicy ? policy.cover[3] : false;
    if (_.isError(type) || !limits.ALLOWED_ARTICLE_COVER_FORMAT.includes(type || ""))
      return withPolicy ? policy.cover[1] : false;
    if (_.isError(size) || size <= 0 || size > limits.MAX_ARTICLE_COVER_SIZE)
      return withPolicy ? policy.cover[2] : false;
    return true;
  } else {
    /** Client Side */
    const name = _.get(value, "name");
    const type = _.attempt(() => _.get(value, "type").split("/").pop());
    const size = _.toNumber(_.get(value, "size"));
    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name)) return withPolicy ? policy.cover[3] : false;
    if (_.isError(type) || !limits.ALLOWED_ARTICLE_COVER_FORMAT.includes(type || ""))
      return withPolicy ? policy.cover[1] : false;
    if (_.isError(size) || size <= 0 || size > limits.MAX_ARTICLE_COVER_SIZE)
      return withPolicy ? policy.cover[2] : false;
    return true;
  }
}

function isArticleUrlAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value)) return withPolicy ? policy.url[2] : false;
  if (!(value.startsWith("https://") || value.startsWith("http://"))) return withPolicy ? policy.url[1] : false;
  return validator.isURL(value, { require_protocol: true }) ? true : withPolicy ? policy.url[2] : false;
}

function isArticleContentAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  return true;
}

function isArticleSkillListAcceptable(
  value: any[] | string | undefined,
  withPolicy = WITH_POLICY,
  isStringified = false,
): string | boolean {
  const list = isStringified && !_.isNil(value) ? _.attempt(() => JSON.parse(value as string)) : value;

  if (_.isNil(list) || !_.isArray(list)) return withPolicy ? policy.skills.root : false;
  if (list.length > limits.MAX_ARTICLE_SKILLS_COUNT) return withPolicy ? policy.skills[1] : false;

  const [min, max] = [limits.MIN_ARTICLE_SKILLS_TITLE_LENGTH, limits.MAX_ARTICLE_SKILLS_TITLE_LENGTH];

  for (let i = 0; i < list.length; i += 1) {
    const skill = list[i];
    if (!_.has(skill, "_id") && !_.has(skill, "title")) return withPolicy ? policy.skills[2] : false;
    if (_.has(skill, "_id") && !_.get(skill, "_id")) return withPolicy ? policy.skills[2] : false;
    if (_.has(skill, "title")) {
      const length = _.toString(_.get(skill, "title")).length;
      if (length < min || length > max) return withPolicy ? policy.skills[2] : false;
    }
  }

  return true;
}

function isArticleCategoryListAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  return true;
}

export default {
  isArticleTitleAcceptable,
  isArticleCoverAcceptable,
  isArticleUrlAcceptable,

  isArticleContentAcceptable,
  isArticleSkillListAcceptable,
  isArticleCategoryListAcceptable,
};
