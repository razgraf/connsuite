import _ from "lodash";
import randomstring from "randomstring";
import BaseRepository from "./base";
import { UsersafeError } from "../errors";
import { User, Usersafe, UsersafeModel } from "../models";
import { defaults } from "../constants";

export default class UsersafeRepository extends BaseRepository<Usersafe> {
  private static instance: UsersafeRepository;

  public static getInstance(): UsersafeRepository {
    return UsersafeRepository.instance || (UsersafeRepository.instance = new UsersafeRepository());
  }

  public async getById(id: string): Promise<Usersafe | null> {
    return await UsersafeModel.findOne({ _id: id });
  }

  public async create(user: User, agent = defaults.agent): Promise<Usersafe> {
    if (_.isNil(user)) throw new UsersafeError.MissingParams("User");

    const usersafe: Usersafe = await UsersafeModel.create({
      agent,
      user,
      safe: randomstring.generate(),
    });

    if (!usersafe) throw new UsersafeError.NotCreated(JSON.stringify(usersafe));

    return usersafe;
  }

  public async update(id: string, payload: any): Promise<void> {
    console.log("NOT IMPLEMENTED YET", id, payload);
    return;
  }

  public async remove(id: string): Promise<void> {
    console.log(id);
    return;
  }
  public async list(filters: { [key: string]: unknown }): Promise<Usersafe[]> {
    return UsersafeModel.find(filters) || [];
  }

  /** ************* **/

  public async getByUserAndSafe(usersafe: Usersafe): Promise<Usersafe | null> {
    return await UsersafeModel.findOne({ user: usersafe.user, safe: usersafe.safe });
  }

  public async listByUser(user: User): Promise<Usersafe[]> {
    return this.list({ user }) || [];
  }
}
