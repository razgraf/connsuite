import typy from "typy";

export function getAsset({ type, source }) {
  let asset = null;
  try {
    switch (type) {
      case "cover": {
        if (typy(source, "cover.content").isTruthy) {
          const name = `projects/${typy(source, "id").safeString}/${typy(source, "cover.content").safeString}`;
          asset = `/images/${name}`;
        }
        break;
      }
      case "part": {
        if (typy(source, "content").isTruthy) {
          const name = `projects/${typy(source, "id").safeString}/${typy(source, "content").safeString}`;
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
