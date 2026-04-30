import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMap, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAuth } from '../../context/AuthContext';

const WrappdCardMap = ({ venueLocations }) => {
  const { userProfile } = useAuth();
  const mapboxKey = userProfile?.mapbox_key;
  const [boundingBox, setBoundingBox] = useState(null);
  const [mapKey, setMapKey] = useState(0);

  const hasData = venueLocations && venueLocations.length > 0;

  // Compute bounding box from the stored lat/lng pairs
  const bbox = useMemo(() => {
    if (!hasData) return null;
    const lats = venueLocations.map((v) => v.lat);
    const lngs = venueLocations.map((v) => v.lng);
    return [
      [Math.min(...lngs), Math.min(...lats)], // SW
      [Math.max(...lngs), Math.max(...lats)], // NE
    ];
  }, [venueLocations, hasData]);

  useEffect(() => {
    setBoundingBox(bbox);
    setMapKey((k) => k + 1);
  }, [bbox]);

  // Don't render if no mapbox key or no venue data
  if (!mapboxKey || !hasData) return null;

  return (
    <div className="relative size-full min-h-[85vh] overflow-hidden">
      {/* Text Content Overlay */}
      <div className="relative z-10 p-8 md:p-14">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="Map">
            🗺️
          </span>
          <h2 className="text-xl font-bold text-wrappdYellow">Where You Drank</h2>
          <div className="h-px flex-1 bg-gray-800/50" />
          <span className="rounded bg-black/20 px-2 py-1 text-sm text-gray-400 backdrop-blur-sm">
            {venueLocations.length} venues
          </span>
        </div>
      </div>

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <ReactMap
          key={mapKey}
          initialViewState={{
            bounds: boundingBox,
            fitBoundsOptions: { padding: 80 },
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          scrollZoom={false}
          mapboxAccessToken={mapboxKey}
        >
          {venueLocations.map((venue, i) => (
            <Marker key={i} latitude={venue.lat} longitude={venue.lng} anchor="bottom">
              <div
                title={venue.name}
                className="flex size-4 cursor-pointer items-center justify-center rounded-full bg-wrappdYellow shadow-lg ring-2 ring-black transition-transform hover:scale-150"
              />
            </Marker>
          ))}
        </ReactMap>
        {/* Subtle overlay to ensure text readability if needed */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-950/40 via-transparent to-transparent" />
      </div>
    </div>
  );
};

WrappdCardMap.propTypes = {
  venueLocations: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      name: PropTypes.string,
    })
  ),
};

export default WrappdCardMap;
