import { useEffect, useContext, useState } from 'react';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes } from 'firebase/storage';

import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';
import { useUploadedJsonUpdater, formatDate, setCache, clearOldCache } from '../../utils/';
import { extractBadges } from '../../utils/extractBadges';
import { detectFormat } from '../../utils/normaliseCheckins';
import { updateLeaderboard } from '../../utils/updateLeaderboard';
import { DataContext } from '../../DataContext';
import NotificationBar from '../UI/NotificationBar';

const Uploader = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const { setBeerData, setBadgeData, skipNextFetch } = useContext(DataContext);
  const { manipulateData } = useUploadedJsonUpdater();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/uploader',
      title: 'Uploader',
    });
  }, []);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0 && user) {
      setUploading(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();

      // eslint-disable-next-line no-console
      reader.onabort = () => console.log('file reading was aborted');
      // eslint-disable-next-line no-console
      reader.onerror = () => console.log('file reading has failed');

      reader.onload = async () => {
        try {
          const rawJson = JSON.parse(reader.result);
          const autoDetectedFormat = detectFormat(rawJson);
          const correctSource =
            autoDetectedFormat === 'scraper_xl' ? 'custom_export' : 'untappd_insider';

          // Use userProfile from AuthContext instead of local state
          const currentSettings = {
            ...userProfile,
            json_source: correctSource,
          };

          const updatedData = manipulateData(rawJson, currentSettings);
          setBeerData(updatedData);

          const checkins = Array.isArray(rawJson?.checkins) ? rawJson.checkins : rawJson;
          if (
            Array.isArray(checkins) &&
            checkins.length > 0 &&
            Array.isArray(checkins[0]?.badges)
          ) {
            setBadgeData(extractBadges(checkins));
          } else {
            setBadgeData(null);
          }

          // Upload to Firebase Storage for persistence
          const storageRef = ref(storage, `users/${user.uid}/untappd_data.json`);
          await uploadBytes(storageRef, file);

          // 4. Update leaderboard stats
          await updateLeaderboard(user, userProfile?.untappd_username, updatedData);

          // 5. Tell DataContext to skip the next refetch cycle – we already
          //    set beerData directly, so when updateProfile triggers the
          //    useEffect (via userProfile dependency), it shouldn't overwrite it.
          skipNextFetch();

          // 6. Update last import timestamp
          await updateProfile({ last_import: new Date().toISOString() });

          // 7. Update local cache (IndexedDB)
          try {
            // Cleanup old localStorage keys if they exist
            clearOldCache('untappd_cache_');
            await setCache(`untappd_cache_${user.uid}`, reader.result);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Failed to update local cache:', e);
          }

          navigate('/');
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error processing or uploading file:', error);
          alert('Failed to process JSON. Please ensure it is a valid Untappd export.');
        } finally {
          setUploading(false);
        }
      };

      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-red-500">
      <ul className="list-disc pl-5">
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="mx-auto max-w-3xl bg-gray-800 p-10 text-white shadow-2xl md:rounded-2xl">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold text-yellow-500">Import Your Data</h2>
        <p className="text-gray-400">
          Your data will be securely stored in the cloud and available every time you log
          in.
        </p>
        {userProfile?.last_import && (
          <p className="mt-2 text-sm text-yellow-500/80">
            Last data import: {formatDate(userProfile.last_import)}
          </p>
        )}
      </div>

      <NotificationBar text="Uploading a new file will replace your current data. You can always see which file source is being used in your settings." />

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-16 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-yellow-500 bg-yellow-500/10'
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="size-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
            <p className="text-xl font-bold text-yellow-500">Processing & Syncing...</p>
          </div>
        ) : isDragActive ? (
          <p className="text-2xl font-bold text-yellow-500">Drop it here!</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                className="size-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-400">
              Drag 'n' drop your JSON file here, or click to selecting
            </p>
            <button className="rounded-full bg-yellow-500 px-8 py-3 text-lg font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-95">
              Select JSON file
            </button>
          </div>
        )}
      </div>

      {fileRejectionItems.length > 0 && (
        <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <h4 className="mb-2 font-bold text-red-500">Selection Errors:</h4>
          <ul>{fileRejectionItems}</ul>
        </div>
      )}
    </div>
  );
};

export default Uploader;
