import { useWrappdData, getLocalStorageData } from '../../utils';
import { useEffect, useState } from 'react';
// import WrappdPhotos from './WrappdPhotos';
import WrappdTopStats from './WrappdTopStats';
import WrappdTotalStats from './WrappdTotalStats';
import WrappdHeader from './WrappdHeader';
import WrappdFooter from './WrappdFooter';

const WrappdCanvas = ({
  beerData,
  fullBeerData,
  userName,
  filterDateRange,
  elementRef,
  customTitle,
}) => {
  const [storedAvatar, setStoredAvatar] = useState(null);
  const { stats, topLists } = useWrappdData(beerData, fullBeerData, filterDateRange);

  useEffect(() => {
    // Check for userDetails in local storage
    setStoredAvatar(getLocalStorageData('untappd_avatar'));
  }, []); // Run only on component mount

  return (
    <div className="h-0 overflow-hidden">
      <div className="w-[720px] bg-wrappd-gradient p-10" ref={elementRef}>
        <div className="rounded-2xl bg-wrappdBlack p-10 text-white">
          <WrappdHeader
            userName={userName}
            storedAvatar={storedAvatar}
            customTitle={customTitle}
            filterDateRange={filterDateRange}
          />
          <WrappdTotalStats stats={stats} />
          {/* <WrappdPhotos topList={topLists.find((item) => item.title === 'Top 5 beers')} /> */}
          {topLists.map((topList, index) => (
            <WrappdTopStats
              key={index}
              title={topList.title}
              items={topList.items}
              valueKey={topList.valueKey}
              suffix={topList.suffix}
            />
          ))}
          <WrappdFooter />
        </div>
      </div>
    </div>
  );
};

export default WrappdCanvas;
