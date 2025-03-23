import { useState } from 'react';
import countriesData from '../countries.json';

export const useUploadedJsonUpdater = () => {
  const [beerData, setBeerData] = useState(null);

  // Function to translate country names
  const translateCountries = (originalName, countriesData) => {
    const country = countriesData.find((c) => c.nativeName === originalName);
    return country ? country.name : originalName;
  };

  const manipulateData = (data, userDetails) => {
    const uniqueCheckinIds = new Set();

    const updatedData = data.map((item) => {
      // Create a copy of the original item
      let updatedItem = { ...item };

      // STEP 1: Update the URL's:
      // Define the properties to check and update
      const propertiesToCheck = ['checkin_url', 'beer_url', 'brewery_url'];
      // Iterate over the properties
      propertiesToCheck.forEach((property) => {
        // Check if the property exists and contains "api.untappd", then replace it
        if (updatedItem[property] && updatedItem[property].includes('api.untappd')) {
          updatedItem[property] = updatedItem[property].replace(
            'api.untappd',
            'www.untappd'
          );
        }
      });

      // STEP 2: Update the venue_name name to user home location:
      // Check if venue_name equals one of the following values, and replace it with user home location
      if (
        updatedItem.venue_name === 'Untappd at Home' ||
        updatedItem.venue_name === 'Untappd Virtual Festival' ||
        updatedItem.venue_name === 'Untappd 10th Anniversary Party'
      ) {
        // Add additional properties or update existing ones
        updatedItem = {
          ...updatedItem,
          ...userDetails,
        };
      }

      // STEP 3: Translate the venue_country to proper English:
      if (updatedItem.venue_country !== null) {
        // Wrap the venue_country value with the translateCountries() function
        updatedItem.venue_country = translateCountries(
          updatedItem.venue_country,
          countriesData
        );
      }

      return updatedItem;
    });

    // STEP 4: filter out duplicates based on the 'checkin_id':
    const filteredData = updatedData.filter((item) => {
      if (!uniqueCheckinIds.has(item.checkin_id)) {
        uniqueCheckinIds.add(item.checkin_id);
        return true;
      }
      return false;
    });

    return filteredData;
  };

  return { beerData, setBeerData, manipulateData };
};
