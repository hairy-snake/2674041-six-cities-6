import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import { adaptOffer } from '@/src/adapters/offer';
import type { Offer } from '@/src/types/offer';

export const changeCity = createAction<string>('city/change');

export const fetchOffers = createAsyncThunk<Offer[], void, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: axiosApi }) => {
    const { data } = await axiosApi.get<Record<string, unknown>[]>('/offers');
    return data.map((item) => adaptOffer(item));
  }
);
