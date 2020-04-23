import { prop, arrayProp, getModelForClass, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Name } from "./atom";
import { Username } from "./username";

/** PRIAMRY CLASS */

export class User {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  email!: string;

  @prop()
  googleId?: string | number;

  @prop({ required: true })
  name!: Name;

  @arrayProp({ itemsRef: Username })
  usernames?: Ref<Username>[];
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
