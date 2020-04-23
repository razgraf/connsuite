import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";

export class Username {
  @prop({ required: true, default: false })
  isPrimary!: boolean;

  @prop({ ref: { name: "User" }, required: true })
  user!: Ref<User>;

  @prop({ required: true })
  value!: string;
}

export const UsernameModel = getModelForClass(Username, { schemaOptions: { timestamps: true } });
