import { localStore } from '@/utils/storage';

interface GlobalThis {
  host: string;
  organize: string;
  INVENTORY_API: string;
}

const globalThis: GlobalThis = (window as unknown) as GlobalThis;

export const URL_MODULE = 'urlmodule',
  FACTORY_URL_KEY = 'factoryUrl',
  ORGANIZE_URL_KEY = 'organizeUrl',
  INVENTORY_URL_KEY = 'inventoryUrl';

export const getHost = () => localStore.get(FACTORY_URL_KEY, URL_MODULE) || globalThis.host;

export const getOrganize = () =>
  localStore.get(ORGANIZE_URL_KEY, URL_MODULE) || globalThis.organize;

export const getInventory = () =>
  localStore.get(INVENTORY_URL_KEY, URL_MODULE) || globalThis.INVENTORY_API;
