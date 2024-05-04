import { useRef, useState } from 'react';
import OverviewCard from './OverviewCard.jsx';
import Pagination from './Pagination.jsx';
import Icon from '../Maps/Icon/Icon.jsx';

const Overview = ({ beerData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('asc');
  const ItemsPerPage = 52;
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
      <div className="pt-10 mb-6" ref={overviewRef}>
        <h2 className="text-2xl text-center font-bold">Beers overview</h2>
        <div className="flex justify-center mt-10">
          {buttons.length > 1 &&
            buttons.map((item) => (
              <button
                className={`mx-2 transition-colors duration-300 shadow border rounded py-2 px-3 mb-4 flex items-center
                ${
                  sortCriteria === item.type
                    ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 border-yellow-500'
                    : 'text-white bg-gray-900 hover:bg-gray-700'
                }`}
                type="button"
                onClick={() => toggleSortCriteria(item.type)}
              >
                sort by {item.title}
                {sortCriteria === item.type && (
                  <Icon
                    icon="ARROW"
                    viewBox="0 0 24 24"
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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-8">
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
