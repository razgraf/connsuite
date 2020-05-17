import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class Failed extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthFailed";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class UserNotFound extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthUserNotFound";
    this.code = HTTP_CODE.NOT_FOUND;
  }
}

export class InvalidToken extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthInvalidToken";
    this.code = HTTP_CODE.FORBIDDEN;
  }
}

export class Forbidden extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthForbidden";
    this.code = HTTP_CODE.FORBIDDEN;
  }
}

/** Edge case */

export class MissingVendorResponse extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingVendorResponse";
    this.code = HTTP_CODE.UNPROCESSABLE_ENTITY;
  }
}
