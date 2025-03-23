import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { processTopData } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ beerData, dataType, urlType = '' }) => {
  const { labels, topChartData, topItems } = processTopData(beerData, dataType, urlType);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: topChartData,
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

  // hack to create padding between pie and legend
  const plugin = {
    beforeInit: function (chart) {
      // Get reference to the original fit function
      const originalFit = chart.legend.fit;
      // Override the fit function
      chart.legend.fit = function fit() {
        // Bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        this.height += 20; // Change the height
      };
    },
  };

  const url_array = topItems.map((item) => item.url);
  return (
    <Pie
      plugins={[plugin]}
      options={{
        elements: {
          arc: {
            borderWidth: 2,
            borderColor: 'rgb(31 41 55)',
          },
        },
        onClick: (elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            // URL mapping based on index
            if (
              index >= 0 &&
              index < url_array.length &&
              url_array[index] !== undefined &&
              url_array[index] !== ''
            ) {
              window.open(url_array[index], '_blank');
            } else {
              return false;
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: {
              color: 'rgb(255, 255, 255)',
              font: {
                family: 'Sofia Pro',
                size: 16,
              },
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
  urlType: PropTypes.string,
};

export default PieChart;
