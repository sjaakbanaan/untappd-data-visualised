const BeerTypeMinMax = ({ spanClass, min, minBid, max, maxBid, avgRating }) => {
  return (
    <span className={spanClass}>
      {' '}
      <a href={`https://www.untappd.com/beer/${minBid}`} target="_blank">
        {min / 100}
      </a>
      {' / '}
      <a href={`https://www.untappd.com/beer/${maxBid}`} target="_blank">
        {max / 100}
      </a>
      {avgRating && <span> - avg: {avgRating / 100}</span>}
    </span>
  );
};
export default BeerTypeMinMax;
