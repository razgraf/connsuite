import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isDocument } from "@typegoose/typegoose";
import { User, toUserDTO } from "./user";
import { Article, toArticleDTO } from "./article";
import { CategoryDTOOptions } from "./atoms";

export class Category {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true })
  title!: string;

  @prop({ required: true, default: false })
  isDefault!: boolean;

  @prop({ ref: { name: "User" } })
  user?: Ref<User>;

  @prop({ ref: { name: "Article" } })
  article?: Ref<Article>;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;

  userId?: string;
  articleId?: string;
}

export function toCategoryDTO(
  category: Category,
  options: CategoryDTOOptions = { user: false, article: false },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result._id = category._id;
  result.title = category.title;
  result.isDefault = category.isDefault;

  if (_.get(options, "user") === true && _.isNil(category.user) && isDocument(category.user)) {
    result.user = toUserDTO(category.user);
  }

  if (_.get(options, "article") === true && _.isNil(category.article) && isDocument(category.article)) {
    result.article = toArticleDTO(category.article);
  }

  return result;
}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } });
