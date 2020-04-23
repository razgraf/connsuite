import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class NotUnique extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UsernameNotUnique";
    this.code = HTTP_CODE.CONFLICT;
  }
}

export class NotCreated extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UsernameNotCreated";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class MissingParams extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UsernameMissingParams";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}
