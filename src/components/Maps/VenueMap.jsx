import { useState, useMemo, useEffect } from 'react';
import ReactMap, { NavigationControl, FullscreenControl } from 'react-map-gl';
import Pins from './Pins';
import VenuePopUp from './VenuePopUp';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAuth } from '../../context/AuthContext';

const VenueMap = ({ beerData }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [boundingBox, setBoundingBox] = useState(null);
  const [mapKey, setMapKey] = useState(null); // Add state for the map 'key'
  const { userProfile } = useAuth();
  const storedMapboxKey = userProfile?.mapbox_key;

  // Deduplicate venues to show only the most recent check-in marker for each venue
  const uniqueVenueCheckins = useMemo(() => {
    const venueMap = new Map();
    beerData.forEach((item) => {
      // Both coordinates must be present for a map marker
      if (!item.venue_lat || !item.venue_lng) return;

      const key = `${item.venue_lat}-${item.venue_lng}`;
      const existing = venueMap.get(key);

      // If no check-in exists for this venue, or this one is more recent:
      if (!existing || new Date(item.created_at) > new Date(existing.created_at)) {
        venueMap.set(key, item);
      }
    });
    return Array.from(venueMap.values());
  }, [beerData]);

  // Keep a count of unique venue names for the header
  const uniqueVenueCount = useMemo(() => {
    return new Set(beerData.filter((i) => i.venue_name).map((i) => i.venue_name)).size;
  }, [beerData]);

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
    <div>
      <h2 className="mb-6 text-xl font-semibold">
        Venues checked-in ({uniqueVenueCount})
      </h2>
      <div className="my-4 overflow-hidden rounded border border-gray-900 shadow-md">
        <ReactMap
          key={mapKey} // Use mapKey as the key prop
          initialViewState={{
            bounds: boundingBox,
            fitBoundsOptions: { padding: 60 },
          }}
          style={{ width: '100%', height: 500 }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          scrollZoom={false}
          mapboxAccessToken={storedMapboxKey}
        >
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <Pins beerData={uniqueVenueCheckins} setPopupInfo={setPopupInfo} />
          {popupInfo && <VenuePopUp setPopupInfo={setPopupInfo} popupInfo={popupInfo} />}
        </ReactMap>
      </div>
    </div>
  );
};

export default VenueMap;
