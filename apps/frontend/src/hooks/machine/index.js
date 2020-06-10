import { UserRequest } from "../../requests";
import { useDataGetMachine } from "./atoms";

export function useSkillsAndCategoriesMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({ request: UserRequest.listSkillsAndCategories, onSuccess });
}

export * from "./analytics";
export * from "./article";
export * from "./atoms";
export * from "./auth";
export * from "./network";
export * from "./profile";
