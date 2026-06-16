import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMap, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const OPENFREEMAP_DARK_STYLE = 'https://tiles.openfreemap.org/styles/dark';

const WrappdCardMap = ({ venueLocations }) => {
  const [boundingBox, setBoundingBox] = useState(null);
  const [mapKey, setMapKey] = useState(0);

  const venues = useMemo(
    () =>
      (venueLocations || []).filter(
        (venue) =>
          Number.isFinite(venue.lat) &&
          Number.isFinite(venue.lng) &&
          venue.lat >= -90 &&
          venue.lat <= 90 &&
          venue.lng >= -180 &&
          venue.lng <= 180
      ),
    [venueLocations]
  );
  const hasData = venues.length > 0;

  const bbox = useMemo(() => {
    if (!hasData) return null;
    const lats = venues.map((v) => v.lat);
    const lngs = venues.map((v) => v.lng);
    return [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];
  }, [venues, hasData]);

  useEffect(() => {
    setBoundingBox(bbox);
    setMapKey((k) => k + 1);
  }, [bbox]);

  if (!hasData) return null;

  return (
    <div className="relative size-full min-h-[75vh] overflow-hidden bg-[#080c12]">
      <div className="relative z-10 p-8 md:p-14">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="Map">
            🗺️
          </span>
          <h2 className="text-xl font-bold text-wrappdYellow">Where You Drank</h2>
          <div className="flex-1 bg-gray-800/50" />
          <span className="rounded bg-black/20 px-2 py-1 text-sm text-gray-400 backdrop-blur-sm">
            {venues.length} venues
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <ReactMap
          key={mapKey}
          initialViewState={{
            bounds: boundingBox,
            fitBoundsOptions: { padding: 80 },
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={OPENFREEMAP_DARK_STYLE}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          keyboard={false}
          attributionControl={false}
        >
          {venues.map((venue, i) => (
            <Marker key={i} latitude={venue.lat} longitude={venue.lng} anchor="bottom">
              <div
                title={venue.name}
                className="flex size-4 items-center justify-center rounded-full bg-wrappdYellow shadow-lg ring-2 ring-black"
              />
            </Marker>
          ))}
        </ReactMap>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-950/40 via-transparent to-gray-950/10" />
        <div className="absolute bottom-2 right-2 rounded bg-black/45 px-2 py-1 text-[10px] leading-none text-gray-300 backdrop-blur-sm">
          <a
            href="https://openfreemap.org/"
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            OpenFreeMap
          </a>{' '}
          | ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            OpenStreetMap
          </a>{' '}
          contributors
        </div>
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
