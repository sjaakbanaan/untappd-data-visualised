import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { getOverviewStats } from '../../utils';
import { processTopBeers } from '../../utils/listProcessing';
import PngOverview from './PngOverview.jsx';

/*
- top 5 beers (highest rating)
- top 5 worst beers (lowest rating)
- top 5 brewers (most)
- top 5 venues (exl. home)
*/

const PngOverviewGenerator = ({ userName, beerData, fullBeerData, filterDateRange }) => {
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
    'Total photos added',
    'Total toasts received',
    'Total comments received',
    'Total venues drank at',
    'Total venues purchased from',
    'Total cities drank in',
    'Total countries drank in',
    'Total brewery countries',
    'Total unique friends',
  ];
  const stats = getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow);

  // top lists
  const high5Beers = processTopBeers(beerData, 'rating_score', 5, 'asc');
  const low5Beers = processTopBeers(beerData, 'rating_score', 5, 'desc');

  return (
    <PngOverview
      userName={userName}
      captureScreenshot={captureScreenshot}
      stats={stats}
      high5Beers={high5Beers}
      low5Beers={low5Beers}
      elementRef={elementRef}
      filterDateRange={filterDateRange}
    />
  );
};

export default PngOverviewGenerator;
