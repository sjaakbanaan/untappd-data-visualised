import { useEffect, useState, useRef, useCallback } from 'react';

const DateSelector = ({ beerData, filterDateRange, setFilterDateRange, onDateBlur }) => {
  const [formattedEarliestDate, setFormattedEarliestDate] = useState('');
  const [formattedLatestDate, setFormattedLatestDate] = useState('');
  const [startButtonFlicker, setStartButtonFlicker] = useState('');
  const containerRef = useRef(null);

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
    // if (field === 'start' && value.length > 0 && value > filterDateRange.end) {
    //   setIsInvalidRange(true);
    //   return false;
    // }
    // if (field === 'end' && value.length > 0 && value < filterDateRange.start) {
    //   setIsInvalidRange(true);
    //   return false;
    // }
    setFilterDateRange({ ...filterDateRange, [field]: value });
    // setIsInvalidRange(false); // Reset invalid range state when the range is valid
  };

  // Close sidebar only when focus leaves the entire date input container
  const handleBlur = useCallback(() => {
    if (!onDateBlur) return;
    // relatedTarget is the element receiving focus next.
    // If it's still inside our container, the user is switching between
    // the two date inputs or interacting with the native datepicker — don't close.
    requestAnimationFrame(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(document.activeElement)
      ) {
        onDateBlur();
      }
    });
  }, [onDateBlur]);

  useEffect(() => {
    setStartButtonFlicker('');
    // Adding a small delay before re-adding the class to trigger the animation
    setTimeout(() => {
      setStartButtonFlicker('animate-lightup');
    }, 100);
  }, [filterDateRange.start, filterDateRange.end]);

  return (
    <div>
      <div
        ref={containerRef}
        className="mb-8 grid gap-4 md:grid-cols-2"
        onBlur={handleBlur}
      >
        <input
          type="date"
          className={`w-full appearance-none rounded border bg-gray-900 px-3 py-2 leading-tight text-white shadow focus:outline-none md:w-auto ${startButtonFlicker}`}
          value={filterDateRange.start}
          onChange={(e) => handleInputChange('start', e.target.value, filterDateRange)}
          min={formattedEarliestDate}
          max={formattedLatestDate}
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
    </div>
  );
};

export default DateSelector;
