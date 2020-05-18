import _ from "lodash";
import { Request, Response } from "express";
import BaseController from "./base";
import { HTTP_CODE } from "../constants";
import { NetworkRepository } from "../repositories";
import { Network, toNetworkDTO } from "../models";
import { NetworkError, ParamsError } from "../errors";

export default class NetworkController extends BaseController {
  public static async get(req: Request, res: Response): Promise<void> {
    try {
      const id = _.get(req, "params.id");
      if (!id) throw new ParamsError.Missing("Missing network identifier.");
      const network: Network | null = await NetworkRepository.getInstance().getById(id, { populate: true });
      if (!network) throw new NetworkError.NotFound("The identifier doesn't match any network.");

      res.status(HTTP_CODE.OK);
      res.json({ message: "Found", network: toNetworkDTO(network) });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { body, file } = req;
      body.user = res.locals.identity.user;
      body.icon = file;
      const holder: Network = await NetworkRepository.getInstance().create(body);
      const result = (await NetworkRepository.getInstance().getById(holder._id as string, {
        populate: true,
      })) as Network;

      res.status(HTTP_CODE.OK);
      res.json({ message: "Created", network: toNetworkDTO(result) });
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const networkId = _.get(req, "params.id");
      if (!networkId) throw new ParamsError.Missing("Missing network identifier.");

      const { body, file } = req;
      body.user = res.locals.identity.user;
      body.icon = file;
      const result: Network = (await NetworkRepository.getInstance().update(networkId, body)) as Network;

      res.status(HTTP_CODE.OK);
      res.json({ message: "Updated", network: toNetworkDTO(result) });
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const networkId = _.get(req, "params.id");
      const userId = res.locals.identity.user;
      if (!networkId) throw new ParamsError.Missing("Missing network identifier.");

      await NetworkRepository.getInstance().removeFromUser({ networkId, userId });

      res.status(HTTP_CODE.OK);
      res.json({ message: "Removed" });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }

  public static async list(req: Request, res: Response): Promise<void> {
    try {
      const { body } = req;
      if (!_.get(body, "userId")) throw new ParamsError.Missing("Missing user identifier.");

      const networks: Network[] = await NetworkRepository.getInstance().list(
        { user: _.get(body, "userId") },
        { populate: true },
      );
      if (_.isNil(networks)) throw new NetworkError.NotFound("Issue when searching networks for this individual.");

      res.status(HTTP_CODE.OK);
      res.json({ message: "Found", networks: networks.map(network => toNetworkDTO(network)) });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
