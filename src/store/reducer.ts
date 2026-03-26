import { createReducer } from '@reduxjs/toolkit';

import type { Offer } from '@/src/types/offer';

import { changeCity, fetchOffers } from '@/src/store/action';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: true,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
});
