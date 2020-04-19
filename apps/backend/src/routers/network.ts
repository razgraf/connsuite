import express from "express";
import { routes } from "../constants";
import controllers from "../controllers";

const router = express.Router();

router.get(routes.network.get, controllers.network.get);
router.post(routes.network.create, controllers.network.create);
router.patch(routes.network.update, controllers.network.update);
router.patch(routes.network.remove, controllers.network.remove);
router.get(routes.network.list, controllers.network.list);

export default router;
