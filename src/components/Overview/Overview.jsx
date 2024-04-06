import { useState } from 'react';
import OverviewCard from './OverviewCard.jsx';

const Overview = ({ beerData }) => {
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  // at how many results should the overview be hidden behind a button?
  const buttonNumber = 200;

  return (
    <>
      {beerData?.length > buttonNumber && (
        <div className="mt-6 mb-2 flex justify-center">
          <button
            className="bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300 text-white font-bold py-3 px-5 rounded mr-2"
            onClick={handleToggleOverview}
          >
            {showOverview ? 'Hide Overview' : 'Show Overview'}
          </button>
        </div>
      )}
      {(showOverview || beerData?.length <= buttonNumber) && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {beerData?.length > 0 &&
            beerData.map((item, i) => <OverviewCard key={i} item={item} />)}
        </div>
      )}
    </>
  );
};

export default Overview;
