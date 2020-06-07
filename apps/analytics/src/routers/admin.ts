import express from "express";
import { AdminController } from "../controllers";

const AdminRouter = express.Router();

AdminRouter.get("/", AdminController.admin);

export default AdminRouter;
