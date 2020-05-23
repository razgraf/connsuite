import { tree, root } from "./atoms";
import { NetworkType, ImageParent, ImagePurpose } from "../models/atoms";
import { Network } from "../models/network";

const networks: { [key: string]: Network } = [
  ["Behance", "behance", "https://www.behance.net"],
  ["Codementor", "codementor", ""],
  ["Dribbble", "dribbble", ""],
  ["Facebook", "facebook", "https://www.facebook.com"],
  ["Github", "github", ""],
  ["Gmail", "gmail", ""],
  ["Instagram", "instagram", ""],
  ["Linkedin", "linkedin", ""],
  ["Medium", "medium", ""],
  ["Meetup", "meetup", ""],
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
