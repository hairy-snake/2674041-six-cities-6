import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { adaptOffer } from '@/src/adapters/offer';
import { api } from '@/src/api';
import Map from '@/src/components/Map';
import NearbyPlacesList from '@/src/components/NearbyPlacesList';
import ReviewsList from '@/src/components/ReviewsList';
import Spinner from '@/src/components/Spinner';
import ErrNotFoundPage from '@/src/pages/ErrNotFoundPage';
import AppRoutes from '@/src/route';
import type { Offer } from '@/src/types/offer';
import type { RootState } from '@/src/store';

const OfferPage = () => {
  const navigate = useNavigate();
  const offers = useSelector((state: RootState) => state.offers);
  const { id } = useParams();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!id) {
      setFailed(true);
      return;
    }
    setFailed(false);
    setOffer(null);
    api
      .get(`/offers/${id}`)
      .then(({ data }) => setOffer(adaptOffer(data as Record<string, unknown>)))
      .catch(() => setFailed(true));
  }, [id]);

  if (!id || failed) {
    return <ErrNotFoundPage />;
  }
  if (!offer) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  const nearPlaces = offers
    .filter((item) => item.id !== offer.id && item.city === offer.city)
    .slice(0, 3);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoutes.Main}>
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((src) => (
                <div key={src} className="offer__image-wrapper">
                  <img className="offer__image" src={src} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.starsWidth}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper ${
                      offer.hostIsPro ? 'offer__avatar-wrapper--pro' : ''
                    }`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.hostAvatar}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.hostName}</span>
                  {offer.hostIsPro ? <span className="offer__user-status">Pro</span> : null}
                </div>
                <div className="offer__description">
                  {offer.description.map((paragraph) => (
                    <p key={paragraph} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <ReviewsList reviews={[]} />
            </div>
          </div>
          <Map
            offers={nearPlaces}
            className="offer__map map"
            onMarkerClick={(offerId) => navigate(`/offer/${offerId}`)}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyPlacesList offers={nearPlaces} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
