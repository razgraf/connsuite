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
  [key: string]: any;
}

export enum ImageParent {
  Network = "network",
}

export enum ImagePurpose {
  Icon = "icon",
  Thumbnail = "thumbnail",
}

export interface ImageDTOOptions {
  parent?: boolean;
  [key: string]: any;
}

export interface UserDTOOptions {
  usernames?: boolean;
  networks?: boolean;
  [key: string]: any;
}

export interface UsernameDTOOptions {
  user?: boolean;
  [key: string]: any;
}
