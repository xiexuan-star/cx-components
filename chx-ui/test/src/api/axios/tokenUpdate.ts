import router from '@/router';
import { LOGIN } from '@/router/constant/path';
import UserStore, { localUserProxy } from '@/store/modules/user';
import axios, { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { getTokenByRefreshToken } from '../login';

export const updateToken = (() => {
  let pending = false;
  const stopPending = () => (pending = false);
  const updateTokenQueue: Set<Func<any>> = new Set();
  return async () => {
    return new Promise((resolve, reject) => {
      if (pending) {
        updateTokenQueue.add(resolve);
      } else {
        pending = true;
        getTokenByRefreshToken()
          .then(({ data: { data, state } }) => {
            if (state !== 200) return router.push(LOGIN), reject(), ElMessage.error('token失效');
            const { user, factory } = localUserProxy.userParser(data);
            UserStore.SET_USER(user);
            UserStore.SET_FACTORY(factory);
            resolve(user.token);
            updateTokenQueue.forEach(continueResolve => continueResolve(user.token));
          })
          .catch(() => {
            updateTokenQueue.clear();
            router.push(LOGIN);
            ElMessage.error('token失效');
            reject();
          })
          .finally(stopPending);
      }
    });
  };
})();

export const preResponseParser = async (response: AxiosResponse) => {
  if (response?.data?.state !== 401) return response;
  const token = await updateToken();
  response.config.headers.token = token;
  try {
    response.config.data = JSON.parse(response.config.data);
  } catch {
    // It means the config haven't request body when a error was caught
  }
  return await axios(response.config);
};
