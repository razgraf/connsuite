import _ from "lodash";

export function parseFullName(store, max = null, ellipsis = false) {
  try {
    const state = store.getState();
    const first = _.get(state, "auth.user.name.first");
    const last = _.get(state, "auth.user.name.last");
    if (!first || !last) throw new Error("Data Missing");

    const full = `${first} ${last}`;

    if (!_.isNil(max)) {
      if (full.length <= max) return full;
      if (ellipsis) return `${full.slice(0, max - 3)}...`;
      return full.slice(0, max);
    }

    return full;
  } catch (e) {
    return null;
  }
}
