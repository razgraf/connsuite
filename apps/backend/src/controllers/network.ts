import { Request, Response } from "express";
import { Network } from "../models";

async function get(req: Request, res: Response): Promise<void> {
  res.send(`NOT IMPLEMENTED: Network Get: ${req.params.id}`);
}

async function create(req: Request, res: Response): Promise<void> {
  const n = await Network.create({
    description: "description",
    title: "title",
    username: "username",
  });
  console.log(n);
  res.send(JSON.stringify(n));
}

async function update(req: Request, res: Response): Promise<void> {
  res.send(`NOT IMPLEMENTED: Network Update ${req.params.id}`);
}

async function remove(req: Request, res: Response): Promise<void> {
  res.send(`NOT IMPLEMENTED: Network Remove ${req.params.id}`);
}

async function list(req: Request, res: Response): Promise<void> {
  res.send("NOT IMPLEMENTED: Network List");
}

const controller = {
  get,
  create,
  update,
  remove,
  list,
};

export default controller;
