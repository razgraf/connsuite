import { AnalyticsRequest } from "../../requests";
import { useDataGetMachine } from "./atoms";

export function useVisitListMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({
    request: AnalyticsRequest.visitList,
    onSuccess,
  });
}
