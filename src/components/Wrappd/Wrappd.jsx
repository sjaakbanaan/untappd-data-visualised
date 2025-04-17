import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import WrappdCanvas from './WrappdCanvas';
import WrappdInput from './WrappdInput';
import { useLocalStorageData } from '../../utils';

const Wrappd = ({ beerData, fullBeerData, filterDateRange }) => {
  const elementRef = useRef();
  const userName = useLocalStorageData('untappd_username');
  const [customTitle, setCustomTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCustomTitle = (event) => {
    setCustomTitle(event.target.value);
  };

  return (
    <>
      <div
        className="mb-10 grid w-full grid-flow-row border border-yellow-500 md:w-[768px]
        "
      >
        <button
          className="bg-yellow-500 p-2 text-gray-700 hover:bg-yellow-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close Tappd Wrappd' : 'Open Tappd Wrappd'}
        </button>
        <div
          className={`transition-all duration-300 ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
          }`}
        >
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
                  href={`https://untappd.com/user/${userName}`}
                  target="_blank"
                  className="underline"
                  rel="noreferrer"
                >
                  Untappd profile
                </a>{' '}
                (right click on the rounded photo and choose 'Copy image address'), and
                paste it{' '}
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
      </div>

      {isOpen && (
        <WrappdCanvas
          userName={userName}
          beerData={beerData}
          fullBeerData={fullBeerData}
          customTitle={customTitle}
          elementRef={elementRef}
          filterDateRange={filterDateRange}
        />
      )}
    </>
  );
};

export default Wrappd;
