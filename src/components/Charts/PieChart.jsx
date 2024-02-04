import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ beerData, dataType, trailingChar, hideCount }) => {
  const processData = () => {
    let dataMap = {};
    // Process brewery names
    dataMap = beerData.reduce((acc, item) => {
      const itemValue = item[dataType] || 'Unknown';
      acc[itemValue] = (acc[itemValue] || 0) + 1;
      return acc;
    }, {});

    // Convert to array of objects
    const dataList = Object.keys(dataMap)
      .filter((name) => name !== 'Unknown') // Exclude items where name is "Unknown"
      .map((name) => ({
        name,
        count: dataMap[name],
      }));

    // Sort by count in descending order and take the top 10
    const topItems = dataList.sort((a, b) => b.count - a.count).slice(0, 10);
    const labels = topItems.map((item) => {
      const countLabel = !hideCount ? ` (${item.count}×)` : '';
      return `${item.name}${trailingChar}${countLabel}`;
    });
    const data = topItems.map((item) => item.count);

    return { labels, data, topItems };
  };

  const { labels, data, topItems } = processData();

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#fefce8', // Yellow-50
          '#fdf9c2', // Yellow-100
          '#fdf29e', // Yellow-200
          '#fde477', // Yellow-300
          '#fdd447', // Yellow-400
          '#fdba11', // Yellow-500
          '#f39c12', // Yellow-600
          '#e08e0b', // Yellow-700
          '#d07d0d', // Yellow-800
          '#713f12', // Yellow-900
        ],
        hoverOffset: 8,
      },
    ],
  };

  // skip pie chart when there's only 1 result:
  if (topItems.length <= 1) return 'A minimum of two results is needed for a pie chart.';

  return (
    <Pie
      options={{
        elements: {
          arc: {
            borderWidth: 2,
            borderColor: 'rgb(31 41 55)',
          },
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
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

PieChart.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
  trailingChar: PropTypes.string,
  hideCount: PropTypes.bool,
};

PieChart.defaultProps = {
  dataType: '',
  trailingChar: '',
  hideCount: false,
};

export default PieChart;
