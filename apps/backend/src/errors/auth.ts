import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class MissingParams extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingParams";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class MissingVendorResponse extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingVendorResponse";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}

export class RegistrationError extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthRegistrationError";
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

export class UserNotClassic extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthUserNotClassic";
    this.code = HTTP_CODE.CONFLICT;
  }
}

export class CredentialsNotUnique extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthCredentialsNotUnique";
    this.code = HTTP_CODE.CONFLICT;
  }
}

export class InvalidRegistrationParams extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthInvalidRegistrationParams";
    this.code = HTTP_CODE.CONFLICT;
  }
}

export class UserNotFound extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthUserNotFound";
    this.code = HTTP_CODE.NOT_FOUND;
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
