import { VisitType } from "./atoms";

export type Random = {
  [key: string]: any;
};

export type VisitCreate = {
  sourceId?: string;
  targetId?: string;
  type?: VisitType;
  referer?: string;
};

export type VisitGetForItem = {
  type?: VisitType;
  userId?: string /** Validate that the owner is making a query for his own items | TODO */;
  targetId?: string;
};

export type VisitListForType = {
  userId?: string /** Validate that the owner is making a query for his own items | TODO */;
  type?: VisitType;
};

export type Response = any;
