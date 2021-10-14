import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosCanceler } from './axiosCancel';
import { CxAxios } from './constructor';

export interface StatusHandleResult {
  replace?: string;
  errMsg?: string;
  clear?: boolean;
  refresh?: boolean;
}

export interface CxAxiosOptions extends AxiosRequestConfig {
  cancel?: boolean;
}

export type axiosRequestType = keyof Pick<
  CxAxios,
  'delete' | 'get' | 'post' | 'postJSON' | 'put' | 'putJSON' | 'getBuffer' | 'getImg' | 'postNoTime'
>;
export abstract class AxiosInterceptor {
  /**
   * @description 请求前预处理
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: AnyObject) => AxiosRequestConfig;
  /**
   * @description 请求拦截器
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * @description 响应预处理
   */
  beforeResponseHook?: (res: AxiosResponse<SResponse>, options: AnyObject) => any | Promise<any>;
  /**
   * @description 响应错误预处理
   */
  beforeResponseErrHook?: (err: any, options: AnyObject) => void;
  /**
   * @description 响应拦截器
   */
  responseInterceptor?: (
    res: AxiosResponse<SResponse>,
    cancelToken: AxiosCanceler
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
  /**
   * @description 响应错误处理
   */
  responseErrInterceptor?: (err: any) => void;
}
