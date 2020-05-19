import { prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId;

export class Name {
  @prop({ required: true })
  first!: string;

  @prop({ required: true })
  last!: string;
}

export enum Vendor {
  GOOGLE = "GOOGLE",
  CLASSIC = "CLASSIC",
}

export type Token = {
  userId: string;
  safe: string;
};

export enum NetworkType {
  External = "external",
  Internal = "internal",
}

export interface NetworkDTOOptions {
  images?: boolean;
  user?: boolean;
  interpret?: boolean;
}

export enum ImageParent {
  Network = "network",
  Article = "article",
}

export enum ImagePurpose {
  Cover = "cover",
  Icon = "icon",
  Thumbnail = "thumbnail",
}

export interface ImageDTOOptions {
  parent?: boolean;
}

export interface UserDTOOptions {
  usernames?: boolean;
  networks?: boolean;
}

export interface UsernameDTOOptions {
  user?: boolean;
}

export interface SkillDTOOptions {
  user?: boolean;
  article?: boolean;
}

export interface ArticleDTOOptions {
  skills?: boolean;
  images?: boolean;
  user?: boolean;
}

export enum ArticleType {
  External = "external",
  Internal = "internal",
}
