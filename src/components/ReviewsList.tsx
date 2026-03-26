import CommentForm from '@/src/components/CommentForm';
import Review from '@/src/components/Review';
import type { Review as ReviewType } from '@/src/types/review';

type ReviewsListProps = {
  reviews: ReviewType[];
};

const ReviewsList = ({ reviews: items }: ReviewsListProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{items.length}</span>
    </h2>
    <ul className="reviews__list">
      {items.map((item) => (
        <Review key={item.id} review={item} />
      ))}
    </ul>
    <CommentForm />
  </section>
);

export default ReviewsList;
