import _ from "lodash";
import sharp from "sharp";
import BaseRepository from "./base";
import NetworkRepository from "./network";
import { sizes } from "../constants";
import { ImageError } from "../errors";
import { Image, ImageModel, ImageParent, ImagePurpose, Network } from "../models";
import { tree } from "../constants/atoms";

export default class ImageRepository extends BaseRepository<Image> {
  private static instance: ImageRepository;

  public static getInstance(): ImageRepository {
    return ImageRepository.instance || (ImageRepository.instance = new ImageRepository());
  }

  public async getById(id: string): Promise<Image | null> {
    return ImageModel.findById(id);
  }

  public async create(payload: Image): Promise<Image> {
    return ImageModel.create(payload);
  }

  public async update(id: string, payload: Image): Promise<Image | null> {
    return ImageModel.findByIdAndUpdate(id, payload, { new: true });
  }

  public async remove(id: string): Promise<void> {
    await ImageModel.findByIdAndRemove(id);
  }
  public async list(filters: { [key: string]: unknown }): Promise<Image[]> {
    return (await ImageModel.find(filters)) || [];
  }

  /* ***** */

  public async save(source: Express.Multer.File, image: Image): Promise<Image | null> {
    const type = _.attempt(() => _.toString(_.get(image || {}, "type") || "").split("/")[1]);
    if (!type) throw new ImageError.MimeType("Could not identify type at save.");
    const icon: Image = await this.create(image);

    if (icon.parent === ImageParent.Network) {
      if (icon.purpose === ImagePurpose.Icon) {
        await this._bind(icon);

        sharp(source.buffer)
          .resize(sizes.network.icon.HEIGHT, sizes.network.icon.WIDTH, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(`${tree.internalNetwork}/${icon.network}-${icon.purpose}-${icon.version}.${type}`);

        return icon;
      } else if (image.purpose === ImagePurpose.Thumbnail) {
        await this._bind(icon);

        sharp(source.buffer)
          .resize(sizes.network.thumbnail.HEIGHT, sizes.network.thumbnail.WIDTH, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(`${tree.internalNetwork}/${icon.network}-${icon.purpose}-${icon.version}.${type}`);

        return icon;
      }
    }
    return null;
  }

  /* ***** */

  private async _bind(image: Image): Promise<void> {
    await NetworkRepository.getInstance().update(
      String(image.network),
      image.purpose === ImagePurpose.Thumbnail
        ? ({
            thumbnail: image,
          } as Network)
        : ({
            icon: image,
          } as Network),
    );
  }
}
