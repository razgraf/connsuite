import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User, toUserDTO } from "./user";

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

export function toUsernameDTO(
  username: Username,
  options: { [key: string]: any } = { hideUser: false },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  result.isPrimary = username.isPrimary;
  result.value = username.value;

  if (!_.get(options, "hideUser")) {
    if (!_.isNil(username.user))
      result.user =
        typeof username.user === "object" && (username.user as User).email !== undefined /** Type Guard */
          ? toUserDTO(username.user as User, { hideUsernames: true })
          : { _id: username.user };
  }

  return result;
}

export const UsernameModel = getModelForClass(Username, { schemaOptions: { timestamps: true } });
