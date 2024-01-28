import { useState } from 'react';
import PropTypes from 'prop-types';
import PieChart from './PieChart.jsx';

const PieChartList = ({ beerData }) => {
  const legendOptions = {
    display: true,
    position: 'bottom',
  };
  const pieChartList = [
    {
      title: 'Top 10 Breweries',
      name: 'brewery_name',
    },
    {
      title: 'Top 10 Beer Styles',
      name: 'beer_type',
    },
    {
      title: 'Top 10 Venues Purchased',
      name: 'purchase_venue',
    },
    {
      title: 'Top 10 Beer ABV',
      name: 'beer_abv',
      trailing_char: '%',
      // hide_count: true,
    },
    {
      title: 'Top 10 Venue Cities',
      name: 'venue_city',
    },
    {
      title: 'Top 10 Venue Countries',
      name: 'venue_country',
    },
    {
      title: 'Top 10 Rating Scores',
      name: 'rating_score',
    },
    {
      title: 'Top 10 Brewery Country',
      name: 'brewery_country',
    },
    {
      title: 'Top 10 Serving Type',
      name: 'serving_type',
    },
  ];
  const [selectedPieChartData, setSelectedPieChartData] = useState(pieChartList[0].name);
  //  get extra data based on chosen option:
  const selectedChartData = pieChartList.find(
    (chart) => chart.name === selectedPieChartData
  );
  const trailingChar = selectedChartData?.trailing_char || '';
  const hideCount = selectedChartData?.hide_count || false;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Select data type:</h2>
      <select
        className="shadow border rounded w-full py-2 px- mb-4 text-gray-900 focus:outline-none focus:shadow-outline"
        value={selectedPieChartData}
        onChange={(e) => setSelectedPieChartData(e.target.value)}
      >
        {beerData.length > 1 &&
          pieChartList.map((item) => (
            <option key={item.name} value={item.name}>
              {item.title}
            </option>
          ))}
      </select>
      <PieChart
        dataType={selectedPieChartData}
        options={{ legend: legendOptions }}
        beerData={beerData}
        trailingChar={trailingChar}
        hideCount={hideCount}
      />
    </div>
  );
};

PieChartList.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default PieChartList;
