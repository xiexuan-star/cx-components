
import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    options?: Record<string, any>;
    noLoading?: boolean;
  }

  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}