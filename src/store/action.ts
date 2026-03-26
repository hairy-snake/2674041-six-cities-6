import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';

import { adaptOffer } from '@/src/adapters/offer';
import type { AuthInfo, LoginCredentials } from '@/src/types/auth';
import type { Offer } from '@/src/types/offer';
import { saveToken, dropToken } from '@/src/services/token';

export const changeCity = createAction<string>('city/change');

export const fetchOffers = createAsyncThunk<Offer[], void, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: axiosApi }) => {
    const { data } = await axiosApi.get<Record<string, unknown>[]>('/offers');
    return data.map((item) => adaptOffer(item));
  }
);

export const checkAuth = createAsyncThunk<AuthInfo, void, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { extra: axiosApi }) => {
    const { data } = await axiosApi.get<AuthInfo>('/login');
    return data;
  }
);

export const login = createAsyncThunk<
  AuthInfo,
  LoginCredentials,
  { extra: AxiosInstance; rejectValue: string }
>('user/login', async (credentials, { extra: axiosApi, rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<AuthInfo>('/login', credentials);
    saveToken(data.token);
    return data;
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      const status = err.response.status;
      const data: unknown = err.response.data;
      const text = typeof data === 'string' ? data : JSON.stringify(data ?? {});
      if (/validation error/i.test(text) || [400, 401, 422].includes(status)) {
        return rejectWithValue('Неверный логин или пароль');
      }
    }
    return rejectWithValue('Не войти');
  }
});

export const logout = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { extra: axiosApi }) => {
    try {
      await axiosApi.delete('/logout');
    } catch {
      void 0;
    }
    dropToken();
  }
);
