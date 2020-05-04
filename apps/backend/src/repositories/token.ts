import _ from "lodash";
import Cryptr from "cryptr";
import JWT from "jsonwebtoken";

import UsersafeRepository from "./usersafe";
import { ManagerRepository } from "./base";
import { AuthError } from "../errors";
import { User, Usersafe } from "../models";

export default class TokenRepository extends ManagerRepository {
  private static instance: TokenRepository;

  public static getInstance(): TokenRepository {
    return TokenRepository.instance || (TokenRepository.instance = new TokenRepository());
  }

  public async generateToken(user: User): Promise<string> {
    if (_.isNil(user) || _.isNil(user._id)) throw new AuthError.MissingParams("User");

    const usersafe: Usersafe = await UsersafeRepository.getInstance().create(user);
    console.log("1. Usersafe:", usersafe);

    const encrypted = await this._encryptToken(String(user._id), usersafe.safe);
    console.log("2. Encrypted:", encrypted);

    return encrypted;
  }

  public async decodeToken(token: string): Promise<any> {
    const decrypted = await this._decryptToken(token);
    try {
      const decoded = JWT.verify(decrypted, process.env.CONN_BACK_JWT_SECRET || "");
      return {
        header: _.get(decoded, "header"),
        payload: _.get(decoded, "payload"),
      };
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  public async verifyToken(token: string): Promise<any> {
    const decrypted = await this._decryptToken(token);
    try {
      const decoded = JWT.decode(decrypted);
      const payload = _.get(decoded, "payload");

      if (_.isNil(payload) || !_.get(payload, "userId") || !_.get(payload, "safe"))
        throw new AuthError.AbnormalToken("Missing correct payload");

      return {
        header: _.get(decoded, "header"),
        payload,
      };
    } catch (e) {
      if (e) throw new AuthError.AbnormalToken(e.message);
    }
    return null;
  }

  private async _encryptToken(userId: string, safe: string): Promise<string> {
    if (_.isNil(process.env.CONN_BACK_JWT_SECRET) || _.isNil(process.env.CONN_BACK_ENCRYPTION_SECRET))
      throw new AuthError.MissingSecret();

    const payload = { userId, safe };

    const engine = new Cryptr(process.env.CONN_BACK_ENCRYPTION_SECRET);
    const data = JWT.sign(payload, process.env.CONN_BACK_JWT_SECRET);
    const encrypted = engine.encrypt(data);

    return encrypted;
  }

  private async _decryptToken(token: string): Promise<string> {
    if (_.isNil(process.env.CONN_BACK_JWT_SECRET) || _.isNil(process.env.CONN_BACK_ENCRYPTION_SECRET))
      throw new AuthError.MissingSecret();

    const engine = new Cryptr(process.env.CONN_BACK_ENCRYPTION_SECRET);
    const decrypted = engine.decrypt(token);

    return decrypted;
  }
}
