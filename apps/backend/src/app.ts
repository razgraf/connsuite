import cors from "cors";
import express from "express";

import { NetworkRouter } from "./routers";
import { routes } from "./constants";
import { dotenv, mongo } from "./vendors";

dotenv.config();
mongo.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use(routes.network.root, NetworkRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
