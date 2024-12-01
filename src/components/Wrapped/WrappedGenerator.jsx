import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { getOverviewStats, processTopData } from '../../utils';
import { processTopBeers } from '../../utils/listProcessing';
import Wrapped from './Wrapped.jsx';

/*
x top 5 beers (highest rating)
x top 5 worst beers (lowest rating)
x top 5 brewers (most)
x top 5 venues (exl. home)
*/

const WrappedGenerator = ({ userName, beerData, fullBeerData, filterDateRange }) => {
  const elementRef = useRef();

  const captureScreenshot = async () => {
    if (!elementRef.current) return;

    try {
      const canvas = await html2canvas(elementRef.current);

      const dataURL = canvas.toDataURL('image/png');
      // Dynamically create a download link
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `tapped-export-${userName}.png`;
      // Trigger the download programmatically and clean afterwards
      link.click();
      link.remove();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error capturing screenshot:', error);
    }
  };

  // overview lists
  const infoToShow = [
    'Total beers',
    'Total unique beers',
    'Different beer styles',
    'Total venues drank at',
  ];
  const stats = getOverviewStats(
    beerData,
    filterDateRange,
    fullBeerData,
    infoToShow,
    true
  );

  // top lists
  const high5Beers = processTopBeers(beerData, 'rating_score', 5, 'asc');
  const low5Beers = processTopBeers(beerData, 'rating_score', 5, 'desc');

  const { topItems: high5Breweries } = processTopData(beerData, 'brewery_name', '', 5);
  const { topItems: high5Venues } = processTopData(beerData, 'venue_name', '', 5, true);

  return (
    <Wrapped
      userName={userName}
      captureScreenshot={captureScreenshot}
      stats={stats}
      high5Beers={high5Beers}
      low5Beers={low5Beers}
      high5Breweries={high5Breweries}
      high5Venues={high5Venues}
      elementRef={elementRef}
      filterDateRange={filterDateRange}
    />
  );
};

export default WrappedGenerator;
