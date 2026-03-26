import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CitiesList from '@/src/components/CitiesList';
import Map from '@/src/components/Map';
import OffersList from '@/src/components/OffersList';
import SortOptions from '@/src/components/SortOptions';
import { CITIES } from '@/src/const/cities';
import AppRoutes from '@/src/route';
import type { Offer } from '@/src/mocks/offers';
import type { RootState, AppDispatch } from '@/src/store';
import { changeCity } from '@/src/store/action';

function sortOffers(offers: Offer[], sort: string): Offer[] {
  const list = [...offers];
  if (sort === 'Popular') {
    return list;
  }
  if (sort === 'Price: low to high') {
    list.sort((a, b) => a.price - b.price);
    return list;
  }
  if (sort === 'Price: high to low') {
    list.sort((a, b) => b.price - a.price);
    return list;
  }
  list.sort((a, b) => b.rating - a.rating);
  return list;
}

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);

  const [sort, setSort] = useState('Popular');
  const [hoverId, setHoverId] = useState<string | null>(null);

  const inCity = useMemo(
    () => allOffers.filter((o) => o.city === city),
    [allOffers, city]
  );
  const shown = useMemo(() => sortOffers(inCity, sort), [inCity, sort]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoutes.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              activeCity={city}
              onCityChange={(c) => dispatch(changeCity(c))}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {inCity.length} places to stay in {city}
              </b>
              <SortOptions sort={sort} onChange={setSort} />
              <OffersList offers={shown} onHoverOfferIdChange={setHoverId} />
            </section>
            <div className="cities__right-section">
              <Map offers={shown} activeOfferId={hoverId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
