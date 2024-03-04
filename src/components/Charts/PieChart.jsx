import 'chart.js/auto';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { normalizeString } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ beerData, dataType, urlType }) => {
  const processData = () => {
    let dataMap = {};
    // Get values for given dataType
    dataMap = beerData.reduce((acc, item) => {
      const itemValue = item[dataType] || 'Unknown';
      acc[itemValue] = (acc[itemValue] || 0) + 1;
      return acc;
    }, {});
    // console.log('dataMap', dataMap);

    // Convert to array of objects
    const dataList = Object.keys(dataMap)
      .filter((name) => name !== 'Unknown') // Exclude items where name is "Unknown"
      .map((name) => {
        let entryName;
        let entryUrl;
        let foundEntry;

        switch (dataType) {
          case 'bid':
            foundEntry = beerData.find((entry) => entry.bid == name);
            entryName = foundEntry ? foundEntry.beer_name : name;
            break;
          case 'flavor_profiles':
            entryName = normalizeString(name);
            break;
          default:
            entryName = name;
        }

        if (urlType !== '') {
          entryUrl = beerData.find((entry) => entry[dataType] == name)?.[urlType];
        }

        return {
          name: entryName,
          count: dataMap[name],
          url: entryUrl,
        };

        // let entryName;
        // const entryUrl =
        //   urlType !== '' && beerData.find((entry) => entry[dataType] == name)?.[urlType];
        // const foundEntry = beerData.find((entry) => entry.bid == name);
        // entryName = dataType === 'bid' ? foundEntry.beer_name : name;
        // entryName = dataType == 'flavor_profiles' ? normalizeString(name) : name;

        // return {
        //   name: entryName,
        //   count: dataMap[name],
        //   url: entryUrl,
        // };
      });

    // Sort by count in descending order and take the top 10
    const topItems = dataList.sort((a, b) => b.count - a.count).slice(0, 10);
    const labels = topItems.map((item) => {
      const countLabel = `(${item.count}×)`;
      return `${item.name} ${countLabel}`;
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
        onClick: (event, elements) => {
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
