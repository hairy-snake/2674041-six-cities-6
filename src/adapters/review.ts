import type { Review } from '@/src/types/review';

function formatReviewDateLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function adaptReview(raw: Record<string, unknown>, offerId: string): Review {
  const user = raw.user as { name?: string; avatarUrl?: string } | undefined;
  const rating = Number(raw.rating);
  const date = String(raw.date);
  return {
    id: String(raw.id),
    offerId,
    userName: user?.name ?? '',
    userAvatar: user?.avatarUrl ?? '',
    starsWidth: Math.round((rating / 5) * 100),
    text: String(raw.comment),
    dateTime: date,
    dateLabel: formatReviewDateLabel(date),
  };
}
