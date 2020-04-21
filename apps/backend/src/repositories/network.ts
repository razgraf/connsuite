import BaseRepository from "./base";
import { Network, NetworkModel } from "../models";

export default class NetworkRepository extends BaseRepository<Network> {
  private static instance: NetworkRepository;

  public static getInstance(): NetworkRepository {
    return NetworkRepository.instance || (NetworkRepository.instance = new NetworkRepository());
  }

  public async getById(id: string): Promise<Network | null> {
    console.log(id);
    return null;
  }

  public async create(payload: Network): Promise<Network> {
    console.log(payload);
    const element = await NetworkModel.create({
      description: "description",
      title: "repo-title",
      username: "username",
    });
    console.log(element);
    return element;
  }
  public async update(id: string, payload: Network): Promise<void> {
    console.log(id, payload);
    return;
  }
  public async remove(id: string): Promise<void> {
    console.log(id);
    return;
  }
  public async list(filters: { [key: string]: unknown }): Promise<Network[]> {
    console.log(filters);
    return [];
  }
}
