import { configureStore } from '@reduxjs/toolkit';

import { offers } from '@/src/mocks/offers';
import { setOffers } from '@/src/store/action';
import { reducer } from '@/src/store/reducer';

export const store = configureStore({
  reducer,
});

store.dispatch(setOffers(offers));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
