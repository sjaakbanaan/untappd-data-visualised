import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from './pin.svg';

export const newIcon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
});

const LeafletMap = ({ beerData }) => {
  const markerBounds = [];

  beerData.forEach((item) => {
    if (item.venue_lat && item.venue_lng) {
      markerBounds.push([parseFloat(item.venue_lat), parseFloat(item.venue_lng)]);
    }
  });

  return (
    <MapContainer
      bounds={markerBounds}
      czoom={2}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">LeafletMap</a> contributors'
      />
      {beerData.map(
        (item) =>
          item.venue_lat &&
          item.venue_lng && (
            <Marker
              key={item.checkin_id}
              position={[parseFloat(item.venue_lat), parseFloat(item.venue_lng)]}
              icon={newIcon}
            >
              <Popup>
                <strong>{item.beer_name}</strong>
                <br />
                {item.brewery_name}
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default LeafletMap;
