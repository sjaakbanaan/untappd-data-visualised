import { memo } from 'react';
import { Box } from './Box.jsx';
import { Dustbin } from './DustBin.jsx';

const Container = memo(function Container() {
  return (
    <div>
      <div className="overflow-hidden clear-both">
        <Dustbin />
      </div>
      <div className="flex items-center mb-6">
        <Box name="Top 10 beer Styles" />
        <Box name="Top 10 rated beers by you" />
        <Box name="Beers per day" />
      </div>
    </div>
  );
});

export default Container;
