import BaseRepository from "./base";
import { Network, NetworkModel } from "../models";

export default class NetworkRepository extends BaseRepository<Network> {
  private static instance: NetworkRepository;

  public static getInstance(): NetworkRepository {
    return NetworkRepository.instance || (NetworkRepository.instance = new NetworkRepository());
  }

  public async getById(id: string): Promise<Network | null> {
    return NetworkModel.findById(id);
  }

  public async create(payload: Network): Promise<Network> {
    console.log(payload);

    /*** TODO ****/

    const element = await NetworkModel.create({
      description: "description",
      title: "repo-title",
      username: "username",
    });
    console.log(element);
    return element;
  }
  public async update(id: string, payload: Network): Promise<Network | null> {
    return NetworkModel.findByIdAndUpdate(id, payload, { new: true });
  }
  public async remove(id: string): Promise<void> {
    await NetworkModel.findByIdAndRemove(id);
  }
  public async list(filters: { [key: string]: unknown }): Promise<Network[]> {
    return (await NetworkModel.find(filters)) || [];
  }
}
