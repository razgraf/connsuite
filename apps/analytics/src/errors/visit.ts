import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class Failed extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "VisitFailed";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class NotFound extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "VisitNotFound";
    this.code = HTTP_CODE.NOT_FOUND;
  }
}
