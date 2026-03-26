import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { dropToken, getToken } from '@/src/services/token';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = createAPI();
