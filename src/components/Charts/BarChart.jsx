import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  getBarChartData,
  getBarChartYearData,
  getBarChartMonthData,
  getBarChartDayData,
} from '../../utils/';

const BarChart = ({ beerData, dataType, trailingChar }) => {
  const processData = () => {
    let dataList, sortByName;
    switch (dataType) {
      case 'beers_per_year':
        dataList = getBarChartYearData(beerData);
        sortByName = true;
        break;
      case 'beers_per_day':
        dataList = getBarChartDayData(beerData);
        break;
      case 'beers_per_month':
        dataList = getBarChartMonthData(beerData);
        break;
      default:
        dataList = getBarChartData(beerData, dataType);
        sortByName = true;
        break;
    }

    // Optionally sort the data list based on the name property
    const sortedDataList = sortByName
      ? dataList.sort((a, b) => parseFloat(a.name) - parseFloat(b.name))
      : dataList;

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
  if (labels.length <= 1) return 'A minimum of two results is needed for a pie chart.';

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
