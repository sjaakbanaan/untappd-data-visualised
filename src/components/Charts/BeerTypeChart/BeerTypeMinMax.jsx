const BeerTypeMinMax = ({ spanClass, item }) => {
  return (
    <span className={spanClass}>
      {' '}
      <a href={`https://www.untappd.com/beer/${item.min_bid}`} target="_blank">
        {item.min / 100}
      </a>
      {' / '}
      <a href={`https://www.untappd.com/beer/${item.max_bid}`} target="_blank">
        {item.max / 100}
      </a>
      {item.avg_rating && <span> - avg: {item.avg_rating / 100}</span>}
    </span>
  );
};
export default BeerTypeMinMax;
