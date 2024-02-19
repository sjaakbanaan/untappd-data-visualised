import { useState } from 'react';
import PropTypes from 'prop-types';
import TopTable from './TopTable.jsx';

const TopTableList = ({ beerData }) => {
  const tableList = [
    {
      dataType: 'topBeers',
      scoreType: 'rating_score',
      key: 'topBeersRatingScore',
      title: 'Top 10 rated beers (by you)',
    },
    {
      dataType: 'topBeers',
      scoreType: 'global_weighted_rating_score',
      key: 'topBeersGloalRatingScore',
      title: 'Top 10 rated beers (global / you (diff))',
      selfCompare: true,
    },
    {
      dataType: 'topBeers',
      scoreType: 'beer_abv',
      key: 'topBeersAbv',
      title: 'Top 10 strongest beers',
    },
    {
      dataType: 'topBeers',
      scoreType: 'total_toasts',
      key: 'topBeersTotalToasts',
      title: 'Top 10 toasts',
    },
    {
      dataType: 'topBeers',
      scoreType: 'total_comments',
      key: 'TopBeersTotalComments',
      title: 'Top 10 comments',
    },
    {
      dataType: 'flavorProfiles',
      lowerCase: true,
      key: 'flavorProfiles',
      title: 'Top flavour profiles',
    },
    {
      dataType: 'flavorProfileCombis',
      lowerCase: true,
      key: 'flavorProfileCombis',
      title: 'Top flavour profile combinations',
    },
    {
      dataType: 'friends',
      key: 'friends',
      title: 'Tagged friends',
    },
    {
      dataType: 'topByRating',
      scoreType: 'brewery_name',
      key: 'topByRatingBreweryName',
      title: 'Breweries by rating',
    },
    {
      dataType: 'topByRating',
      scoreType: 'beer_type',
      key: 'topByRatingBeerType',
      title: 'Beer types by rating',
    },
  ];

  const [selectedTopList, setSelectedTopList] = useState(tableList[0].key);
  //  get extra data based on chosen option:
  const selectedChartData = tableList.find((chart) => chart.key === selectedTopList);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-8">Other Top 10 lists</h2>
      <select
        className="shadow appearance-none mb-8 border bg-gray-900 rounded w-full border-white py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        value={selectedTopList}
        onChange={(e) => setSelectedTopList(e.target.value)}
      >
        {beerData.length > 1 &&
          tableList.map((item) => (
            <option key={item.key} value={item.key}>
              {item.title}
            </option>
          ))}
      </select>
      <TopTable
        beerData={beerData}
        dataType={selectedChartData.dataType}
        title={selectedChartData.title}
        scoreType={selectedChartData.scoreType}
        selfCompare={selectedChartData.selfCompare}
        lowerCase={selectedChartData.lowerCase}
      />
    </div>
  );
};

TopTableList.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default TopTableList;
