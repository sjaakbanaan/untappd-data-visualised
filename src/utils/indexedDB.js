const DB_NAME = 'untappd_cache_db';
const STORE_NAME = 'json_cache';

export const getCache = async (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(key);
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };
    request.onerror = (e) => reject(e.target.error);
  });
};

export const setCache = async (key, value) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      try {
        store.put(value, key);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      } catch (err) {
        reject(err);
      }
    };
    request.onerror = (e) => reject(e.target.error);
  });
};

export const deleteCache = async (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const deleteRequest = store.delete(key);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
    request.onerror = (e) => reject(e.target.error);
  });
};

export const clearOldCache = (keyPrefix) => {
  // Utility to clear old localStorage keys to free up space
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(keyPrefix)) {
      localStorage.removeItem(key);
    }
  });
};
