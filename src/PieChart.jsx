import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ beerData, dataType }) => {
  const processData = () => {
    let dataMap = {};
    // Process brewery names
    dataMap = beerData.reduce((acc, item) => {
      const itemValue = item[dataType] || 'Unknown';
      acc[itemValue] = (acc[itemValue] || 0) + 1;
      return acc;
    }, {});

    // Convert to array of objects
    const dataList = Object.keys(dataMap).map((name) => ({
      name,
      count: dataMap[name],
    }));

    // Sort by count in descending order and take the top 10
    const topItems = dataList.sort((a, b) => b.count - a.count).slice(0, 10);

    const labels = topItems.map((item) => `${item.name}: ${item.count}`);
    const data = topItems.map((item) => item.count);

    return { labels, data };
  };

  const { labels, data } = processData();

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
  );
};

export default PieChart;
