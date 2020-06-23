require("dotenv").config();
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import routers from "./routers";
// import { mongo } from "./vendors";

// mongo.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use((error: SyntaxError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof SyntaxError && "body" in error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "JSON Parsing error encountered in body. Please fix the payload and try again." });
  }
  next();
});

routers.forEach(({ root, router }) => app.use(root, router));

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hi.");
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));