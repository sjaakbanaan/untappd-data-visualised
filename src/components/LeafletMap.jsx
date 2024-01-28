import { useEffect, useRef } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from '../images/pin.svg';

export const newIcon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
});

const LeafletMap = ({ beerData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Update map viewport to fit all markers within bounds
    if (mapRef.current && beerData.length > 1) {
      const bounds = new Leaflet.LatLngBounds();

      beerData.forEach((item) => {
        if (item.venue_lat && item.venue_lng) {
          bounds.extend([parseFloat(item.venue_lat), parseFloat(item.venue_lng)]);
        }
      });

      // Ensure the map has a valid size before attempting to fit bounds
      if (bounds.isValid() && mapRef.current) {
        setTimeout(() => {
          mapRef?.current?.fitBounds(bounds, { padding: [50, 50] });
        }, 500); // Delay the fitBounds call to ensure the map is ready
      }
    }
  }, [beerData]);

  return (
    <div className="p-4">
      <div className="overflow-hidden border border-gray-900 rounded shadow-md my-4">
        <MapContainer
          ref={mapRef}
          style={{ height: '500px', width: '100%' }}
          center={[0, 0]}
          zoom={2}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png" />
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
      </div>
    </div>
  );
};

export default LeafletMap;
