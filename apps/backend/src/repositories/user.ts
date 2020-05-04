import _ from "lodash";
import BaseRepository from "./base";
import UsernameRepository from "./username";
import { defaults } from "../constants";
import { Vendor, User, Username, UserModel, Name } from "../models";

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

  public async isAlreadyRegistered(payload: any, vendor: Vendor): Promise<boolean> {
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

  public async createFromGoogle(payload: any): Promise<User | null> {
    const { firstName, lastName, email, sub: googleId } = payload;

    const name: Name = {
      first: firstName,
      last: lastName,
    };

    const user: User = await UserRepository.getInstance().create({
      name,
      email,
      description: defaults.description,
      googleId,
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
}
