import { useEffect, useRef } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from '../images/pin.svg';
import { formatDate } from '../utils';

export const newIcon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
});

const LeafletMap = ({ beerData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const fitMapBounds = () => {
      if (mapRef.current && beerData.length > 1) {
        const bounds = new Leaflet.LatLngBounds();
        beerData.forEach((item) => {
          if (item.venue_lat && item.venue_lng) {
            bounds.extend([parseFloat(item.venue_lat), parseFloat(item.venue_lng)]);
          }
        });

        // Ensure the map has a valid size before attempting to fit bounds
        if (bounds.isValid() && mapRef.current) {
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    };
    // Apply a small delay on initial render or else bounds are incorrect
    const timeoutId = setTimeout(fitMapBounds, 200);
    return () => clearTimeout(timeoutId);
  }, [beerData, mapRef]);

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
                    <strong>
                      <a href={item.beer_url} target="_blank" rel="noopener">
                        {item.beer_name}
                      </a>
                    </strong>
                    <br />
                    {item.brewery_name}
                    <br />
                    <br />
                    your rating: {item.rating_score}
                    <br />
                    global rating {item.global_rating_score}
                    <br />
                    drank on: {formatDate(item.created_at)}
                    <br />
                    {item.tagged_friends && <div>friends: {item.tagged_friends}</div>}
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
