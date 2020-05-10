import _ from "lodash";
import bcrypt from "bcrypt";
import BaseRepository, { BaseOptions } from "./base";
import UsernameRepository from "./username";
import { defaults } from "../constants";
import { Vendor, User, Username, UserModel, Name, Request } from "../models";

export default class UserRepository extends BaseRepository<User> {
  private static instance: UserRepository;

  public static getInstance(): UserRepository {
    return UserRepository.instance || (UserRepository.instance = new UserRepository());
  }

  public async getById(id: string, options?: BaseOptions): Promise<User | null> {
    if (options && options.populate) return UserModel.findOne({ _id: id }).populate("usernames");
    return UserModel.findOne({ _id: id });
  }

  public async create(payload: User): Promise<User> {
    return UserModel.create(payload);
  }
  public async update(id: string, payload: User): Promise<User | null> {
    return UserModel.findByIdAndUpdate(id, payload, { new: true });
  }
  public async remove(id: string): Promise<void> {
    await UserModel.findByIdAndRemove(id);
  }
  public async list(filters: { [key: string]: unknown }): Promise<User[]> {
    return (await UserModel.find(filters)) || [];
  }

  /** ************* **/

  public async getByEmail(email: string, options?: BaseOptions): Promise<User | null> {
    if (options && options.populate) return UserModel.findOne({ email }).populate("usernames");
    return await UserModel.findOne({ email });
  }

  public async getByGoogleId(googleId: string, options?: BaseOptions): Promise<User | null> {
    if (options && options.populate) return UserModel.findOne({ googleId }).populate("usernames");
    return await UserModel.findOne({ googleId });
  }

  public async addUsername(userId: string, username: Username): Promise<void> {
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          usernames: username,
        },
      },
      {
        upsert: true,
      },
    );
  }

  public async isAlreadyRegistered(payload: { googleId?: string; email?: string }, vendor: Vendor): Promise<boolean> {
    if (vendor === Vendor.GOOGLE) {
      const googleId = _.get(payload, "googleId");
      if (!googleId) return false;
      const user = await this.getByGoogleId(googleId);
      return user ? true : false;
    } else if (vendor === Vendor.CLASSIC) {
      const email = _.get(payload, "email");
      if (!email) return false;
      const user = await this.getByEmail(email);
      return user ? true : false;
    }
    return false;
  }

  public async isPasswordMatching(user: User, clear: string): Promise<boolean> {
    if (!_.get(user, "password")) return false;
    return this._comparePassword(clear, user.password || "");
  }

  /**
   * Create a user from the Google object
   * [!] - Run a conflict check for username uniqueness prior to creating the user
   *
   * @param payload Google object containint the base user information
   */
  public async createFromGoogle(payload: Request.ConnectGoogle): Promise<User | null> {
    const name: Name = {
      first: payload.firstName,
      last: payload.lastName,
    };

    const user: User = await UserRepository.getInstance().create({
      name,
      email: payload.email,
      description: defaults.description,
      googleId: payload.googleId,
    });

    const value = (await UsernameRepository.getInstance().generateFromName(name)) || defaults.username;
    const username: Username = await UsernameRepository.getInstance().create({
      isPrimary: true,
      user,
      value,
    });

    user.usernames?.push(username);
    return user;
  }

  /**
   * Create a user from the Google object
   * [!] - Run a conflict check for username uniqueness prior to creating the user
   *
   * @param payload Google object containint the base user information
   */
  public async createFromClassic(payload: Request.RegisterClassic): Promise<User | null> {
    const password = this._hashPassword(payload.password);

    const name: Name = {
      first: payload.firstName,
      last: payload.lastName,
    };

    const user: User = await UserRepository.getInstance().create({
      name,
      email: payload.email,
      description: defaults.description,
      password,
    });

    const value = payload.username || defaults.username;

    const username: Username = await UsernameRepository.getInstance().create(
      {
        isPrimary: true,
        user,
        value,
      },
      { alter: false },
    );

    user.usernames?.push(username);
    return user;
  }

  /********/

  private _hashPassword(clear: string): string {
    return bcrypt.hashSync(clear, 10);
  }

  private _comparePassword(clear: string, hash: string): boolean {
    return bcrypt.compareSync(clear, hash);
  }
}