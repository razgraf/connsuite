
/**
 * Created by @VanSoftware on 2019-07-10.
 */
const middlewareLogger =
    store => {
        return next => {
            return action => {
                return next(action);
            }
        }
    };


export default [middlewareLogger];
