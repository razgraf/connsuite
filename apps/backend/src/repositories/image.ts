import _ from "lodash";
import sharp from "sharp";
import fs from "fs";
import BaseRepository from "./base";
import ArticleRepository from "./article";
import NetworkRepository from "./network";

import { sizes } from "../constants";
import { ImageError } from "../errors";
import { Image, ImageModel, ImageParent, ImagePurpose } from "../models";
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

  /**
   *
   *
   * Specific Public Methods
   *
   *
   */

  public async save(source: Express.Multer.File, image: Image): Promise<Image | null> {
    const type = _.attempt(() => _.toString(_.get(image || {}, "type") || "").split("/")[1]);
    if (!type) throw new ImageError.MimeType("Could not identify type at save.");
    const file: Image = await this.create(image);

    if (file.parent === ImageParent.Network) {
      if (file.purpose === ImagePurpose.Icon) {
        await this._bind(file);

        sharp(source.buffer)
          .resize(sizes.network.icon.WIDTH, sizes.network.icon.HEIGHT, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(`${tree.internalNetwork}/${file._id}.${type}`);

        return file;
      } else if (image.purpose === ImagePurpose.Thumbnail) {
        await this._bind(file);

        sharp(source.buffer)
          .resize(sizes.network.thumbnail.WIDTH, sizes.network.thumbnail.HEIGHT, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(`${tree.internalNetwork}/${file._id}.${type}`);

        return file;
      }
    } else if (file.parent === ImageParent.Article) {
      if (file.purpose === ImagePurpose.Cover) {
        await this._bind(file);

        sharp(source.buffer)
          .resize(sizes.article.cover.WIDTH, sizes.article.cover.HEIGHT, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(`${tree.article}/${file._id}.${type}`);

        return file;
      } else if (image.purpose === ImagePurpose.Thumbnail) {
        await this._bind(file);

        sharp(source.buffer)
          .resize(sizes.article.thumbnail.WIDTH, sizes.article.thumbnail.HEIGHT, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(`${tree.article}/${file._id}.${type}`);

        return file;
      }
    }
    return null;
  }

  public async unlink(image: Image): Promise<void> {
    if (!_.isNil(image._id) && !_.isNil(image.type)) {
      const id = _.get(image, "_id");
      const type = _.attempt(() => _.toString(_.get(image || {}, "type") || "").split("/")[1]);
      if (!type) {
        console.error("File type not found");
        return;
      }

      let path = "";

      if (image.parent === ImageParent.Network) path = `/../../${tree.internalNetwork}/${id}.${type}`;
      if (image.parent === ImageParent.Network) path = `/../../${tree.article}/${id}.${type}`;

      fs.exists(__dirname + path, exists => {
        if (exists)
          fs.unlink(__dirname + path, error => {
            if (error) console.error(error);
          });
        else console.error("File not found");
      });
    }
  }

  /**
   *
   *
   * Specific Private - Utility Methods
   *
   *
   */

  private async _bind(image: Image): Promise<void> {
    if (image.parent === ImageParent.Network) {
      await NetworkRepository.getInstance().bindImage(
        String(image.network),
        image.purpose === ImagePurpose.Thumbnail
          ? {
              thumbnail: image,
            }
          : {
              icon: image,
            },
      );
    } else if (image.parent === ImageParent.Article) {
      await ArticleRepository.getInstance().bindImage(
        String(image.article),
        image.purpose === ImagePurpose.Thumbnail
          ? {
              thumbnail: image,
            }
          : {
              cover: image,
            },
      );
    }
  }
}
