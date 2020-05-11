import _ from "lodash";
import { ellipsis } from "./atoms";

export function parseFullName(auth, max = null, forceEllipsis = false) {
  try {
    const first = _.get(auth, "user.name.first");
    const last = _.get(auth, "user.name.last");
    if (!first || !last) throw new Error("Data Missing");

    const full = `${first} ${last}`;

    if (!_.isNil(max)) {
      if (full.length <= max) return full;
      if (forceEllipsis) return ellipsis(full, max);
      return full.slice(0, max);
    }

    return full;
  } catch (e) {
    return null;
  }
}
