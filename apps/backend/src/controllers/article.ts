import _ from "lodash";
import { Request, Response } from "express";
import BaseController from "./base";
import { HTTP_CODE } from "../constants";
import { ArticleRepository } from "../repositories";
import { Article, toArticleDTO } from "../models";
import { ArticleError, ParamsError } from "../errors";

export default class ArticleController extends BaseController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const id = _.get(req, "params.id");
      if (!id) throw new ParamsError.Missing("Missing article identifier.");

      const article: Article | null = await ArticleRepository.getInstance().getById(id, { populate: true });
      if (!article) throw new ArticleError.NotFound("The identifier doesn't match any article.");

      res.status(HTTP_CODE.OK);
      res.json({ message: "Found", article: toArticleDTO(article) });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { body, file } = req;
      body.userId = res.locals.identity.user;
      body.cover = file;
      const holder = ((await ArticleRepository.getInstance().create(body)) as Article) || {};

      res.status(HTTP_CODE.OK);
      res.json({ message: "Created", _id: holder._id, article: toArticleDTO(holder) });
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      throw new Error("Not implemented");
      // const networkId = _.get(req, "params.id");
      // if (!networkId) throw new ParamsError.Missing("Missing network identifier.");

      // const { body, file } = req;
      // body.user = res.locals.identity.user;
      // body.icon = file;

      // const holder = ((await NetworkRepository.getInstance().update(networkId, body)) as Network) || {};

      // res.status(HTTP_CODE.OK);
      // res.json({ message: "Updated", _id: holder._id });
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      throw new Error("Not implemented");
      // const networkId = _.get(req, "params.id");
      // const userId = res.locals.identity.user;
      // if (!networkId) throw new ParamsError.Missing("Missing network identifier.");

      // await NetworkRepository.getInstance().removeFromUser({ networkId, userId });

      // res.status(HTTP_CODE.OK);
      // res.json({ message: "Removed" });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async list(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      if (!_.get(body, "userId")) throw new ParamsError.Missing("Missing user identifier.");

      const articles: Article[] = await ArticleRepository.getInstance().list(
        { user: _.get(body, "userId") },
        { populate: true, hideUser: true },
      );
      if (_.isNil(articles)) throw new ArticleError.NotFound("Issue when searching networks for this individual.");

      res.status(HTTP_CODE.OK);
      res.json({ message: "Found", articles: articles.map(article => toArticleDTO(article)) });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
