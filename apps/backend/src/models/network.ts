import { prop, getModelForClass } from "@typegoose/typegoose";

export enum NetworkType {
  Default = "default",
  Custom = "custom",
}

export class Network {
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
}

export const NetworkModel = getModelForClass(Network, { schemaOptions: { timestamps: true } });
