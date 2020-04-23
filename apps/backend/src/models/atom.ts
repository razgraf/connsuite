import { prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId;

export class Name {
  @prop({ required: true })
  first!: string;

  @prop({ required: true })
  last!: string;
}

export enum Strategy {
  Google = "google",
  Local = "local",
}
