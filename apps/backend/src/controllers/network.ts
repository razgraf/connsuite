import { Request, Response } from "express";
import BaseController from "./base";
import { NetworkRepository } from "../repositories";

export default class NetworkController extends BaseController {
  public static async get(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Network Get: ${req.params.id}`);
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      const n = await NetworkRepository.getInstance().create({ ...body });
      res.send(JSON.stringify(n));
    } catch (e) {
      res.send("Nope");
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Network Update ${req.params.id}`);
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    res.send(`NOT IMPLEMENTED: Network Remove ${req.params.id}`);
  }

  public static async list(req: Request, res: Response): Promise<void> {
    res.send("NOT IMPLEMENTED: Network List");
  }
}
