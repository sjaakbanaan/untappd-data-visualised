import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ beerData }) => {
  // Function to process brewery names and return a dataset for the Pie Chart
  const processBreweryData = () => {
    const breweryCount = beerData.reduce((acc, item) => {
      const breweryName = item.brewery_name || 'Onbekend';
      acc[breweryName] = (acc[breweryName] || 0) + 1;
      return acc;
    }, {});

    // Convert to array of objects
    const breweryList = Object.keys(breweryCount).map((breweryName) => ({
      name: breweryName,
      count: breweryCount[breweryName],
    }));

    // Sort by count in descending order and take the top 50
    const topBreweries = breweryList.sort((a, b) => b.count - a.count).slice(0, 10);

    const labels = topBreweries.map((brewery) => `${brewery.name}: ${brewery.count}`);
    const data = topBreweries.map((brewery) => brewery.count);

    return { labels, data };
  };

  const { labels, data } = processBreweryData();

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9933',
          '#66CC99',
          '#FF6666',
          '#C0C0C0',
          '#FF99CC',
          // Add more colors as needed
        ],
        hoverBackgroundColor: [
          '#D74D65',
          '#2D7CB5',
          '#CCAA4F',
          '#349292',
          '#7F5CA0',
          '#CC7F40',
          '#4F996E',
          '#CC4D4D',
          '#A0A0A0',
          // Add more colors as needed
        ],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Top 10 Breweries</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
