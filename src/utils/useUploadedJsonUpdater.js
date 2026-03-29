import { useState, useCallback } from 'react';
import countriesData from '../data/countries.json';
import { normaliseCheckins, detectFormat } from './normaliseCheckins';

// Function to translate country names - moved outside hook to keep it stable
const translateCountries = (originalName, countriesData) => {
  const country = countriesData.find((c) => c.nativeName === originalName);
  return country ? country.name : originalName;
};

export const useUploadedJsonUpdater = () => {
  const [beerData, setBeerData] = useState(null);

  const manipulateData = useCallback((data, userDetails) => {
    const formatHint = userDetails?.json_source ?? detectFormat(data);
    const normalisedData = normaliseCheckins(data, formatHint);

    const uniqueCheckinIds = new Set();

    const updatedData = normalisedData.map((item) => {
      let updatedItem = { ...item };

      const propertiesToCheck = ['checkin_url', 'beer_url', 'brewery_url'];
      propertiesToCheck.forEach((property) => {
        if (updatedItem[property] && updatedItem[property].includes('api.untappd')) {
          updatedItem[property] = updatedItem[property].replace(
            'api.untappd',
            'www.untappd'
          );
        }
      });

      if (
        updatedItem.venue_name === 'Untappd at Home' ||
        updatedItem.venue_name === 'Untappd Virtual Festival' ||
        updatedItem.venue_name === 'Untappd 10th Anniversary Party'
      ) {
        updatedItem = {
          ...updatedItem,
          ...userDetails,
        };
      }

      if (updatedItem.venue_country !== null) {
        updatedItem.venue_country = translateCountries(
          updatedItem.venue_country,
          countriesData
        );
      }

      return updatedItem;
    });

    const filteredData = updatedData.filter((item) => {
      if (!uniqueCheckinIds.has(item.checkin_id)) {
        uniqueCheckinIds.add(item.checkin_id);
        return true;
      }
      return false;
    });

    return filteredData;
  }, []);

  return { beerData, setBeerData, manipulateData };
};
