import Icon from '../UI/Icon/Icon';
import { formatDate } from '../../utils/';
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
      <div className="mb-1 mt-2 flex items-center">
        <Icon
          icon="LOCATION"
          style={{ width: '18px', height: '18px' }}
          className="mr-3 fill-yellow-500"
        />
        <h4 className="flex-1 text-base font-bold leading-tight">
          {popupInfo.venue_name}
          {popupInfo.venue_city && `, ${popupInfo.venue_city}`}
        </h4>
      </div>
      <div className="mb-1 mt-2 flex items-center">
        <Icon
          icon="CALENDAR"
          style={{ width: '16px', height: '16px' }}
          className="mr-3 fill-yellow-500"
        />
        <div className="flex-1">
          <strong>most recent check-in:</strong>
          <br />
          <a
            className="underline"
            href={popupInfo.checkin_url}
            target="_blank"
            rel="noreferrer"
          >
            {formatDate(popupInfo.created_at)}
          </a>
        </div>
      </div>
      {popupInfo.photo_url && (
        <div className="mb-1 mt-2">
          <div className="flex-1">
            <a
              className="underline"
              href={popupInfo.checkin_url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={popupInfo.photo_url}
                alt={popupInfo.beer_name}
                className="w-full"
              />
            </a>
          </div>
        </div>
      )}

      <div className="mb-1 mt-2 flex items-center">
        <Icon
          icon="GLASS"
          style={{ width: '16px', height: '16px' }}
          className="mr-3 fill-yellow-500"
        />
        <div className="flex-1">
          <a
            className="underline"
            href={popupInfo.beer_url}
            target="_blank"
            rel="noreferrer"
          >
            {popupInfo.beer_name}
          </a>
        </div>
      </div>
      <div className="mb-1 mt-2 flex items-center">
        <Icon
          icon="STAR"
          style={{ width: '16px', height: '16px' }}
          className="mr-3 fill-yellow-500"
        />
        <div className="flex-1">
          {popupInfo.rating_score && popupInfo.rating_score > 0 && (
            <span>{popupInfo.rating_score}</span>
          )}
        </div>
      </div>
      {popupInfo.tagged_friends && (
        <div className="mb-1 mt-2 flex items-center">
          <Icon
            icon="FRIENDS"
            style={{ width: '16px', height: '16px' }}
            className="mr-3 fill-yellow-500"
          />
          <div className="flex-1">{popupInfo.tagged_friends.split(',').join(', ')}</div>
        </div>
      )}
    </Popup>
  );
};
export default VenuePopUp;
