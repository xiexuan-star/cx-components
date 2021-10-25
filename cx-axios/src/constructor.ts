import axios, { AxiosRequestConfig } from 'axios';
import { axiosCanceler } from './axiosCancel';
import { AnyObject, AxiosInstance, AxiosInterceptor, CxAxiosOptions, SResponse } from './types';
import { CANCEL_REQUEST } from './const';
import Qs from 'qs';

export default class CxAxios {
  instance: AxiosInstance;
  host = '';
  private cancel: boolean;
  private options: AnyObject;
  private axiosInterceptor: AnyObject | AxiosInterceptor;

  constructor(options: CxAxiosOptions, interceptor: AnyObject | AxiosInterceptor) {
    const { cancel, ...otherOptions } = options;
    this.host = options.baseURL ?? '';
    this.cancel = cancel ?? true;
    this.options = options;
    this.axiosInterceptor = interceptor;
    this.instance = axios.create(otherOptions);
    this.setInterceptor();
  }

  private setInterceptor() {
    const { requestInterceptor, responseInterceptor, responseErrInterceptor } = this.axiosInterceptor;

    this.instance?.interceptors.request.use((config) => {
      const invalid = axiosCanceler.getCancel(config);
      if (invalid) {
        console.warn(`CxAxios: can't send same request (${ config.url } `, config.params, `) before a request responded`);
        return Promise.reject(CANCEL_REQUEST);
      }
      this.cancel && axiosCanceler.addCancel(config);
      return requestInterceptor?.(config) ?? config;
    });
    this.instance?.interceptors.response.use(async (res) => {
      this.cancel && res && axiosCanceler.doneCancel(res.config);
      return await responseInterceptor?.(res) ?? res;
    }, responseErrInterceptor);
  }

  private request<T = any>(config: AxiosRequestConfig, options: AnyObject) {
    Reflect.set(config, 'options', options);
    const { beforeRequestHook, beforeResponseHook, beforeResponseErrHook } = this.axiosInterceptor;
    beforeRequestHook?.(config, options);
    return new Promise((resolve, reject) => {
      this.instance?.request(config).then(
        async (res) => {
          res = typeof beforeResponseHook === 'function' ? await beforeResponseHook(res, options) : res;
          resolve((res?.data ?? {}) as unknown as SResponse<T>);
        },
        (err) => {
          typeof beforeResponseErrHook === 'function' && beforeResponseErrHook(err, options);
          reject(err);
        }
      );
    }) as Promise<SResponse<T>>;
  }

  post<T = any>(url: string, data?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        transformRequest: (params) =>
          Qs.stringify(params, {
            arrayFormat: 'repeat',
          }),
      },
      options
    );
  }

  postJSON<T = any>(url: string, data?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        transformRequest: (data) => JSON.stringify(data),
      },
      options
    );
  }

  get<T = any>(url: string, params?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'get',
        url,
        params,
        paramsSerializer: (params) => {
          return Qs.stringify(params, { indices: false });
        },
      },
      options
    );
  }

  delete<T = any>(url: string, params?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'delete',
        url,
        params,
        paramsSerializer: (params) => {
          return Qs.stringify(params, { indices: false });
        },
      },
      options
    );
  }

  put<T = any>(url: string, data?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'put',
        url,
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        transformRequest: (params) =>
          Qs.stringify(params, {
            arrayFormat: 'repeat',
          }),
      },
      options
    );
  }

  putJSON<T = any>(url: string, data?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'put',
        url,
        data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        transformRequest: (data) => JSON.stringify(data),
      },
      options
    );
  }

  patch<T = any>(url: string, data?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'patch',
        url,
        data: Qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      },
      options
    );
  }

  getBuffer<T = any>(url: string, params?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'get',
        url,
        params,
        responseType: 'blob',
        timeout: 108000,
        paramsSerializer: (params) => {
          return Qs.stringify(params, { indices: false });
        },
      },
      options
    );
  }

  postNoTime<T = any>(url: string, data?: AnyObject, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'post',
        url,
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        transformRequest: (params) => {
          return Qs.stringify(params, {
            arrayFormat: 'repeat',
          });
        },
      },
      options
    );
  }

  getImg<T = any>(url: string, options: AnyObject = {}) {
    return this.request<T>(
      {
        method: 'get',
        url,
        responseType: 'arraybuffer',
      },
      options
    );
  }
}
