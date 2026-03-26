import { createAction } from '@reduxjs/toolkit';

import type { Offer } from '@/src/mocks/offers';

export const changeCity = createAction<string>('city/change');

export const setOffers = createAction<Offer[]>('offers/set');
