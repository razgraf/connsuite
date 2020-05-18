import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isDocument } from "@typegoose/typegoose";
import { User, toUserDTO } from "./user";
import { UsernameDTOOptions } from "./atoms";

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
  options: UsernameDTOOptions = { user: false },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result._id = username._id;
  result.isPrimary = username.isPrimary;
  result.value = username.value;

  if (_.get(options, "user") === true && _.isNil(username.user) && isDocument(username.user))
    result.user = toUserDTO(username.user);

  return result;
}

export const UsernameModel = getModelForClass(Username, { schemaOptions: { timestamps: true } });
