export type FeedbackSource = "payment" | "home";
export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

export interface FeedbackContextData {
  restaurant: string;
  table: string;
  source: FeedbackSource;
  paymentOperationId?: string;
}

export interface FeedbackResultData {
  id: string;
  restaurant: string;
  table: string;
  rating: FeedbackRating;
  comment?: string;
  source: FeedbackSource;
  paymentOperationId?: string;
  createdAt: string;
  status: "submitted";
}

export const feedbackCommentMaxLength = 500;

export function isFeedbackRating(value: number | null): value is FeedbackRating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export function normalizeFeedbackContext(context: FeedbackContextData | null): FeedbackContextData | null {
  if (!context) return null;
  const restaurant = context.restaurant.trim();
  const table = context.table.trim();
  if (!restaurant || !table) return null;
  if (context.source === "home") return { restaurant, table, source: "home" };
  if (context.source === "payment") {
    const paymentOperationId = context.paymentOperationId?.trim();
    if (!paymentOperationId) return null;
    return { restaurant, table, source: "payment", paymentOperationId };
  }
  return null;
}

export function createFeedbackResult(context: FeedbackContextData | null, rating: number | null, comment: string): FeedbackResultData | null {
  const normalizedContext = normalizeFeedbackContext(context);
  if (!normalizedContext || !isFeedbackRating(rating)) return null;

  const normalizedComment = comment.trim().slice(0, feedbackCommentMaxLength);

  return {
    id: `FDB-${Date.now().toString(36).toUpperCase()}`,
    restaurant: normalizedContext.restaurant,
    table: normalizedContext.table,
    rating,
    comment: normalizedComment || undefined,
    source: normalizedContext.source,
    paymentOperationId: normalizedContext.source === "payment" ? normalizedContext.paymentOperationId : undefined,
    createdAt: new Date().toISOString(),
    status: "submitted",
  };
}
