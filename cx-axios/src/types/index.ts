import { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosCanceler } from '../axiosCancel'
import CxAxios from '../constructor'

export interface AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>
  (url: string, config?: AxiosRequestConfig): AxiosPromise
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  getUri(config?: AxiosRequestConfig): string
  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>
  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
  head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
  options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
}

export interface StatusHandleResult {
  replace?: string
  errMsg?: string
  clear?: boolean
  refresh?: boolean
}

export interface SResponse<T = any> {
  state: number
  message: string
  data: T
}

export interface CxAxiosOptions extends AxiosRequestConfig {
  cancel?: boolean
}

export interface AnyObject {
  [k: string]: any
}

export type axiosRequestType = keyof Pick<
  CxAxios,
  'delete' | 'get' | 'post' | 'postJSON' | 'put' | 'putJSON' | 'getBuffer' | 'getImg' | 'postNoTime'
>
export abstract class AxiosInterceptor {
  /**
   * @description 请求前预处理
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: AnyObject) => AxiosRequestConfig
  /**
   * @description 请求拦截器
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  /**
   * @description 响应预处理
   */
  beforeResponseHook?: (res: AxiosResponse<SResponse>, options: AnyObject) => any | Promise<any>
  /**
   * @description 响应错误预处理
   */
  beforeResponseErrHook?: (err: any, options: AnyObject) => void
  /**
   * @description 响应拦截器
   */
  responseInterceptor?: (
    res: AxiosResponse<SResponse>,
    cancelToken: AxiosCanceler
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>
  /**
   * @description 响应错误处理
   */
  responseErrInterceptor?: (err: any) => void
}
