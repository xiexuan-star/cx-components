import axios, { AxiosRequestConfig } from 'axios';
import { CANCEL_REQUEST, CANCEL_KEY } from './const';

export class AxiosCanceler {
  private cancelTokenSet = new Set<string>();
  private getCancelKey = (config: AxiosRequestConfig) => {
    // const isTransform =
    //   config?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8';
    // const data =
    //   isTransform && isObject(config.data)
    //     ? qs.stringify(config.data || '', {
    //         arrayFormat: 'repeat'
    //       })
    //     : config.data || '';
    return (
      Reflect.get(config, CANCEL_KEY) ||
      `${config.url}${config.method}${JSON.stringify(config.params ?? '')}${JSON.stringify(
        config.data ?? ''
      )}`
    );
  };
  /**
   * @description 添加请求的cancel函数
   */
  addCancel(config: AxiosRequestConfig) {
    const key = this.getCancelKey(config);
    Reflect.set(config, CANCEL_KEY, key);
    this.cancelTokenSet.add(key);
  }
  getCancel(config: AxiosRequestConfig) {
    const key = this.getCancelKey(config);
    const hasKey = this.cancelTokenSet.has(key);
    if (hasKey) {
      new axios.CancelToken(cancel => cancel(CANCEL_REQUEST));
      return true;
    }
    return false;
  }
  /**
   * @description 调用对应的cancel函数并将其移除
   */
  doneCancel(config: AxiosRequestConfig) {
    const key = this.getCancelKey(config);
    this.cancelTokenSet.delete(key);
  }
}

export const axiosCanceler = new AxiosCanceler();
