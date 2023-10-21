import axios from 'axios';
import { getAccessToken } from 'utils';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosFormData = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const setHeaderAuth = (accessToken: string) => {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  axiosFormData.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken();
    if (accessToken) {
      axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a request interceptor
axiosFormData.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { axiosClient, axiosFormData, setHeaderAuth };
