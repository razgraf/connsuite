import express from "express";

const app: express.Application = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
