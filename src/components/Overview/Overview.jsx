import { useRef, useState } from 'react';
import OverviewCard from './OverviewCard.jsx';
import Pagination from './Pagination.jsx';

const Overview = ({ beerData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 50;
  const overviewRef = useRef(null);
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = currentPage * ItemsPerPage;

  return (
    <div className="pt-10 mb-6" ref={overviewRef}>
      <h2 className="text-2xl text-center font-bold">Beers overview</h2>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        beerData={beerData}
        ItemsPerPage={ItemsPerPage}
        overviewRef={overviewRef}
      />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-8">
        {beerData.slice(startIndex, endIndex).map((item, i) => (
          <OverviewCard key={i} item={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        beerData={beerData}
        ItemsPerPage={ItemsPerPage}
        overviewRef={overviewRef}
      />
    </div>
  );
};

export default Overview;
