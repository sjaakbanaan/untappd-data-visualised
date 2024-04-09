import Icon from './Icon/Icon.jsx';
import { formatDate } from '../../utils';
import { Popup } from 'react-map-gl';

const VenuePopUp = ({ popupInfo, setPopupInfo }) => {
  return (
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
          className="mr-3 fill-yellow-700"
        />
        <h4 className="text-base leading-tight font-bold flex-1">
          {popupInfo.venue_name}
          {popupInfo.venue_city && `, ${popupInfo.venue_city}`}
        </h4>
      </div>
      <div className="flex mt-2 items-center mb-1">
        <Icon icon="CALENDAR" viewBox="0 0 488 512" className="mr-3 fill-yellow-700" />
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
            viewBox="0 0 512 398.108"
            className="mr-3 fill-yellow-700"
          />
          <div className="flex-1">{popupInfo.tagged_friends.split(',').join(', ')}</div>
        </div>
      )}
    </Popup>
  );
};
export default VenuePopUp;
