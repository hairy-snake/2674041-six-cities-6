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
const activeIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  offers: Offer[];
  activeOfferId?: string | null;
  className?: string;
};

const Map = ({
  offers,
  activeOfferId = null,
  className = 'cities__map map',
}: MapProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    const el = rootRef.current;
    if (!el || offers.length === 0) {
      return undefined;
    }
    markersRef.current = {};
    const map = L.map(el, { scrollWheelZoom: false }).setView(
      [offers[0].location.latitude, offers[0].location.longitude],
      13,
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);
    for (const offer of offers) {
      const m = L.marker([offer.location.latitude, offer.location.longitude], {
        icon: defaultIcon,
      }).addTo(map);
      markersRef.current[offer.id] = m;
    }
    const pts = Object.values(markersRef.current).map((m) => m.getLatLng());
    map.fitBounds(L.latLngBounds(pts).pad(0.2));
    return () => {
      map.remove();
      markersRef.current = {};
    };
  }, [offers]);

  useEffect(() => {
    for (const id of Object.keys(markersRef.current)) {
      const m = markersRef.current[id];
      if (m) {
        m.setIcon(id === activeOfferId ? activeIcon : defaultIcon);
      }
    }
  }, [activeOfferId, offers]);

  return <section className={className} ref={rootRef}></section>;
};

export default Map;
