import { Request, Response } from "express";

async function get(req: Request, res: Response): Promise<void> {
  res.send(`NOT IMPLEMENTED: Network Get: ${req.params.id}`);
}

async function create(req: Request, res: Response): Promise<void> {
  res.send(`NOT IMPLEMENTED: Network Create`);
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
