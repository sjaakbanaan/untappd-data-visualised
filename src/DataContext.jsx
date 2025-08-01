import { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [beerData, setBeerData] = useState([]);

  // the main filter list! This is used to reset the filters for all filtering components.
  const resetList = {
    brewery_name: '',
    brewery_city: '',
    brewery_state: '',
    brewery_country: '',
    venue_name: '',
    venue_city: '',
    venue_country: '',
    purchase_venue: '',
    tagged_friends: '',
    beer_type: '',
  };

  return (
    <DataContext.Provider value={{ beerData, setBeerData, resetList }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
