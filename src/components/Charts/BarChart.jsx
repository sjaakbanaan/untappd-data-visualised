import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  getBarChartData,
  getBarChartYearData,
  getBarChartMonthData,
  getBarChartDayData,
  getBarChartTopBottomData,
} from '../../utils/';

const BarChart = ({ beerData, dataType, trailingChar }) => {
  // Function to calculate aspect ratio
  const calculateAspectRatio = (numberOfItems) => {
    const x1 = 5;
    const y1 = 1.2;
    const x2 = 170;
    const y2 = 0.1;
    console.log('numberOfItems', numberOfItems);

    // Perform linear interpolation
    const aspectRatio = y1 + (y2 - y1) * ((numberOfItems - x1) / (x2 - x1));
    return +aspectRatio.toFixed(1);
  };

  const processData = () => {
    let dataList, sortByName, isFloating;
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
      case 'top_bottom_types':
        dataList = getBarChartTopBottomData(beerData);
        isFloating = true;
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

    const countTypes = sortedDataList.length;

    // Extract labels and data from sortedDataList
    const labels = sortedDataList.map((item) => `${item.name}${trailingChar}`);

    let data;
    if (dataType == 'top_bottom_types') {
      data = sortedDataList.map((item) => [item.min, item.max]);
    } else {
      data = sortedDataList.map((item) => item.value);
    }

    return { labels, data, isFloating, countTypes };
  };

  const { labels, data, isFloating, countTypes } = processData();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'total',
        data: data,
        backgroundColor: '#d07d0d', // Yellow-600
        hoverOffset: 8,
      },
    ],
  };

  // Skip bar chart when there are no results
  if (labels.length <= 1) return 'A minimum of two results is needed for a pie chart.';
  console.log('bla', calculateAspectRatio(countTypes));

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
        responsive: isFloating,
        aspectRatio: isFloating && 0.3,
        indexAxis: isFloating && 'y',
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
