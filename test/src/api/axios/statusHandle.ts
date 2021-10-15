import { isNumber } from '@/utils/is';
import { AxiosResponse } from 'axios';
import { CANCEL_REQUEST } from './const';
import { StatusHandleResult } from './type';

export function statusHandle(res: AxiosResponse<SResponse<any>>) {
  const result: StatusHandleResult = {};
  const { data } = res;
  const { state, message } = data;
  const msg = message || '系统错误';
  const url = res.config.url?.toLocaleLowerCase() ?? '';
  const contentType = res.headers['content-type'];

  if (/octet-stream|image/.test(contentType)) {
    return result;
  }
  const setErrMsg = (msg: string) => Reflect.set(result, 'errMsg', msg);

  switch (state) {
    case 500:
      setErrMsg(url.includes('login') ? '用户名不存在' : msg);
      break;
    case 401:
      if (url.includes('login')) {
        setErrMsg(msg);
      }
      break;
    case 400:
    case 403:
    case 406:
    case 1:
      setErrMsg(msg);
  }
  return result;
}

export function errStatusHandle(err: any) {
  const result = { errMsg: '' };
  const { status, message } = err?.response ?? {};
  if (message === CANCEL_REQUEST) return result;
  const setErrMsg = (msg: string) => Reflect.set(result, 'errMsg', msg);
  if (!isNumber(status)) {
    setErrMsg(
      message?.includes('timeout')
        ? '请求超时！请检查网络是否正常'
        : '请求失败，请检查网络是否已连接'
    );
    return result;
  }
  switch (status) {
    case 500:
      setErrMsg('服务器繁忙');
      break;
    case 404:
      setErrMsg('网络请求不存在');
      break;
    default:
      setErrMsg(message);
  }
  return result;
}
