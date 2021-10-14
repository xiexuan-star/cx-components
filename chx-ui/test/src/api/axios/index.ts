import uploadInterceptor from './interceptor/upload';
import { CxAxios } from './constructor';
import { getHost, getOrganize } from './url';
import factoryInterceptor from './interceptor/factory';

const host = getHost();
const organize = getOrganize();

export const $uploadImage = new CxAxios(
  { baseURL: organize + '/api', cancel: false },
  uploadInterceptor
);

export const $upload = new CxAxios({ baseURL: host + '/api', cancel: false }, uploadInterceptor);

export const $factory = new CxAxios({ baseURL: host + '/api' }, factoryInterceptor);

export const $organize = new CxAxios({ baseURL: organize + '/api' }, factoryInterceptor);
