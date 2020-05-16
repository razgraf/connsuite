import _ from "lodash";
import mongoose from "mongoose";
import { prop, arrayProp, getModelForClass, Ref } from "@typegoose/typegoose";
import { Name } from "./atoms";
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
  options: { [key: string]: any } = { hideId: true, hideUsernames: false, hideNetworks: true },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};
  result.description = user.description;
  result.email = user.email;
  result.name = user.name;
  if (!_.get(options, "hideId")) result._id = user._id;
  if (!_.get(options, "hideUsernames")) {
    result.usernames = [];
    result.usernames = user.usernames?.map(item => {
      return typeof item === "object" && (item as Username).value !== undefined /** Type Guard */
        ? toUsernameDTO(item as Username, { hideUser: true })
        : { _id: item };
    });
  }

  if (!_.get(options, "hideNetworks")) {
    result.networks = [];
    result.networks = user.networks?.map(item => {
      return typeof item === "object" && (item as Network).title !== undefined /** Type Guard */
        ? toNetworkDTO(item as Network, { hideUser: true })
        : { _id: item };
    });
  }

  return result;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
