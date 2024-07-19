import { useMemo } from 'react';
import { Marker } from 'react-map-gl';
import Icon from '../Icon/Icon.jsx';

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
            <Icon
              icon="PIN"
              style={{ height: '42px' }}
              pathFill="#eab308"
              fill="none"
              stroke="#fff"
            />
          </Marker>
        )
    );
  }, [beerData, setPopupInfo]);

  return pins;
};

export default Pins;
