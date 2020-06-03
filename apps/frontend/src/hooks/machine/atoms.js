import { useMemo } from "react";
import { useMachine } from "@xstate/react";
import { dataListX, dataGetX } from "../../xstates";

export function useDataListMachine({ resource, request = async () => {}, onSuccess = () => {} }) {
  const piece = useMachine(dataListX.machine, {
    actions: {
      [dataListX.actions.approve]: onSuccess,
    },
    context: { resource, request },
  });

  const machine = useMemo(
    () => ({
      ...dataListX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}

export function useDataGetMachine({ request = async () => {}, onSuccess = () => {} }) {
  const piece = useMachine(dataGetX.machine, {
    actions: {
      [dataGetX.actions.approve]: onSuccess,
    },
    context: { request },
  });

  const machine = useMemo(
    () => ({
      ...dataGetX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}
