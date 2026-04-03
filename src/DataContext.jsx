import { createContext, useState, useEffect, useMemo } from 'react';
import { ref, getBytes } from 'firebase/storage';
import { useAuth } from './context/AuthContext';
import { storage } from './firebase';
import { useUploadedJsonUpdater, getCache, setCache, clearOldCache } from './utils';
import { extractBadges } from './utils/extractBadges';
import { detectFormat } from './utils/normaliseCheckins';

const DataContext = createContext();

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

const DataProvider = ({ children }) => {
  const { user, userProfile } = useAuth();
  const { manipulateData } = useUploadedJsonUpdater();
  const [beerData, setBeerData] = useState([]);
  const [badgeData, setBadgeData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setBeerData([]);
        setBadgeData(null);
        setDataLoading(false);
        return;
      }

      // Only show global spinner if we don't have data yet (initial load)
      if (beerData.length === 0) {
        setDataLoading(true);
      }
      try {
        let rawJson;
        
        // 1. Check local cache (IndexedDB)
        const cacheKey = `untappd_cache_${user.uid}`;
        
        // Cleanup old localStorage keys if they exist
        clearOldCache('untappd_cache_');
        
        const cachedData = await getCache(cacheKey);
        
        if (cachedData) {
          try {
            rawJson = JSON.parse(cachedData);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error parsing cached data:', e);
          }
        }

        // 2. If no cache, fetch from Storage
        if (!rawJson) {
          const storageRef = ref(storage, `users/${user.uid}/untappd_data.json`);
          const bytes = await getBytes(storageRef);
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(bytes);
          rawJson = JSON.parse(text);
          
          // 3. Save to cache (IndexedDB)
          try {
            await setCache(cacheKey, text);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Failed to save to IndexedDB:', e);
          }
        }

        const autoDetectedFormat = detectFormat(rawJson);
        const correctSource = autoDetectedFormat === 'scraper_xl' ? 'custom_export' : 'untappd_insider';
        
        const currentSettings = {
          ...userProfile,
          json_source: correctSource,
        };

        const updatedData = manipulateData(rawJson, currentSettings);
        setBeerData(updatedData);

        const checkins = Array.isArray(rawJson?.checkins) ? rawJson.checkins : rawJson;
        if (Array.isArray(checkins) && checkins.length > 0 && Array.isArray(checkins[0]?.badges)) {
          setBadgeData(extractBadges(checkins));
        } else {
          setBadgeData(null);
        }
      } catch (error) {
        // If file doesn't exist, it's fine - user just hasn't uploaded yet
        if (error.code !== 'storage/object-not-found') {
          // eslint-disable-next-line no-console
          console.error('Error fetching data from cloud:', error);
        }
        setBeerData([]);
        setBadgeData(null);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userProfile, manipulateData]);

  const value = useMemo(() => ({ 
    beerData, 
    setBeerData, 
    badgeData, 
    setBadgeData, 
    resetList, 
    dataLoading 
  }), [beerData, badgeData, dataLoading]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
