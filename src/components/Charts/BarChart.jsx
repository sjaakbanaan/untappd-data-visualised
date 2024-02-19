import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { getBarChartData, getBarChartYearData, getBarChartDayData } from '../../utils/';

const BarChart = ({ beerData, dataType, trailingChar }) => {
  const processData = () => {
    let dataList;
    switch (dataType) {
      case 'beers_per_year':
        dataList = getBarChartYearData(beerData);
        break;
      case 'beers_per_day':
        dataList = getBarChartDayData(beerData);
        break;
      default:
        dataList = getBarChartData(beerData, dataType);
        break;
    }

    // Sort the data list based on the name property
    const sortedDataList = dataList.sort((a, b) => a.name.localeCompare(b.name));

    // Extract labels and data from sortedDataList
    const labels = sortedDataList.map((item) => `${item.name}${trailingChar}`);
    const data = sortedDataList.map((item) => item.count);

    return { labels, data };
  };

  const { labels, data } = processData();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'total',
        data: data,
        backgroundColor: '#d07d0d', // Gray-600
        hoverOffset: 8,
      },
    ],
  };

  // Skip bar chart when there are no results
  if (labels.length === 0) return 'No data available for a bar chart.';

  return (
    <Bar
      options={{
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: 'rgb(255, 255, 255)',
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgb(255, 255, 255)',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={chartData}
    />
  );
};

BarChart.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
  trailingChar: PropTypes.string,
  hideCount: PropTypes.bool,
};

BarChart.defaultProps = {
  dataType: '',
  trailingChar: '',
  hideCount: false,
};

export default BarChart;
