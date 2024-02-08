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
      title: 'Top 10 Most drank beers',
      name: 'beer_name',
    },
    {
      title: 'Top 10 Venues Purchased',
      name: 'purchase_venue',
    },
    {
      title: 'Top 10 Venues',
      name: 'venue_name',
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
      title: 'Top 10 Brewery Country',
      name: 'brewery_country',
    },
    {
      title: 'Top 10 Brewery Cities',
      name: 'brewery_city',
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
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-8">Select Top 10 List</h2>
      <select
        className="shadow appearance-none mb-8 border bg-gray-900 rounded w-full border-white py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
