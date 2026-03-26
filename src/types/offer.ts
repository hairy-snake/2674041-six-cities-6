export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  starsWidth: number;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  hostName: string;
  hostAvatar: string;
  hostIsPro: boolean;
  description: string[];
};
