// import { localUserProxy } from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default {
  requestInterceptor: (config: AxiosRequestConfig) => {
    // const token = localUserProxy.user?.token;
    // token && Reflect.set(config.headers, 'token', token); // 请求头部添加token
    return config;
  },
  responseInterceptor: (params: AxiosResponse) => {
    // const code = params.status;
    // const { state } = params.data;

    // if ((code >= 200 && code < 300) || code === 304) {
    //   if (/octet-stream/.test(params.headers['content-type'])) {
    //     return params.data;
    //   } else if (state === 200) {
    //     return Promise.resolve(params.data);
    //   }
    //   return Promise.reject(params.data);
    // }
    return Promise.reject(params);
  },
  responseErrInterceptor: (error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          ElMessage.error('服务器繁忙');
          break;
        case 404:
          ElMessage.error('网络请求不存在');
          break;
        default:
          error.response.message && ElMessage.error(error.response.message);
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        ElMessage.error('请求超时！请检查网络是否正常');
      } else {
        ElMessage.error('请求失败，请检查网络是否已连接');
      }
      return Promise.reject(error);
    }
  }
};
