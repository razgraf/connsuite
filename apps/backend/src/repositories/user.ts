import _ from "lodash";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import guards from "@connsuite/guards";
import { isDocument } from "@typegoose/typegoose";
import BaseRepository, { BaseOptions } from "./base";
import UsernameRepository from "./username";
import { defaults } from "../constants";
import { ParamsError, AuthError } from "../errors";
import { Vendor, User, Username, UserModel, Name, Request, ImageParent, ImagePurpose, Image } from "../models";
import { ImageRepository } from ".";

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
  public async update(id: string, payload: Request.UserUpdate): Promise<User | null> {
    if (_.isNil(payload)) throw new ParamsError.Missing("No payload provided.");
    if (!_.get(payload, "userId")) throw new ParamsError.Missing("No user provided.");
    if (!_.get(payload, "firstName")) throw new ParamsError.Missing("Missing first name");
    if (!_.get(payload, "lastName")) throw new ParamsError.Missing("Missing last name");
    if (!_.get(payload, "description")) throw new ParamsError.Missing("Missing Description");
    if (!_.get(payload, "tagline")) throw new ParamsError.Missing("Missing Tagline");

    const holder: User | null = await this.getById(_.get(payload, "userId"), { populate: true });
    if (!holder) throw new AuthError.UserNotFound("Unknown user or access not granted.");

    await this._profileGuards(payload, holder);

    const user = await UserModel.findByIdAndUpdate(holder._id, {
      name: {
        first: payload.firstName,
        last: payload.lastName,
      },
      description: payload.description,
      tagline: payload.tagline,
    });

    if (!_.isNil(payload.picture)) {
      await this._removeImages(holder);
      await this._generateImages(payload.picture, holder);
    }

    return user;
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
      tagline: defaults.tagline,
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
      tagline: defaults.tagline,
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

  public async bindImage(userId: string, payload: { picture: Image } | { thumbnail: Image }): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, payload);
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private async _profileGuards(payload: Request.UserUpdate, historic: User): Promise<void> {
    if (!_.get(payload, "firstName")) throw new ParamsError.Missing("Missing first name.");
    const firstNameGuard = guards.isNameAcceptable(_.get(payload, "firstName"), true);
    if (firstNameGuard !== true) throw new ParamsError.Invalid(("First Name: " + firstNameGuard) as string);

    if (!_.get(payload, "lastName")) throw new ParamsError.Missing("Missing last name.");
    const lastNameGuard = guards.isNameAcceptable(_.get(payload, "lastName"), true);
    if (lastNameGuard !== true) throw new ParamsError.Invalid(("Last Name: " + lastNameGuard) as string);

    if (!_.get(payload, "description")) throw new ParamsError.Missing("Missing Description");
    const descriptionGuard = guards.isUserDescriptionAcceptable(_.get(payload, "description"), true);
    if (descriptionGuard !== true) throw new ParamsError.Invalid(("Description: " + descriptionGuard) as string);

    if (!_.get(payload, "tagline")) throw new ParamsError.Missing("Missing Tagline");
    const taglineGuard = guards.isUserDescriptionAcceptable(_.get(payload, "tagline"), true);
    if (taglineGuard !== true) throw new ParamsError.Invalid(("Tagline: " + taglineGuard) as string);

    /** If there is no picture historically-available (e.g. fresh user), don't update until the user uploads one */
    if (
      !_.get(historic, "picture") ||
      !_.get(historic, "picture._id") ||
      !_.get(historic, "thumbnail") ||
      !_.get(historic, "thumbnail._id")
    ) {
      if (!_.get(payload, "picture") || !payload.picture) throw new ParamsError.Missing("Missing Picture");
      const pictureGuard = guards.isUserPictureAcceptable(payload.picture, true, { vendor: "multer" });
      if (pictureGuard !== true) throw new ParamsError.Invalid(pictureGuard as string);
    }
  }

  private async _removeImages(user: User): Promise<void> {
    try {
      if (!_.isNil(user.picture) && isDocument(user.picture)) {
        await ImageRepository.getInstance().remove(user.picture._id);
        ImageRepository.getInstance().unlink(user.picture);
      }

      if (!_.isNil(user.thumbnail) && isDocument(user.thumbnail)) {
        await ImageRepository.getInstance().remove(user.thumbnail._id);
        ImageRepository.getInstance().unlink(user.thumbnail);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private async _generateImages(source: Express.Multer.File, user: User): Promise<void> {
    const specimen: Image = {
      parent: ImageParent.User,
      purpose: ImagePurpose.Cover,

      user,
      type: source.mimetype as string,
    };

    await ImageRepository.getInstance().save(source, specimen);
    await ImageRepository.getInstance().save(source, { ...specimen, purpose: ImagePurpose.Thumbnail });
  }

  private _populateByOptions(options?: BaseOptions): { path: string; model: string }[] {
    const population: { path: string; model: string }[] = [];
    if (_.isNil(options) || !_.get(options, "populate")) return population;
    if (!options.hideUsernames) population.push({ path: "usernames", model: "Username" });
    if (!options.hideImages)
      population.push({ path: "picture", model: "Image" }, { path: "thumbnail", model: "Image" });
    return population;
  }

  private _hashPassword(clear: string): string {
    return bcrypt.hashSync(clear, 10);
  }

  private _comparePassword(clear: string, hash: string): boolean {
    return bcrypt.compareSync(clear, hash);
  }
}
