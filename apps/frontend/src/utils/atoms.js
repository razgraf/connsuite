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
export function buildHeaders({ store = null } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (_.isNil(store)) return headers;

  try {
    const state = store.getState();
    const token = _.get(state, "auth.token.value");
    headers.Authorization = `Bearer ${token || ""}`;
  } catch (e) {
    console.error(e);
  }
  return headers;
}
