import { useState, useEffect } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { storage, db } from '../../firebase';
import NotificationBar from '../UI/NotificationBar';

const SettingsPage = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    untappd_username: '',
    untappd_avatar: '',
    mapbox_key: '',
    gemini_api_key: '',
    venue_city: '',
    venue_state: '',
    venue_country: '',
    venue_lat: '',
    venue_lng: '',
    hide_from_leaderboard: false,
  });
  const [status, setStatus] = useState('');
  const isProfileComplete = !!(userProfile?.untappd_username && userProfile?.venue_city);

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        ...userProfile,
      }));
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await updateProfile(formData);

      // Sync leaderboard visibility immediately
      if (user?.uid) {
        await setDoc(
          doc(db, 'leaderboard', user.uid),
          { hideFromLeaderboard: !!formData.hide_from_leaderboard },
          { merge: true }
        );
      }

      setStatus('Settings saved successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleClearCache = () => {
    const cacheKey = `untappd_cache_${user?.uid}`;
    localStorage.removeItem(cacheKey);
    setStatus('Cache cleared successfully! Reloading...');
    setTimeout(() => window.location.reload(), 1500);
  };

  const handleDeleteData = async () => {
    if (
      !window.confirm(
        'Are you absolutely sure you want to delete all your imported Untappd data? This will remove it from both the cloud and your device and is irreversible.'
      )
    ) {
      return;
    }

    setStatus('Deleting data...');
    try {
      const storageRef = ref(storage, `users/${user.uid}/untappd_data.json`);
      await deleteObject(storageRef);

      // Clear cache too
      const cacheKey = `untappd_cache_${user.uid}`;
      localStorage.removeItem(cacheKey);

      // Remove from leaderboard too for full privacy/cleanup
      try {
        await deleteDoc(doc(db, 'leaderboard', user.uid));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Leaderboard entry already gone or failed to delete:', e);
      }

      setStatus('All imported data deleted successfully! Reloading...');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        // Just clear cache if object is already gone
        const cacheKey = `untappd_cache_${user.uid}`;
        localStorage.removeItem(cacheKey);
        setStatus('No cloud data found. Local cache cleared. Reloading...');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setStatus(`Error deleting data: ${error.message}`);
      }
    }
  };

  const fields = [
    { name: 'untappd_username', label: 'Untappd username' },
    { name: 'untappd_avatar', label: 'Untappd avatar URL (needed for Tappd Wrappd)' },
    { name: 'mapbox_key', label: 'Mapbox API key (optional)' },
    { name: 'gemini_api_key', label: 'Gemini API key (optional)' },
    { name: 'venue_city', label: 'Home city' },
    { name: 'venue_state', label: 'Home state' },
    { name: 'venue_country', label: 'Home country' },
    { name: 'venue_lat', label: 'Home latitude' },
    { name: 'venue_lng', label: 'Home longitude' },
  ];

  return (
    <div className="mx-auto max-w-3xl bg-gray-800 p-8 text-white shadow-2xl md:rounded-2xl">
      <h2 className="mb-6 text-3xl font-bold text-yellow-500">Settings</h2>

      {!isProfileComplete && (
        <NotificationBar
          title="Complete Your Setup"
          text={
            <>
              Please provide your <strong>Untappd username</strong> and{' '}
              <strong>Home city</strong> to unlock the Dashboard and Import features.
              These are essential for mapping and data processing.
            </>
          }
        />
      )}

      <p className="mb-8 text-gray-400">
        Update your personal details and API keys. These settings are persisted to your
        account.
      </p>

      <NotificationBar text="Don't worry, your data is saved encrypted, meaning only you can access it." />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={
                field.name === 'untappd_avatar' || field.name === 'mapbox_key'
                  ? 'md:col-span-2'
                  : ''
              }
            >
              <label
                className="mb-2 block text-sm font-medium text-gray-400"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full rounded border border-gray-600 bg-gray-700 px-4 py-2 text-white transition-colors focus:border-yellow-500 focus:outline-none"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <label
          htmlFor="hide_from_leaderboard"
          className="mt-6 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/40 px-4 py-3 transition-colors hover:border-gray-500"
        >
          <input
            type="checkbox"
            id="hide_from_leaderboard"
            name="hide_from_leaderboard"
            checked={!!formData.hide_from_leaderboard}
            onChange={handleChange}
            className="size-4 accent-yellow-500"
          />
          <span className="text-sm text-gray-300">
            Don&apos;t show my profile in the Leaderboard
          </span>
        </label>

        <div className="flex items-center justify-between pt-6">
          <button
            type="submit"
            className="rounded-lg bg-yellow-500 px-8 py-3 font-bold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Save Changes
          </button>
          {status && (
            <span
              className={`text-sm ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}
            >
              {status}
            </span>
          )}
        </div>
      </form>

      <div className="mt-12 rounded-xl border border-red-500/20 bg-red-500/5 p-8">
        <h3 className="mb-4 text-xl font-bold text-red-500">Advanced / Danger Zone</h3>
        <p className="mb-6 text-sm text-gray-400">
          Manage your sensitive data and local session settings.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-900/40 p-5">
            <h4 className="mb-2 font-bold text-gray-200">Clear Local Cache</h4>
            <p className="mb-4 text-xs text-gray-400">
              Only removes the browser copy of your data. The cloud version stays safe.
              Useful if you sync issues or layout bugs.
            </p>
            <button
              onClick={handleClearCache}
              className="w-full rounded-lg border border-gray-600 px-4 py-2 text-sm font-bold text-gray-300 transition-colors hover:bg-gray-700 active:bg-gray-600"
            >
              Clear Cache & Reload
            </button>
          </div>

          <div className="rounded-lg border border-red-900/20 bg-red-900/10 p-5">
            <h4 className="mb-2 font-bold text-red-400">Delete Imported Data</h4>
            <p className="mb-4 text-xs text-gray-400">
              Permanently removes your JSON export from Firebase Storage and this device.
              <strong>This cannot be undone.</strong>
            </p>
            <button
              onClick={handleDeleteData}
              className="w-full rounded-lg border border-red-600/30 bg-red-600/20 px-4 py-2 text-sm font-bold text-red-400 transition-all hover:text-red-300 hover:bg-red-600/30"
            >
              Delete All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
