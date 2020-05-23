import _ from "lodash";
import guards from "@connsuite/guards";
import { ObjectId } from "mongodb";
import { isDocument } from "@typegoose/typegoose";
import BaseRepository, { BaseOptions } from "./base";
import CategoryRepository from "./category";
import SkillRepository from "./skill";
import ImageRepository from "./image";
import UserRepository from "./user";
import { ArticleError, ParamsError } from "../errors";
import {
  Article,
  ArticleModel,
  ArticleType,
  Category,
  Image,
  ImageParent,
  ImagePurpose,
  Request,
  Skill,
} from "../models";

export default class ArticleRepository extends BaseRepository<Article> {
  private static instance: ArticleRepository;

  public static getInstance(): ArticleRepository {
    return ArticleRepository.instance || (ArticleRepository.instance = new ArticleRepository());
  }

  public async getById(id: string, options?: BaseOptions): Promise<Article | null> {
    if (options && options.populate)
      return (
        ArticleModel.findById(id, this._projectByOptions(options)).populate(this._populateByOptions(options)) || []
      );
    return ArticleModel.findById(id, this._projectByOptions(options));
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

  public async update(id: string, payload: Request.ArticleCreate): Promise<Article | null> {
    if (_.isNil(payload)) throw new ParamsError.Missing("No payload provided.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("No creator provided. Missing user id.");
    if (!_.get(payload, "type")) throw new ParamsError.Missing("Missing Type");

    const holder: Article | null = await this.getByFilters({ _id: id, user: payload.userId }, { populate: true });
    if (!holder) throw new ArticleError.NotFound("Unknown article or access not granted.");

    payload.type = holder.type;
    holder.userId = payload.userId;

    if (payload.type === ArticleType.Internal) {
      await this._internalGuards(payload, "update");
      return this._updateInternal(holder, payload);
    } else if (payload.type === ArticleType.External) {
      await this._externalGuards(payload, "update");
      return this._updateExternal(holder, payload);
    }

    throw new ParamsError.Invalid("Article type not supported.");
  }

  /**
   *
   * @param {string} id - the id of the soon to be removed article
   * Use this iteration of remove() only by admin demand. For user demands, use @method removeFromUser() as it checks for ownership
   */

  public async remove(id: string): Promise<void> {
    await ArticleModel.findByIdAndRemove(id);
  }
  public async list(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Article[]> {
    if (options && options.populate)
      return (
        ArticleModel.find(filters, this._projectByOptions(options)).populate(this._populateByOptions(options)) || []
      );
    return ArticleModel.find(filters, this._projectByOptions(options)) || [];
  }

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async removeFromUser(articleId: string, userId: string): Promise<void> {
    try {
      const article: Article | null = await this.getByFilters({ _id: articleId, user: userId }, { populate: true });
      if (!article) throw new Error("Unknown article");

      this._removeImages(article);
      this._removeUserBond(articleId, userId);
      this._removeSkills(articleId);
      this._removeCategories(articleId);
      await this.remove(articleId);
    } catch (error) {
      console.error(error);
      throw new ArticleError.NotFound(
        "Couldn't find network to remove or access is forbidden for this user-network pair.",
      );
    }
  }

  public async getByFilters(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Article | null> {
    if (options && options.populate)
      return (
        ArticleModel.findOne(filters, this._projectByOptions(options)).populate(this._populateByOptions(options)) || []
      );
    return ArticleModel.findOne(filters, this._projectByOptions(options));
  }

  public async bindImage(articleId: string, payload: { cover: Image } | { thumbnail: Image }): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, payload);
  }

  public async addSkill(articleId: string, skillId: string): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, { $push: { skills: new ObjectId(skillId) } }, { upsert: true });
  }

