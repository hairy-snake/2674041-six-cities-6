import type { Review as ReviewType } from '@/src/types/review';

type ReviewProps = {
  review: ReviewType;
};

const Review = ({ review }: ReviewProps) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.userAvatar}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.userName}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: `${review.starsWidth}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{review.text}</p>
      <time className="reviews__time" dateTime={review.dateTime}>
        {review.dateLabel}
      </time>
    </div>
  </li>
);

export default Review;
