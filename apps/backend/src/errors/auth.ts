import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class MissingPayload extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "AuthMissingPayload";
    this.code = HTTP_CODE.CONFLICT;
  }
}
