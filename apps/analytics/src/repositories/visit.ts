import _ from "lodash";
import { ObjectId } from "mongodb";
import BaseRepository, { BaseOptions } from "./base";

import { ParamsError, VisitError } from "../errors";
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
      case VisitType.Profile:
        return this._getForProfile(payload, options);
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
        throw new VisitError.NotFound("Type not supported");
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
      if (!_.isNil(options.from) && isISODate(options.from))
        query.createdAt = { ...(query.createdAt || {}), $gte: new Date(options.from) };
      if (!_.isNil(options.to) && isISODate(options.to))
        query.createdAt = { ...(query.createdAt || {}), $lte: new Date(options.to) };
    }

    const statistics = await VisitModel.countDocuments(query);

    return {
      statistics,
      timeline: this._interpretTimeline(options),
    };
  }

  private async _getForArticle(payload: Request.VisitGetForItem, options?: BaseOptions): Promise<Request.Response> {
    const query: { [key: string]: any } = {
      type: VisitType.Article,
      targetId: payload.targetId,
    };
    if (!_.isNil(options)) {
      if (!_.isNil(options.from) && isISODate(options.from))
        query.createdAt = { ...(query.createdAt || {}), $gte: new Date(options.from) };
      if (!_.isNil(options.to) && isISODate(options.to))
        query.createdAt = { ...(query.createdAt || {}), $lte: new Date(options.to) };
    }

    const statistics = await VisitModel.countDocuments(query);

    return {
      statistics,
      timeline: this._interpretTimeline(options),
    };
  }

  private async _getForProfile(payload: Request.VisitGetForItem, options?: BaseOptions): Promise<Request.Response> {
    const aggregation: { [key: string]: any } = {
      $match: {
        type: VisitType.Profile,
        targetId: new ObjectId(payload.userId),
      },
      $project: {
        targetId: "$targetId",
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      },
      $group: {
        _id: "$date",
        count: { $sum: 1 },
      },
      $sort: {
        _id: 1,
      },
    };

    let isAll = true;

    if (!_.isNil(options)) {
      if (!_.isNil(options.from) && isISODate(options.from)) {
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $gte: new Date(options.from) };
        isAll = false;
      }
      if (!_.isNil(options.to) && isISODate(options.to)) {
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $lte: new Date(options.to) };
        isAll = false;
      }
    }

    const statistics = isAll
      ? [
          {
            _id: "All",
            count: await VisitModel.countDocuments({ type: VisitType.Profile, targetId: payload.userId }),
          },
        ]
      : await VisitModel.aggregate(
          Object.keys(aggregation).map(key => ({
            [key]: aggregation[key],
          })),
        );
    return {
      statistics,
      timeline: this._interpretTimeline(options),
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
      if (!_.isNil(options.from) && isISODate(options.from))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $gte: new Date(options.from) };
      if (!_.isNil(options.to) && isISODate(options.to))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $lte: new Date(options.to) };
    }

    const statistics = await VisitModel.aggregate(
      Object.keys(aggregation).map(key => ({
        [key]: aggregation[key],
      })),
    );

    return {
      statistics,
      timeline: this._interpretTimeline(options),
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
      if (!_.isNil(options.from) && isISODate(options.from))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $gte: new Date(options.from) };
      if (!_.isNil(options.to) && isISODate(options.to))
        aggregation.$match.createdAt = { ...(aggregation.$match.createdAt || {}), $lte: new Date(options.to) };
    }

    const statistics = await VisitModel.aggregate(
      Object.keys(aggregation).map(key => ({
        [key]: aggregation[key],
      })),
    );

    return {
      statistics,
      timeline: this._interpretTimeline(options),
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

  private _interpretTimeline(options?: BaseOptions): { [key: string]: string } {
    const timeline: any = {
      from: "creation",
      to: "now",
    };

    if (!_.isNil(options)) {
      if (!_.isNil(options.from) && isISODate(options.from)) timeline.from = options.from;
      if (!_.isNil(options.to) && isISODate(options.to)) timeline.to = options.to;
    }

    return timeline;
  }
}
