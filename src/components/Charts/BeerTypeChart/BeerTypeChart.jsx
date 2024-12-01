import { useState, useEffect } from 'react';
import { getBarChartTopBottomData } from '../../../utils';
import BeerTypeRating from './BeerTypeRating.jsx';

const BeerTypeChart = ({ beerData }) => {
  const dataList = getBarChartTopBottomData(beerData);
  const [listToggle, setListToggle] = useState(true);
  const [toggledDataList, setToggledDataList] = useState([]);
  const [sortColumn, setSortColumn] = useState('rating'); // 'beer_type' or 'rating'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  // Sort and toggle the data list
  useEffect(() => {
    const sortedData = [...dataList].sort((a, b) => {
      if (sortColumn === 'beer_type') {
        return sortOrder === 'asc'
          ? a.beer_type.localeCompare(b.beer_type)
          : b.beer_type.localeCompare(a.beer_type);
      } else if (sortColumn === 'rating') {
        const aRating = a.min + a.max;
        const bRating = b.min + b.max;
        return sortOrder === 'asc' ? aRating - bRating : bRating - aRating;
      } else if (sortColumn === 'total_results') {
        return sortOrder === 'asc'
          ? a.total_results - b.total_results
          : b.total_results - a.total_results;
      }
      return 0;
    });

    setToggledDataList(listToggle ? sortedData.slice(0, 10) : sortedData);
  }, [dataList, listToggle, sortColumn, sortOrder]);

  const toggleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-6 text-lg font-semibold">
        Beer type appreciation <span className="text-gray-400">({dataList.length})</span>
      </h2>

      {dataList.length > 10 && (
        <button
          className="mb-4 rounded border bg-gray-900 px-3 py-2 text-white shadow transition-colors duration-300 hover:bg-gray-700"
          type="button"
          onClick={() => setListToggle(!listToggle)}
        >
          {listToggle ? 'Show all' : 'Show less'}
        </button>
      )}

      {toggledDataList.length > 0 && (
        <ul className="m-0 flex list-none flex-col divide-y divide-gray-700 overflow-hidden p-0 text-white transition-all duration-300">
          <li className="my-2 flex w-full items-center justify-between text-sm font-bold">
            <div>
              <button onClick={() => toggleSort('beer_type')}>
                Beer type{' '}
                {sortColumn === 'beer_type' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button className="ml-6" onClick={() => toggleSort('total_results')}>
                Total results
                {sortColumn === 'total_results' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
            <button onClick={() => toggleSort('rating')}>
              Rating {sortColumn === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </li>
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
                  <BeerTypeRating
                    spanClass="mx-1 bg-gray-800 px-3 rounded-lg hidden md:block"
                    item={item}
                    showRating
                  />
                  <div className="absolute left-0 top-1 bg-gray-800 text-sm leading-6">
                    {item.beer_type}{' '}
                    <span className="text-gray-400">({item.total_results})</span>{' '}
                    <BeerTypeRating hasBg spanClass="text-yellow-500" item={item} />
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
