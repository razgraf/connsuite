import _ from "lodash";
import mongoose from "mongoose";
import { prop, arrayProp, getModelForClass, Ref } from "@typegoose/typegoose";
import { Name } from "./atom";
import { Username, toUsernameDTO } from "./username";

/** PRIAMRY CLASS */

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

  @arrayProp({ itemsRef: Username })
  usernames?: Ref<Username>[];

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export class UserDTO {
  public description?: string;
  public email?: string;
  public name?: Name;
  public usernames?: Username[];

  constructor(user: User) {
    this.description = user.description;
    this.email = user.email;
    this.name = user.name;
  }
}

export function toUserDTO(user: User, options: { [key: string]: any } = {}): { [key: string]: any } {
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

  return result;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
