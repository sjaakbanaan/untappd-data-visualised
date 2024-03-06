// import WorldMap from 'react-svg-worldmap';
import { getBreweryCountryData } from '../utils';
import Map, { FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const VenueMap = ({ beerData }) => {
  const data = getBreweryCountryData(beerData);
  console.log(data);
  return (
    <div className="p-4">
      {/* <WorldMap
        richInteraction={true}
        backgroundColor="none"
        borderColor={'white'}
        color={'#eab308'}
        tooltipBgColor={'#31323f'}
        valueSuffix="times"
        valuePrefix=":"
        size="xxl"
        data={data}
      /> */}
      <Map
        initialViewState={{
          latitude: 52.089928,
          longitude: 5.081888,
          zoom: 4,
        }}
        style={{ width: '100%', height: 400 }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        {/* <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source> */}
        <FullscreenControl />
      </Map>
    </div>
  );
};

export default VenueMap;
