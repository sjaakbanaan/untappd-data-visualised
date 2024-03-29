/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useEffect, useState } from 'react';
const DateSelector = ({ beerData, filterDateRange, setFilterDateRange }) => {
  // console.log(beerData);
  const [formattedEarliestDate, setFormattedEarliestDate] = useState('');
  const [formattedLatestDate, setFormattedLatestDate] = useState('');

  // Calculate the minimum start date
  useEffect(() => {
    if (beerData && beerData.length > 0) {
      const earliestDate = new Date(
        Math.min(...beerData.map((item) => new Date(item.created_at)))
      );
      const latestDate = new Date(
        Math.max(...beerData.map((item) => new Date(item.created_at)))
      );

      const formattedEarliest = earliestDate.toISOString().split('T')[0];
      const formattedLatest = latestDate.toISOString().split('T')[0];

      setFormattedEarliestDate(formattedEarliest);
      setFormattedLatestDate(formattedLatest);
    }
  }, [beerData]);

  return (
    <div>
      <label className="block text-white text-sm font-bold mb-2">Drank between</label>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="date"
          className="shadow appearance-none bg-gray-900 border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={filterDateRange.start}
          onChange={(e) =>
            setFilterDateRange({ ...filterDateRange, start: e.target.value })
          }
          min={formattedEarliestDate}
        />
        <input
          type="date"
          className="shadow before:text-white appearance-none border rounded py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={filterDateRange.end}
          onChange={(e) =>
            setFilterDateRange({ ...filterDateRange, end: e.target.value })
          }
          max={formattedLatestDate}
        />
      </div>
    </div>
  );
};

export default DateSelector;
