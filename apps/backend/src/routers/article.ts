import express from "express";
import { routes } from "../constants";
import { ArticleController } from "../controllers";
import { AuthMiddleware, UploadMiddleware } from "../middlewares";

const ArticleRouter = express.Router();

ArticleRouter.get(routes.article.get, [AuthMiddleware.bearerFriendly], ArticleController.get);
ArticleRouter.post(
  routes.article.create,
  [AuthMiddleware.bearer, UploadMiddleware.upload.single("cover")],
  ArticleController.create,
);
ArticleRouter.patch(
  routes.article.update,
  [AuthMiddleware.bearer, UploadMiddleware.upload.single("cover")],
  ArticleController.update,
);
ArticleRouter.delete(routes.article.remove, AuthMiddleware.bearer, ArticleController.remove);
ArticleRouter.get(routes.article.list, [AuthMiddleware.bearerFriendly], ArticleController.list);

export default ArticleRouter;
