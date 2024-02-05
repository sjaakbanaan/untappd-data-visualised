import { useState } from 'react';
import PropTypes from 'prop-types';
import BarChart from './BarChart.jsx';

const BarChartList = ({ beerData }) => {
  const barChartList = [
    {
      title: 'Beer ABV',
      name: 'beer_abv',
      trailing_char: '%',
    },
    {
      title: 'Beer IBU',
      name: 'beer_ibu',
    },
    {
      title: 'Rating Scores',
      name: 'rating_score',
    },
    {
      title: 'Serving Type',
      name: 'serving_type',
    },
  ];
  const [selectedBarChartData, setSelectedBarChartData] = useState(barChartList[0].name);

  const selectedChartData = barChartList.find(
    (chart) => chart.name === selectedBarChartData
  );
  const trailingChar = selectedChartData?.trailing_char || '';

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-8">Select Frequency List</h2>
      <select
        className="shadow border rounded w-full py-2 px- mb-4 text-gray-900 focus:outline-none focus:shadow-outline"
        value={selectedBarChartData}
        onChange={(e) => setSelectedBarChartData(e.target.value)}
      >
        {beerData.length > 1 &&
          barChartList.map((item) => (
            <option key={item.name} value={item.name}>
              {item.title}
            </option>
          ))}
      </select>
      <BarChart
        dataType={selectedBarChartData}
        beerData={beerData}
        trailingChar={trailingChar}
      />
    </div>
  );
};

BarChartList.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default BarChartList;
