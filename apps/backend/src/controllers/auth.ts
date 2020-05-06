import _ from "lodash";
import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { AuthRepository } from "../repositories";
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
    try {
      await AuthRepository.getInstance().logout(res.locals);
      res.status(HTTP_CODE.OK);
      res.json({ message: "Disconnected" });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
  public static async status(req: Request, res: Response): Promise<void> {
    res.status(HTTP_CODE.OK);
    res.json({ message: "Validated" });
  }
}
