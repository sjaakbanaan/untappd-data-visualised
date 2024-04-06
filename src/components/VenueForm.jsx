const VenueForm = ({ venueDetails, handleInputChange }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl text-white mb-3">Enter Home Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="venue_city">
            Home city
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="venue_city"
            type="text"
            placeholder="Enter city"
            name="venue_city"
            value={venueDetails.venue_city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="venue_state">
            Home state
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="venue_state"
            type="text"
            placeholder="Enter state"
            name="venue_state"
            value={venueDetails.venue_state}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="venue_country">
            Home country
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="venue_country"
            type="text"
            placeholder="Enter country"
            name="venue_country"
            value={venueDetails.venue_country}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="venue_lat">
            Home latitude
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="venue_lat"
            type="text"
            placeholder="Enter latitude"
            name="venue_lat"
            value={venueDetails.venue_lat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="venue_lng">
            Home longitude
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="venue_lng"
            type="text"
            placeholder="Enter longitude"
            name="venue_lng"
            value={venueDetails.venue_lng}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};
export default VenueForm;
