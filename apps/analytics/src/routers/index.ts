import { routes } from "../constants";

import AdminRouter from "./admin";
import VisitRouter from "./visit";

export default [
  { root: routes.admin.root, router: AdminRouter },
  { root: routes.visits.root, router: VisitRouter },
];
