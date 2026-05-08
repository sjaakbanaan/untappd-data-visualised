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
  // Count check-ins per calendar year, then cumulative totals (oldest → newest).
  // Array order from exports is often newest-first; a running sum in that order
  // mislabels each year and can reverse the x-axis.
  const countsByYear = {};
  beerData.forEach((beer) => {
    const year = new Date(beer.created_at).getFullYear();
    countsByYear[year] = (countsByYear[year] || 0) + 1;
  });

  const yearsAsc = Object.keys(countsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  let cumulative = 0;
  const cumulativeByYear = yearsAsc.map((y) => {
    cumulative += countsByYear[y];
    return cumulative;
  });

  const labels = yearsAsc.map(String);

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
        data: cumulativeByYear,
        borderColor: '#fdba11',
        backgroundColor: '#fdba11',
      },
    ],
  };

  // return false if there are not enough years in the filter range:
  if (labels && labels.length < 3) return false;

  return (
    <div className="lg:col-span-2">
      <h2 className="mb-6 text-xl font-semibold">Cumulative beer count (year)</h2>
      <Line options={options} data={data} />
    </div>
  );
};

LineChart.propTypes = {
  beerData: PropTypes.array.isRequired,
};

export default LineChart;
