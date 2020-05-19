import _ from "lodash";
import { ObjectId } from "mongodb";
import BaseRepository, { BaseOptions } from "./base";
import SkillRepository from "./skill";
import UserRepository from "./user";
import guards, { policy } from "../guards";
import { ParamsError, SkillError } from "../errors";
import { Skill, SkillModel, Request, Article, ArticleModel, ArticleType } from "../models";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";

export default class ArticleRepository extends BaseRepository<Article> {
  private static instance: ArticleRepository;

  public static getInstance(): ArticleRepository {
    return ArticleRepository.instance || (ArticleRepository.instance = new ArticleRepository());
  }

  public async getById(id: string, options?: BaseOptions): Promise<Article | null> {
    if (options && options.populate) return ArticleModel.findById(id).populate(this._populateByOptions(options)) || [];
    return ArticleModel.findById(id);
  }

  public async create(payload: Request.ArticleCreate): Promise<Article> {
    if (_.isNil(payload)) throw new ParamsError.Missing("No payload provided.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("No creator provided. Missing user id.");
    if (!_.get(payload, "type")) throw new ParamsError.Missing("Missing Type");

    if (payload.type === ArticleType.Internal) {
      await this._internalGuards(payload as Request.ArticleCreateInternal, "create");
      return this._createInternal(payload as Request.ArticleCreateInternal);
    } else if (payload.type === ArticleType.External) {
      await this._externalGuards(payload as Request.ArticleCreateExternal, "create");
      return this._createExternal(payload as Request.ArticleCreateExternal);
    } else throw new ParamsError.Invalid("Article type not supported.");
  }

  public async update(id: string, payload: any): Promise<Article | null> {
    return ArticleModel.findByIdAndUpdate(id, payload, { new: true });
  }
  public async remove(id: string): Promise<void> {
    await ArticleModel.findOneAndRemove({ _id: id, isDefault: false });
  }
  public async list(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Article[]> {
    if (options && options.populate) return ArticleModel.find(filters).populate(this._populateByOptions(options)) || [];
    return ArticleModel.find(filters) || [];
  }

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async updateByUser(skillId: string, userId: string, payload: any): Promise<void> {
    await SkillModel.findOneAndUpdate({ _id: skillId, _user: userId }, payload);
  }

  public async getByFilters(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Article | null> {
    return ArticleModel.findOne(filters);
  }

  public async addSkill(articleId: string, skill: Skill): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, { $push: { skills: skill } }, { upsert: true });
  }

  public async removeSkill(articleId: string, skillId: string): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, { $pull: { skills: new ObjectId(skillId) } });
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  /**
   *
   *
   * Specific Private - Utility Methods: Create & Create/Update Guards
   *
   *
   */

  private async _createInternal(payload: Request.ArticleCreateInternal): Promise<Article> {
    console.log("_internal", payload, ArticleType.Internal);
    return {} as Article;
  }

  private async _createExternal(payload: Request.ArticleCreateExternal): Promise<Article> {
    console.log("_external", payload, ArticleType.External);
    return {} as Article;
  }

  private async _internalGuards(payload: Request.ArticleCreateInternal, type = "create"): Promise<void> {
    if (type === "create" || (type === "update" && !_.isNil(payload.cover))) {
      if (!_.get(payload, "cover")) throw new ParamsError.Missing("Missing cover or wrong cover size & type.");
      const coverGuard = guards.isArticleCoverAcceptable(_.get(payload, "cover"), true, { vendor: "multer" });
      if (coverGuard !== true) throw new ParamsError.Invalid(coverGuard as string);
    }

    if (!_.get(payload, "title")) throw new ParamsError.Missing("Missing Title");
    const titleGuard = guards.isArticleTitleAcceptable(payload.title, true);
    if (titleGuard !== true) throw new ParamsError.Invalid(titleGuard as string);

    if (!_.get(payload, "skills")) throw new ParamsError.Missing("Missing Skills");
    const skillsGuard = guards.isArticleSkillListAcceptable(payload.skills, true);
    if (skillsGuard !== true) throw new ParamsError.Invalid(skillsGuard as string);
  }

  private async _externalGuards(payload: Request.ArticleCreateExternal, type = "create"): Promise<void> {
    if (type === "create" || (type === "update" && !_.isNil(payload.cover))) {
      if (!_.get(payload, "cover")) throw new ParamsError.Missing("Missing cover or wrong cover size & type.");
      const coverGuard = guards.isArticleCoverAcceptable(_.get(payload, "cover"), true, { vendor: "multer" });
      if (coverGuard !== true) throw new ParamsError.Invalid(coverGuard as string);
    }

    if (!_.get(payload, "title")) throw new ParamsError.Missing("Missing Title");
    const titleGuard = guards.isArticleTitleAcceptable(payload.title, true);
    if (titleGuard !== true) throw new ParamsError.Invalid(titleGuard as string);

    if (!_.get(payload, "url")) throw new ParamsError.Missing("Missing Url");
    const urlGuard = guards.isArticleUrlAcceptable(payload.url, true);
    if (urlGuard !== true) throw new ParamsError.Invalid(urlGuard as string);

    if (!_.get(payload, "skills")) throw new ParamsError.Missing("Missing Skills");
    const skillsGuard = guards.isArticleSkillListAcceptable(payload.skills, true);
    if (skillsGuard !== true) throw new ParamsError.Invalid(skillsGuard as string);
  }

  private _populateByOptions(options?: BaseOptions): { path: string; model: string }[] {
    const population: { path: string; model: string }[] = [];
    if (_.isNil(options) || !_.get(options, "populate")) return population;

    if (!options.hideUser) population.push({ path: "user", model: "User" });
    if (!options.hideImages) population.push({ path: "cover", model: "Image" });
    if (!options.hideSkills) population.push({ path: "skills", model: "Skill" });

    return population;
  }
}
