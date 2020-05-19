import _ from "lodash";
import multer from "multer";
import { Request } from "express";
import { MAX_FILE_SIZE, ALLOWED_FILE_FORMAT } from "../constants/limits";

const storage = multer.memoryStorage();

const filter = (req: Request, file: Express.Multer.File, cb: Function): void => {
  const type = _.attempt(() => _.toString(file.mimetype).split("/").pop());
  if (!_.isError(type) && type && ALLOWED_FILE_FORMAT.includes(type)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: filter,
});

export default {
  upload,
};
