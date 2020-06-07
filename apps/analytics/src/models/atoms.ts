import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId;

export enum VisitType {
  Default = "default",
  Network = "network",
  Article = "article",
  Profile = "profile",
  BusinessCard = "businesscard",
}

export interface VisitDTOOptions {
  ids?: boolean;
}
