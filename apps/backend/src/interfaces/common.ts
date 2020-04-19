export interface Route {
  root: string; // root for router e.g. /networks
  get: string; // get single item
  create: string; // create single item
  update: string; // update single item
  remove: string; // remove single item
  list: string; // get list of item (all or based on query params)
  [key: string]: string | Route;
}
