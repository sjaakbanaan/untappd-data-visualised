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

  // const legendOptions = {
  //   display: true,
  //   position: 'bottom',
  //   labels: {
  //     fontColor: 'white', // Change this to the desired color for legend labels
  //   },
  // };

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#2C1450', // Dark Purple
          '#1C7042', // Dark Green
          '#71420A', // Dark Orange
          '#144432', // Dark Teal
          '#6B3D00', // Dark Brown
          '#6F0D36', // Dark Pink
          '#17402C', // Dark Greenish Teal
          '#6B1A1A', // Dark Red
          '#2C313E', // Very Dark Gray
          '#581534', // Darker Pink
          // Add more colors as needed
        ],
        hoverBackgroundColor: [
          '#24113D', // Darker Purple
          '#145B38', // Darker Green
          '#613D0A', // Darker Orange
          '#113027', // Darker Teal
          '#5F3800', // Darker Brown
          '#650A2D', // Darker Pink
          '#113E29', // Darker Greenish Teal
          '#5F1414', // Darker Red
          '#1E2128', // Very Darker Gray
          '#47112B', // Even Darker Pink
          // Add more colors as needed
        ],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Top 10 Breweries</h2>
      <Pie
        options={{
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'rgb(255, 255, 255)',
              },
            },
          },
        }}
        data={chartData}
      />
    </div>
  );
};

export default PieChart;
