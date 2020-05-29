import express from "express";
import { routes } from "../constants";
import { SkillController } from "../controllers";

const SkillRouter = express.Router();

SkillRouter.get(routes.skill.listDefault, SkillController.listDefault);

export default SkillRouter;
