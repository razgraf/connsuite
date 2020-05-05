import _ from "lodash";
import BaseRepository from "./base";
import UserRepository from "./user";
import { UsernameError } from "../errors";
import { Name, User, Username, UsernameModel } from "../models";

export default class UsernameRepository extends BaseRepository<Username> {
  private static instance: UsernameRepository;

  public static getInstance(): UsernameRepository {
    return UsernameRepository.instance || (UsernameRepository.instance = new UsernameRepository());
  }

  public async getById(id: string): Promise<Username | null> {
    return await UsernameModel.findOne({ _id: id });
  }

  public async create(payload: Username, options = { alter: true as boolean }): Promise<Username> {
    if (_.isNil(payload) || !_.get(payload, "user")) throw new UsernameError.MissingParams(JSON.stringify(payload));

    const username: Username = await this._create(payload, options);
    await this._bind(username);

    return username;
  }

  public async update(id: string, payload: any): Promise<void> {
    console.log(id, payload);
    return;
  }
  public async remove(id: string): Promise<void> {
    console.log(id);
    return;
  }
  public async list(filters: { [key: string]: unknown }): Promise<Username[]> {
    console.log(filters);
    return [];
  }

  /** ************* **/

  public async getByValue(value: string): Promise<Username | null> {
    return await UsernameModel.findOne({ value });
  }

  public async listByUser(user: User): Promise<Username[]> {
    return (await UsernameModel.find({ user })) || [];
  }

  public async generateFromName(name: Name): Promise<string | null> {
    if (_.isNil(name)) return null;
    const [first, last] = [_.get(name, "first"), _.get(name, "last")];
    if (_.isNil(first) || _.isNil(last)) return null;

    const username = first.toLowerCase() + last.toLowerCase();

    return username && username.length > 0 ? username : null;
  }

  /** ************* **/

  private async _create(payload: Username, options = { alter: true as boolean }): Promise<Username> {
    const { value } = payload;
    let counter = 0;

    let isUnique = _.isNil(await this.getByValue(value));
    if (!options.alter && !isUnique) throw new UsernameError.NotUnique(value);

    if (!isUnique)
      do {
        counter += 1;
        if (counter === 500) throw new UsernameError.NotCreated(">500");
        isUnique = _.isNil(await this.getByValue(value + String(counter)));
      } while (!isUnique);

    const username: Username = await UsernameModel.create({
      ...payload,
      value: counter === 0 ? value : value + String(counter),
    });

    if (!username) throw new UsernameError.NotCreated(JSON.stringify(username));

    return username;
  }

  private async _bind(username: Username): Promise<void> {
    await UserRepository.getInstance().addUsername(String(username.user), username);
  }
}
