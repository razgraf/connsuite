import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { CategoryRepository } from "../repositories";
import { toCategoryDTO } from "../models";

export default class CategoryController extends ManagerController {
  public static async listDefault(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryRepository.getInstance().list({ isDefault: true });

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Supported default categories.",
        categories: Object.values(categories).map(item => toCategoryDTO(item)),
      });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
