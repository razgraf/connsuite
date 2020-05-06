import _ from "lodash";
import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { AuthRepository, UserRepository, TokenRepository } from "../repositories";
import { User } from "../models";
import { getUserAgent } from "../utils";

export default class AuthController extends ManagerController {
  public static async google(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      body.agent = getUserAgent(req);
      const token = await AuthRepository.getInstance().google(body);
      res.status(HTTP_CODE.OK);
      res.json({ message: "Authenthicated and Authorized", token });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      body.agent = getUserAgent(req);
      const token = await AuthRepository.getInstance().login(body);
      res.status(HTTP_CODE.OK);
      res.json({ message: "Authenthicated and Authorized", token });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      body.agent = getUserAgent(req);
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
      const header = req.headers["authorization"];
      const token = header?.split(" ")[1] || "";

      const isOk = await AuthRepository.getInstance().validate(token);

      res.status(HTTP_CODE.OK);
      res.json({ message: "Validated", token, isOk });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
