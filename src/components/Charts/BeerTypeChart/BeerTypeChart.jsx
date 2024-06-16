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
      <h2 className="mb-6 text-lg font-semibold">
        Beer type appreciation <span className="text-gray-400">({dataList.length})</span>
      </h2>

      {dataList.length > 10 && (
        <button
          className="mb-4 rounded border bg-gray-900 px-3 py-2 text-white shadow transition-colors duration-300 hover:bg-gray-700"
          type="button"
          onClick={() => setListToggle(listToggle ? false : true)}
        >
          {listToggle ? 'show all' : 'show less'}
        </button>
      )}

      {toggledDataList.length > 1 && (
        <ul className="m-0 flex list-none flex-col divide-y divide-gray-700 overflow-hidden p-0 text-white transition-all duration-300">
          {toggledDataList.map((item) => (
            <li className="flex items-center" key={item.key}>
              <div className="relative grid w-full grid-cols-500">
                <div
                  style={{
                    gridColumnStart: item && item.min + 1,
                    gridColumnEnd: item && item.max + 1,
                  }}
                  className="flex h-8 items-center whitespace-nowrap rounded-lg text-center text-xs leading-6 md:bg-yellow-500"
                >
                  <BeerTypeMinMax
                    spanClass="mx-1 bg-gray-800 px-3 rounded-lg hidden md:block"
                    item={item}
                    showRating
                  />
                  <div className="absolute left-0 top-1 bg-gray-800 text-sm leading-6">
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
