import { formatWrappdDates, useWrappdData, getLocalStorageData } from '../../utils';
import { useEffect, useState } from 'react';
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

  const [storedAvatar, setStoredAvatar] = useState(null);

  useEffect(() => {
    // Check for userDetails in local storage
    setStoredAvatar(getLocalStorageData('untappd_avatar'));
  }, []); // Run only on component mount

  return (
    <div className="h-0 overflow-hidden">
      <div className="w-[720px] bg-wrappd-gradient p-10" ref={elementRef}>
        <div className="rounded-2xl bg-wrappdBlack p-10 text-white">
          <div className="mb-10 flex items-center">
            {storedAvatar && (
              <img className="mr-6 w-32 rounded-full" src={storedAvatar} alt="" />
            )}
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
              <div className="-mt-2 text-wrappdYellow">
                Create your own at tappd.online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrappdCanvas;
