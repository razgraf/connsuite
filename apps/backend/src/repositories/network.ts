import _ from "lodash";
import { isDocument } from "@typegoose/typegoose";
import BaseRepository, { BaseOptions } from "./base";
import UserRepository from "./user";
import ImageRepository from "./image";
import guards, { policy } from "../guards";
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
      await this._internalGuards(payload, "create");
      return this._createInternal(payload);
    } else if (payload.type === NetworkType.External) {
      await this._externalGuards(payload, "create");
      return this._createExternal(payload);
    } else throw new ParamsError.Invalid("Network type not supported.");
  }

  public async update(id: string, payload: Request.NetworkCreate): Promise<Network | null> {
    if (_.isNil(payload) || !_.get(payload, "user"))
      throw new AuthError.Forbidden("Missing user configuration (server side).");

    const holder: Network | null = await this.getByFilters({ _id: id, user: payload.user }, { populate: true });
    if (!holder) throw new Error("Unknown network");

    payload.type = holder.type;
    if (payload.type === NetworkType.Internal) {
      await this._internalGuards(payload, "update");
      return this._updateInternal(holder, payload);
    } else if (payload.type === NetworkType.External) {
      await this._externalGuards(payload, "update");
      return this._updateExternal(holder, payload);
    }

    throw new ParamsError.Invalid("Network type not supported.");
  }

  /**
   *
   * @param {string} id - the id of the soon to be removed network
   * Use this iteration of remove() only by admin demand. For user demands, use removeFromUser() as it checks for ownership
   */

  public async remove(id: string): Promise<void> {
    await NetworkModel.findByIdAndRemove(id);
  }

  public async list(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Network[]> {
    if (options && options.populate)
      return NetworkModel.find(filters)
        .populate({ path: "icon", model: "Image" })
        .populate({ path: "thumbnail", model: "Image" });

    return NetworkModel.find(filters) || [];
  }

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async getByFilters(filters: { [key: string]: unknown }, options?: BaseOptions): Promise<Network | null> {
    if (options && options.populate)
      return NetworkModel.findOne(filters)
        .populate({ path: "icon", model: "Image" })
        .populate({ path: "thumbnail", model: "Image" });
    return NetworkModel.findOne(filters);
  }

  public async removeFromUser(payload: { networkId: string; userId: string }): Promise<void> {
    try {
      const network: Network | null = await this.getByFilters(
        { _id: payload.networkId, user: payload.userId },
        { populate: true },
      );
      if (!network) throw new Error("Unknown network");

      this._removeImages(network);
      this._removeUserBond(network);
      await this.remove(payload.networkId);
    } catch (error) {
      console.error(error);
      throw new NetworkError.NotFound(
        "Couldn't find network to remove or access is forbidden for this user-network pair.",
      );
    }
  }

  public async bindImage(networkId: string, payload: { icon: Image } | { thumbnail: Image }): Promise<void> {
    await NetworkModel.findByIdAndUpdate(networkId, payload);
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

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

  private async _removeImages(network: Network): Promise<void> {
    try {
      if (network.type === NetworkType.Internal) {
        if (!_.isNil(network.icon) && isDocument(network.icon)) {
          await ImageRepository.getInstance().remove(network.icon._id);
          ImageRepository.getInstance().unlink(network.icon);
        }

        if (!_.isNil(network.thumbnail) && isDocument(network.thumbnail)) {
          await ImageRepository.getInstance().remove(network.thumbnail._id);
          ImageRepository.getInstance().unlink(network.thumbnail);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  private async _removeUserBond(network: Network): Promise<void> {
    if (!_.isNil(network.user)) {
      UserRepository.getInstance().removeNetwork(String(network.user), String(network._id));
    }
  }

  /**
   *
   *
   * Specific Private - Utility Methods: Update
   *
   *
   */

  private async _updateInternal(holder: Network, payload: Request.NetworkCreateInternal): Promise<Network | null> {
    const network = await NetworkModel.findByIdAndUpdate(holder._id, {
      title: payload.title,
      username: payload.title,
      description: payload.description,
    });

    if (!_.isNil(payload.icon)) {
      await this._removeImages(holder);
      await this._generateImages(payload.icon, holder);
    }

    return network;
  }

  private async _updateExternal(holder: Network, payload: Request.NetworkCreateExternal): Promise<Network | null> {
    const network = await NetworkModel.findByIdAndUpdate(holder._id, {
      username: payload.username,
      description: payload.description,
    });

    return network;
  }

  /**
   *
   *
   * Specific Private - Utility Methods: Create & Create/Update Guards
   *
   *
   */

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

  private async _internalGuards(payload: Request.NetworkCreateInternal, type = "create"): Promise<void> {
    if (type === "create" || (type === "update" && !_.isNil(payload.icon))) {
      if (!_.get(payload, "icon")) throw new ParamsError.Missing("Missing icon or wrong icon size & type.");
      const iconGuard = guards.isNetworkIconAcceptable(_.get(payload, "icon"), true, { vendor: "multer" });
      if (iconGuard !== true) throw new ParamsError.Invalid(iconGuard as string);
    }

    if (!_.get(payload, "title")) throw new ParamsError.Missing("Missing Type");
    if (!guards.isNetworkTitleAcceptable(payload.title)) throw new ParamsError.Invalid(policy.network.title.root);

    if (_.get(payload, "username")) {
      const usernameGuard = guards.isNetworkUsernameAcceptable(payload.username || "", true);
      if (usernameGuard !== true) throw new ParamsError.Invalid(usernameGuard as string);
    }
    if (_.get(payload, "description")) {
      const descriptionGuard = guards.isNetworkDescriptionsAcceptable(payload.description || "", true);
      if (descriptionGuard !== true) throw new ParamsError.Invalid(descriptionGuard as string);
    }
  }

  private async _externalGuards(payload: Request.NetworkCreateExternal, type = "create"): Promise<void> {
    if (type === "create") {
      if (!_.get(payload, "externalId")) throw new ParamsError.Missing("Missing External Network");
      const externalIdGuard = guards.isNetworkExternalIdAcceptable(payload.externalId, true);
      if (externalIdGuard !== true) throw new ParamsError.Invalid(externalIdGuard as string);
    }

    if (!_.get(payload, "username")) throw new ParamsError.Missing("Missing Username");

    if (!guards.isNetworkUsernameAcceptable(payload.username))
      throw new ParamsError.Invalid(policy.network.username.root);

    if (_.get(payload, "description"))
      if (!guards.isNetworkDescriptionsAcceptable(payload.description || ""))
        throw new ParamsError.Invalid(policy.network.description.root);
  }
}
