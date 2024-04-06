import { useState } from 'react';

export const useUploadedJsonUpdater = () => {
  const [jsonData, setJsonData] = useState(null);

  const manipulateData = (data, VenueDetails) => {
    const uniqueCheckinIds = new Set();

    const updatedData = data.map((item) => {
      // Create a copy of the original item
      let updatedItem = { ...item };

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

      // Optionally, add additional conditions to update the item based on other criteria
      if (
        updatedItem.venue_name === 'Untappd at Home' ||
        updatedItem.venue_name === 'Untappd Virtual Festival' ||
        updatedItem.venue_name === 'Untappd 10th Anniversary Party'
      ) {
        // Add additional properties or update existing ones
        updatedItem = {
          ...updatedItem,
          ...VenueDetails,
        };
      }

      return updatedItem;
    });

    // Filter out duplicates based on the 'checkin_id'
    const filteredData = updatedData.filter((item) => {
      if (!uniqueCheckinIds.has(item.checkin_id)) {
        uniqueCheckinIds.add(item.checkin_id);
        return true;
      }
      return false;
    });

    return filteredData;
  };

  return { jsonData, setJsonData, manipulateData };
};
