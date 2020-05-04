import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { AuthRepository, UserRepository, TokenRepository } from "../repositories";
import { User } from "../models";

export default class AuthController extends ManagerController {
  public static async google(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const token = await AuthRepository.getInstance().google(body);
      res.status(HTTP_CODE.OK);
      res.json({ message: "Authenthicated and Authorized", token });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Classic`);
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      const token = await AuthRepository.getInstance().register(body);
      res.status(HTTP_CODE.OK);
      res.json({ message: "Created, Authenthicated and Authorized", token });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Logout`);
  }
  public static async status(req: Request, res: Response): Promise<void> {
    try {
      const user: User = (await UserRepository.getInstance().getById(req.body.userId)) as User;
      const token: string = await TokenRepository.getInstance().generateToken(user);

      res.status(HTTP_CODE.OK);
      res.json({ message: "Authenthicated and Authorized", token });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
