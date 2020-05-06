import _ from "lodash";
import Cryptr from "cryptr";
import JWT from "jsonwebtoken";

import UsersafeRepository from "./usersafe";
import { ManagerRepository } from "./base";
import { AuthError } from "../errors";
import { User, Usersafe, Token } from "../models";
import { defaults } from "../constants";

export default class TokenRepository extends ManagerRepository {
  private static instance: TokenRepository;

  public static getInstance(): TokenRepository {
    return TokenRepository.instance || (TokenRepository.instance = new TokenRepository());
  }

  public async generateToken(user: User, agent = defaults.agent): Promise<string> {
    if (_.isNil(user) || _.isNil(user._id)) throw new AuthError.InvalidToken("User");

    const usersafe: Usersafe = await UsersafeRepository.getInstance().create(user, agent);
    const encrypted = await this._encryptToken(String(user._id), usersafe.safe);

    return encrypted;
  }

  public async decodeToken(token: string): Promise<Token | null> {
    const decrypted = await this._decryptToken(token);
    try {
      const payload = JWT.decode(decrypted) as Token;
      return payload;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  public async verifyToken(token: string): Promise<Token | null> {
    const decrypted = await this._decryptToken(token);
    try {
      const payload = JWT.verify(decrypted, process.env.CONN_BACK_JWT_SECRET || "") as Token;

      if (_.isNil(payload) || !_.get(payload, "userId") || !_.get(payload, "safe"))
        throw new AuthError.InvalidToken("Missing correct payload");

      return payload;
    } catch (e) {
      if (e) throw new AuthError.InvalidToken(e.message);
    }
    return null;
  }

  private async _encryptToken(userId: string, safe: string): Promise<string> {
    if (_.isNil(process.env.CONN_BACK_JWT_SECRET) || _.isNil(process.env.CONN_BACK_ENCRYPTION_SECRET))
      throw new AuthError.InvalidToken();

    const payload = { userId, safe };

    const engine = new Cryptr(process.env.CONN_BACK_ENCRYPTION_SECRET);
    const data = JWT.sign(payload, process.env.CONN_BACK_JWT_SECRET);
    const encrypted = engine.encrypt(data);

    return encrypted;
  }

  private async _decryptToken(token: string): Promise<string> {
    if (_.isNil(process.env.CONN_BACK_JWT_SECRET) || _.isNil(process.env.CONN_BACK_ENCRYPTION_SECRET))
      throw new AuthError.InvalidToken();

    const engine = new Cryptr(process.env.CONN_BACK_ENCRYPTION_SECRET);
    const decrypted = engine.decrypt(token);

    return decrypted;
  }
}
