import _ from "lodash";
import BaseRepository from "./base";
import { Network, NetworkModel, NetworkType } from "../models";
import UserRepository from "./user";
import { ParamsError, NetworkError } from "../errors";

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

    if (!_.get(payload, "type")) throw new ParamsError.Missing("Missing Type");
    if (payload.type === NetworkType.External) {
      return this._createInternal(payload);
    } else if (payload.type === NetworkType.Internal) {
      if (!_.get(payload, "externalId")) throw new ParamsError.Missing("Missing External Network");
      /**
       * check that externalId is in constants.networks TODO
       */

      return this._createExternal(payload);
    }

    throw new ParamsError.Invalid("Inexistent network type");
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

  /** ************* **/

  private async _createInternal(payload: Network): Promise<Network> {
    if (_.isNil(payload) || !_.get(payload, "user")) throw new ParamsError.Missing(JSON.stringify(payload));

    /**
     * TODO
     * 1. Edit & Add icon
     * 2. Create & Add thumbnail
     */

    const network: Network = await NetworkModel.create(payload);

    if (!network) throw new NetworkError.Failed("Network couldn't be created.");
    await this._bind(network);

    return network;
  }

  private async _createExternal(payload: Network): Promise<Network> {
    if (_.isNil(payload) || !_.get(payload, "user")) throw new ParamsError.Missing(JSON.stringify(payload));

    const specimen: Network = _.cloneDeep(payload);

    delete specimen.title;
    delete specimen.url;
    delete specimen.icon;
    delete specimen.thumbnail;

    const network: Network = await NetworkModel.create(specimen);

    if (!network) throw new NetworkError.Failed("Network couldn't be created.");
    await this._bind(network);

    return network;
  }

  private async _bind(network: Network): Promise<void> {
    await UserRepository.getInstance().addNetwork(String(network.user), network);
  }
}
