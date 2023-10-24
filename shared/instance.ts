import axios, { AxiosError } from 'axios';

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  headers: {},
});

// instance.defaults.withCredentials = true;
instance.defaults.headers.common.Accept = 'application/json';

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

export default instance;
