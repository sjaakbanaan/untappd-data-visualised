import 'chart.js/auto';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ beerData }) => {
  // Extract years and calculate cumulative counts per year
  const peroidCounts = {};
  let cumulativeCount = 0;
  beerData.forEach((beer) => {
    const year = new Date(beer.created_at).getFullYear();
    cumulativeCount += 1; // Increment cumulative count
    peroidCounts[year] = cumulativeCount;
  });

  // Generate labels and data based on yearly counts
  const labels = Object.keys(peroidCounts);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(255, 255, 255)',
        },
      },
    },
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
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Beers',
        data: labels.map((year) => peroidCounts[year]),
        borderColor: '#fdba11',
        backgroundColor: '#fdba11',
      },
    ],
  };

  // return false if there are not enough years in the filter range:
  if (labels && labels.length < 3) return false;

  return (
    <div className="p-4">
      <h2 className="mb-6 text-lg font-semibold">Cumulative beer count (year)</h2>
      <Line options={options} data={data} />
    </div>
  );
};

LineChart.propTypes = {
  beerData: PropTypes.array.isRequired,
};

LineChart.defaultProps = {
  dataType: '',
};

export default LineChart;
