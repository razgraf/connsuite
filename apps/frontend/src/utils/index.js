import _ from "lodash";

export function getAsset({ type, source }) {
  let asset = null;
  try {
    switch (type) {
      case "cover": {
        if (_.get(source, "cover.content")) {
          const name = `projects/${_.get(source, "id")}/${_.get(source, "cover.content")}`;
          asset = `/images/${name}`;
        }
        break;
      }
      case "part": {
        if (_.get(source, "content")) {
          const name = `projects/${_.get(source, "id")}/${_.get(source, "content")}`;
          asset = `/images/${name}`;
        }
        break;
      }

      default:
        break;
    }
  } catch (e) {
    console.error(e);
  }
  return asset;
}
