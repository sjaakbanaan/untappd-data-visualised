import { useRef, useState } from 'react';
import WrappedCanvas from './WrappedCanvas.jsx';
import WrappedInput from './WrappedInput.jsx';

const Wrapped = ({ userName, beerData, fullBeerData, filterDateRange }) => {
  const elementRef = useRef();
  const [customTitle, setCustomTitle] = useState('');
  const handleChange = (event) => {
    setCustomTitle(event.target.value);
  };

  return (
    <div className="mb-20">
      <h2 className="my-3 text-2xl font-bold">Your Untappd Wrapped</h2>
      <WrappedInput
        elementRef={elementRef}
        userName={userName}
        handleChange={handleChange}
      />
      <WrappedCanvas
        userName={userName}
        beerData={beerData}
        fullBeerData={fullBeerData}
        customTitle={customTitle}
        elementRef={elementRef}
        filterDateRange={filterDateRange}
      />
    </div>
  );
};

export default Wrapped;
