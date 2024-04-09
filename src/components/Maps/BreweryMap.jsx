import { useState, useMemo, useEffect } from 'react';
import Map, { NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getLocalStorageData } from '../../utils/';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': '#eab308',
    'fill-opacity': 0.6,
  },
};

const VenueMap = ({ beerData }) => {
  const [allData, setAllData] = useState(null);
  const [storedMapBoxKey, setStoredMapBoxKey] = useState(
    getLocalStorageData('mapbox_key')
  );

  useEffect(() => {
    // Check for Mapbox key in local storage
    setStoredMapBoxKey(getLocalStorageData('mapbox_key'));
  }, []); // Run only on component mount

  useEffect(() => {
    /* data fetch */
    fetch('/geojson-countries.json')
      .then((resp) => resp.json())
      .then((json) => {
        // Extract unique countries from beerData
        const countries = [...new Set(beerData.map((item) => item.brewery_country))];
        // Filter the GeoJSON data to only include features for unique countries
        const filteredData = {
          ...json,
          features: json.features.filter((feature) =>
            countries.includes(feature.properties.name)
          ),
        };
        setAllData(filteredData);
      })
      .catch((err) => console.error('Could not load data', err)); // eslint-disable-line
  }, [beerData]);

  const data = useMemo(() => {
    return allData;
  }, [allData]);

  // Dynamic paint property based on uniqueCountries
  const dynamicDataLayer = useMemo(() => {
    if (!allData) return null;

    const paint = {
      'fill-color': '#eab308',
      'fill-opacity': 0.6,
    };

    return {
      ...dataLayer,
      paint,
    };
  }, [allData]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-6">Brewery countries</h2>
      <div className="overflow-hidden border border-gray-900 rounded shadow-md my-4">
        <Map
          initialViewState={{
            latitude: 52.089928,
            longitude: 5.081888,
            zoom: 1,
          }}
          style={{ width: '100%', height: 500 }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          interactiveLayerIds={['data']}
          scrollZoom={false}
          mapboxAccessToken={storedMapBoxKey}
        >
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <Source type="geojson" data={data}>
            <Layer {...dynamicDataLayer} />
          </Source>
        </Map>
      </div>
    </div>
  );
};

export default VenueMap;
