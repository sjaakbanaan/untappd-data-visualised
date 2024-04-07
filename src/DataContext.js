import { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);

  return (
    <DataContext.Provider value={{ jsonData, setJsonData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
