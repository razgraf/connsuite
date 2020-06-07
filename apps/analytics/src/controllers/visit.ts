import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { VisitRepository } from "../repositories";

export default class VisitController extends ManagerController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const result = "";

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Admin stuff",
        result: result.toString(),
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
      await VisitRepository.getInstance().createSanitized(body);

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Created",
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Nope" });
    }
  }

  public static async list(req: Request, res: Response): Promise<void> {
    try {
      const result = "";

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Not implemeted",
        result: result.toString(),
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Nope" });
    }
  }
}
