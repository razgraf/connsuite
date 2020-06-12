import _ from "lodash";
import { useMemo } from "react";
import { useMachine } from "@xstate/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";

import { useDataGetMachine } from "./atoms";
import { profileEditX } from "../../machines";
import { redirectTo } from "../../utils";
import { redux, pages, sagas } from "../../constants";
import { UserRequest } from "../../requests";

export function useProfileMachine({ onSuccess = () => {} } = {}) {
  return useDataGetMachine({ request: UserRequest.profile, onSuccess });
}

function useProfileEditActions({ auth, dispatch, toast, router, reducer }) {
  return {
    [profileEditX.actions.approve]: () => {
      dispatch({ type: sagas.AUTH_UPDATE, payload: { auth } });
      toast.addToast("Profile successfully updated!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2500,
        onDismiss: () => {
          router.push(pages.portfolio.root);
        },
      });
    },
    [profileEditX.actions.bind]: context => {
      const user = _.get(context, "data.user");

      const binder = {
        firstName: _.get(user, "name.first"),
        lastName: _.get(user, "name.last"),
        description: _.get(user, "description"),
        tagline: _.get(user, "tagline"),
        picture: {
          preview: _.get(user, "picture.url"),
        },
      };
      reducer.dispatch({
        type: reducer.actions.BIND,
        payload: binder,
      });
    },
  };
}

export function useProfileEditMachine({ identifier, reducer }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToasts();
  const piece = useMachine(profileEditX.machine, {
    actions: useProfileEditActions({ auth, dispatch, toast, router, reducer }),
    context: { identifier, auth },
  });

  const machine = useMemo(
    () => ({
      ...profileEditX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}
