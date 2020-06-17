import { tree, root } from "./atoms";
import { NetworkType, ImageParent, ImagePurpose } from "../models/atoms";
import { Network } from "../models/network";

const networks: { [key: string]: Network } = [
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
    type: NetworkType.External,
    icon: {
      _id,
      type: "image/png",
      purpose: ImagePurpose.Icon,
      parent: ImageParent.Network,
    },
    thumbnail: {
      _id,
      type: "image/png",
      purpose: ImagePurpose.Thumbnail,
      parent: ImageParent.Network,
    },
  }))
  .reduce((accumulator, current) => ({ ...accumulator, [current._id]: current }), {});

export default networks;
