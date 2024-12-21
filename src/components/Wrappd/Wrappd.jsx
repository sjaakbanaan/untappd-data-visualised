import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import WrappdCanvas from './WrappdCanvas.jsx';
import WrappdInput from './WrappdInput.jsx';
import { getUserName } from '../../utils';

const Wrappd = ({ beerData, fullBeerData, filterDateRange }) => {
  const elementRef = useRef();
  const userName = getUserName();
  const [customTitle, setCustomTitle] = useState('');

  const handleCustomTitle = (event) => {
    setCustomTitle(event.target.value);
  };

  return (
    <>
      <div className="mb-10 grid w-full grid-flow-row gap-4 border border-yellow-500 md:w-[768px]">
        <div className="p-6 text-xl">
          <h2 className="mb-3 text-2xl font-bold">
            <span className="text-yellow-500">NEW</span> Your Untappd Wrappd!
          </h2>
          <p className="mb-2 font-bold">How does it work?</p>
          <ul className="list-decimal pl-5">
            <li>Set a desired data range;</li>
            <li>
              <span className="text-gray-300">Optional:</span> copy the link to your
              Untappd avatar from your{' '}
              <a
                href={`https://untappd.com/user/
              ${userName}`}
                target="_blank"
                className="underline"
              >
                Untappd profile
              </a>{' '}
              (right click on the rounded photo and choose 'Copy image address), and paste
              it{' '}
              <Link to="/upload" className="underline">
                here
              </Link>
              ;
            </li>
            <li>
              <span className="text-gray-300">Optional:</span> set a custom title, like
              'Awesome BeerFest 2024'.
            </li>
          </ul>
        </div>
        <div className="flex items-center bg-yellow-500 p-6">
          <WrappdInput
            elementRef={elementRef}
            userName={userName}
            handleCustomTitle={handleCustomTitle}
          />
        </div>
      </div>
      <WrappdCanvas
        userName={userName}
        beerData={beerData}
        fullBeerData={fullBeerData}
        customTitle={customTitle}
        elementRef={elementRef}
        filterDateRange={filterDateRange}
      />
    </>
  );
};

export default Wrappd;
