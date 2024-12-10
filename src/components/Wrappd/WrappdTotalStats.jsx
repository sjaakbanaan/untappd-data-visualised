const WrappdTotalStats = ({ stats }) => {
  if (stats.length === 0) return null;

  return (
    <div className="w-full">
      <ul className="mb-10">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide &&
              !item.topList && (
                <li key={i} className="my-2">
                  <div className="flex items-center justify-between">
                    {item.key}
                    <span className="ml-10 whitespace-nowrap text-gray-400">
                      {item.value}
                    </span>
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default WrappdTotalStats;
