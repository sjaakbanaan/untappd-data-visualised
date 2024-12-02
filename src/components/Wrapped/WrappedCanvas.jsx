import { formatWrappedDates, useWrappedData } from '../../utils';
import WrappedTopStats from './WrappedTopStats.jsx';
import WrappedTotalStats from './WrappedTotalStats.jsx';

const WrappedCanvas = ({
  beerData,
  fullBeerData,
  userName,
  filterDateRange,
  elementRef,
  customTitle,
}) => {
  const { stats, topLists } = useWrappedData(beerData, fullBeerData, filterDateRange);

  return (
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
        {customTitle
          ? customTitle
          : formatWrappedDates(filterDateRange.start, filterDateRange.end)}
      </div>
      <WrappedTotalStats stats={stats} />
      {topLists.map((topList, index) => (
        <WrappedTopStats
          key={index}
          title={topList.title}
          items={topList.items}
          valueKey={topList.valueKey}
          suffix={topList.suffix}
        />
      ))}
      <div className="mt-10 w-full text-right text-sm">
        create your own on{' '}
        <a target="_blank" className="font-bold" href="https://tapped.online">
          tapped.online
        </a>
      </div>
    </div>
  );
};

export default WrappedCanvas;
