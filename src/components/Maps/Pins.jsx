import { useMemo } from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin.jsx'; // Assuming you have a Pin component defined elsewhere

const Pins = ({ beerData, setPopupInfo }) => {
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
  }, [beerData, setPopupInfo]);

  return pins;
};

export default Pins;
