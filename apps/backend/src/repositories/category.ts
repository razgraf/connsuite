import _ from "lodash";
import { ObjectId } from "mongodb";
import BaseRepository from "./base";
import ArticleRepository from "./article";
import { ParamsError, CategoryError } from "../errors";
import { Category, CategoryModel, Request } from "../models";

export default class CategoryRepository extends BaseRepository<Category> {
  private static instance: CategoryRepository;

  public static getInstance(): CategoryRepository {
    return CategoryRepository.instance || (CategoryRepository.instance = new CategoryRepository());
  }

  public async getById(id: string): Promise<Category | null> {
    return await CategoryModel.findOne({ _id: id });
  }

  public async create(payload: Request.CategoryCreate, options = { admin: false }): Promise<Category> {
    if (_.isNil(payload)) throw new ParamsError.Missing("No payload provided.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("No creator provided. Missing user id.");
    if (!_.get(payload, "articleId")) throw new ParamsError.Missing("No purpose provided. Missing article id.");
    if (!_.get(payload, "title")) throw new ParamsError.Missing("Missing title.");

    const holder: Category = {
      title: payload.title,
      user: new ObjectId(payload.userId),
      article: new ObjectId(payload.articleId),
      isDefault: options && options.admin ? payload.isDefault || false : false,
    };

    const category = (await CategoryModel.create(holder)) as Category;

    if (!category) throw new CategoryError.Failed("Category couldn't be created.");

    await this._bindToArticle(category);

    return category;
  }

  public async update(id: string, payload: any): Promise<Category | null> {
    return CategoryModel.findByIdAndUpdate(id, payload, { new: true });
  }
  public async remove(id: string): Promise<void> {
    await CategoryModel.findOneAndRemove({ _id: id, isDefault: false });
  }
  public async list(filters: { [key: string]: unknown }): Promise<Category[]> {
    return (await CategoryModel.find(filters)) || [];
  }

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async updateByUser(categoryId: string, userId: string, payload: any): Promise<void> {
    await CategoryModel.findOneAndUpdate({ _id: categoryId, _user: userId }, payload);
  }

  public async removeAllWithArticle(articleId: string): Promise<void> {
    await CategoryModel.deleteMany({ article: new ObjectId(articleId), isDefault: false });
  }

  public async removeSafelyFromArticle(categoryId: string, articleId: string, userId: string): Promise<void> {
    try {
      const category = (await this.getByFilters({ _id: categoryId, user: userId, article: articleId })) as Category;

      if (!category) throw new Error("Unknown category or unauthorized");

      await this._removeArticleBond(category);
      await this.remove(categoryId);
    } catch (error) {
      console.error(error);
      throw new CategoryError.NotFound(
        "Couldn't find a category to remove or access is forbidden for this user-network pair.",
      );
    }
  }

  public async getByFilters(filters: { [key: string]: unknown }): Promise<Category | null> {
    return CategoryModel.findOne(filters);
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private async _removeArticleBond(category: Category): Promise<void> {
    if (!_.isNil(category.article)) {
      ArticleRepository.getInstance().removeCategory(String(category.article), String(category._id));
    }
  }
  private async _bindToArticle(category: Category): Promise<void> {
    await ArticleRepository.getInstance().addCategory(String(category.article), String(category._id));
  }
}
