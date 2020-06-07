import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
export default class AdminController extends ManagerController {
  public static async admin(req: Request, res: Response): Promise<void> {
    try {
      res.status(HTTP_CODE.OK);
      res.json({
        message: "Admin stuff",
        result: "",
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Nope" });
    }
  }
}
