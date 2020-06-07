import _ from "lodash";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import shortid from "shortid";
import BaseController from "./base";
import { HTTP_CODE } from "../constants";
import { ArticleRepository, UserRepository } from "../repositories";
import { Article, toArticleDTO } from "../models";
import { ArticleError, AuthError, ParamsError } from "../errors";

export default class ArticleController extends BaseController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const id = _.get(req, "params.id");
      if (!id) throw new ParamsError.Missing("Missing article identifier.");

      const populate = !_.has(req, "query.minimal");
      const article: Article | null = shortid.isValid(id)
        ? await ArticleRepository.getInstance().getByFilters({ shortId: String(id) }, { populate })
        : await ArticleRepository.getInstance().getById(id, { populate });

      if (!article) throw new ArticleError.NotFound("The identifier doesn't match any article.");

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Found",
        article: toArticleDTO(article, {
          categories: true,
          skills: true,
          images: true,
          content: true,
          user: true,
        }),
      });
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
      res.json({ message: "Created", _id: holder._id });
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const articleId = _.get(req, "params.id");
      if (!articleId) throw new ParamsError.Missing("Missing article identifier.");

      const { body, file } = req;
      body.userId = res.locals.identity.user;
      body.cover = file;

      const holder = ((await ArticleRepository.getInstance().update(articleId, body)) as Article) || {};

      res.status(HTTP_CODE.OK);
      res.json({ message: "Updated", _id: holder._id });
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const articleId = _.get(req, "params.id");
      const userId = res.locals.identity.user;
      if (!articleId) throw new ParamsError.Missing("Missing article identifier.");

      await ArticleRepository.getInstance().removeFromUser(articleId, userId);

      res.status(HTTP_CODE.OK);
      res.json({ message: "Removed" });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  /** Any user can list another user's networks */
  public static async list(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req;
      if (_.isNil(query)) throw new ParamsError.Missing("Insuficient listing payload.");
      const userId = await UserRepository.getInstance().interpretIdentifierToId(query);
      if (_.isNil(userId)) throw new AuthError.UserNotFound("Missing user based on given auth details.");

      const articles: Article[] = await ArticleRepository.getInstance().list(
        { user: new ObjectId(userId) },
        {
          populate: true,
          hideUser: true,
          hideContent: true,
          limit: _.get(query, "limit") as string,
          offset: _.get(query, "offset") as string,
        },
      );
      if (_.isNil(articles)) throw new ArticleError.NotFound("Issue when searching articles for this individual.");

      res.status(HTTP_CODE.OK);
      res.json({ message: "Found", articles: articles.map(network => toArticleDTO(network)) });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
