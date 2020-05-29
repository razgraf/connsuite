import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { SkillRepository } from "../repositories";
import { toSkillDTO } from "../models";

export default class SkillController extends ManagerController {
  public static async listDefault(req: Request, res: Response): Promise<void> {
    try {
      const skills = await SkillRepository.getInstance().list({ isDefault: true });

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Supported default skills.",
        skills: Object.values(skills).map(item => toSkillDTO(item)),
      });
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
    }
  }
}
