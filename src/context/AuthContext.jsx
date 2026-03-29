import { createContext, useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

const ENCRYPTED_FIELDS = [
  'venue_city',
  'venue_state',
  'venue_country',
  'venue_lat',
  'venue_lng',
  'mapbox_key',
  'gemini_api_key',
];

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, untappdUsername) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      untappd_username: untappdUsername,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    return res;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateProfile = async (data) => {
    if (!user) return;

    const secret = `${import.meta.env.VITE_FIREBASE_API_KEY}_${user.uid}`;
    const encryptedData = { ...data };

    ENCRYPTED_FIELDS.forEach((field) => {
      const value = encryptedData[field];
      if (value !== undefined && value !== null && value !== '') {
        // Only encrypt if it's not already encrypted (though usually it won't be in the update payload)
        const stringValue = value.toString();
        if (!stringValue.startsWith('enc:')) {
          encryptedData[field] =
            `enc:${CryptoJS.AES.encrypt(stringValue, secret).toString()}`;
        }
      }
    });

    return setDoc(doc(db, 'users', user.uid), encryptedData, { merge: true });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Listen to user profile changes
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const rawData = docSnap.data();
            const secret = `${import.meta.env.VITE_FIREBASE_API_KEY}_${currentUser.uid}`;
            const decryptedData = { ...rawData };

            ENCRYPTED_FIELDS.forEach((field) => {
              const value = decryptedData[field];
              if (typeof value === 'string' && value.startsWith('enc:')) {
                try {
                  const ciphertext = value.replace('enc:', '');
                  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
                  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

                  if (decryptedValue !== '') {
                    // Restore original types: check if it's a number (for lat/lng)
                    if (field === 'venue_lat' || field === 'venue_lng') {
                      decryptedData[field] = parseFloat(decryptedValue);
                    } else {
                      decryptedData[field] = decryptedValue;
                    }
                  } else {
                    // If decryption returns empty string but original was not empty,
                    // it might be corrupted or using a different key.
                    // For now, we leave as is or set to original value.
                  }
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error(`Failed to decrypt ${field}:`, e);
                }
              }
            });

            setUserProfile(decryptedData);
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        });
        return () => unsubscribeProfile();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userProfile,
    signup,
    login,
    logout,
    loginWithGoogle,
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
};
