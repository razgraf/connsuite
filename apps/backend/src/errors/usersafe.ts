import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class MissingParams extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UsersafeMissingParams";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class NotCreated extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UsersafeNotCreated";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}
