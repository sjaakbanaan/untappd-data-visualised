import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import Pin from './Pin.jsx';
import Icon from './Icon/Icon.jsx';
import { formatDate } from '../utils/';
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

  const pins = useMemo(() => {
    return beerData.map(
      (item) =>
        item.venue_lat &&
        item.venue_lng && (
          <Marker
            key={`marker-${item.checkin_id}`}
            longitude={item.venue_lng}
            latitude={item.venue_lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(item);
            }}
          >
            <Pin />
          </Marker>
        )
    );
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
          {pins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.venue_lng}
              latitude={popupInfo.venue_lat}
              onClose={() => setPopupInfo(null)}
              className="text-black"
            >
              <div className="flex mt-2 items-center mb-1">
                <Icon
                  icon="LOCATION"
                  size="18"
                  viewBox="0 0 70.749 90"
                  className="mr-3 fill-yellow-600"
                />
                <h4 className="text-base leading-tight font-bold flex-1">
                  {popupInfo.venue_name}
                  {popupInfo.venue_city && `, ${popupInfo.venue_city}`}
                </h4>
              </div>
              <div className="flex mt-2 items-center mb-1">
                <Icon
                  icon="CALENDAR"
                  size="16"
                  viewBox="0 0 488 512"
                  className="mr-3 fill-yellow-600"
                />
                <div className="flex-1">
                  <strong>most recent check-in:</strong>
                  <br />
                  <a class="underline" href={popupInfo.checkin_url} target="_blank">
                    {formatDate(popupInfo.created_at)}
                  </a>
                </div>
              </div>
              {popupInfo.tagged_friends && (
                <div className="flex mt-2 items-center mb-1">
                  <Icon
                    icon="FRIENDS"
                    size="16"
                    viewBox="0 0 512 398.108"
                    className="mr-3 fill-yellow-600"
                  />
                  <div className="flex-1">
                    {popupInfo.tagged_friends.split(',').join(', ')}
                  </div>
                </div>
              )}
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default VenueMap;
