import _ from "lodash";
import { limits } from "@razgraf/connsuite-guards";
import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const filter = (req: Request, file: Express.Multer.File, cb: Function): void => {
  const type = _.attempt(() => _.toString(file.mimetype).split("/").pop());
  if (!_.isError(type) && type && limits.ALLOWED_FILE_FORMAT.includes(type)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: limits.MAX_FILE_SIZE,
  },
  fileFilter: filter,
});

export default {
  upload,
};
