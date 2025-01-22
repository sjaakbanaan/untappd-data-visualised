import PropTypes from 'prop-types';
import { getOverviewStats } from '../../utils';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const infoToShow = [
    'Total Beers',
    'Unique beers',
    'Beer styles',
    'Photos added',
    'Toasts received',
    'Comments received',
    'Venues drank at',
    'Venues purchased',
    'Cities drank in',
    'Countries drank in',
    'Brewery countries',
    'Unique friends',
    'Years active',
    'Days active',
  ];

  const stats = getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow);

  return (
    <div className="p-4">
      <h2 className="mb-6 text-lg font-semibold">Basic statistics</h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide && (
                <li key={i} className="rounded-lg bg-gray-700 p-4">
                  <div className="grid h-full grid-rows-auto-1fr text-center text-xl">
                    <div>{item.key}</div>
                    <div className="my-4 flex items-center justify-center whitespace-nowrap">
                      <div className=" min-h-[40px] text-[60px] font-extrabold text-yellow-500">
                        {item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </div>
                    </div>
                    <div className="flex justify-center text-gray-400">
                      <span>{item.suffix}</span>
                    </div>
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

BasicStats.propTypes = {
  beerData: PropTypes.array.isRequired,
  fullBeerData: PropTypes.array.isRequired,
};

export default BasicStats;
