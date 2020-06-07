import _ from "lodash";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
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
    if (options && options.populate) return UserModel.findOne({ _id: id }).populate(this._populateByOptions(options));
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

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async getByEmail(email: string, options?: BaseOptions): Promise<User | null> {
    if (options && options.populate) return UserModel.findOne({ email }).populate(this._populateByOptions(options));
    return await UserModel.findOne({ email });
  }

  public async getByGoogleId(googleId: string, options?: BaseOptions): Promise<User | null> {
    if (options && options.populate) return UserModel.findOne({ googleId }).populate(this._populateByOptions(options));
    return await UserModel.findOne({ googleId });
  }

  public async getByUsername(username: string, options?: BaseOptions): Promise<User | null> {
    const found = (await UsernameRepository.getInstance().getByValue(username)) as Username;
    if (!found || !found.user) return null;
    if (options && options.populate) return UserModel.findById(found.user).populate(this._populateByOptions(options));
    return await UserModel.findById(found.user);
  }

  public async getIdByUsername(username: string): Promise<string | null> {
    const found = (await UsernameRepository.getInstance().getByValue(username)) as Username;
    return !found || !found.user ? null : String(found.user);
  }

  public async interpretIdentifierToId(payload: Request.UserIdentifier): Promise<string | null> {
    if (_.isNil(payload)) return null;

    try {
      if (String(payload._id) === String(new ObjectId(payload._id))) return String(payload._id);
    } catch (e) {} //eslint-disable-line

    if (!_.isNil(payload.username)) {
      const id = await this.getIdByUsername(payload.username || "");
      if (!id) return null;
      return String(id);
    }

    if (!_.isNil(payload.email)) {
      const user = (await this.getByEmail(payload.email || "")) as User;
      if (!user || _.isNil(user._id)) return null;
      return String(user._id);
    }

    return null;
  }

  public async interpretIdOrUsernameToId(identifier: string): Promise<string | null> {
    if (_.isNil(identifier)) return null;

    try {
      if (String(identifier) === String(new ObjectId(identifier))) return String(identifier);
    } catch (e) {} //eslint-disable-line

    const id = await this.getIdByUsername(identifier);
    if (!id) return null;
    return String(id);
  }

  public async addUsername(userId: string, usernameId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $push: { usernames: new ObjectId(usernameId) } }, { upsert: true });
  }

  public async addNetwork(networkId: string, userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $push: { networks: new ObjectId(networkId) } }, { upsert: true });
  }

  public async removeNetwork(networkId: string, userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $pull: { networks: new ObjectId(networkId) } });
  }

  public async addArticle(articleId: string, userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $push: { articles: new ObjectId(articleId) } }, { upsert: true });
  }

  public async removeArticle(articleId: string, userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $pull: { articles: new ObjectId(articleId) } });
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

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private _populateByOptions(options?: BaseOptions): { path: string; model: string }[] {
    const population: { path: string; model: string }[] = [];
    if (_.isNil(options) || !_.get(options, "populate")) return population;
    if (!options.hideUsernames) population.push({ path: "usernames", model: "Username" });
    if (!options.hideImages) population.push({ path: "icon", model: "Image" }, { path: "thumbnail", model: "Image" });
    return population;
  }

  private _hashPassword(clear: string): string {
    return bcrypt.hashSync(clear, 10);
  }

  private _comparePassword(clear: string, hash: string): boolean {
    return bcrypt.compareSync(clear, hash);
  }
}
