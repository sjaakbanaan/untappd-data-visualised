import PropTypes from 'prop-types';
import WrappdTopStats from './WrappdTopStats';
import WrappdHeader from './WrappdHeader';
import WrappdStats from './WrappdStats';
import WrappdPhotos from './WrappdPhotos';
import WrappdFooter from './WrappdFooter';

const WrappdLayout = ({ userName, userAvatar, dateRange, stats, topLists }) => {
  const photosList = topLists.find((item) => item.title === 'Top 5 beers');

  return (
    <div className="py-0 md:py-8">
      <div className="container mx-auto max-w-screen-md overflow-hidden bg-gray-900 px-4 py-8 md:rounded-3xl md:p-10">
        <WrappdHeader userName={userName} userAvatar={userAvatar} dateRange={dateRange} />
        <WrappdStats stats={stats} />
        <WrappdPhotos photosList={photosList} />
        {topLists.map((topList, index) => (
          <WrappdTopStats
            key={index}
            title={topList.title}
            items={topList.items.slice(0, 5)}
            valueKey={topList.valueKey}
            suffix={topList.suffix}
          />
        ))}
        <WrappdFooter />
      </div>
    </div>
  );
};

WrappdLayout.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      suffix: PropTypes.string,
    })
  ).isRequired,
  topLists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    })
  ).isRequired,
};

export default WrappdLayout;
