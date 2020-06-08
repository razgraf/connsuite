import _ from "lodash";
import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { VisitRepository } from "../repositories";
import { Visit, toVisitDTO, VisitType } from "../models";

export default class VisitController extends ManagerController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const { query, params } = req;

      const result: any = await VisitRepository.getInstance().getForItem(
        {
          userId: _.get(res, "locals.identity.user"),
          targetId: _.get(params, "id") as string,
          type: _.get(query, "type") as VisitType,
        },
        {
          start: _.get(query, "start") as string,
          end: _.get(query, "end") as string,
        },
      );

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Counted",
        result,
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Nope" });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;

      body.sourceId = _.get(res, "locals.identity.user");
      await VisitRepository.getInstance().createSanitized(body);

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Created",
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Stopped due to specific issues." });
    }
  }

  public static async list(req: Request, res: Response): Promise<void> {
    try {
      const { query, params } = req;

      const result: any = await VisitRepository.getInstance().listForType(
        {
          userId: _.get(res, "locals.identity.user"),
          type: _.get(query, "type") as VisitType,
        },
        {
          start: _.get(query, "start") as string,
          end: _.get(query, "end") as string,
        },
      );

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Counted",
        result,
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Nope" });
    }
  }
}
