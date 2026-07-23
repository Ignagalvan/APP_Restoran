const fallbackGoogleReviewUrl = "https://www.google.com/maps/search/?api=1&query=Lumbre%20restaurante";

export const getGoogleReviewUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim();
  return configuredUrl && configuredUrl.startsWith("https://") ? configuredUrl : fallbackGoogleReviewUrl;
};
