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

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    price: 120,
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
    },
    previewImage: 'img/apartment-01.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-02.jpg',
    ],
    isPremium: true,
    isFavorite: true,
    rating: 4.8,
    starsWidth: 80,
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    hostName: 'Angelina',
    hostAvatar: 'img/avatar-angelina.jpg',
    hostIsPro: true,
    description: [
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    ],
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: 'Amsterdam',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
    },
    previewImage: 'img/room.jpg',
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    isPremium: false,
    isFavorite: true,
    rating: 4,
    starsWidth: 80,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Heating'],
    hostName: 'Max',
    hostAvatar: 'img/avatar-max.jpg',
    hostIsPro: false,
    description: [
      'Cozy room in the city center with wooden beams and stone walls.',
    ],
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
    },
    previewImage: 'img/apartment-02.jpg',
    images: ['img/apartment-02.jpg', 'img/apartment-03.jpg'],
    isPremium: false,
    isFavorite: true,
    rating: 4.5,
    starsWidth: 80,
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Kitchen', 'Coffee machine', 'Fridge'],
    hostName: 'Angelina',
    hostAvatar: 'img/avatar-angelina.jpg',
    hostIsPro: true,
    description: [
      'Light apartment with a view of the canal. Quiet street, close to cafes.',
    ],
  },
  {
    id: '4',
    title: 'White castle',
    type: 'Apartment',
    price: 180,
    city: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
    },
    previewImage: 'img/apartment-small-04.jpg',
    images: ['img/apartment-small-04.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'],
    isPremium: false,
    isFavorite: false,
    rating: 5,
    starsWidth: 100,
    bedrooms: 4,
    maxAdults: 6,
    goods: ['Wi-Fi', 'Kitchen', 'Dishwasher', 'Washing machine', 'Fridge'],
    hostName: 'Angelina',
    hostAvatar: 'img/avatar-angelina.jpg',
    hostIsPro: true,
    description: [
      'Spacious apartment in Amsterdam with classic high ceilings.',
    ],
  },
  {
    id: '5',
    title: 'Small studio near the Seine',
    type: 'Apartment',
    price: 95,
    city: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    previewImage: 'img/apartment-01.jpg',
    images: ['img/apartment-01.jpg', 'img/room.jpg'],
    isPremium: false,
    isFavorite: false,
    rating: 4.2,
    starsWidth: 80,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen'],
    hostName: 'Pierre',
    hostAvatar: 'img/avatar-max.jpg',
    hostIsPro: false,
    description: ['Quiet studio in the heart of Paris.'],
  },
  {
    id: '6',
    title: 'Loft with balcony',
    type: 'Apartment',
    price: 210,
    city: 'Paris',
    location: {
      latitude: 48.8706,
      longitude: 2.3322,
    },
    previewImage: 'img/apartment-02.jpg',
    images: ['img/apartment-02.jpg'],
    isPremium: true,
    isFavorite: true,
    rating: 4.9,
    starsWidth: 100,
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen', 'Heating'],
    hostName: 'Marie',
    hostAvatar: 'img/avatar-angelina.jpg',
    hostIsPro: true,
    description: ['Bright loft with a small balcony.'],
  },
  {
    id: '7',
    title: 'Cologne riverside room',
    type: 'Room',
    price: 70,
    city: 'Cologne',
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
    },
    previewImage: 'img/room.jpg',
    images: ['img/room.jpg'],
    isPremium: false,
    isFavorite: false,
    rating: 4,
    starsWidth: 80,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating'],
    hostName: 'Hans',
    hostAvatar: 'img/avatar-max.jpg',
    hostIsPro: false,
    description: ['Simple room near the Rhine.'],
  },
];
