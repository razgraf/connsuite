"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atoms_1 = require("../models/atoms");
const networks = [
    ["Behance", "behance", "https://www.behance.net"],
    ["Codementor", "codementor", "httpss://www.codementor.io"],
    ["Dribbble", "dribbble", "https://www.dribbble.com"],
    ["Facebook", "facebook", "https://www.facebook.com"],
    ["Github", "github", "https://www.github.com"],
    ["Product Hunt", "producthunt", "https://www.producthunt.com"],
    ["Instagram", "instagram", "https://www.instagram.com"],
    ["Linkedin", "linkedin", "https://www.linkedin.com/in"],
    ["Medium", "medium", "https://www.medium.com"],
    ["Twitter", "twitter", "https://www.twitter.com"],
]
    .map(([title, _id, url]) => ({
    _id,
    title,
    url,
    type: atoms_1.NetworkType.External,
    icon: {
        _id,
        type: "image/png",
        purpose: atoms_1.ImagePurpose.Icon,
        parent: atoms_1.ImageParent.Network,
    },
    thumbnail: {
        _id,
        type: "image/png",
        purpose: atoms_1.ImagePurpose.Thumbnail,
        parent: atoms_1.ImageParent.Network,
    },
}))
    .reduce((accumulator, current) => (Object.assign(Object.assign({}, accumulator), { [current._id]: current })), {});
exports.default = networks;
