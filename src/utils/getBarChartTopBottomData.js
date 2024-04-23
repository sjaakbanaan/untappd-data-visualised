export const getBarChartTopBottomData = (beerData) => {
  // utils
  const removeNullItemsFromArray = (arr) => {
    // Filter out null items
    const filteredArray = arr.filter((item) => item !== null);
    return filteredArray;
  };
  // function to round, because it sometimes had a lot of decimals behind the comma
  const roundedValue = (value) => Number((value * 100).toFixed(2));

  // Function to calculate average rating score for a beer type
  const calculateAverageRatingScore = (beerTypeData) => {
    // Filter out rating scores that are 0
    const filteredScoresAboveZero = beerTypeData
      .map((beer) => beer.rating_score)
      .filter((score) => score > 0);

    // Calculate the sum of all rating scores
    const totalScoreSum = filteredScoresAboveZero.reduce((sum, score) => sum + score, 0);

    // Calculate the average rating score
    const averageRatingScore = totalScoreSum / filteredScoresAboveZero.length;

    return roundedValue(averageRatingScore);
  };

  // Function to calculate top beer types by occurrence and their statistics
  const calculateBeerTypeStatistics = () => {
    // Object to store occurrences for each beer type
    const beerTypeOccurrences = {};

    // Iterate over beerData to count occurrences
    beerData.forEach((beer) => {
      const { beer_type } = beer;
      // Increment occurrence count for beer type
      beerTypeOccurrences[beer_type] = beerTypeOccurrences[beer_type]
        ? beerTypeOccurrences[beer_type] + 1
        : 1;
    });

    // Filter out beer types that appear only once
    const filteredBeerTypes = Object.entries(beerTypeOccurrences).filter(
      ([, count]) => count > 1
    );

    // Calculate statistics for top beer types
    const topBeerTypeStatistics = filteredBeerTypes.map(([beerType], i) => {
      const beerTypeData = beerData.filter((beer) => beer.beer_type === beerType);
      // Calculate average rating score for the current beer type
      const averageRating = calculateAverageRatingScore(beerTypeData);

      // Filter out rating scores that are 0
      const filteredRatingScores = beerTypeData.map((beer) => beer.rating_score);
      // Calculate lowest and highest rating scores for the current beer type
      const filteredScoresAboveZero = filteredRatingScores.filter((score) => score > 0);

      const lowestRatingScore = Math.min(...filteredScoresAboveZero);
      const highestRatingScore = Math.max(...filteredScoresAboveZero);

      // Find the corresponding bid for the lowest and highest rating scores
      const min_bid = beerTypeData.find(
        (beer) => beer.rating_score === lowestRatingScore
      )?.bid;
      const max_bid = beerTypeData.find(
        (beer) => beer.rating_score === highestRatingScore
      )?.bid;

      return {
        beer_type: beerType,
        total_results: beerTypeOccurrences[beerType],
        min: roundedValue(lowestRatingScore),
        min_bid: min_bid || 0, // Use 0 if min_bid is undefined
        max: roundedValue(highestRatingScore),
        max_bid: max_bid || 0, // Use 0 if max_bid is undefined
        key: i,
        avg_rating: averageRating.toFixed(),
      };
    });

    const sortedTopBeerTypes = removeNullItemsFromArray(topBeerTypeStatistics).sort(
      (a, b) => b.min + b.max - (a.min + a.max)
    );

    return sortedTopBeerTypes;
  };

  // Calculate top beer type statistics and filter out min and max with the same value
  return calculateBeerTypeStatistics();
};
