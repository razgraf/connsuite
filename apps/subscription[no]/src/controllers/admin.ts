import { Request, Response } from "express";
import { ManagerController } from "./base";
import { HTTP_CODE } from "../constants";
import { contract } from "../vendors/ethers";
export default class AdminController extends ManagerController {
  public static async admin(req: Request, res: Response): Promise<void> {
    try {
      const result = await contract.balanceOf(6, "0x2a1b86d7cab4815431827276525f570f37eca21d");
      // const result = await contract.nextStreamId();

      res.status(HTTP_CODE.OK);
      res.json({
        message: "Admin stuff",
        result: result.toString(),
      });
    } catch (e) {
      console.error(e);
      res.status(HTTP_CODE.BAD_REQUEST);
      res.json({ message: "Nope" });
    }
  }
}
