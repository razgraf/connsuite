import _ from "lodash";
import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { UserRepository, SkillRepository, CategoryRepository } from "../repositories";
import { toUserDTO, toCategoryDTO, toSkillDTO } from "../models";
import { ParamsError, AuthError } from "../errors";

export default class UserController extends ManagerController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const { query, params } = req;
      const identifier = _.get(params, "id");
      if (!identifier) throw new ParamsError.Missing("Missing user identifier.");

      const userId = await UserRepository.getInstance().interpretIdOrUsernameToId(identifier);
      if (_.isNil(userId)) throw new AuthError.UserNotFound("Missing user based on given auth details.");

      const user = await UserRepository.getInstance().getById(userId, { populate: true });
      if (_.isNil(user)) throw new AuthError.UserNotFound("Missing user.");

      const result: { [key: string]: any } = {
        message: "Found",
        userId,
        isSelf: _.toString(_.get(res, "locals.identity.user")) === _.toString(userId),
        user: toUserDTO(user, { usernames: true, images: true }),
      };

      if (!_.isNil(query)) {
        if (_.has(query, "skills")) {
          const skills = await SkillRepository.getInstance().listDistinctByUserId(userId);
          result.skills = skills ? skills.map(skill => toSkillDTO(skill)) : [];
        }
        if (_.has(query, "categories")) {
          const categories = await CategoryRepository.getInstance().listDistinctByUserId(userId);
          result.categories = categories ? categories.map(category => toCategoryDTO(category)) : [];
        }
      }

      res.status(HTTP_CODE.OK);
      res.json(result);
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    res.status(HTTP_CODE.OK);
    res.json({
      message: "Found",
    });
  }

  public static async listSkillsAndCategories(req: Request, res: Response): Promise<void> {
    try {
      const identifier = _.get(req, "params.id");
      if (!identifier) throw new ParamsError.Missing("Missing user identifier.");

      const userId = await UserRepository.getInstance().interpretIdOrUsernameToId(identifier);
      if (_.isNil(userId)) throw new AuthError.UserNotFound("Missing user based on given auth details.");

      const skills = await SkillRepository.getInstance().listDistinctByUserId(userId);
      const categories = await CategoryRepository.getInstance().listDistinctByUserId(userId);

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Found",
        userId,
        categories: categories.map(category => toCategoryDTO(category)),
        skills: skills.map(skill => toSkillDTO(skill)),
      });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
