/**
 * Created by @VanSoftware on 2019-07-10.
 */
import middlewareView from './view';
import middlewareLogger from './logger';
import middlewareController from './controller';


const rootMiddleware = [...middlewareView, ...middlewareController, ...middlewareLogger];


export default rootMiddleware;