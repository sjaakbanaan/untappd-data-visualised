import { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [beerData, setBeerData] = useState([]);

  return (
    <DataContext.Provider value={{ beerData, setBeerData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
