import { Request, Response } from "express";
import BaseController from "./base";
import { NetworkRepository, UserRepository, UsernameRepository } from "../repositories";
import { User, Username } from "../models";

export default class NetworkController extends BaseController {
  public static async get(req: Request, res: Response): Promise<void> {
    // res.send(`NOT IMPLEMENTED: Network Get: ${req.params.id}`);
    try {
      const us = (await UserRepository.getInstance().getByEmail("razvan@vansoftware2.ro")) as User;
      if (!us) {
        res.send("No user");
        return;
      }

      const us2 = { _id: us._id } as User;

      const unames = await UsernameRepository.getInstance().listByUser(us2);
      res.send(JSON.stringify({ unames, us2 }));
      return;

      const user: User = {
        name: {
          first: "Razvan",
          last: "Apostu",
        },
        description: "Boss",
        email: "razvan@vansoftware.ro",
      };
      const u = await UserRepository.getInstance().create(user);

      const username: Username = {
        value: "razgraf",
        isPrimary: true,
        user: u,
      };
      const un = await UsernameRepository.getInstance().create(username);

      res.send(JSON.stringify({ user: u, username: un }));
    } catch (e) {
      console.error(e);
      res.send("Nope");
    }
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
