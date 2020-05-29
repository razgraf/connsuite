import express from "express";
import { routes } from "../constants";
import { CategoryController } from "../controllers";

const CategoryRouter = express.Router();

CategoryRouter.get(routes.category.listDefault, CategoryController.listDefault);

export default CategoryRouter;
