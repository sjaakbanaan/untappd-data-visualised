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
      {/* Wrappd */}
      <div className="w-full bg-wrappd-gradient p-10">
        <div className="rounded-2xl bg-wrappdBlack p-10 text-white">
          <div className="mb-10 flex items-center">
            <img
              className="mr-6 w-32 rounded-full"
              src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
              alt=""
            />
            <div>
              <div className="text-2xl">David Tuk Tuk</div>
              <span className="text-wrappdYellow">Jan 1st & Dec 31st 2024</span>
            </div>
          </div>
          <div className="grid grid-flow-col gap-4 text-xl">
            <div className="flex flex-col justify-between rounded-md border border-wrappdYellow p-4">
              <div>Total beers</div>
              <div className="text-3xl font-bold text-wrappdYellow">6.999</div>
            </div>
            <div className="flex flex-col justify-between rounded-md border border-wrappdYellow p-4">
              <div>Unique beers</div>
              <div className="text-3xl font-bold text-wrappdYellow">6.999</div>
            </div>
            <div className="flex flex-col justify-between rounded-md border border-wrappdYellow p-4">
              <div>Beer styles</div>
              <div className="text-3xl font-bold text-wrappdYellow">666</div>
            </div>
            <div className="flex flex-col justify-between rounded-md border border-wrappdYellow p-4">
              <div>Venues</div>
              <div className="text-3xl font-bold text-wrappdYellow">1.666</div>
            </div>
          </div>
          <div className="mt-10 grid grid-flow-row grid-cols-12 grid-rows-2 gap-4">
            <div className="col-span-6 flex h-44 justify-center overflow-hidden rounded-lg">
              <img
                className="w-full object-cover"
                src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
                alt=""
              />
            </div>
            <div className="col-span-6 flex h-44 justify-center overflow-hidden rounded-lg">
              <img
                className="w-full object-cover"
                src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
                alt=""
              />
            </div>
            <div className="col-span-4 flex h-44 justify-center overflow-hidden rounded-lg">
              <img
                className="w-full object-cover"
                src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
                alt=""
              />
            </div>
            <div className="col-span-4 flex h-44 justify-center overflow-hidden rounded-lg">
              <img
                className="w-full object-cover"
                src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
                alt=""
              />
            </div>
            <div className="col-span-4 flex h-44 justify-center overflow-hidden rounded-lg">
              <img
                className="w-full object-cover"
                src="https://assets.untappd.com/profile/702481b9d043e7ac1db637283bb367ea_300x300.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="mt-10">
            <div className="mb-4 text-4xl font-bold text-wrappdYellow">Top 5 beers</div>
            <ul className="mb-10 list-decimal pl-4 marker:text-wrappdYellow">
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">
                    PATRONS PROJECT 42.03 // BILLELIS // SERPENT’S G...
                  </div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">
                    Aller Dancer, Brasserie Jukebox
                  </div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">Item One</div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center text-sm leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">
                    Aller Dancer, Brasserie Jukebox
                  </div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center text-sm leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">Item One</div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center text-sm leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
            </ul>
            <div className="mb-4 text-4xl font-bold text-wrappdYellow">Top 5 beers</div>
            <ul className="mb-10 list-decimal pl-4 marker:text-wrappdYellow">
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">
                    PATRONS PROJECT 42.03 // BILLELIS // SERPENT’S G...
                  </div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">
                    Aller Dancer, Brasserie Jukebox
                  </div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">Item One</div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center text-sm leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">
                    Aller Dancer, Brasserie Jukebox
                  </div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center text-sm leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
              <li className="my-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="pt-[2px] leading-none">Item One</div>
                  <div className="rounded-xl bg-wrappdYellow px-2 pb-1 pt-[6px] text-center text-sm leading-none text-black">
                    4.33
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-12 flex flex-row items-center text-2xl">
            <img src="/logo.svg" className="mr-6 w-16" alt="" />
            <div>
              <div className="font-bold">Tappd Wrappd</div>
              <div className="text-wrappdYellow">Create your own at tappd.online</div>
            </div>
          </div>
        </div>
      </div>
      {/* / Wrappd */}
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
