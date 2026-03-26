import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '@/src/components/AppHeader';
import CitiesList from '@/src/components/CitiesList';
import Map from '@/src/components/Map';
import OffersList from '@/src/components/OffersList';
import SortOptions from '@/src/components/SortOptions';
import { CITIES } from '@/src/const/cities';
import Spinner from '@/src/components/Spinner';
import type { Offer } from '@/src/types/offer';
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);

  const [sort, setSort] = useState('Popular');
  const [hoverId, setHoverId] = useState<string | null>(null);
  /** После смены подсветки список один раз прокрутится к этому id (наведение с карты) */
  const pendingScrollToOfferId = useRef<string | null>(null);

  /** scrollList: навести с карты — после подсветки докрутить список к карточке */
  function setHighlightedOffer(offerId: string | null, scrollList = false) {
    pendingScrollToOfferId.current = scrollList && offerId ? offerId : null;
    setHoverId(offerId);
  }

  const inCity = useMemo(
    () => allOffers.filter((o) => o.city === city),
    [allOffers, city]
  );
  const shown = useMemo(() => sortOffers(inCity, sort), [inCity, sort]);
  const favoritesCount = useMemo(
    () => allOffers.filter((offer) => offer.isFavorite).length,
    [allOffers]
  );

  return (
    <div className="page page--gray page--main">
      <AppHeader logoLinkActive favoritesCount={favoritesCount} />

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
        {isOffersLoading ? (
          <Spinner />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {inCity.length} places to stay in {city}
                </b>
                <SortOptions sort={sort} onChange={setSort} />
                <OffersList
                  offers={shown}
                  activeOfferId={hoverId}
                  onHoverOfferIdChange={(id) => setHighlightedOffer(id)}
                  pendingScrollToOfferId={pendingScrollToOfferId}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={shown}
                  activeOfferId={hoverId}
                  onMarkerClick={(offerId) => navigate(`/offer/${offerId}`)}
                  onMarkerHoverChange={(id) => setHighlightedOffer(id, id !== null)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
