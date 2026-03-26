import type { Offer } from '@/src/types/offer';

function formatType(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function adaptOffer(raw: Record<string, unknown>): Offer {
  const cityRaw = raw.city;
  const city =
    typeof cityRaw === 'object' && cityRaw !== null && 'name' in cityRaw
      ? String((cityRaw as { name: string }).name)
      : String(cityRaw);

  const loc = raw.location as { latitude: number; longitude: number };
  const rating = Number(raw.rating);
  const host = raw.host as { name?: string; avatarUrl?: string; isPro?: boolean } | undefined;

  let description: string[] = [];
  if (typeof raw.description === 'string') {
    description = [raw.description];
  } else if (Array.isArray(raw.description)) {
    description = raw.description as string[];
  }

  return {
    id: String(raw.id),
    title: String(raw.title),
    type: formatType(String(raw.type)),
    price: Number(raw.price),
    city,
    location: { latitude: loc.latitude, longitude: loc.longitude },
    previewImage: String(raw.previewImage),
    images: Array.isArray(raw.images) ? (raw.images as string[]) : [String(raw.previewImage)],
    isPremium: Boolean(raw.isPremium),
    isFavorite: Boolean(raw.isFavorite),
    rating,
    starsWidth: Math.round((rating / 5) * 100),
    bedrooms: raw.bedrooms !== undefined ? Number(raw.bedrooms) : 0,
    maxAdults: raw.maxAdults !== undefined ? Number(raw.maxAdults) : 0,
    goods: Array.isArray(raw.goods) ? (raw.goods as string[]) : [],
    hostName: host?.name ?? '',
    hostAvatar: host?.avatarUrl ?? '',
    hostIsPro: Boolean(host?.isPro),
    description,
  };
}
