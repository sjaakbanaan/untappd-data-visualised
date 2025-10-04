import { createContext, useState, useEffect } from 'react';
import { useFirebaseData } from './utils/useFirebaseData';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [beerData, setBeerData] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    isLoading: firebaseLoading,
    shareCode,
    error: firebaseError,
    saveData,
    loadDataByCode,
    loadCurrentData,
    clearData,
  } = useFirebaseData();

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

  // Load existing data on app initialization
  useEffect(() => {
    const initializeData = async () => {
      if (shareCode && beerData.length === 0) {
        try {
          const data = await loadCurrentData();
          if (data) {
            setBeerData(data);
          }
        } catch (err) {
          console.error('Failed to load existing data:', err);
        }
      }
      setIsInitialized(true);
    };

    initializeData();
  }, [shareCode, beerData.length, loadCurrentData]);

  // Enhanced setBeerData that also saves to Firebase
  const setBeerDataAndSave = async (newData) => {
    setBeerData(newData);

    // Only save if we have actual data
    if (newData && newData.length > 0) {
      try {
        await saveData(newData);
      } catch (err) {
        console.error('Failed to save data to Firebase:', err);
        // Data is still set in state, just not persisted
      }
    }
  };

  // Load data by share code
  const loadDataByShareCode = async (code) => {
    try {
      const data = await loadDataByCode(code);
      if (data) {
        setBeerData(data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to load data by share code:', err);
      return false;
    }
  };

  // Clear all data
  const clearAllData = () => {
    setBeerData([]);
    clearData();
  };

  return (
    <DataContext.Provider
      value={{
        beerData,
        setBeerData: setBeerDataAndSave,
        setBeerDataDirect: setBeerData, // For cases where we don't want to save
        resetList,
        shareCode,
        firebaseLoading,
        firebaseError,
        isInitialized,
        loadDataByShareCode,
        clearAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
