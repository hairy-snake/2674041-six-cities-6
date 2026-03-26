import axios from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export function createAPI() {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });
}

export const api = createAPI();
