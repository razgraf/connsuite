import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import vendors from "./vendors";

import { routes } from "./constants";
import routers from "./routers";

dotenv.config();
vendors.mongo.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use(routes.network.root, routers.network);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

export default app;
