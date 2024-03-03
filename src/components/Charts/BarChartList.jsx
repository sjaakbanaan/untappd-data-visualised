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
      title: 'Beers per day',
      name: 'beers_per_day',
    },
    {
      title: 'Beers per month',
      name: 'beers_per_month',
    },
    {
      title: 'Beers per year',
      name: 'beers_per_year',
    },
    {
      title: 'Rating scores',
      name: 'rating_score',
    },
    {
      title: 'Serving type',
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
      <h2 className="text-lg font-semibold mb-8">Frequency bar charts</h2>
      <select
        className="shadow mb-8 appearance-none border bg-gray-900 rounded w-full border-white py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        value={selectedBarChartData}
        onChange={(e) => setSelectedBarChartData(e.target.value)}
      >
        {beerData.length > 1 &&
          barChartList.map((item) => {
            return (
              <option key={item.name} value={item.name}>
                {item.title}
              </option>
            );
          })}
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
