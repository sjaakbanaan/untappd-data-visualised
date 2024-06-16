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
      title: 'Top 10 flavour profiles',
    },
    {
      dataType: 'friends',
      key: 'friends',
      title: 'Top 10 tagged friends',
    },
    {
      dataType: 'topByRating',
      scoreType: 'brewery_name',
      key: 'breweryRating',
      title: 'Top 10 breweries by rating',
      ratingType: 'rating_score',
    },
    {
      dataType: 'topByRating',
      scoreType: 'brewery_name',
      key: 'breweryRatingGlobal',
      title: 'Top 10 breweries by rating (global)',
      ratingType: 'global_rating_score',
    },
    {
      dataType: 'topByRating',
      scoreType: 'beer_type',
      key: 'topByRatingBeerType',
      title: 'Top 10 beer types by rating',
      ratingType: 'rating_score',
    },
  ];

  const [selectedTopList, setSelectedTopList] = useState(tableList[0].key);
  //  get extra data based on chosen option:
  const selectedChartData = tableList.find((chart) => chart.key === selectedTopList);

  return (
    <div className="p-4">
      <h2 className="mb-6 text-lg font-semibold">Other Top 10 lists</h2>
      <select
        className="mb-8 w-full appearance-none rounded border border-white bg-gray-900 px-3 py-2 leading-tight text-white shadow focus:outline-none"
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
        ratingType={selectedChartData.ratingType}
      />
    </div>
  );
};

TopTableList.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default TopTableList;
