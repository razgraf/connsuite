import _ from "lodash";
import BaseRepository from "./base";
import { Strategy, User, Username, UserModel } from "../models";

export default class UserRepository extends BaseRepository<User> {
  private static instance: UserRepository;

  public static getInstance(): UserRepository {
    return UserRepository.instance || (UserRepository.instance = new UserRepository());
  }

  public async getById(id: string): Promise<User | null> {
    return await UserModel.findOne({ _id: id });
  }

  public async create(payload: User): Promise<User> {
    return await UserModel.create(payload);
  }
  public async update(id: string, payload: User): Promise<void> {
    console.log(id, payload);
    return;
  }
  public async remove(id: string): Promise<void> {
    console.log(id);
    return;
  }
  public async list(filters: { [key: string]: unknown }): Promise<User[]> {
    console.log(filters);
    return [];
  }

  /** ************* **/

  public async getByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  public async getByGoogleId(googleId: string): Promise<User | null> {
    return await UserModel.findOne({ googleId });
  }

  public async addUsername(userId: string, username: Username): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        usernames: username,
      },
    });
  }

  public async isAlreadyRegistered(payload: any, strategy: Strategy): Promise<boolean> {
    if (strategy === Strategy.Google) {
      const googleId = _.get(payload, "googleId");
      const user = await this.getByGoogleId(googleId);
      return user ? true : false;
    }
    return false;
  }
}
