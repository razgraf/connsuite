import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isDocument } from "@typegoose/typegoose";
import { atoms } from "../constants";
import { networks as external } from "../constants";
import { ImageParent, ImagePurpose, ImageDTOOptions } from "./atoms";
import { Article, toArticleDTO } from "./article";
import { Network, toNetworkDTO } from "./network";
import { User, toUserDTO } from "./user";

export class Image {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, enum: ImageParent, default: ImageParent.Network })
  parent!: ImageParent;

  @prop()
  type?: string;

  @prop({ enum: ImagePurpose, default: ImagePurpose.Icon })
  purpose?: ImagePurpose;

  /**
   * Possible Parents
   */

  @prop({ ref: { name: "Network" }, default: null })
  network?: Ref<Network>;

  @prop({ ref: { name: "Article" }, default: null })
  article?: Ref<Article>;

  @prop({ ref: { name: "User" }, default: null })
  user?: Ref<User>;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;

  url?: string;
}

function interpret(image: Image, result: { [key: string]: any } = {}): void {
  if (image.parent === ImageParent.Network) {
    const type = _.attempt(() => _.toString(_.get(image || {}, "type") || "").split("/")[1]);
    if (_.isNil(image._id) || _.isError(type) || _.isNil(type)) return;
    if (Object.keys(external).includes(String(image._id)))
      result.url = `${atoms.root}/${atoms.tree.externalNetwork}/${image.purpose}/${image._id}.${type}`;
    else result.url = `${atoms.root}/${atoms.tree.internalNetwork}/${image._id}.${type}`;
  } else if (image.parent === ImageParent.Article) {
    const type = _.attempt(() => _.toString(_.get(image || {}, "type") || "").split("/")[1]);
    if (_.isNil(image._id) || _.isError(type) || _.isNil(type)) return;
    result.url = `${atoms.root}/${atoms.tree.article}/${image._id}.${type}`;
  } else if (image.parent === ImageParent.User) {
    const type = _.attempt(() => _.toString(_.get(image || {}, "type") || "").split("/")[1]);
    if (_.isNil(image._id) || _.isError(type) || _.isNil(type)) return;
    result.url = `${atoms.root}/${atoms.tree.user}/${image._id}.${type}`;
  }
}

export function toImageDTO(
  image: Image,
  options: ImageDTOOptions = { parent: false, interpret: true },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result.type = image.type;
  result.parent = image.parent;

  if (_.get(options, "parent") === true) {
    switch (result.parent) {
      case ImageParent.Article:
        if (!_.isNil(image.article) && isDocument(image.article)) result.article = toArticleDTO(image.article);
        break;
      case ImageParent.Network:
        if (!_.isNil(image.network) && isDocument(image.network)) result.network = toNetworkDTO(image.network);
        break;
      case ImageParent.User:
        if (!_.isNil(image.user) && isDocument(image.user)) result.user = toUserDTO(image.user);
        break;
      default:
        break;
    }
  }

  if (_.get(options, "interpret") === true) interpret(image, result);

  return result;
}

export const ImageModel = getModelForClass(Image, { schemaOptions: { timestamps: true } });
