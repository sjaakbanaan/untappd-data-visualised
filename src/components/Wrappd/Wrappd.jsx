import { useRef, useState } from 'react';
import WrappdCanvas from './WrappdCanvas.jsx';
import WrappdInput from './WrappdInput.jsx';

const Wrappd = ({ userName, beerData, fullBeerData, filterDateRange }) => {
  const elementRef = useRef();
  const [customTitle, setCustomTitle] = useState('');
  const handleChange = (event) => {
    setCustomTitle(event.target.value);
  };

  return (
    <div className="mb-20">
      <h2 className="my-3 text-2xl font-bold">Your Untappd Wrappd</h2>
      <WrappdInput
        elementRef={elementRef}
        userName={userName}
        handleChange={handleChange}
      />
      <WrappdCanvas
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

export default Wrappd;
