import PropTypes from 'prop-types';
import { getOverviewStats } from '../../utils';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const infoToShow = [
    'Total beers',
    'Unique beers',
    'Total breweries',
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
    'Average rating',
  ];

  const stats = getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide && (
                <li
                  key={i}
                  className="block overflow-hidden bg-gray-800 px-4 py-8 shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
                >
                  <div className="grid h-full grid-rows-auto-1fr text-center text-xl">
                    <div className="font-bold">{item.key}</div>
                    <div className="mb-4 mt-6 flex items-center justify-center whitespace-nowrap">
                      <div className=" min-h-[40px] text-[60px] font-extrabold text-yellow-500">
                        {item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </div>
                    </div>
                    <div className="-mt-2 flex justify-center text-sm text-gray-500">
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
