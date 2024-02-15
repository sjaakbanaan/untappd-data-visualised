import PropTypes from 'prop-types';

const BeerStyleRatingSummary = ({ beerData }) => {
  // Process beer styles and their ratings
  const beerStyles = {};
  beerData.forEach((beer) => {
    if (!beerStyles[beer.beer_type]) {
      beerStyles[beer.beer_type] = {
        minRating: parseFloat(beer.rating_score),
        maxRating: parseFloat(beer.rating_score),
        count: 1,
      };
    } else {
      const style = beerStyles[beer.beer_type];
      style.minRating = Math.min(style.minRating, parseFloat(beer.rating_score));
      style.maxRating = Math.max(style.maxRating, parseFloat(beer.rating_score));
      style.count++;
    }
  });

  // Calculate average rating for each beer style
  const beerStyleAverages = Object.keys(beerStyles).map((style) => {
    const { minRating, maxRating } = beerStyles[style];
    const averageRating = (minRating + maxRating) / 2;
    return {
      style,
      minRating,
      maxRating,
      averageRating: parseFloat(averageRating.toFixed(2)), // Ensure the average rating is numeric
    };
  });

  // Sort beer styles by average rating
  beerStyleAverages.sort((a, b) => a.averageRating - b.averageRating);

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Beer Style Ratings Summary</h2>
      {console.log('beerStyleAverages', beerStyleAverages)}
      <ul>
        {beerStyleAverages.map((beerStyle) => (
          <li key={beerStyle.style}>
            <span className="font-semibold">{beerStyle.style}:</span>{' '}
            {beerStyle?.minRating.toFixed(2)} - {beerStyle?.maxRating.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

BeerStyleRatingSummary.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default BeerStyleRatingSummary;
