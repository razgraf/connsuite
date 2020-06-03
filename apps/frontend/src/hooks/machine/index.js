import { UserRequest } from "../../requests";
import { useDataGetMachine } from "./atoms";

export function useSkillsAndCategoriesMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({ request: UserRequest.listSkillsAndCategories, onSuccess });
}

export * from "./atoms";
export * from "./article";
export * from "./network";
