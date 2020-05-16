import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { ImageParent } from "./atoms";
import { Network, toNetworkDTO } from "./network";

export class Image {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, enum: ImageParent, default: ImageParent.Network })
  parent!: ImageParent;

  @prop({ required: true, default: 0 })
  version!: number;

  @prop()
  source?: string;

  @prop()
  size?: string;

  @prop()
  type?: string;

  @prop()
  dimensions?: string;

  /**
   * Possible Parents
   */

  @prop({ ref: { name: "Network" }, required: true })
  network?: Ref<Network>;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export function toImageDTO(
  image: Image,
  options: { [key: string]: any } = { hideParent: true },
): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result.parent = image.parent;
  result.version = image.version;

  result.size = image.size;
  result.type = image.type;
  result.dimensions = image.dimensions;

  if (!_.get(options, "hideId")) result._id = image._id;
  if (!_.get(options, "hideParent")) {
    switch (result.parent) {
      case ImageParent.Network:
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
