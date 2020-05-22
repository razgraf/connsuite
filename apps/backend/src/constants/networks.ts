import { tree, root } from "./atoms";
import { NetworkType, ImageParent } from "../models/atoms";
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
      parent: ImageParent.Network,
      url: `${root}/${tree.externalNetwork}/icon/${_id}.png`,
      version: 0,
    },
    thumbnail: {
      parent: ImageParent.Network,
      url: `${root}/${tree.externalNetwork}/thumbnail/${_id}.png`,
      version: 0,
    },
  }))
  .reduce((accumulator, current) => ({ ...accumulator, [current._id]: current }), {});

export default networks;
