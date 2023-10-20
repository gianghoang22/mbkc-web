import { AxiosResponse } from 'axios';
// redux
import { setIsLogout } from 'redux/auth/authSlice';
//
import { TokenResponse } from '@types';
import { ROUTES_API_AUTH } from 'constants/routesApiKeys';
import { getAccessToken, getRefreshToken, setSession } from 'utils';
import { axiosClient, axiosFormData } from './axiosClient';

const setupAxiosFormData = (store: any) => {
  const { dispatch } = store;

  axiosFormData.interceptors.response.use(
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

            return axiosFormData(originalConfig);
          } catch (_error) {
            dispatch(setIsLogout);
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setupAxiosFormData;
