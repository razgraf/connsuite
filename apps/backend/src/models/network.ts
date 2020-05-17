import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
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

export function interpret(network: Network, result: { [key: string]: any } = {}): void {
  if (_.isNil(network.externalId) || !_.has(networks, network.externalId)) return;

  const external: Network = networks[network.externalId];

  result.title = external.title;
  result.icon = external.title;
  result.thumbnail = external.thumbnail;
  result.url = external.url;
}

export function toNetworkDTO(
  network: Network,
  options: NetworkDTOOptions = { hideImages: false, hideUser: true, interpret: true },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result.type = network.type;
  result.priority = network.priority;

  result.title = network.title;
  result.description = network.description;
  result.username = network.username;
  result.url = network.url;

  if (_.get(options, "interpret") && network.type === NetworkType.External) interpret(network, result);

  if (!_.get(options, "hideId")) result._id = network._id;
  if (!_.get(options, "hideUser")) {
    result.user =
      typeof network.user === "object" && (network.user as User).email !== undefined /** Type Guard */
        ? toUserDTO(network.user as User, { hideNetworks: true })
        : { _id: network.user };
  }
  if (!_.get(options, "hideImages")) {
    result.icon =
      typeof network.icon === "object" && (network.icon as Image).version !== undefined /** Type Guard */
        ? toImageDTO(network.icon as Image, { hideParent: true })
        : { _id: network.icon };

    result.thumbnail =
      typeof network.thumbnail === "object" && (network.thumbnail as Image).version !== undefined /** Type Guard */
        ? toImageDTO(network.thumbnail as Image, { hideParent: true })
        : { _id: network.thumbnail };
  }

  return result;
}

export const NetworkModel = getModelForClass(Network, { schemaOptions: { timestamps: true } });
