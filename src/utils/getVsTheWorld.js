// function that shows an percentage of how many ratings were higher than the global ratings,
// and how many were lower. It skips  all checkins with a rating_score of 0 or empty.

export const getVsTheWorld = (data) => {
  // Filter out items with rating_score of 0 or empty first
  const validRatings = data.filter((item) => item.rating_score > 0);

  // Filter out ratings that are equal to global ratings
  const comparableRatings = validRatings.filter(
    (item) => item.rating_score !== item.global_rating_score
  );

  const higherRatings = comparableRatings.filter(
    (item) => item.rating_score > item.global_rating_score
  ).length;
  const lowerRatings = comparableRatings.filter(
    (item) => item.rating_score < item.global_rating_score
  ).length;

  const percentageHigher = Math.round((higherRatings / comparableRatings.length) * 100);
  const percentageLower = Math.round((lowerRatings / comparableRatings.length) * 100);

  return { percentageHigher, percentageLower };
};
