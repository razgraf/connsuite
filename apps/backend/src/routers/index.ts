import { routes } from "../constants";

import ArticleRouter from "./article";
import AuthRouter from "./auth";
import CategoryRouter from "./category";
import NetworkRouter from "./network";
import SkillRouter from "./skill";
import UserRouter from "./user";

export default [
  { root: routes.article.root, router: ArticleRouter },
  { root: routes.auth.root, router: AuthRouter },
  { root: routes.category.root, router: CategoryRouter },
  { root: routes.network.root, router: NetworkRouter },
  { root: routes.skill.root, router: SkillRouter },
  { root: routes.user.root, router: UserRouter },
];
