"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const base_1 = __importDefault(require("./base"));
const article_1 = __importDefault(require("./article"));
const network_1 = __importDefault(require("./network"));
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const models_1 = require("../models");
const atoms_1 = require("../constants/atoms");
const _1 = require(".");
class ImageRepository extends base_1.default {
    static getInstance() {
        return ImageRepository.instance || (ImageRepository.instance = new ImageRepository());
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.ImageModel.findById(id);
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.ImageModel.create(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.ImageModel.findByIdAndUpdate(id, payload, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ImageModel.findByIdAndRemove(id);
        });
    }
    list(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield models_1.ImageModel.find(filters)) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    save(source, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = lodash_1.default.attempt(() => lodash_1.default.toString(lodash_1.default.get(image || {}, "type") || "").split("/")[1]);
            if (!type)
                throw new errors_1.ImageError.MimeType("Could not identify type at save.");
            const file = yield this.create(image);
            if (file.parent === models_1.ImageParent.Network) {
                if (file.purpose === models_1.ImagePurpose.Icon) {
                    yield this._bind(file);
                    sharp_1.default(source.buffer)
                        .resize(constants_1.sizes.network.icon.WIDTH, constants_1.sizes.network.icon.HEIGHT, {
                        fit: sharp_1.default.fit.inside,
                        withoutEnlargement: true,
                    })
                        .toFile(`${atoms_1.tree.internalNetwork}/${file._id}.${type}`);
                    return file;
                }
                else if (image.purpose === models_1.ImagePurpose.Thumbnail) {
                    yield this._bind(file);
                    sharp_1.default(source.buffer)
                        .resize(constants_1.sizes.network.thumbnail.WIDTH, constants_1.sizes.network.thumbnail.HEIGHT, {
                        fit: sharp_1.default.fit.inside,
                        withoutEnlargement: true,
                    })
                        .toFile(`${atoms_1.tree.internalNetwork}/${file._id}.${type}`);
                    return file;
                }
            }
            else if (file.parent === models_1.ImageParent.Article) {
                if (file.purpose === models_1.ImagePurpose.Cover) {
                    yield this._bind(file);
                    sharp_1.default(source.buffer)
                        .resize(constants_1.sizes.article.cover.WIDTH, constants_1.sizes.article.cover.HEIGHT, {
                        fit: sharp_1.default.fit.inside,
                        withoutEnlargement: true,
                    })
                        .toFile(`${atoms_1.tree.article}/${file._id}.${type}`);
                    return file;
                }
                else if (image.purpose === models_1.ImagePurpose.Thumbnail) {
                    yield this._bind(file);
                    sharp_1.default(source.buffer)
                        .resize(constants_1.sizes.article.thumbnail.WIDTH, constants_1.sizes.article.thumbnail.HEIGHT, {
                        fit: sharp_1.default.fit.inside,
                        withoutEnlargement: true,
                    })
                        .toFile(`${atoms_1.tree.article}/${file._id}.${type}`);
                    return file;
                }
            }
            else if (file.parent === models_1.ImageParent.User) {
                if (file.purpose === models_1.ImagePurpose.Cover) {
                    yield this._bind(file);
                    sharp_1.default(source.buffer)
                        .resize(constants_1.sizes.user.picture.WIDTH, constants_1.sizes.user.picture.HEIGHT, {
                        fit: sharp_1.default.fit.inside,
                        withoutEnlargement: true,
                    })
                        .toFile(`${atoms_1.tree.user}/${file._id}.${type}`);
                    return file;
                }
                else if (image.purpose === models_1.ImagePurpose.Thumbnail) {
                    yield this._bind(file);
                    sharp_1.default(source.buffer)
                        .resize(constants_1.sizes.user.thumbnail.WIDTH, constants_1.sizes.user.thumbnail.HEIGHT, {
                        fit: sharp_1.default.fit.inside,
                        withoutEnlargement: true,
                    })
                        .toFile(`${atoms_1.tree.user}/${file._id}.${type}`);
                    return file;
                }
            }
            return null;
        });
    }
    unlink(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.default.isNil(image._id) && !lodash_1.default.isNil(image.type)) {
                const id = lodash_1.default.get(image, "_id");
                const type = lodash_1.default.attempt(() => lodash_1.default.toString(lodash_1.default.get(image || {}, "type") || "").split("/")[1]);
                if (!type) {
                    console.error("File type not found");
                    return;
                }
                let path = "";
                if (image.parent === models_1.ImageParent.Network)
                    path = `/../../${atoms_1.tree.internalNetwork}/${id}.${type}`;
                if (image.parent === models_1.ImageParent.Article)
                    path = `/../../${atoms_1.tree.article}/${id}.${type}`;
                if (image.parent === models_1.ImageParent.User)
                    path = `/../../${atoms_1.tree.user}/${id}.${type}`;
                fs_1.default.exists(__dirname + path, exists => {
                    if (exists)
                        fs_1.default.unlink(__dirname + path, error => {
                            if (error)
                                console.error(error);
                        });
                    else
                        console.error("File not found");
                });
            }
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _bind(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (image.parent === models_1.ImageParent.Network) {
                yield network_1.default.getInstance().bindImage(String(image.network), image.purpose === models_1.ImagePurpose.Thumbnail
                    ? {
                        thumbnail: image,
                    }
                    : {
                        icon: image,
                    });
            }
            else if (image.parent === models_1.ImageParent.Article) {
                yield article_1.default.getInstance().bindImage(String(image.article), image.purpose === models_1.ImagePurpose.Thumbnail
                    ? {
                        thumbnail: image,
                    }
                    : {
                        cover: image,
                    });
            }
            else if (image.parent === models_1.ImageParent.User) {
                yield _1.UserRepository.getInstance().bindImage(String(image.user), image.purpose === models_1.ImagePurpose.Thumbnail
                    ? {
                        thumbnail: image,
                    }
                    : {
                        picture: image,
                    });
            }
        });
    }
}
exports.default = ImageRepository;
