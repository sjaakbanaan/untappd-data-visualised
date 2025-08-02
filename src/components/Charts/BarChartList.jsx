import { useState } from 'react';
import PropTypes from 'prop-types';
import BarChart from './BarChart';

const BarChartList = ({ beerData, filterDateRange }) => {
  // func to check if date ranger is great than 1 year, if so return true
  const isDateRangeGreaterThanOneYear = () => {
    const startDate = new Date(filterDateRange.start);
    const endDate = new Date(filterDateRange.end);
    const diffInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    return diffInMonths > 12;
  };

  const barChartList = [
    {
      title: 'Beer ABV',
      name: 'beer_abv',
      trailing_char: '%',
    },
    {
      title: 'Beers per hour',
      name: 'beers_per_hour',
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
      title: 'Beers per month (with year)',
      name: 'beers_per_month_year',
      conditional: true,
    },
    {
      title: 'Beers per year',
      name: 'beers_per_year',
      conditional: true,
    },
    {
      title: 'Rating scores',
      name: 'rating_score',
    },
    {
      title: 'Serving type',
      name: 'serving_type',
    },
    {
      title: 'Your average rating',
      name: 'avg_rating',
    },
    {
      title: 'Global average rating',
      name: 'avg_global_rating',
    },
  ];
  const [selectedBarChartData, setSelectedBarChartData] = useState(barChartList[0].name);

  const selectedChartData = barChartList.find(
    (chart) => chart.name === selectedBarChartData
  );
  const trailingChar = selectedChartData?.trailing_char || '';

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Frequency bar charts</h2>
      <select
        className="mb-8 w-full appearance-none rounded border border-white bg-gray-900 px-3 py-2 leading-tight text-white shadow focus:outline-none"
        value={selectedBarChartData}
        onChange={(e) => setSelectedBarChartData(e.target.value)}
      >
        {beerData.length > 1 &&
          barChartList.map((item) => {
            if (item.conditional && !isDateRangeGreaterThanOneYear()) {
              return null; // if the date range is greater than 1 year, don't show the chart
            }
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
  filterDateRange: PropTypes.object.isRequired,
};

export default BarChartList;
