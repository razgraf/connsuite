import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class MissingParams extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingParams";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class WrongRegistrationParams extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthWrongRegistrationParams";
    this.code = HTTP_CODE.NOT_ACCEPTABLE;
  }
}

export class MissingVendorResponse extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingVendorResponse";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class MissingSecret extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingSecret";
    this.code = HTTP_CODE.FORBIDDEN;
  }
}

export class AbnormalToken extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthAbnormalToken";
    this.code = HTTP_CODE.FORBIDDEN;
  }
}

export class CredentialsNotUnique extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthCredentialsNotUnique";
    this.code = HTTP_CODE.CONFLICT;
  }
}
