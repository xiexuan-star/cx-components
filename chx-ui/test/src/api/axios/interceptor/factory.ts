import router from '@/router';
import { localUserProxy } from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { AxiosInterceptor } from '../type';
import { errStatusHandle, statusHandle } from '../statusHandle';
import { CANCEL_REQUEST } from '../const';
import { axiosCanceler } from '../axiosCancel';
import { isFunction } from '@/utils/is';
import { preResponseParser } from '../tokenUpdate';

export default {
  beforeRequestHook: (config, options) => {
    Reflect.set(config, 'method', config.method?.toLocaleUpperCase());
    const { prepend, append, requestHook } = options;
    prepend && Reflect.set(config, 'url', prepend + config.url);
    append && Reflect.set(config, 'url', config.url + append);
    isFunction(requestHook) && (config = requestHook(config));
    return config;
  },
  requestInterceptor: config => {
    const token = localUserProxy.user?.token;
    token && Reflect.set(config.headers, 'token', token); // 请求头部添加token
    return config;
  },
  beforeResponseHook: async res => await preResponseParser(res),
  beforeResponseErrHook: (err, options) => {
    err;
    options;
  },
  responseInterceptor: res => {
    const { options } = res.config;
    const { errMsg, replace } = statusHandle(res);
    if (options?.noTip) return res;
    errMsg && ElMessage.error(errMsg);
    replace && router.replace(replace);
    return errMsg ? Promise.reject(res) : res;
  },
  responseErrInterceptor: err => {
    err?.config && axiosCanceler.doneCancel(err.config);
    if (err === CANCEL_REQUEST || err?.message === CANCEL_REQUEST) return err;
    const { errMsg } = errStatusHandle(err);
    errMsg && ElMessage.error(errMsg);
    return Promise.reject(err);
  }
} as AxiosInterceptor;
