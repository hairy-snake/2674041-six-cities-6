import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

import PlaceCard from '@/src/components/PlaceCard';
import type { Offer } from '@/src/types/offer';

type OffersListProps = {
  offers: Offer[];
  activeOfferId: string | null;
  onHoverOfferIdChange: (offerId: string | null) => void;
  pendingScrollToOfferId: MutableRefObject<string | null>;
};

const OffersList = ({
  offers,
  activeOfferId,
  onHoverOfferIdChange,
  pendingScrollToOfferId,
}: OffersListProps) => {
  const cardElById = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const id = pendingScrollToOfferId.current;
    if (!id || id !== activeOfferId) {
      return;
    }
    pendingScrollToOfferId.current = null;
    cardElById.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeOfferId, pendingScrollToOfferId]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant="cities"
          isHighlighted={offer.id === activeOfferId}
          onRootElement={(el) => {
            cardElById.current[offer.id] = el;
          }}
          onMouseEnter={() => onHoverOfferIdChange(offer.id)}
          onMouseLeave={() => onHoverOfferIdChange(null)}
        />
      ))}
    </div>
  );
};

export default OffersList;
