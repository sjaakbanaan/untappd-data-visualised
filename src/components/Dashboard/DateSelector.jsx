import { useEffect, useState } from 'react';
const DateSelector = ({ beerData, filterDateRange, setFilterDateRange }) => {
  const [formattedEarliestDate, setFormattedEarliestDate] = useState('');
  const [formattedLatestDate, setFormattedLatestDate] = useState('');
  const [startButtonFlicker, setStartButtonFlicker] = useState('');

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

  const handleInputChange = (field, value) => {
    setFilterDateRange({ ...filterDateRange, [field]: value });
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
          onChange={(e) => handleInputChange('start', e.target.value)}
          min={formattedEarliestDate}
          required
        />
        <input
          type="date"
          className={`w-full appearance-none rounded border bg-gray-900 px-3 py-2 leading-tight text-white shadow focus:outline-none md:w-auto ${startButtonFlicker}`}
          value={filterDateRange.end}
          onChange={(e) => handleInputChange('end', e.target.value)}
          max={formattedLatestDate}
          required
        />
      </div>
    </div>
  );
};

export default DateSelector;
