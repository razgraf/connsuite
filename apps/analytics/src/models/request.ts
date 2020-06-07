import { VisitType } from "./atoms";

export type Random = {
  [key: string]: any;
};

export type VisitCreate = {
  sourceId?: string;
  targetId?: string;
  type?: VisitType;
  referral?: string;
};
