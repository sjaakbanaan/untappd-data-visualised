import { useRef, useState } from 'react';
import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import {
  getBarChartData,
  getBarChartYearData,
  getBarChartMonthData,
  getBarChartDayData,
  getBarChartHourData,
  getBarChartRatingData,
} from '../../utils/';

// components
import ChartModal from '../ChartModal';
import NotificationBar from '../NotificationBar';

const BarChart = ({ beerData, dataType = '', trailingChar = '' }) => {
  const openModal = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [filterBeerList, setFilterBeerList] = useState([]);

  const processData = () => {
    let dataList, sortByName, enableClick;
    switch (dataType) {
      case 'beers_per_year':
        dataList = getBarChartYearData(beerData);
        sortByName = true;
        break;
      case 'beers_per_month':
        dataList = getBarChartMonthData(beerData);
        break;
      case 'beers_per_day':
        dataList = getBarChartDayData(beerData);
        enableClick = true;
        break;
      case 'beers_per_hour':
        dataList = getBarChartHourData(beerData);
        enableClick = true;
        break;
      case 'avg_rating':
        dataList = getBarChartRatingData(beerData);
        break;
      case 'avg_global_rating':
        dataList = getBarChartRatingData(beerData, true);
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
    const data = sortedDataList.map((item) => item.value);
    const beerList = sortedDataList.map((item) => item.items);

    return { labels, data, beerList, enableClick };
  };

  const { labels, data, beerList, enableClick } = processData();

  const chartRef = useRef();

  const showModal = (element) => {
    if (!element.length) return;
    const { index } = element[0];
    setFilterBeerList(beerList[index]);
    openModal();
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    showModal(getElementAtEvent(chart, event));
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'total',
        data: data,
        backgroundColor: '#eab308', // Yellow-500
        hoverOffset: 8,
      },
    ],
  };

  // Skip bar chart when there are no results
  if (labels.length <= 1) return 'A minimum of two results is needed for a pie chart.';

  return (
    <>
      {enableClick && (
        <NotificationBar text="Click on a bar to see the checkins for that selection." />
      )}
      <Bar
        ref={chartRef}
        options={{
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'rgb(255, 255, 255)',
                font: {
                  family: 'Sofia Pro',
                },
              },
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
              ticks: {
                color: 'rgb(255, 255, 255)',
                font: {
                  family: 'Sofia Pro',
                },
              },
            },
          },
          onHover: function (e) {
            const points = this.getElementsAtEventForMode(
              e,
              'index',
              { axis: 'x', intersect: true },
              false
            );
            if (enableClick && points.length) e.native.target.style.cursor = 'pointer';
            else e.native.target.style.cursor = 'default';
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={chartData}
        onClick={enableClick && onClick}
      />
      <ChartModal beerList={filterBeerList} open={open} setOpen={setOpen} />
    </>
  );
};

BarChart.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
  trailingChar: PropTypes.string,
};

export default BarChart;
