import _ from "lodash";
import mongoose from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { VisitType, VisitDTOOptions } from "./atoms";

export class Visit {
  readonly _id?: mongoose.Schema.Types.ObjectId | string;

  @prop({ required: true, enum: VisitType, default: VisitType.Default })
  type!: VisitType;

  /**
   * Visits *from* one resource(e.g. user)
   */
  @prop()
  sourceId?: string;

  /**
   * Visits *to* one resource(e.g. network, article)
   */
  @prop()
  targetId?: string;

  @prop({ default: "local" })
  referral?: string;

  readonly createdAt?: mongoose.Schema.Types.Date | string;
  readonly updatedAt?: mongoose.Schema.Types.Date | string;
}

export function toVisitDTO(visit: Visit, options: VisitDTOOptions = { ids: false }): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  result.type = visit.type;
  result.createdAt = visit.createdAt;
  result.referral = visit.referral;

  if (_.get(options, "ids") === true) {
    result.sourceId = visit.sourceId;
    result.targetId = visit.targetId;
  }
  return result;
}

export const VisitModel = getModelForClass(Visit, { schemaOptions: { timestamps: true } });
