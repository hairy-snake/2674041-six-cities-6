import { createReducer } from '@reduxjs/toolkit';

import type { Offer } from '@/src/mocks/offers';

import { changeCity, setOffers } from '@/src/store/action';

type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
