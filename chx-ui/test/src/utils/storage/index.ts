import CxLocalStore, { storeFilter } from 'cx-store';

const session = new CxLocalStore('session');
session.use(storeFilter);

export const sessionStore = session;

const local = new CxLocalStore('local');
local.use(storeFilter);

export const localStore = local;
