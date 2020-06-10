import { routes } from "../constants";

import AdminRouter from "./admin";

export default [{ root: routes.admin.root, router: AdminRouter }];
