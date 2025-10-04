import { useState, useContext } from 'react';
import { DataContext } from '../../DataContext';

const ShareCodeManager = () => {
  const {
    shareCode,
    firebaseLoading,
    firebaseError,
    loadDataByShareCode,
    clearAllData,
    beerData,
  } = useContext(DataContext);

  const [inputCode, setInputCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoadData = async () => {
    if (!inputCode.trim()) {
      setMessage('Please enter a share code');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const success = await loadDataByShareCode(inputCode.trim().toUpperCase());
      if (success) {
        setMessage('Data loaded successfully!');
        setInputCode('');
      } else {
        setMessage('Invalid share code. Please check and try again.');
      }
    } catch (error) {
      setMessage('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(shareCode);
      setMessage('Share code copied to clipboard!');
    } catch (error) {
      setMessage('Failed to copy share code');
    }
  };

  const handleClearData = () => {
    if (
      window.confirm('Are you sure you want to clear all data? This cannot be undone.')
    ) {
      clearAllData();
      setMessage('Data cleared successfully');
    }
  };

  // Don't show anything if no data and no share code
  if (!beerData.length && !shareCode) {
    return null;
  }

  return (
    <div className="mx-auto mb-8 max-w-2xl rounded-lg bg-gray-800 p-6 text-white">
      <h3 className="mb-4 text-xl font-bold">Data Management</h3>

      {/* Show current share code if available */}
      {shareCode && (
        <div className="mb-6 rounded-lg bg-green-900 p-4">
          <h4 className="mb-2 font-semibold text-green-200">Your Data is Saved!</h4>
          <p className="mb-3 text-sm text-green-300">
            Use this code to access your data on any device:
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-gray-700 px-3 py-2 text-lg font-mono text-green-400">
              {shareCode}
            </code>
            <button
              onClick={handleCopyCode}
              className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-500"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Load data by share code */}
      <div className="mb-6">
        <h4 className="mb-2 font-semibold">Load Data from Share Code</h4>
        <p className="mb-3 text-sm text-gray-400">
          Enter a share code to load data from another device:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="Enter 6-character code"
            maxLength={6}
            className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
          />
          <button
            onClick={handleLoadData}
            disabled={isLoading || firebaseLoading}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load Data'}
          </button>
        </div>
      </div>

      {/* Clear data button */}
      {beerData.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleClearData}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
          >
            Clear All Data
          </button>
        </div>
      )}

      {/* Messages */}
      {message && (
        <div
          className={`rounded p-3 text-sm ${
            message.includes('success') || message.includes('copied')
              ? 'bg-green-900 text-green-200'
              : 'bg-red-900 text-red-200'
          }`}
        >
          {message}
        </div>
      )}

      {/* Firebase errors */}
      {firebaseError && (
        <div className="rounded bg-red-900 p-3 text-sm text-red-200">{firebaseError}</div>
      )}

      {/* Loading indicator */}
      {firebaseLoading && (
        <div className="rounded bg-blue-900 p-3 text-sm text-blue-200">
          Saving data...
        </div>
      )}
    </div>
  );
};

export default ShareCodeManager;
