import { UserRequest } from "../../requests";
import { useDataGetMachine } from "./atoms";

export function useSkillsAndCategoriesMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({ request: UserRequest.listSkillsAndCategories, onSuccess });
}

export function useProfileMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({ request: UserRequest.profile, onSuccess });
}

export * from "./analytics";
export * from "./article";
export * from "./atoms";
export * from "./auth";
export * from "./network";