  public async removeSkill(articleId: string, skillId: string): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, { $pull: { skills: new ObjectId(skillId) } });
  }

  public async addCategory(articleId: string, categoryId: string): Promise<void> {
    await ArticleModel.findByIdAndUpdate(
      articleId,
      { $push: { categories: new ObjectId(categoryId) } },
      { upsert: true },
    );
  }

  public async removeCategory(articleId: string, categoryId: string): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, { $pull: { categories: new ObjectId(categoryId) } });
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private async _bind(articleId: string, userId: string): Promise<void> {
    await UserRepository.getInstance().addArticle(articleId, userId);
  }

  private async _removeUserBond(articleId: string, userId: string): Promise<void> {
    await UserRepository.getInstance().removeArticle(articleId, userId);
  }

  private _populateByOptions(options?: BaseOptions): { path: string; model: string }[] {
    const population: { path: string; model: string }[] = [];
    if (_.isNil(options) || !_.get(options, "populate")) return population;

    if (!options.hideUser) population.push({ path: "user", model: "User" });
    if (!options.hideImages) population.push({ path: "cover", model: "Image" }, { path: "thumbnail", model: "Image" });
    if (!options.hideSkills) population.push({ path: "skills", model: "Skill" });
    if (!options.hideCategories) population.push({ path: "categories", model: "Category" });

    return population;
  }

  private _projectByOptions(options?: BaseOptions): { [key: string]: boolean } {
    const projection: { [key: string]: boolean } = {};
    if (_.isNil(options)) return projection;

    if (!options.hideContent) projection.content = false;

    return projection;
  }

  private async _generateImages(source: Express.Multer.File, article: Article): Promise<void> {
    const specimen: Image = {
      parent: ImageParent.Article,
      purpose: ImagePurpose.Cover,

      article,
      type: source.mimetype as string,
    };

    await ImageRepository.getInstance().save(source, specimen);
    await ImageRepository.getInstance().save(source, { ...specimen, purpose: ImagePurpose.Thumbnail });
  }

  private async _bindSkills(source: Request.SkillTransfer[] | string, article: Article): Promise<void> {
    /**  Clear the existing list of skills */
    await SkillRepository.getInstance().removeAllWithArticle(String(article._id));

    /**  Format the input */
    const list = _.isString(source) ? _.attempt(() => JSON.parse(source)) : source;
    if (_.isError(list) || list.length === 0) return;

    const existing = list
      .filter((item: Request.SkillTransfer) => !_.isNil(item._id))
      .map((item: Request.SkillTransfer) => new ObjectId(item._id));

    await ArticleModel.findByIdAndUpdate(article._id, { skills: existing });

    const proposed = list.filter(
      (item: Request.SkillTransfer) => (!_.has(item, "_id") || _.isNil(item._id)) && !_.isNil(item.title),
    );

    proposed.forEach((skill: Request.SkillTransfer) => {
      try {
        SkillRepository.getInstance().create({
          title: skill.title,
          userId: article.userId,
          articleId: article._id,
        } as Request.SkillCreate);
      } catch (e) {
        console.error(e);
      }
    });
  }

  private async _bindCategories(source: Request.CategoryTransfer[] | string, article: Article): Promise<void> {
    /**  Clear the existing list of categories */
    await CategoryRepository.getInstance().removeAllWithArticle(String(article._id));

    /**  Format the input */
    const list = _.isString(source) ? _.attempt(() => JSON.parse(source)) : source;
    if (_.isError(list) || list.length === 0) return;

    const existing = list
      .filter((item: Request.CategoryTransfer) => !_.isNil(item._id))
      .map((item: Request.CategoryTransfer) => new ObjectId(item._id));

    await ArticleModel.findByIdAndUpdate(article._id, { categories: existing });

    const proposed = list.filter(
      (item: Request.CategoryTransfer) => (!_.has(item, "_id") || _.isNil(item._id)) && !_.isNil(item.title),
    );

    proposed.forEach((category: Request.CategoryTransfer) => {
      try {
        CategoryRepository.getInstance().create({
          title: category.title,
          userId: article.userId,
          articleId: article._id,
        } as Request.CategoryCreate);
      } catch (e) {
        console.error(e);
      }
    });
  }

  private _generateSummary(content: string): string {
    if (content) return "ConnSuite Article - X";
    return "ConnSuite Article - O"; // TODO
  }

  private async _removeImages(article: Article): Promise<void> {
    try {
      if (article.type === ArticleType.Internal) {
        if (!_.isNil(article.cover) && isDocument(article.cover)) {
          await ImageRepository.getInstance().remove(article.cover._id);
          ImageRepository.getInstance().unlink(article.cover);
        }

        if (!_.isNil(article.thumbnail) && isDocument(article.thumbnail)) {
          await ImageRepository.getInstance().remove(article.thumbnail._id);
          ImageRepository.getInstance().unlink(article.thumbnail);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * @param {Article} article
   * Remove any custom skills that were created for this article
   */
  private async _removeSkills(articleId: string): Promise<void> {
    await SkillRepository.getInstance().removeAllWithArticle(articleId);
  }

  /**
   *
   * @param {Article} article
   * Remove any custom categories that were created for this article
   */
  private async _removeCategories(articleId: string): Promise<void> {
    await CategoryRepository.getInstance().removeAllWithArticle(articleId);
  }

  /**
   *
   *
   * Specific Private - Utility Methods: Update
   *
   *
   */

  private async _updateInternal(holder: Article, payload: Request.ArticleCreateInternal): Promise<Article | null> {
    const article = await ArticleModel.findByIdAndUpdate(holder._id, {
      title: payload.title,
      content: payload.content,
      summary: this._generateSummary(payload.content),
      skills: [],
      categories: [],
    });

    await this._bindSkills(payload.skills, holder);
    await this._bindCategories(payload.categories, holder);

    if (!_.isNil(payload.cover)) {
      await this._removeImages(holder);
      await this._generateImages(payload.cover, holder);
    }

    return article;
  }

  private async _updateExternal(holder: Article, payload: Request.ArticleCreateExternal): Promise<Article | null> {
    const article = await ArticleModel.findByIdAndUpdate(holder._id, {
      title: payload.title,
      url: payload.url,
      skills: [],
    });

    await this._bindSkills(payload.skills, holder);
    await this._bindCategories(payload.categories, holder);

    if (!_.isNil(payload.cover)) {
      await this._removeImages(holder);
      await this._generateImages(payload.cover, holder);
    }

    return article;
  }

  /**
   *
   *
   * Specific Private - Utility Methods: Create & Create/Update Guards
   *
   *
   */

  private async _createInternal(payload: Request.ArticleCreateInternal): Promise<Article> {
    const specimen: Article = {
      type: ArticleType.Internal,
      title: payload.title,
      user: new ObjectId(payload.userId),
      content: payload.content,
      summary: this._generateSummary(payload.content),
      skills: [],
      categories: [],
    };

    const article: Article = await ArticleModel.create(specimen);
    if (!article) throw new ArticleError.Failed("Article couldn't be created.");

    article.userId = String(article.user);

    this._bind(String(article._id), article.userId);

    await this._generateImages(payload.cover, article);
    await this._bindSkills(payload.skills, article);
    await this._bindCategories(payload.categories, article);

    return article;
  }

  private async _createExternal(payload: Request.ArticleCreateExternal): Promise<Article> {
    const specimen: Article = {
      type: ArticleType.External,
      title: payload.title,
      url: payload.url,
      user: new ObjectId(payload.userId),
      skills: [],
      categories: [],
    };

    const article: Article = await ArticleModel.create(specimen);
    if (!article) throw new ArticleError.Failed("Article couldn't be created.");

    article.userId = String(article.user);

    this._bind(String(article._id), article.userId);

    await this._generateImages(payload.cover, article);
    await this._bindSkills(payload.skills, article);
    await this._bindCategories(payload.categories, article);

    return article;
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
    const skillsGuard = guards.isArticleSkillListAcceptable(payload.skills, true, true);
    if (skillsGuard !== true) throw new ParamsError.Invalid(skillsGuard as string);

    if (!_.get(payload, "categories")) throw new ParamsError.Missing("Missing Categories");
    const categoriesGuard = guards.isArticleCategoryListAcceptable(payload.categories, true, true);
    if (categoriesGuard !== true) throw new ParamsError.Invalid(categoriesGuard as string);

    if (!_.get(payload, "content")) throw new ParamsError.Missing("Missing Content");
    const contentGuard = guards.isArticleContentAcceptable(payload.content, true, true);
    if (contentGuard !== true) throw new ParamsError.Invalid(contentGuard as string);
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
    const skillsGuard = guards.isArticleSkillListAcceptable(payload.skills, true, true);
    if (skillsGuard !== true) throw new ParamsError.Invalid(skillsGuard as string);

    if (!_.get(payload, "categories")) throw new ParamsError.Missing("Missing Categories");
    const categoriesGuard = guards.isArticleCategoryListAcceptable(payload.categories, true, true);
    if (categoriesGuard !== true) throw new ParamsError.Invalid(categoriesGuard as string);
  }
}
