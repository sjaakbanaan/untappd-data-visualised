import { useState, useEffect } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Generate a random share code
const generateShareCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const useFirebaseData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shareCode, setShareCode] = useState(null);
  const [error, setError] = useState(null);

  // Initialize Firebase auth and check for existing share code
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing share code in localStorage
        const savedCode = localStorage.getItem('shareCode');
        if (savedCode) {
          setShareCode(savedCode);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      }
    };

    initializeAuth();
  }, []);

  // Save data to Firebase with share code (chunked for large datasets)
  const saveData = async (beerData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Sign in anonymously
      const userCredential = await signInAnonymously(auth);
      const userId = userCredential.user.uid;
      console.log('User authenticated:', userId);
      console.log('Auth state:', auth.currentUser);

      // Generate share code
      const code = generateShareCode();

      // Chunk the data to avoid Firestore size limits (1MB per document)
      const chunkSize = 100; // Even smaller chunk size to avoid size limits
      const chunks = [];
      for (let i = 0; i < beerData.length; i += chunkSize) {
        chunks.push(beerData.slice(i, i + chunkSize));
      }

      // Save metadata document
      console.log('Attempting to save metadata document...');
      await setDoc(doc(db, 'userData', userId), {
        shareCode: code,
        totalRecords: beerData.length,
        chunkCount: chunks.length,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      console.log('Metadata document saved successfully');

      // Save data chunks sequentially to avoid rate limiting
      console.log('Saving data chunks...');
      for (let i = 0; i < chunks.length; i++) {
        console.log(`Saving chunk ${i} with ${chunks[i].length} records`);
        await setDoc(doc(db, 'userData', `${userId}_chunk_${i}`), {
          chunkIndex: i,
          data: chunks[i],
          totalChunks: chunks.length,
        });
        // Delay to avoid rate limiting and write queue exhaustion
        if (i < chunks.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      console.log('Data chunks saved successfully');

      // Save to shareable document (also chunked)
      console.log('Saving shared metadata...');
      await setDoc(doc(db, 'sharedData', code), {
        originalUserId: userId,
        totalRecords: beerData.length,
        chunkCount: chunks.length,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      console.log('Shared metadata saved successfully');

      // Save shared data chunks sequentially to avoid rate limiting
      console.log('Saving shared data chunks...');
      for (let i = 0; i < chunks.length; i++) {
        console.log(`Saving shared chunk ${i} with ${chunks[i].length} records`);
        await setDoc(doc(db, 'sharedData', `${code}_chunk_${i}`), {
          chunkIndex: i,
          data: chunks[i],
          totalChunks: chunks.length,
        });
        // Delay to avoid rate limiting and write queue exhaustion
        if (i < chunks.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      console.log('Shared data chunks saved successfully');

      // Update local state and storage
      setShareCode(code);
      localStorage.setItem('shareCode', code);

      return code;
    } catch (err) {
      console.error('Failed to save data:', err);
      if (err.code === 'auth/configuration-not-found') {
        setError(
          'Firebase Authentication is not enabled. Please enable Anonymous sign-in in Firebase Console.'
        );
      } else {
        setError('Failed to save data. Please try again.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load data by share code (handles chunked data)
  const loadDataByCode = async (code) => {
    setIsLoading(true);
    setError(null);

    try {
      const docSnap = await getDoc(doc(db, 'sharedData', code));

      if (docSnap.exists()) {
        const metadata = docSnap.data();

        // Check if data is chunked
        if (metadata.chunkCount && metadata.chunkCount > 1) {
          // Load all chunks
          const chunkPromises = [];
          for (let i = 0; i < metadata.chunkCount; i++) {
            chunkPromises.push(getDoc(doc(db, 'sharedData', `${code}_chunk_${i}`)));
          }

          const chunkSnaps = await Promise.all(chunkPromises);
          const chunks = chunkSnaps.map((snap) => snap.data().data);

          // Combine chunks back into single array
          const beerData = chunks.flat();

          // Update local state and storage
          setShareCode(code);
          localStorage.setItem('shareCode', code);

          return beerData;
        } else {
          // Legacy single document format
          const beerData = metadata.beerData;

          // Update local state and storage
          setShareCode(code);
          localStorage.setItem('shareCode', code);

          return beerData;
        }
      } else {
        setError('Invalid share code. Please check and try again.');
        return null;
      }
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Load data from current share code
  const loadCurrentData = async () => {
    if (!shareCode) return null;
    return loadDataByCode(shareCode);
  };

  // Clear share code and data
  const clearData = () => {
    setShareCode(null);
    localStorage.removeItem('shareCode');
  };

  return {
    isLoading,
    shareCode,
    error,
    saveData,
    loadDataByCode,
    loadCurrentData,
    clearData,
  };
};
