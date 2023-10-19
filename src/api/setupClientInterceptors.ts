import { TokenResponse } from '@types';
import { AxiosResponse } from 'axios';
//
import { ROUTES_API_AUTH } from 'constants/routesApiKeys';
import { getAccessToken, getRefreshToken, setSession } from 'utils';
import { axiosClient } from './axiosClient';

const setupAxiosClient = (store: any) => {
  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    async (err) => {
      const originalConfig = err.config;

      if (
        (originalConfig.url !== ROUTES_API_AUTH.LOGIN ||
          originalConfig.url !== ROUTES_API_AUTH.FORGOT_PASSWORD ||
          originalConfig.url !== ROUTES_API_AUTH.RESET_PASSWORD ||
          originalConfig.url !== ROUTES_API_AUTH.VERIFY_OTP) &&
        err.response
      ) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const accessToken = getAccessToken();
          const refreshToken = getRefreshToken();

          const data = {
            accessToken,
            refreshToken,
          };

          try {
            const response: TokenResponse = await axiosClient.post(ROUTES_API_AUTH.REFRESH_TOKEN, data);

            setSession(response.accessToken, response.refreshToken);

            return axiosClient(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setupAxiosClient;