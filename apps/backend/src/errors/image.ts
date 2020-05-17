import { BaseError } from "./atom";
import { HTTP_CODE } from "../constants";

export class MimeType extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "ImageMimeTypeError";
    this.code = HTTP_CODE.BAD_REQUEST;
  }
}
