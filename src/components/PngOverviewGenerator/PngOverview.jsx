import { formatPngDates } from '../../utils';

/*
- top 5 beers (highest rating)
- top 5 worst beers (lowest rating)
- top 5 brewers (most)
- top 5 venues (exl. home)
*/

const PngOverview = ({
  userName,
  captureScreenshot,
  stats,
  high5Beers,
  low5Beers,
  filterDateRange,
  elementRef,
}) => {
  return (
    <div className="mb-20">
      <button onClick={captureScreenshot} className="mb-10 mt-4 border p-4">
        Generate PNG
      </button>
      <br />
      <div
        className="relative z-10 inline-flex flex-col items-center justify-center overflow-hidden whitespace-nowrap border border-white bg-gray-800 bg-cover p-10 text-lg text-white before:absolute before:top-0 before:z-[-1] before:block before:size-full before:bg-gray-800 before:opacity-90"
        ref={elementRef}
        style={{
          backgroundImage: 'url(/logo512.png)',
        }}
      >
        <img src="/logo512.png" style={{ width: '64px' }} alt="" />
        <h2 className="mt-6 text-2xl font-bold">Untappd stats for {userName}</h2>
        <div className="mb-4 mt-2">
          {formatPngDates(filterDateRange.start, filterDateRange.end)}
        </div>
        <div className="w-full">
          <h2 className="mb-2 font-bold">Top 5 beers (by rating)</h2>
          <ul className="mb-10 w-full">
            {high5Beers.processedList.length > 0 &&
              high5Beers.processedList.map((item, i) => (
                <li key={i} className="my-2">
                  <div className="flex items-center justify-between">
                    {item.name}
                    <span className="ml-10 whitespace-nowrap text-gray-400">
                      {item.value}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-bold">Worst 5 beers (by rating)</h2>
          <ul className="mb-10 w-full">
            {low5Beers.processedList.length > 0 &&
              low5Beers.processedList.map((item, i) => (
                <li key={i} className="my-2">
                  <div className="flex items-center justify-between">
                    {item.name}
                    <span className="ml-10 whitespace-nowrap text-gray-400">
                      {item.value}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <ul className="w-full">
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
        <div className="mt-10 w-full text-right text-sm">
          create your own on{' '}
          <a target="_blank" className="font-bold" href="https://tapped.online">
            tapped.online
          </a>
        </div>
      </div>
    </div>
  );
};

export default PngOverview;
