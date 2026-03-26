import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppHeader from '@/src/components/AppHeader';
import PlaceCard from '@/src/components/PlaceCard';
import AppRoutes from '@/src/route';
import type { Offer } from '@/src/types/offer';
import type { RootState } from '@/src/store';

const FavouritesPage = () => {
  const allOffers = useSelector((state: RootState) => state.offers);
  const favoriteOffers = allOffers.filter((offer) => offer.isFavorite);

  const offersByCity = favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
    if (!acc[offer.city]) {
      acc[offer.city] = [];
    }
    acc[offer.city].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <AppHeader favoritesCount={favoriteOffers.length} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, cityOffers]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <PlaceCard key={offer.id} offer={offer} variant="favorites" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoutes.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavouritesPage;
