const UploadForm = ({ userDetails, handleInputChange }) => {
  // Define an array of fields with their corresponding labels
  const fields = [
    { name: 'untappd_username', label: 'Untappd username' },
    { name: 'untappd_avatar', label: 'Untappd avatar URL (needed for Tappd Wrappd)' },
    { name: 'mapbox_key', label: 'Mapbox API key (optional)' },
    { name: 'gemini_api_key', label: 'Gemini API key (optional)' },
    { name: 'venue_city', label: 'Home city' },
    { name: 'venue_state', label: 'Home state' },
    { name: 'venue_country', label: 'Home country' },
    { name: 'venue_lat', label: 'Home latitude' },
    { name: 'venue_lng', label: 'Home longitude' },
  ];

  const validateAvatarUrl = (url) => {
    return url.endsWith('.jpg');
  };

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
          rel="noreferrer"
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
              className={`w-full appearance-none rounded border bg-gray-700 px-3 py-2 text-white transition-colors duration-200 placeholder:text-gray-400 focus:border-yellow-500 focus:outline-none ${
                field.name === 'untappd_avatar' &&
                userDetails[field.name] &&
                !validateAvatarUrl(userDetails[field.name])
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-600'
              }`}
              id={field.name}
              type="text"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              name={field.name}
              value={userDetails[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div className="mb-6">
        <p className="mb-2 text-sm text-gray-400">Source of JSON</p>
        <p className="mb-2 text-sm">
          Did you export your data from the Untappd website because you're an Insider? Or did you create the export with the{' '}
          <a
            className="underline hover:no-underline"
            href="https://github.com/sjaakbanaan/untappd-scraper-xl/"
            title="Untappd Scraper XL"
            target="_blank"
            rel="noreferrer"
          >
            Untappd Scraper XL
          </a>
          ?
        </p>
        <div className="mt-4 flex gap-6">
          {[
            { value: 'untappd_insider', label: 'Untappd Insider' },
            { value: 'custom_export', label: 'Untappd Scraper XL' },
          ].map(({ value, label }) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-white">
              <input
                type="radio"
                name="json_source"
                value={value}
                checked={(userDetails.json_source ?? 'untappd_insider') === value}
                onChange={handleInputChange}
                className="accent-yellow-400"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      </form>
    </div>
  );
};

export default UploadForm;
