import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppRoutes from '@/src/route';
import MainPage from '@/src/pages/MainPage';
import LoginPage from '@/src/pages/LoginPage';
import FavouritesPage from '@/src/pages/FavouritesPage';
import OfferPage from '@/src/pages/OfferPage';
import ErrNotFoundPage from '@/src/pages/ErrNotFoundPage';
import PrivateRoute from '@/src/PrivateRoute';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.Main} element={<MainPage />} />
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route
        path={AppRoutes.Favorites}
        element={
          <PrivateRoute auth={false}>
            <FavouritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoutes.Offer} element={<OfferPage />} />
      <Route path="*" element={<ErrNotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
