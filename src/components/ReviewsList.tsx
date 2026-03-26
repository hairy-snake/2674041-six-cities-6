import CommentForm from '@/src/components/CommentForm';
import Review from '@/src/components/Review';
import type { Review as ReviewType } from '@/src/types/review';

type ReviewsListProps = {
  reviews: ReviewType[];
  offerId: string;
  showCommentForm: boolean;
  onCommentPosted: (review: ReviewType) => void;
};

const ReviewsList = ({
  reviews: items,
  offerId,
  showCommentForm,
  onCommentPosted,
}: ReviewsListProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{items.length}</span>
    </h2>
    <ul className="reviews__list">
      {items.map((item) => (
        <Review key={item.id} review={item} />
      ))}
    </ul>
    {showCommentForm ? <CommentForm offerId={offerId} onCommentPosted={onCommentPosted} /> : null}
  </section>
);

export default ReviewsList;
