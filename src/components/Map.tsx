import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { Offer } from '@/src/mocks/offers';

const LEAFLET_IMAGES = 'https://unpkg.com/leaflet@1.7.1/dist/images';

const defaultIcon = L.icon({
  iconUrl: `${LEAFLET_IMAGES}/marker-icon.png`,
  iconRetinaUrl: `${LEAFLET_IMAGES}/marker-icon-2x.png`,
  shadowUrl: `${LEAFLET_IMAGES}/marker-shadow.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type MapProps = {
  offers: Offer[];
  className?: string;
};

const Map = ({ offers, className = 'cities__map map' }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container || offers.length === 0) {
      return undefined;
    }

    const map = L.map(container, { scrollWheelZoom: false }).setView(
      [offers[0].location.latitude, offers[0].location.longitude],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markers = offers.map((offer) =>
      L.marker([offer.location.latitude, offer.location.longitude], { icon: defaultIcon }).addTo(map)
    );

    map.fitBounds(L.latLngBounds(markers.map((marker) => marker.getLatLng())).pad(0.2));

    return () => {
      map.remove();
    };
  }, [offers]);

  return <section className={className} ref={mapRef}></section>;
};

export default Map;
