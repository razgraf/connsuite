import mongoose from "mongoose";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";

export class Username {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, default: false })
  isPrimary!: boolean;

  @prop({ ref: { name: "User" }, required: true })
  user!: Ref<User>;

  @prop({ required: true })
  value!: string;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export const UsernameModel = getModelForClass(Username, { schemaOptions: { timestamps: true } });
