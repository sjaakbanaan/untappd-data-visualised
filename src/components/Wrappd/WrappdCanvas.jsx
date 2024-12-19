import { formatWrappdDates, useWrappdData } from '../../utils';
import WrappdPhotos from './WrappdPhotos.jsx';
import WrappdTopStats from './WrappdTopStats.jsx';
import WrappdTotalStats from './WrappdTotalStats.jsx';

const WrappdCanvas = ({
  beerData,
  fullBeerData,
  userName,
  filterDateRange,
  elementRef,
  customTitle,
}) => {
  const { stats, topLists } = useWrappdData(beerData, fullBeerData, filterDateRange);

  return (
    <div className="w-[720px] bg-wrappd-gradient p-10" ref={elementRef}>
      <div className="rounded-2xl bg-wrappdBlack p-10 text-white">
        <div className="mb-10 flex items-center">
          <img
            className="mr-6 w-32 rounded-full"
            src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
            alt=""
          />
          <div>
            <div className="-mt-8 mb-2 text-3xl">{userName}</div>
            <div className="text-wrappdYellow">
              {customTitle
                ? customTitle
                : formatWrappdDates(filterDateRange.start, filterDateRange.end)}
            </div>
          </div>
        </div>
        <WrappdTotalStats stats={stats} />
        <WrappdPhotos topList={topLists.find((item) => item.title === 'Top 5 beers')} />
        {topLists.map((topList, index) => (
          <WrappdTopStats
            key={index}
            title={topList.title}
            items={topList.items}
            valueKey={topList.valueKey}
            suffix={topList.suffix}
          />
        ))}
        <div className="mt-12 flex flex-row items-center text-2xl">
          <img src="/logo-wrappd.png" className="-mb-2 mr-6 w-[78px]" alt="" />
          <div>
            <div className="-mt-2 font-bold">Tappd Wrappd</div>
            <div className="-mt-2 text-wrappdYellow">Create your own at tappd.online</div>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className="relative z-10 inline-flex flex-col items-center justify-center overflow-hidden whitespace-nowrap border border-white bg-gray-800 bg-cover p-10 text-lg text-white before:absolute before:top-0 before:z-[-1] before:block before:size-full before:bg-gray-800 before:opacity-90"
    //   ref={elementRef}
    //   style={{
    //     backgroundImage: 'url(/logo512.png)',
    //   }}
    // >
    //   <img src="/logo512.png" style={{ width: '64px' }} alt="" />
    //   <h2 className="mt-6 text-2xl font-bold">Untappd stats for {userName}</h2>
    //   <div className="mb-4 mt-2">
    // {customTitle
    //   ? customTitle
    //   : formatWrappdDates(filterDateRange.start, filterDateRange.end)}
    //   </div>
    //   <WrappdTotalStats stats={stats} />
    // {topLists.map((topList, index) => (
    //   <WrappdTopStats
    //     key={index}
    //     title={topList.title}
    //     items={topList.items}
    //     valueKey={topList.valueKey}
    //     suffix={topList.suffix}
    //   />
    // ))}
    //   <div className="mt-10 w-full text-right text-sm">
    //     create your own on{' '}
    //     <a target="_blank" className="font-bold" href="https://tapped.online">
    //       tapped.online
    //     </a>
    //   </div>
    // </div>
  );
};

export default WrappdCanvas;
