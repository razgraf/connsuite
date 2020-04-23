import { Request, Response } from "express";
import { ManagerController } from "./base";

export default class AuthController extends ManagerController {
  public static async google(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Google Controller after Rediect is Succesful`);
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Logout`);
  }
  public static async status(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Status`);
  }
}
