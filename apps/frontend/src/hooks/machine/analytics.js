import { AnalyticsRequest } from "../../requests";
import { useDataGetMachine } from "./atoms";

export function useVisitMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({
    request: AnalyticsRequest.visitList,
    onSuccess,
  });
}
