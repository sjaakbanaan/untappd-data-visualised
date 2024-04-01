import { getBarChartTopBottomData } from '../../../utils';
import BeerTypeMinMax from './BeerTypeMinMax.jsx';

const BeerTypeChart = ({ beerData }) => {
  const dataList = getBarChartTopBottomData(beerData);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-6">Beer type appreciation</h2>
      {dataList.length > 1 && (
        <ul className="m-0 p-0 list-none flex flex-col text-white divide-y divide-gray-700">
          {dataList.map((item) => (
            <li className="flex items-center" key={item.key}>
              <div className="grid w-full grid-cols-500 relative">
                <div
                  style={{
                    gridColumnStart: item.min + 1,
                    gridColumnEnd: item.max + 1,
                  }}
                  className="bg-yellow-700 whitespace-nowrap h-6 text-center text-xs leading-6"
                >
                  <BeerTypeMinMax
                    spanClass="mr-2"
                    min={item.min}
                    minBid={item.min_bid}
                    max={item.max}
                    maxBid={item.max_bid}
                    avgRating={item.avg_rating}
                  />
                  <div className="text-sm absolute left-0 top-0 leading-6">
                    {item.beer_type}{' '}
                    <span className="text-gray-400">({item.total_results})</span>{' '}
                    <BeerTypeMinMax
                      spanClass="text-yellow-400"
                      min={item.min}
                      minBid={item.min_bid}
                      max={item.max}
                      maxBid={item.max_bid}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BeerTypeChart;
