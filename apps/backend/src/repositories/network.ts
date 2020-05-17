import _ from "lodash";
import { ObjectId } from "mongodb";
import BaseRepository, { BaseOptions } from "./base";
import UserRepository from "./user";
import ImageRepository from "./image";
import guards, { policy } from "../guards";
import { atoms } from "../constants";
import { Network, NetworkModel, NetworkType, Request, Image, ImageParent, ImagePurpose } from "../models";
import { ParamsError, NetworkError, AuthError } from "../errors";

export default class NetworkRepository extends BaseRepository<Network> {
  private static instance: NetworkRepository;

  public static getInstance(): NetworkRepository {
    return NetworkRepository.instance || (NetworkRepository.instance = new NetworkRepository());
  }

  public async getById(id: string, options?: BaseOptions): Promise<Network | null> {
    if (options && options.populate)
      return NetworkModel.findOne({ _id: id })
        .populate({ path: "icon", model: "Image" })
        .populate({ path: "thumbnail", model: "Image" });
    return NetworkModel.findById(id);
  }

  public async create(payload: Request.NetworkCreate): Promise<Network> {
    if (_.isNil(payload) || !_.get(payload, "user"))
      throw new AuthError.Forbidden("Missing user configuration (server side).");
    if (!_.get(payload, "type")) throw new ParamsError.Missing("Missing Type");

    if (payload.type === NetworkType.Internal) {
      if (!_.get(payload, "title")) throw new ParamsError.Missing("Missing Type");
      if (!_.get(payload, "icon")) throw new ParamsError.Missing("Missing icon or wrong icon size & type.");

      if (!guards.isNetworkTitleAcceptable(payload.title)) throw new ParamsError.Invalid(policy.network.title.root);

      const iconGuard = guards.isNetworkIconAcceptable(_.get(payload, "icon"), true, { vendor: "multer" });
      if (iconGuard !== true) throw new ParamsError.Invalid(iconGuard as string);

      if (_.get(payload, "username")) {
        const usernameGuard = guards.isNetworkUsernameAcceptable(payload.username || "", true);
        if (usernameGuard !== true) throw new ParamsError.Invalid(usernameGuard as string);
      }
      if (_.get(payload, "description")) {
        const descriptionGuard = guards.isNetworkDescriptionsAcceptable(payload.description || "", true);
        if (descriptionGuard !== true) throw new ParamsError.Invalid(descriptionGuard as string);
      }

      return this._createInternal(payload);
    } else if (payload.type === NetworkType.External) {
      if (!_.get(payload, "externalId")) throw new ParamsError.Missing("Missing External Network");
      if (!_.get(payload, "username")) throw new ParamsError.Missing("Missing Username");

      const externalIdGuard = guards.isNetworkExternalIdAcceptable(payload.externalId, true);
      if (externalIdGuard !== true) throw new ParamsError.Invalid(externalIdGuard as string);

      if (!guards.isNetworkUsernameAcceptable(payload.username))
        throw new ParamsError.Invalid(policy.network.username.root);

      if (_.get(payload, "description"))
        if (!guards.isNetworkDescriptionsAcceptable(payload.description || ""))
          throw new ParamsError.Invalid(policy.network.description.root);

      return this._createExternal(payload);
    }

    throw new ParamsError.Invalid("Network type not supported.");
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

  private async _createInternal(payload: Request.NetworkCreateInternal): Promise<Network> {
    const specimen = _.cloneDeep(payload);

    delete specimen.externalId;
    delete specimen.icon;
    delete specimen.thumbnail;

    /**
     * Create the network object and gain access to the _id
     */

    const network: Network = await NetworkModel.create(specimen);

    if (!network) throw new NetworkError.Failed("Network couldn't be created.");
    await this._bind(network);
    await this._generateImages(payload.icon, network);

    return network;
  }

  private async _createExternal(payload: Request.NetworkCreateExternal): Promise<Network> {
    const specimen = _.cloneDeep(payload);

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

  private async _generateImages(source: Express.Multer.File, network: Network): Promise<void> {
    const specimen: Image = {
      version: 0,
      parent: ImageParent.Network,
      purpose: ImagePurpose.Icon,

      network,
      type: source.mimetype as string,
    };

    await ImageRepository.getInstance().save(source, specimen);
    await ImageRepository.getInstance().save(source, { ...specimen, purpose: ImagePurpose.Thumbnail });
  }
}
