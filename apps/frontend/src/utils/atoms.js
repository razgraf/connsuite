import _ from "lodash";
import Router from "next/router";

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
export function redirectTo(destination, { res = null } = {}) {
  if (res) {
    res.writeHead(302, { Location: destination });
    res.end();
    return;
  }

  if (destination[0] === "/" && destination[1] !== "/") {
    Router.push(destination);
  } else {
    window.location = destination;
  }
}
export function buildHeaders({ auth = null } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (_.isNil(auth)) return headers;

  try {
    const token = _.get(auth, "token.value");
    headers.Authorization = `Bearer ${token || ""}`;
  } catch (e) {
    console.error(e);
  }
  return headers;
}

export function ellipsis(value, max = null) {
  try {
    const material = _.toString(value);
    if (_.isNil(material) || _.isEmpty(material)) throw new Error("Data Missing");

    if (!_.isNil(max)) {
      if (material.length <= max) return material;
      return `${material.slice(0, max - 3)}...`;
    }

    return material;
  } catch (e) {
    return "";
  }
}

export async function readPreviewFromImage(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      reject();
    }
  });
}
