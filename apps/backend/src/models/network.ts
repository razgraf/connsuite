import mongoose from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";

export enum NetworkType {
  Default = "default",
  Custom = "custom",
}

export class Network {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true })
  description!: string;

  // icon: string; //TODO
  @prop({ required: true, default: 0 })
  priority?: number;
  // thumbnail: string; //TODO
  @prop({ required: true })
  title!: string;

  @prop({ required: true, enum: NetworkType, default: NetworkType.Default })
  type!: NetworkType;

  @prop({ required: true })
  username!: string;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export const NetworkModel = getModelForClass(Network, { schemaOptions: { timestamps: true } });
