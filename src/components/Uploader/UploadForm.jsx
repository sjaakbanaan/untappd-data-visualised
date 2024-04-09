const UploadForm = ({ userDetails, handleInputChange }) => {
  // Define an array of fields with their corresponding labels
  const fields = [
    { name: 'untappd_username', label: 'Untappd username' },
    { name: 'mapbox_key', label: 'Mapbox API key' },
    { name: 'venue_city', label: 'Home city' },
    { name: 'venue_state', label: 'Home state' },
    { name: 'venue_country', label: 'Home country' },
    { name: 'venue_lat', label: 'Home latitude' },
    { name: 'venue_lng', label: 'Home longitude' },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl text-white mb-3">Enter details</h2>
      <p className="mb-5">
        Your home details are needed to overwrite the 'Untappd at Home' values because
        Untappd uses their HQ for your home location. Don't worry, this data is only on
        your computer so not saved or shared in anyway.
      </p>
      <form>
        {/* Map over the fields array to generate input fields */}
        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-gray-400 text-sm mb-2" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={field.name}
              type="text"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              name={field.name}
              value={userDetails[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default UploadForm;
