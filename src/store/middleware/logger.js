
/**
 * Created by @VanSoftware on 2019-07-10.
 */
const middlewareLogger =
    store => {
        return next => {
            return action => {
                console.log("[M LOGGER] Dispatching: " + action.type);
                return next(action);
            }
        }
    };


export default [middlewareLogger];
