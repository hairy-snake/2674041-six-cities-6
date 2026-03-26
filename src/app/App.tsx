import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppRoutes from '@/src/route';
import MainPage from '@/src/pages/MainPage';
import LoginPage from '@/src/pages/LoginPage';
import FavouritesPage from '@/src/pages/FavouritesPage';
import OfferPage from '@/src/pages/OfferPage';
import ErrNotFoundPage from '@/src/pages/ErrNotFoundPage';
import PrivateRoute from '@/src/PrivateRoute';
import type { AppDispatch } from '@/src/store';
import { checkAuth, fetchOffers } from '@/src/store/action';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Main} element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route path="*" element={<ErrNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
