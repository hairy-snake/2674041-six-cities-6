import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { Offer } from '@/src/types/offer';

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
  onMarkerClick?: (offerId: string) => void;
  onMarkerHoverChange?: (offerId: string | null) => void;
};

const Map = ({
  offers,
  activeOfferId = null,
  className = 'cities__map map',
  onMarkerClick,
  onMarkerHoverChange,
}: MapProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;
  const onMarkerHoverChangeRef = useRef(onMarkerHoverChange);
  onMarkerHoverChangeRef.current = onMarkerHoverChange;

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
      m.on('click', () => {
        onMarkerClickRef.current?.(offer.id);
      });
      m.on('mouseover', () => {
        onMarkerHoverChangeRef.current?.(offer.id);
      });
      m.on('mouseout', () => {
        onMarkerHoverChangeRef.current?.(null);
      });
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

  return (
    <section
      className={className}
      ref={rootRef}
      style={{ position: 'relative', zIndex: 2 }}
    />
  );
};

export default Map;
