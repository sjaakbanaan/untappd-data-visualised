import { useRef, useState } from 'react';
import OverviewCard from './OverviewCard.jsx';
import Pagination from './Pagination.jsx';
import Icon from '../Icon/Icon.jsx';

const Overview = ({ beerData, lessCols }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('asc');
  const ItemsPerPage = 40;
  const overviewRef = useRef(null);
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = currentPage * ItemsPerPage;

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleSortCriteria = (criteria) => {
    setSortCriteria(criteria);
    toggleSortOrder();
  };

  const sortedBeerData = [...beerData].sort((a, b) => {
    const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
    if (sortCriteria === 'created_at') {
      return sortOrderFactor * (new Date(a.created_at) - new Date(b.created_at));
    } else {
      return sortOrderFactor * (a[sortCriteria] - b[sortCriteria]);
    }
  });

  const buttons = [
    {
      title: 'rating',
      type: 'rating_score',
    },
    {
      title: 'global rating',
      type: 'global_rating_score',
    },
    {
      title: 'date',
      type: 'created_at',
    },
  ];

  return (
    <div className="container relative mx-auto">
      <div ref={overviewRef}>
        <div className="flex justify-center">
          {buttons.length > 1 &&
            buttons.map((item, i) => (
              <button
                key={i}
                className={`mx-2 mb-0 flex items-center rounded border px-3 py-2 shadow transition-colors duration-300
                ${
                  sortCriteria === item.type
                    ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                    : 'bg-gray-900 text-white hover:bg-gray-700'
                }`}
                type="button"
                onClick={() => toggleSortCriteria(item.type)}
              >
                Sort by {item.title}
                {sortCriteria === item.type && (
                  <Icon
                    icon="ARROW"
                    style={{ width: '16px', height: '16px' }}
                    className={`ml-2 fill-black ${sortOrder === 'asc' && 'rotate-180'}`}
                  />
                )}
              </button>
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          beerData={sortedBeerData}
          ItemsPerPage={ItemsPerPage}
          overviewRef={overviewRef}
        />
        <div
          className={`
            grid grid-cols-1 gap-6 pt-8 md:grid-cols-2
            ${lessCols ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}
          `}
        >
          {sortedBeerData.slice(startIndex, endIndex).map((item, i) => (
            <OverviewCard key={i} item={item} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          beerData={sortedBeerData}
          ItemsPerPage={ItemsPerPage}
          overviewRef={overviewRef}
        />
      </div>
    </div>
  );
};

export default Overview;
