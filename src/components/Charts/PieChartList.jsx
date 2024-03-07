import { useState } from 'react';
import PropTypes from 'prop-types';
import PieChart from './PieChart.jsx';

const PieChartList = ({ beerData }) => {
  const pieChartList = [
    {
      title: 'Top 10 beer styles',
      name: 'beer_type',
    },
    {
      title: 'Top 10 breweries',
      name: 'brewery_name',
      url_type: 'brewery_url',
    },
    {
      title: 'Top 10 brewery country',
      name: 'brewery_country',
    },
    {
      title: 'Top 10 brewery cities',
      name: 'brewery_city',
    },
    {
      title: 'Top 10 flavor combinations',
      name: 'flavor_profiles',
    },
    {
      title: 'Top 10 most drank beers',
      name: 'bid',
      url_type: 'beer_url',
    },
    {
      title: 'Top 10 venues',
      name: 'venue_name',
    },
    {
      title: 'Top 10 venue cities',
      name: 'venue_city',
    },
    {
      title: 'Top 10 venue countries',
      name: 'venue_country',
    },
    {
      title: 'Top 10 venues purchased (untappd removed this data)',
      name: 'purchase_venue',
    },
  ];
  const [selectedPieChartData, setSelectedPieChartData] = useState(pieChartList[0].name);
  //  get extra data based on chosen option:
  const selectedChartData = pieChartList.find(
    (chart) => chart.name === selectedPieChartData
  );
  const urlType = selectedChartData?.url_type;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-8">Frequency pie charts</h2>
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
      <PieChart dataType={selectedPieChartData} beerData={beerData} urlType={urlType} />
    </div>
  );
};

PieChartList.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default PieChartList;
