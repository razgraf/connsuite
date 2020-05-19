import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isDocument } from "@typegoose/typegoose";
import { User, toUserDTO } from "./user";
import { Article, toArticleDTO } from "./article";
import { SkillDTOOptions } from "./atoms";

export class Skill {
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

export function toSkillDTO(
  skill: Skill,
  options: SkillDTOOptions = { user: false, article: false },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result._id = skill._id;
  result.title = skill.title;
  result.isDefault = skill.isDefault;

  if (_.get(options, "user") === true && _.isNil(skill.user) && isDocument(skill.user)) {
    result.user = toUserDTO(skill.user);
  }

  if (_.get(options, "article") === true && _.isNil(skill.article) && isDocument(skill.article)) {
    result.article = toArticleDTO(skill.article);
  }

  return result;
}

export const SkillModel = getModelForClass(Skill, { schemaOptions: { timestamps: true } });
