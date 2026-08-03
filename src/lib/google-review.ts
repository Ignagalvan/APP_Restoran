const fallbackGoogleReviewUrl = "https://www.google.com/maps/search/?api=1&query=Alma%20de%20Pueblo%20restaurante";

export const getGoogleReviewUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim();
  return configuredUrl && configuredUrl.startsWith("https://") ? configuredUrl : fallbackGoogleReviewUrl;
};
