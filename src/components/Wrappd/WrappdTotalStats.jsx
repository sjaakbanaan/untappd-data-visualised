const WrappdTotalStats = ({ stats }) => {
  if (stats.length === 0) return null;

  return (
    <div className="grid grid-flow-col gap-4 text-xl">
      {stats.length > 0 &&
        stats.map(
          (item, i) =>
            !item.hide &&
            !item.topList && (
              <div
                key={i}
                className="flex flex-col justify-between rounded-md border border-wrappdYellow p-3"
              >
                <div className="-mt-4">{item.short_key || item.key}</div>
                <div className="text-3xl font-bold text-wrappdYellow">{item.value}</div>
              </div>
            )
        )}
    </div>
  );
};

export default WrappdTotalStats;
