import PlaceCard from '@/src/components/PlaceCard';
import type { Offer } from '@/src/types/offer';

type NearbyPlacesListProps = {
  offers: Offer[];
};

const NearbyPlacesList = ({ offers }: NearbyPlacesListProps) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} variant="near-places" />
    ))}
  </div>
);

export default NearbyPlacesList;
