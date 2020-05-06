import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class Failed extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UsernameFailed";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}
