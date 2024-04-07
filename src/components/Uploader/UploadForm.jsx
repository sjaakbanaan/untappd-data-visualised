const UploadForm = ({ userDetails, handleInputChange }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl text-white mb-3">Enter details</h2>
      <p className="mb-5">
        Your home details are needed to overwrite the 'Untappd at Home' values because
        Untappd uses their HQ for your home location. Don't worry, this data is only on
        your computer so not saved or shared in anyway.
      </p>
      <form>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2" htmlFor="untappd_username">
            Untappd username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="untappd_username"
            type="text"
            placeholder="Enter your Untappd username"
            name="untappd_username"
            value={userDetails.untappd_username}
            onChange={handleInputChange}
          />
        </div>
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
            value={userDetails.venue_city}
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
            value={userDetails.venue_state}
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
            value={userDetails.venue_country}
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
            value={userDetails.venue_lat}
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
            value={userDetails.venue_lng}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};
export default UploadForm;
