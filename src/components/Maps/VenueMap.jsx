import { useState, useEffect } from 'react';
import Map, { NavigationControl, FullscreenControl } from 'react-map-gl';
import Pins from './Pins.jsx';
import VenuePopUp from './VenuePopUp.jsx';
import 'mapbox-gl/dist/mapbox-gl.css';

const VenueMap = ({ beerData }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [boundingBox, setBoundingBox] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Add state for the map key

  useEffect(() => {
    const getBoundingBox = (beerData) => {
      const uniqueCombinations = new Set(); // Set to track unique combinations
      const filteredData = beerData.filter((item) => {
        if (!item.venue_lat || !item.venue_lng) return false; // Skip items with missing data
        const key = `${item.venue_lat}-${item.venue_lng}`;
        if (uniqueCombinations.has(key)) return false; // Skip if combination already exists
        uniqueCombinations.add(key); // Add combination to the set
        return true; // Include if it's a new combination
      });
      // console.log(filteredData);

      if (filteredData.length === 0) {
        return [
          [0, 0],
          [0, 0],
        ];
      }

      const minLat = Math.min(...filteredData.map((l) => l.venue_lat));
      const maxLat = Math.max(...filteredData.map((l) => l.venue_lat));
      const minLng = Math.min(...filteredData.map((l) => l.venue_lng));
      const maxLng = Math.max(...filteredData.map((l) => l.venue_lng));
      const southWest = [minLng, minLat];
      const northEast = [maxLng, maxLat];
      return [southWest, northEast];
    };

    setBoundingBox(getBoundingBox(beerData));
  }, [beerData]);

  useEffect(() => {
    // Update the map key whenever boundingBox changes
    setMapKey((prevKey) => prevKey + 1);
  }, [boundingBox]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-6">Venues checked-in</h2>
      <div className="overflow-hidden border border-gray-900 rounded shadow-md my-4">
        <Map
          key={mapKey} // Use mapKey as the key prop
          initialViewState={{
            bounds: boundingBox,
            fitBoundsOptions: { padding: 60 },
          }}
          style={{ width: '100%', height: 500 }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          scrollZoom={false}
        >
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <Pins beerData={beerData} setPopupInfo={setPopupInfo} />
          {popupInfo && <VenuePopUp setPopupInfo={setPopupInfo} popupInfo={popupInfo} />}
        </Map>
      </div>
    </div>
  );
};

export default VenueMap;
