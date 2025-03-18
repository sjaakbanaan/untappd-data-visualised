import { useState, useEffect } from 'react';
import { getLocalStorageData } from '../utils/';

export const useLocalStorageData = (key) => {
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    // Check for the specified key in local storage
    setStoredData(getLocalStorageData(key));
  }, [key]); // Re-run if the key changes

  return storedData;
};
