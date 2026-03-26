import PlaceCard from '@/src/components/PlaceCard';
import type { Offer } from '@/src/mocks/offers';

type OffersListProps = {
  offers: Offer[];
  onHoverOfferIdChange: (offerId: string | null) => void;
};

const OffersList = ({ offers, onHoverOfferIdChange }: OffersListProps) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        variant="cities"
        onMouseEnter={() => onHoverOfferIdChange(offer.id)}
        onMouseLeave={() => onHoverOfferIdChange(null)}
      />
    ))}
  </div>
);

export default OffersList;
