import axios, { AxiosResponse } from 'axios';

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
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { axiosClient, axiosFormData, setHeaderAuth };
