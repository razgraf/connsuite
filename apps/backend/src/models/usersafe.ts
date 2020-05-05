import mongoose from "mongoose";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";

/**
 * @class Usersafe
 * Created a "safe token" for an extra layer of protection at auth. Verify in the JWT that the received safe matches the userId
 */
export class Usersafe {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ ref: { name: "User" }, required: true })
  user!: Ref<User>;

  @prop({ required: true })
  safe!: string;

  @prop()
  agent?: string;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export const UsersafeModel = getModelForClass(Usersafe, {
  schemaOptions: { timestamps: true, collection: "usersafes" },
});
