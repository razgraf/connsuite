import { ArticleType, NetworkType } from "./atoms";

export type RegisterClassic = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  agent?: string;
};

export type LoginClassic = {
  email: string;
  password: string;
  agent?: string;
};

export type ConnectGoogle = {
  googleId: string;
  firstName: string;
  lastName: string;
  picture?: string;
  email: string;
  agent?: string;
};

export type NetworkCreateInternal = {
  type: NetworkType.Internal;
  user: string;

  title: string;
  url: string;
  username?: string;
  description?: string;
  icon: Express.Multer.File;

  [key: string]: any;
};

export type NetworkCreateExternal = {
  type: NetworkType.External;
  user: string;

  externalId: string;
  username: string;
  description?: string;
  icon: Express.Multer.File;

  [key: string]: any;
};

export type NetworkCreate = NetworkCreateInternal | NetworkCreateExternal;

export type SkillCreate = {
  title: string;
  userId: string;
  articleId: string;
  isDefault?: boolean;
};

export type ArticleCreateInternal = {
  type: ArticleType.Internal;
  userId: string;

  title: string;
  content: string;

  cover: Express.Multer.File;
  skills: string /** Stringified JSON of skills from FormData */;
};

export type ArticleCreateExternal = {
  type: ArticleType.Internal;
  userId: string;

  title: string;
  url: string;

  cover: Express.Multer.File;
  skills: string /** Stringified JSON of skills from FormData */;
};

export type ArticleCreate = ArticleCreateInternal | ArticleCreateExternal;

export type SkillTransfer = {
  _id?: string;
  title?: string;
};
