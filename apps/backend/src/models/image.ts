import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { ImageParent, ImagePurpose } from "./atoms";
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

export function toImageDTO(
  image: Image,
  options: { [key: string]: any } = { hideParent: true },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result.parent = image.parent;
  result.version = image.version;

  result.url = image.url;
  result.type = image.type;
  result.purpose = image.purpose;

  if (!_.get(options, "hideId")) result._id = image._id;
  if (!_.get(options, "hideParent")) {
    switch (result.parent) {
      case ImageParent.Network:
        if (!_.isNil(image.network))
          result.user =
            typeof image.network === "object" && (image.network as Network).title !== undefined /** Type Guard */
              ? toNetworkDTO(image.network as Network, { hideImages: true })
              : { _id: image.network };
        break;
      default:
        break;
    }
  }

  return result;
}

export const ImageModel = getModelForClass(Image, { schemaOptions: { timestamps: true } });
