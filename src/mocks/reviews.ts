export type Review = {
  id: string;
  offerId: string;
  userName: string;
  userAvatar: string;
  starsWidth: number;
  text: string;
  dateTime: string;
  dateLabel: string;
};

export const reviews: Review[] = [
  {
    id: '1',
    offerId: '1',
    userName: 'Max',
    userAvatar: 'img/avatar-max.jpg',
    starsWidth: 80,
    text:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    dateTime: '2019-04-24',
    dateLabel: 'April 2019',
  },
  {
    id: '2',
    offerId: '1',
    userName: 'Анна',
    userAvatar: 'img/avatar-angelina.jpg',
    starsWidth: 100,
    text:
      'Очень понравилось расположение и вид из окна. Чисто, тихий двор, до центра недалеко. Хозяин ответил быстро, заселение без проблем.',
    dateTime: '2020-08-12',
    dateLabel: 'Август 2020',
  },
  {
    id: '3',
    offerId: '2',
    userName: 'John',
    userAvatar: 'img/avatar-max.jpg',
    starsWidth: 80,
    text: 'Nice room, good location.',
    dateTime: '2021-01-10',
    dateLabel: 'January 2021',
  },
  {
    id: '4',
    offerId: '3',
    userName: 'Sarah',
    userAvatar: 'img/avatar-angelina.jpg',
    starsWidth: 80,
    text: 'Great canal view, would stay again.',
    dateTime: '2022-05-15',
    dateLabel: 'May 2022',
  },
  {
    id: '5',
    offerId: '4',
    userName: 'Mike',
    userAvatar: 'img/avatar-max.jpg',
    starsWidth: 100,
    text: 'Spacious and clean.',
    dateTime: '2023-02-01',
    dateLabel: 'February 2023',
  },
];
