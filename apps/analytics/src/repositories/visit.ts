import _ from "lodash";
import BaseRepository from "./base";

import { ParamsError } from "../errors";
import { Request, Visit, VisitModel, VisitType } from "../models";

export default class VisitRepository extends BaseRepository<Visit> {
  private static instance: VisitRepository;

  public static getInstance(): VisitRepository {
    return VisitRepository.instance || (VisitRepository.instance = new VisitRepository());
  }

  public async getById(id: string): Promise<Visit | null> {
    return VisitModel.findById(id);
  }

  public async create(payload: Visit): Promise<Visit> {
    return VisitModel.create(payload);
  }

  public async update(id: string, payload: Visit): Promise<Visit | null> {
    return VisitModel.findByIdAndUpdate(id, payload, { new: true });
  }

  public async remove(id: string): Promise<void> {
    await VisitModel.findByIdAndRemove(id);
  }
  public async list(filters: { [key: string]: unknown }): Promise<Visit[]> {
    return (await VisitModel.find(filters)) || [];
  }

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async createSanitized(payload: Request.VisitCreate): Promise<Visit | null> {
    if (_.isNil(payload) || !_.has(payload, "type")) throw new ParamsError.Missing("Missing valid payload.");
    if (!payload.type || !(payload.type in VisitType)) throw new ParamsError.Invalid("Type not supported.");

    const visit: Visit = {
      type: payload.type,
      sourceId: _.toString(_.get(payload, "sourceId")) as string,
      targetId: _.toString(_.get(payload, "targetId")) as string,
    };

    if (_.has(payload, "referral")) visit.referral = _.toString(_.get(payload, "referral"));

    return this.create(visit);
  }
}
