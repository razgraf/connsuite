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

export enum ImageParent {
  Network = "network",
}