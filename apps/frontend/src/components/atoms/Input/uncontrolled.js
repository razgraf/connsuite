import _ from "lodash";

export async function getValueOfInputEditor(instance) {
  if (instance === null) return null;
  if (!_.has(instance, "save")) return null;
  try {
    return instance.save();
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function getValueOfInputEditorSync(instance, callback) {
  getValueOfInputEditor(instance).then(value => {
    if (_.isFunction(callback)) callback(value);
  });
}
