import { useEffect, useState } from 'react';
import NotificationBar from '../NotificationBar.jsx';

const DateSelector = ({ beerData, filterDateRange, setFilterDateRange }) => {
  const [formattedEarliestDate, setFormattedEarliestDate] = useState('');
  const [formattedLatestDate, setFormattedLatestDate] = useState('');
  const [startButtonFlicker, setStartButtonFlicker] = useState('');
  const [isInvalidRange, setIsInvalidRange] = useState(false); // Track invalid range state

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

  const handleInputChange = (field, value, filterDateRange) => {
    if (field === 'start' && value.length > 0 && value > filterDateRange.end) {
      setIsInvalidRange(true);
      return false;
    }
    if (field === 'end' && value.length > 0 && value < filterDateRange.start) {
      setIsInvalidRange(true);
      return false;
    }
    setFilterDateRange({ ...filterDateRange, [field]: value });
    setIsInvalidRange(false); // Reset invalid range state when the range is valid
  };

  useEffect(() => {
    setStartButtonFlicker('');
    // Adding a small delay before re-adding the class to trigger the animation
    setTimeout(() => {
      setStartButtonFlicker('animate-lightup');
    }, 100);
  }, [filterDateRange.start, filterDateRange.end]);

  return (
    <div>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <input
          type="date"
          className={`w-full appearance-none rounded border bg-gray-900 px-3 py-2 leading-tight text-white shadow focus:outline-none md:w-auto ${startButtonFlicker}`}
          value={filterDateRange.start}
          onChange={(e) => handleInputChange('start', e.target.value, filterDateRange)}
          min={formattedEarliestDate}
          required
        />
        <input
          type="date"
          className={`w-full appearance-none rounded border bg-gray-900 px-3 py-2 leading-tight text-white shadow focus:outline-none md:w-auto ${startButtonFlicker}`}
          value={filterDateRange.end}
          onChange={(e) => handleInputChange('end', e.target.value, filterDateRange)}
          max={formattedLatestDate}
          required
        />
      </div>
      {/* Show or hide the invalid range message based on isInvalidRange */}
      <NotificationBar
        text="Invalid date range, please adjust it."
        show={!!isInvalidRange}
      />
    </div>
  );
};

export default DateSelector;
