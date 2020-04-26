import { Request, Response } from "express";
import { ManagerController } from "./base";
import { AuthError } from "../errors";
import { HTTP_CODE } from "../constants";
import { AuthRepository } from "../repositories";

export default class AuthController extends ManagerController {
  public static async google(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const token = await AuthRepository.getInstance().google(body);
      res.status(HTTP_CODE.OK);
      res.json({ message: "Authenthicated and Authorized", token });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message, extra: `NOT IMPLEMENTED: Google Controller after Rediect is Succesful` });
    }

    res.send(`NOT IMPLEMENTED: Google Controller after Rediect is Succesful`);
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Logout`);
  }
  public static async status(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Status`);
  }
}
