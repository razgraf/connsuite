import _ from "lodash";
import mongoose from "mongoose";
import { prop, arrayProp, getModelForClass, Ref, isDocument, isDocumentArray } from "@typegoose/typegoose";
import { User, toUserDTO } from "./user";
import { Skill, toSkillDTO } from "./skill";
import { ArticleType, ArticleDTOOptions } from "./atoms";
import { Image, toImageDTO } from "./image";
import { Category, toCategoryDTO } from "./category";

export class Article {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, enum: ArticleType, default: ArticleType.Internal })
  type!: ArticleType;

  @prop({ required: true })
  title!: string;

  @prop({ ref: { name: "User" }, required: true })
  user?: Ref<User>;

  @prop({ ref: { name: "Image" }, default: null })
  cover?: Ref<Image>;

  @prop({ ref: { name: "Image" }, default: null })
  thumbnail?: Ref<Image>;

  @prop()
  url?: string;

  @prop()
  content?: string;

  @prop()
  summary?: string;

  @arrayProp({ itemsRef: "Skill" })
  skills?: Ref<Skill>[];

  @arrayProp({ itemsRef: "Category" })
  categories?: Ref<Category>[];

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;

  userId?: string;
}

export function toArticleDTO(
  article: Article,
  options: ArticleDTOOptions = { categories: true, skills: true, images: true, user: true, content: false },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result._id = article._id;
  result.type = article.type;
  result.title = article.title;
  result.url = article.url;

  if (result.type === ArticleType.Internal) {
    result.summary = article.summary;
    if (_.get(options, "content") === true && !_.isNil(article.content)) result.content = article.content;
  }

  if (_.get(options, "images") === true) {
    if (!_.isNil(article.cover) && isDocument(article.cover)) result.cover = toImageDTO(article.cover);
    if (!_.isNil(article.thumbnail) && isDocument(article.thumbnail)) result.thumbnail = toImageDTO(article.thumbnail);
  }

  if (_.get(options, "user") === true && !_.isNil(article.user) && isDocument(article.user))
    result.user = toUserDTO(article.user);

  if (_.get(options, "skills") === true && !_.isNil(article.skills) && isDocumentArray(article.skills))
    result.skills = article.skills?.map(item => toSkillDTO(item));

  if (_.get(options, "categories") === true && !_.isNil(article.categories) && isDocumentArray(article.categories))
    result.categories = article.categories?.map(item => toCategoryDTO(item));

  return result;
}

export const ArticleModel = getModelForClass(Article, { schemaOptions: { timestamps: true } });
