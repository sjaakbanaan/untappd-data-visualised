const BeerTypeRating = ({ spanClass, item, showRating }) => {
  return (
    <span className={spanClass}>
      {item.min != item.max && (
        <>
          <a href={`https://www.untappd.com/beer/${item.min_bid}`} target="_blank">
            {item.min / 100}
          </a>
          {' / '}
        </>
      )}
      <a href={`https://www.untappd.com/beer/${item.max_bid}`} target="_blank">
        {item.max / 100}
      </a>
      {showRating && item.min != item.max && ` - avg: ${item.avg_rating / 100}`}
    </span>
  );
};
export default BeerTypeRating;
