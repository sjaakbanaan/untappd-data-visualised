export const getBarChartTopBottomData = (beerData) => {
  // utils
  const removeNullItemsFromArray = (arr) => {
    // Filter out null items
    const filteredArray = arr.filter((item) => item !== null);
    return filteredArray;
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

    const roundedValue = (value) => Number((value * 100).toFixed(2));

    // Calculate statistics for top beer types
    const topBeerTypeStatistics = filteredBeerTypes.map(([beerType], i) => {
      const beerTypeData = beerData.filter((beer) => beer.beer_type === beerType);

      // Filter out rating scores that are 0
      const filteredRatingScores = beerTypeData.map((beer) => beer.rating_score);

      // Calculate lowest and highest rating scores for the current beer type
      const lowestRatingScore = Math.min(...filteredRatingScores);
      const highestRatingScore = Math.max(...filteredRatingScores);

      // Check if min and max are the same
      if (lowestRatingScore === 0 || lowestRatingScore === highestRatingScore) {
        // Skip the return if min and max are the same
        return null;
      }

      return {
        beer_type: beerType,
        min: roundedValue(lowestRatingScore),
        max: roundedValue(highestRatingScore),
        key: i,
      };
    });

    const sortedTopBeerTypes = removeNullItemsFromArray(topBeerTypeStatistics).sort(
      (a, b) => a.min + a.max - (b.min + b.max)
    );

    // Filter out null values (where min and max are the same)
    // const filteredTopBeerTypeStatistics = sortedTopBeerTypes.filter(Boolean);
    return sortedTopBeerTypes;
  };

  // Calculate top beer type statistics and filter out min and max with the same value
  return calculateBeerTypeStatistics();
};
