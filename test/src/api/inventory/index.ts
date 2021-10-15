import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import Qs from 'qs';
import { download } from '@/utils';
// import Message from 'element-plus/lib/el-message';
// import { localUserProxy } from '@/store/modules/user';
import { getInventory } from '../axios/url';
// import { preResponseParser } from '../axios/tokenUpdate';

const INVENTORY_API = getInventory();
/* 调试进销存接口 */
const axiosInstance = axios.create({
  // 设置超时时间
  timeout: 60000,
  baseURL: INVENTORY_API
});

let bool = true;

/**
 * 给头部添加token和authorization
 * @param {string} config
 */
function assignToken(config: AxiosRequestConfig) {
  // const token = localUserProxy.user.token;

  // if (token) config.headers.token = token; // 请求头部添加token
}

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    assignToken(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    const code = response.status;
    // if ((code >= 200 && code < 300) || code === 304) {
    //   const res = response?.data;
    //   // const { state } = res;
    //   const contentType = response.headers['content-type'];

      // 需要直接返回处理的错误状态码
      // if ([2].includes(state)) {
        return response;
      // }

    //   if (['octet-stream', 'image'].some(item => contentType.includes(item)) || state === 200) {
    //     return response;
    //   } else if (state === 500 || state === 400 || state === 403) {
    //     const message = res.message || '系统错误';

    //     Message.error(message);
    //     return Promise.reject(response);
    //   } else if (state === 401) {
    //     return response;
    //   } else {
    //     res.message && Message.error(res.message);
    //     return Promise.reject(response);
    //   }
    // } else {
    //   Message.error(response.data.message);
    // }

    // return Promise.reject(response);
  },
  error => {
    // if (bool) {
    //   bool = false;
    //   if (error.response) {
    //     switch (error.response.status) {
    //       case 500:
    //         Message.error('服务器繁忙');
    //         break;
    //       case 404:
    //         Message.error('网络请求不存在');
    //         break;
    //       default:
    //         Message.error(error.response.message ?? error.response.data?.message ?? '');
    //     }
    //   } else if (error.message.includes('timeout')) {
    //     // 请求超时或者网络有问题
    //     Message.error('请求超时！请检查网络是否正常');
    //   } else {
    //     Message.error('请求失败，请检查网络是否已连接');
    //   }
    //   setTimeout(() => {
    //     bool = true;
    //   }, 500);
    // }
    return Promise.reject(error);
  }
);

const methods = {
  post<T = Record<string, any>>(
    url: string,
    data?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): AxiosPromise<SResponse<T>> {
    return axiosInstance({
      method: 'post',
      url,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      transformRequest: params =>
        Qs.stringify(params, {
          arrayFormat: 'repeat'
        }),
      noLoading
    });
  },
  postJSON<T = Record<string, any>>(
    url: string,
    data?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      transformRequest: data => JSON.stringify(data),
      noLoading
    });
  },
  get<T = Record<string, any>>(
    url: string,
    params?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'get',
      url,
      params,
      paramsSerializer: params => {
        return Qs.stringify(params, { indices: false });
      },
      noLoading
    });
  },
  delete<T = Record<string, any>>(
    url: string,
    params?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'delete',
      url,
      params,
      paramsSerializer: params => {
        return Qs.stringify(params, { indices: false });
      },
      noLoading
    });
  },
  put<T = Record<string, any>>(
    url: string,
    data?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'put',
      url,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      transformRequest: params =>
        Qs.stringify(params, {
          arrayFormat: 'repeat'
        }),
      noLoading
    });
  },
  putJSON<T = Record<string, any>>(
    url: string,
    data?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'put',
      url,
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      transformRequest: data => JSON.stringify(data),
      noLoading
    });
  },
  patch<T = Record<string, any>>(
    url: string,
    data?: any,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'patch',
      url,
      data: Qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      noLoading
    });
  },
  getImg<T = Record<string, any>>(
    url: string,
    { noLoading }: { noLoading?: boolean } = {}
  ): Promise<SResponse<T>> {
    return axiosInstance({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      noLoading
    });
  },
  blob<T extends AnyObject>(url: string, params: { filename?: string } & T): Promise<void | 'ok'> {
    return axiosInstance({
      method: 'get',
      url,
      params,
      responseType: 'blob',
      onDownloadProgress() {
        //
      }
    })
      .then(res => download(res.data, `${params.filename || '模板'}.xls`))
      .catch(err => {
        // Message.error(err.message || '系统错误');
        return err;
      });
  },
  blobPostJSON<T extends AnyObject>(
    url: string,
    data: { filename?: string } & T
  ): Promise<void | 'ok'> {
    return axiosInstance({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      responseType: 'blob',
      onDownloadProgress() {
        //
      },
      transformRequest: data => JSON.stringify(data)
    })
      .then(res => download(res, `${data.filename || '模板'}.xls`))
      .catch(err => {
        // Message.error(err.message || '系统错误');
      });
  }
};

export const $inventory = {} as typeof methods;

Object.entries(methods).forEach(([type, method]) => {
  $inventory[type as keyof typeof methods] = (...args: any[]) => {
    return (method as any)(...args).then(async (response: AxiosResponse) => {
      // response = await preResponseParser(response);
      return response.data;
    });
  };
});

export default axiosInstance;
