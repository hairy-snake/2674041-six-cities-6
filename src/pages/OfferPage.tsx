import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useSelector } from 'react-redux';

import AppHeader from '@/src/components/AppHeader';
import { adaptOffer } from '@/src/adapters/offer';
import { adaptReview } from '@/src/adapters/review';
import { api } from '@/src/api';
import Map from '@/src/components/Map';
import NearbyPlacesList from '@/src/components/NearbyPlacesList';
import ReviewsList from '@/src/components/ReviewsList';
import Spinner from '@/src/components/Spinner';
import ErrNotFoundPage from '@/src/pages/ErrNotFoundPage';
import { AuthorizationStatus } from '@/src/const/authorization';
import type { Offer } from '@/src/types/offer';
import type { Review } from '@/src/types/review';
import type { RootState } from '@/src/store';

function sortReviewsByDateDesc(list: Review[]): Review[] {
  return [...list].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );
}

const OfferPage = () => {
  const navigate = useNavigate();
  const offers = useSelector((state: RootState) => state.offers);
  const authorizationStatus = useSelector((s: RootState) => s.authorizationStatus);
  const favoritesCount = useMemo(
    () => offers.filter((item) => item.isFavorite).length,
    [offers]
  );

  const { id } = useParams();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [nearby, setNearby] = useState<Offer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!id) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    setFailed(false);
    setOffer(null);
    setNearby([]);
    setReviews([]);

    (async () => {
      try {
        const { data: raw } = await api.get<Record<string, unknown>>(`/offers/${id}`);
        if (cancelled) {
          return;
        }
        setOffer(adaptOffer(raw));

        try {
          const [nearRes, commRes] = await Promise.all([
            api.get<Record<string, unknown>[]>(`/offers/${id}/nearby`),
            api.get<Record<string, unknown>[]>(`/comments/${id}`),
          ]);
          if (cancelled) {
            return;
          }
          setNearby(nearRes.data.map((item) => adaptOffer(item)).slice(0, 3));
          setReviews(sortReviewsByDateDesc(commRes.data.map((item) => adaptReview(item, id))));
        } catch {
          if (!cancelled) {
            setNearby([]);
            setReviews([]);
          }
        }
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (isAxiosError(err) && err.response?.status === 404) {
          setFailed(true);
        } else {
          setFailed(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const showCommentForm = authorizationStatus === AuthorizationStatus.Auth;

  const handleCommentPosted = (review: Review) => {
    setReviews((prev) => sortReviewsByDateDesc([...prev, review]));
  };

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

  return (
    <div className="page">
      <AppHeader favoritesCount={favoritesCount} />

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
              <ReviewsList
                reviews={reviews}
                offerId={offer.id}
                showCommentForm={showCommentForm}
                onCommentPosted={handleCommentPosted}
              />
            </div>
          </div>
          <Map
            offers={nearby}
            className="offer__map map"
            onMarkerClick={(offerId) => navigate(`/offer/${offerId}`)}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyPlacesList offers={nearby} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
