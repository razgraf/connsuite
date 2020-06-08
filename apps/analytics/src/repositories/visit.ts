import _ from "lodash";
import { ObjectId } from "mongodb";
import BaseRepository, { BaseOptions } from "./base";

import { ParamsError } from "../errors";
import { Request, Visit, VisitModel, VisitType } from "../models";
import { isISODate } from "../utils";

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

  public async list(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Visit[]> {
    return !_.isNil(options)
      ? VisitModel.find(filters, null, this._formatByOptions(options)).populate(this._populateByOptions(options))
      : VisitModel.find(filters);
  }

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async createSanitized(payload: Request.VisitCreate): Promise<Visit | null> {
    if (_.isNil(payload)) throw new ParamsError.Missing("Missing valid payload.");
    if (!_.get(payload, "type") || !Object.values(VisitType as any).includes(_.get(payload, "type")))
      throw new ParamsError.Invalid("Type missing or not supported.");
    if (!_.get(payload, "targetId")) throw new ParamsError.Missing("Missing target.");

    const visit: Visit = {
      type: _.toString(_.get(payload, "type")) as VisitType,
      targetId: new ObjectId(_.get(payload, "targetId")),
      sourceId: _.get(payload, "sourceId") ? new ObjectId(_.get(payload, "sourceId")) : undefined,
    };

    if (_.has(payload, "referer")) visit.referer = _.toString(_.get(payload, "referer"));

    return this.create(visit);
  }

  /**  */
  public async getForItem(payload: Request.VisitGetForItem, options?: BaseOptions): Promise<Request.Response> {
    if (_.isNil(payload)) throw new ParamsError.Missing("Missing valid payload.");
    if (!_.get(payload, "type") || !Object.values(VisitType as any).includes(_.get(payload, "type")))
      throw new ParamsError.Invalid("Type missing or not supported.");
    if (!_.get(payload, "targetId")) throw new ParamsError.Missing("Missing target.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("Missing owner.");

    switch (payload.type) {
      case VisitType.Network:
        return this._getForNetwork(payload, options);
      case VisitType.Article:
        return this._getForArticle(payload, options);
      default:
        return {};
    }
  }

  public async listForType(payload: Request.VisitListForType, options?: BaseOptions): Promise<Request.Response> {
    if (_.isNil(payload)) throw new ParamsError.Missing("Missing valid payload.");
    if (!_.get(payload, "type") || !Object.values(VisitType as any).includes(_.get(payload, "type")))
      throw new ParamsError.Invalid("Type missing or not supported.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("Missing owner.");

    switch (payload.type) {
      case VisitType.Network:
        return this._listForNetworks(payload, options);
      case VisitType.Article:
        return this._listForArticles(payload, options);
      default:
        return {};
    }
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private async _getForNetwork(payload: Request.VisitGetForItem, options?: BaseOptions): Promise<Request.Response> {
    const query: { [key: string]: any } = {
      type: VisitType.Network,
      targetId: payload.targetId,
    };
    if (!_.isNil(options)) {
      if (!_.isNil(options.start) && isISODate(options.start))
        query.createdAt = { ...(query.createdAt || {}), $gte: new Date(options.start) };
      if (!_.isNil(options.end) && isISODate(options.end))
        query.createdAt = { ...(query.createdAt || {}), $lte: new Date(options.end) };
    }

    const count = await VisitModel.countDocuments(query);
    return {
      count: count || 0,
    };
  }

  private async _getForArticle(payload: Request.VisitGetForItem, options?: BaseOptions): Promise<Request.Response> {
    const query: { [key: string]: any } = {
      type: VisitType.Article,
      targetId: payload.targetId,
    };
    if (!_.isNil(options)) {
      if (!_.isNil(options.start) && isISODate(options.start))
        query.createdAt = { ...(query.createdAt || {}), $gte: new Date(options.start) };
      if (!_.isNil(options.end) && isISODate(options.end))
        query.createdAt = { ...(query.createdAt || {}), $lte: new Date(options.end) };
    }

    const count = await VisitModel.countDocuments(query);
    return {
      count: count || 0,
    };
  }

  private async _getForProfile(payload: Request.VisitGetForItem, options?: BaseOptions): Promise<Request.Response> {
    const query: { [key: string]: any } = {
      type: VisitType.Profile,
      targetId: payload.userId,
    };
    if (!_.isNil(options)) {
      if (!_.isNil(options.start) && isISODate(options.start))
        query.createdAt = { ...(query.createdAt || {}), $gte: new Date(options.start) };
      if (!_.isNil(options.end) && isISODate(options.end))
        query.createdAt = { ...(query.createdAt || {}), $lte: new Date(options.end) };
    }

    const count = await VisitModel.countDocuments(query);
    return {
      count: count || 0,
    };
  }

  private async _listForNetworks(payload: Request.VisitListForType, options?: BaseOptions): Promise<Request.Response> {
    const aggregation: { [key: string]: any } = {
      $lookup: {
        from: "networks",
        localField: "targetId",
        foreignField: "_id",
        as: "networks",
      },
      $match: {
        type: VisitType.Network,
        networks: {
          $elemMatch: {
            user: new ObjectId(payload.userId),
          },
        },
      },
      $group: {
        _id: "$targetId",
        count: { $sum: 1 },
      },
    };
    if (!_.isNil(options)) {
      if (!_.isNil(options.start) && isISODate(options.start))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $gte: new Date(options.start) };
      if (!_.isNil(options.end) && isISODate(options.end))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $lte: new Date(options.end) };
    }

    const count = await VisitModel.aggregate(
      Object.keys(aggregation).map(key => ({
        [key]: aggregation[key],
      })),
    );

    return {
      count: count || [],
    };
  }

  private async _listForArticles(payload: Request.VisitListForType, options?: BaseOptions): Promise<Request.Response> {
    const aggregation: { [key: string]: any } = {
      $lookup: {
        from: "articles",
        localField: "targetId",
        foreignField: "_id",
        as: "articles",
      },
      $match: {
        type: VisitType.Article,
        articles: {
          $elemMatch: {
            user: new ObjectId(payload.userId),
          },
        },
      },
      $group: {
        _id: "$targetId",
        count: { $sum: 1 },
      },
    };
    if (!_.isNil(options)) {
      if (!_.isNil(options.start) && isISODate(options.start))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $gte: new Date(options.start) };
      if (!_.isNil(options.end) && isISODate(options.end))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $lte: new Date(options.end) };
    }

    const count = await VisitModel.aggregate(
      Object.keys(aggregation).map(key => ({
        [key]: aggregation[key],
      })),
    );

    return {
      count: count || [],
    };
  }

  private _populateByOptions(options?: BaseOptions): { path: string; model: string }[] {
    const population: { path: string; model: string }[] = [];
    if (_.isNil(options) || !_.get(options, "populate")) return population;
    return population;
  }

  private _formatByOptions(options?: BaseOptions): { sort: object; limit?: number; offset?: number } {
    const format: { sort: object; limit?: number; offset?: number } = { sort: { priority: -1 } };
    if (_.isNil(options)) return format;
    if (!_.isNil(options.limit)) {
      const limit = _.attempt(() => _.toNumber(options.limit));
      if (!_.isError(limit)) format.limit = limit;
    }

    if (!_.isNil(options.offset)) {
      const offset = _.attempt(() => _.toNumber(options.offset));
      if (!_.isError(offset)) format.offset = offset;
    }

    return format;
  }
}
