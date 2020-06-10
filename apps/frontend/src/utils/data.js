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

export function getPrimaryUsername(profile) {
  return _.get(
    _.toArray(_.get(profile, "usernames")).find(item => item.isPrimary),
    "value",
  );
}

export function getFriendlyTitle(source) {
  if (_.isNil(source)) return "";
  return encodeURIComponent(source.toLowerCase().replace(/[^a-z0-9_-]+/gi, "-"));
}

export function parseSkilledDescription(description, list) {
  if (_.isNil(list) || _.isNil(description)) return [];
  const sorted = list.map(s => s.title).sort((a, b) => b.length - a.length);
  let parts = [{ text: description }];

  sorted.forEach(skill => {
    let result = [];
    parts.forEach(({ text, isSkill }) => {
      if (isSkill) result.push({ text, isSkill });
      else {
        const split = text.split(skill);
        if (split.length === 1) result.push({ text });
        if (split.length > 1) {
          const found = split.reduce((acc, val) => acc.concat({ text: val }, { text: skill, isSkill: true }), []).slice(0, -1);
          result = result.concat(found);
        }
      }
    });
    parts = [...result].map((part, index) => ({ ...part, key: index, index }));
  });

  return parts;
}
