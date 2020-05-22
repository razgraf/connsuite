import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isDocument } from "@typegoose/typegoose";
import { networks } from "../constants";
import { NetworkType, NetworkDTOOptions } from "./atoms";
import { User, toUserDTO } from "./user";
import { Image, toImageDTO } from "./image";

export class Network {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, enum: NetworkType, default: NetworkType.Internal })
  type!: NetworkType;

  @prop({ ref: { name: "User" }, required: true })
  user?: Ref<User>;

  @prop({ default: 0 })
  priority?: number;

  @prop()
  title?: string;

  @prop()
  description?: string;

  @prop()
  username?: string;

  @prop()
  url?: string;

  @prop()
  externalId?: string;

  @prop({ ref: { name: "Image" }, default: null })
  icon?: Ref<Image>;

  @prop({ ref: { name: "Image" }, default: null })
  thumbnail?: Ref<Image>;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

function interpret(network: Network, result: { [key: string]: any } = {}): void {
  if (network.type === NetworkType.External) {
    if (_.isNil(network.externalId) || !_.has(networks, network.externalId)) return;

    const external: Network = networks[network.externalId];

    result.title = external.title;
    result.icon = external.icon;
    result.thumbnail = external.thumbnail;
    result.url = external.url;
  }
}

export function toNetworkDTO(
  network: Network,
  options: NetworkDTOOptions = { images: true, user: true, interpret: true },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result._id = network._id;
  result.type = network.type;
  result.priority = network.priority;

  result.title = network.title;
  result.description = network.description;
  result.username = network.username;
  result.url = network.url;

  if (_.get(options, "interpret") === true) interpret(network, result);

  if (_.get(options, "user") === true && !_.isNil(network.user) && isDocument(network.user)) {
    result.user = toUserDTO(network.user);
  }
  if (_.get(options, "images") === true) {
    if (!_.isNil(network.icon) && isDocument(network.icon)) result.icon = toImageDTO(network.icon);
    if (!_.isNil(network.thumbnail) && isDocument(network.thumbnail)) result.thumbnail = toImageDTO(network.thumbnail);
  }

  return result;
}

export const NetworkModel = getModelForClass(Network, { schemaOptions: { timestamps: true } });
