import { useState, useEffect } from 'react';
import { getLocalStorageData } from '../utils/';

export const getUserName = () => {
  const [storedUserName, setStoredUserName] = useState(null);

  useEffect(() => {
    // Check for userDetails in local storage
    setStoredUserName(getLocalStorageData('untappd_username'));
  }, []); // Run only on component mount

  return storedUserName;
};
