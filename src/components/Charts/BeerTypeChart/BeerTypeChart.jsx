import { useState, useEffect } from 'react';
import { getBarChartTopBottomData } from '../../../utils';
import BeerTypeMinMax from './BeerTypeMinMax.jsx';

const BeerTypeChart = ({ beerData }) => {
  const dataList = getBarChartTopBottomData(beerData);
  const [listToggle, setListToggle] = useState(true);
  const [toggledDataList, setToggledDataList] = useState({});

  useEffect(() => {
    if (listToggle) {
      setToggledDataList(dataList.slice(0, 10));
    } else {
      setToggledDataList(dataList);
    }
  }, [beerData, listToggle]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-6">
        Beer type appreciation <span className="text-gray-400">({dataList.length})</span>
      </h2>

      {dataList.length > 10 && (
        <button
          className="transition-colors duration-300 shadow border rounded py-2 px-3 mb-4 text-white bg-gray-900 hover:bg-gray-700"
          type="button"
          onClick={() => setListToggle(listToggle ? false : true)}
        >
          {listToggle ? 'show all' : 'show less'}
        </button>
      )}

      {toggledDataList.length > 1 && (
        <ul className="m-0 p-0 list-none flex flex-col text-white divide-y divide-gray-700 transition-all duration-300 overflow-hidden">
          {toggledDataList.map((item) => (
            <li className="flex items-center" key={item.key}>
              <div className="grid w-full grid-cols-500 relative">
                <div
                  style={{
                    gridColumnStart: item && item.min + 1,
                    gridColumnEnd: item && item.max + 1,
                  }}
                  className="md:bg-yellow-500 rounded-lg whitespace-nowrap h-8 text-center flex items-center text-xs leading-6"
                >
                  <BeerTypeMinMax
                    spanClass="mx-1 bg-gray-800 px-3 rounded-lg hidden md:block"
                    item={item}
                    showRating
                  />
                  <div className="text-sm absolute left-0 top-1 leading-6 bg-gray-800">
                    {item.beer_type}{' '}
                    <span className="text-gray-400">({item.total_results})</span>{' '}
                    <BeerTypeMinMax hasBg spanClass="text-yellow-500" item={item} />
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
