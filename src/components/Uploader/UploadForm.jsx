const UploadForm = ({ userDetails, handleInputChange }) => {
  // Define an array of fields with their corresponding labels
  const fields = [
    { name: 'untappd_username', label: 'Untappd username' },
    { name: 'untappd_avatar', label: 'Untappd avatar URL (needed for Tappd Wrappd)' },
    { name: 'mapbox_key', label: 'Mapbox API key' },
    { name: 'venue_city', label: 'Home city' },
    { name: 'venue_state', label: 'Home state' },
    { name: 'venue_country', label: 'Home country' },
    { name: 'venue_lat', label: 'Home latitude' },
    { name: 'venue_lng', label: 'Home longitude' },
  ];

  return (
    <div className="mb-10">
      <h2 className="mb-3 text-xl text-white">Enter details</h2>
      <p className="mb-5">
        Your home details are needed to overwrite the 'Untappd at Home' values because
        Untappd uses their HQ for your home location. Don't worry, this data is only on
        your computer so not saved or shared in anyway.
      </p>
      <p className="mb-5">
        More info and instructions can be found on{' '}
        <a
          className="underline hover:no-underline"
          href="https://github.com/sjaakbanaan/untappd-data-visualised/"
          title="Github repository"
          target="_blank"
        >
          Github
        </a>
        .
      </p>
      <form>
        {/* Map over the fields array to generate input fields */}
        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="mb-2 block text-sm text-gray-400" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
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
