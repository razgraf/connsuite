import { Request, Response } from "express";

abstract class BaseController {
  public static get: (req: Request, res: Response) => Promise<void>;
  public static create: (req: Request, res: Response) => Promise<void>;
  public static update: (req: Request, res: Response) => Promise<void>;
  public static remove: (req: Request, res: Response) => Promise<void>;
  public static list: (req: Request, res: Response) => Promise<void>;
}

export abstract class ManagerController {}

export default BaseController;
