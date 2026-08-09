const fallbackGoogleReviewUrl =
  "https://www.google.com/maps/place/Alma+de+Pueblo/@-31.2878539,-64.2932958,17z/data=!4m8!3m7!1s0x94329d1f0787d7d5:0x487274bbef20b2c0!8m2!3d-31.2878539!4d-64.2932958!9m1!1b1!16s%2Fg%2F11c5634hw0?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D";

export const getGoogleReviewUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim();
  return configuredUrl && configuredUrl.startsWith("https://") ? configuredUrl : fallbackGoogleReviewUrl;
};
