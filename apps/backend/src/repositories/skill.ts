import _ from "lodash";
import { ObjectId } from "mongodb";
import BaseRepository from "./base";
import ArticleRepository from "./article";
import { ParamsError, SkillError } from "../errors";
import { Skill, SkillModel, Request } from "../models";

export default class SkillRepository extends BaseRepository<Skill> {
  private static instance: SkillRepository;

  public static getInstance(): SkillRepository {
    return SkillRepository.instance || (SkillRepository.instance = new SkillRepository());
  }

  public async getById(id: string): Promise<Skill | null> {
    return await SkillModel.findOne({ _id: id });
  }

  public async create(payload: Request.SkillCreate, options = { admin: false }): Promise<Skill> {
    if (_.isNil(payload)) throw new ParamsError.Missing("No payload provided.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("No creator provided. Missing user id.");
    if (!_.get(payload, "articleId")) throw new ParamsError.Missing("No purpose provided. Missing article id.");
    if (!_.get(payload, "title")) throw new ParamsError.Missing("Missing title.");

    const holder: Skill = {
      title: payload.title,
      user: new ObjectId(payload.userId),
      article: new ObjectId(payload.articleId),
      isDefault: options && options.admin ? payload.isDefault || false : false,
    };

    const skill = (await SkillModel.create(holder)) as Skill;

    if (!skill) throw new SkillError.Failed("Skill couldn't be created.");

    await this._bindToArticle(skill);

    return skill;
  }

  public async update(id: string, payload: any): Promise<Skill | null> {
    return SkillModel.findByIdAndUpdate(id, payload, { new: true });
  }
  public async remove(id: string): Promise<void> {
    await SkillModel.findOneAndRemove({ _id: id, isDefault: false });
  }
  public async list(filters: { [key: string]: unknown }): Promise<Skill[]> {
    return (await SkillModel.find(filters)) || [];
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

  public async removeAllWithArticle(articleId: string): Promise<void> {
    await SkillModel.deleteMany({ article: new ObjectId(articleId), isDefault: false });
  }

  public async removeSafelyFromArticle(skillId: string, articleId: string, userId: string): Promise<void> {
    try {
      const skill = (await this.getByFilters({ _id: skillId, user: userId, article: articleId })) as Skill;

      if (!skill) throw new Error("Unknown skill or unauthorized");

      await this._removeArticleBond(skill);
      await this.remove(skillId);
    } catch (error) {
      console.error(error);
      throw new SkillError.NotFound(
        "Couldn't find a skill to remove or access is forbidden for this user-network pair.",
      );
    }
  }

  public async getByFilters(filters: { [key: string]: unknown }): Promise<Skill | null> {
    return SkillModel.findOne(filters);
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private async _removeArticleBond(skill: Skill): Promise<void> {
    if (!_.isNil(skill.article)) {
      ArticleRepository.getInstance().removeSkill(String(skill.article), String(skill._id)); // TODO
    }
  }
  private async _bindToArticle(skill: Skill): Promise<void> {
    await ArticleRepository.getInstance().addSkill(String(skill.article), String(skill._id)); // TODO
  }
}
