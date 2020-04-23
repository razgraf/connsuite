require("dotenv").config();
import cors from "cors";
import express from "express";

import { AuthRouter, NetworkRouter } from "./routers";
import { routes } from "./constants";
import { mongo, passport } from "./vendors";

mongo.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(routes.network.root, NetworkRouter);
app.use(routes.auth.root, AuthRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
