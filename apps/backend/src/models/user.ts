import _ from "lodash";
import mongoose from "mongoose";
import { prop, arrayProp, getModelForClass, Ref, isDocumentArray } from "@typegoose/typegoose";
import { Name, UserDTOOptions } from "./atoms";
import { Username, toUsernameDTO } from "./username";
import { Network, toNetworkDTO } from "./network";

export class User {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  email!: string;

  @prop()
  password?: string;

  @prop()
  googleId?: string | number;

  @prop({ required: true })
  name!: Name;

  @arrayProp({ itemsRef: "Username" })
  usernames?: Ref<Username>[];

  @arrayProp({ itemsRef: "Network" })
  networks?: Ref<Network>[];

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export function toUserDTO(
  user: User,
  options: UserDTOOptions = { usernames: false, networks: false },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  result._id = user._id;
  result.description = user.description;
  result.email = user.email;
  result.name = user.name;

  if (_.get(options, "usernames") === true && !_.isNil(user.usernames) && isDocumentArray(user.usernames)) {
    result.usernames = user.usernames?.map(item => toUsernameDTO(item));
  }

  if (_.get(options, "networks") === true && !_.isNil(user.networks) && isDocumentArray(user.networks)) {
    result.networks = user.networks?.map(item => toNetworkDTO(item));
  }

  return result;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
