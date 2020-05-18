import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref, isDocument } from "@typegoose/typegoose";
import { ImageParent, ImagePurpose, ImageDTOOptions } from "./atoms";
import { Network, toNetworkDTO } from "./network";

export class Image {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, enum: ImageParent, default: ImageParent.Network })
  parent!: ImageParent;

  @prop({ required: true, default: 0 })
  version!: number;

  @prop()
  type?: string | number;

  @prop({ enum: ImagePurpose, default: ImagePurpose.Icon })
  purpose?: ImagePurpose;

  /**
   * Possible Parents
   */

  @prop({ ref: { name: "Network" }, required: true })
  network?: Ref<Network>;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;

  url?: string;
}

export function toImageDTO(image: Image, options: ImageDTOOptions = { parent: false }): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result._id = image._id;
  result.parent = image.parent;
  result.version = image.version;

  result.url = image.url;
  result.type = image.type;
  result.purpose = image.purpose;

  if (_.get(options, "parent") === true) {
    switch (result.parent) {
      case ImageParent.Network:
        if (!_.isNil(image.network) && isDocument(image.network)) result.network = toNetworkDTO(image.network);
        break;
      default:
        break;
    }
  }

  return result;
}

export const ImageModel = getModelForClass(Image, { schemaOptions: { timestamps: true } });
