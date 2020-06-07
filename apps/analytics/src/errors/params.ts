import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class Missing extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "ParamsMissing";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class Conflict extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "ParamsConflict";
    this.code = HTTP_CODE.CONFLICT;
  }
}

export class Invalid extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "ParamsInvalid";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}
