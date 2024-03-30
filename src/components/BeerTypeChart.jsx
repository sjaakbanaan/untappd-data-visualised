import { getBarChartTopBottomData } from '../utils/';

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
                  className="bg-yellow-600 whitespace-nowrap h-6 text-center text-xs leading-6"
                >
                  <span className="mr-2">
                    {item.min / 100} / {item.max / 100}
                  </span>
                  <div className="text-sm absolute left-0 top-0 leading-6">
                    {item.beer_type}{' '}
                    <span className="text-yellow-600">
                      {item.min / 100} / {item.max / 100}
                    </span>
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
