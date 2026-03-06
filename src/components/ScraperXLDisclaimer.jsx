import { useState, useEffect } from 'react';

const DISMISSED_KEY = 'scraperxl_disclaimer_dismissed';

const ScraperXLDisclaimer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only when:
    // 1. The uploaded source is scraper_xl
    // 2. The user hasn't dismissed it this session
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    const isScraperXL = userDetails?.json_source === 'custom_export';
    const isDismissed = sessionStorage.getItem(DISMISSED_KEY) === 'true';
    setVisible(isScraperXL && !isDismissed);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="relative mb-4 rounded-md border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200"
    >
      <div className="flex items-start gap-3 md:items-center">
        {/* Icon */}
        <span className="mt-0.5 shrink-0 text-yellow-400 md:mt-0" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        {/* Message */}
        <p className="flex-1 leading-relaxed">
          <span className="font-semibold text-yellow-400">Heads up: </span>
          Your unique beer count may differ slightly from what Untappd shows. This can happen when
          Untappd merges or reassigns beer entries after your original check-in — meaning the same
          beer now has a different ID than when you first checked it in. Nothing you can do about
          it, just a quirk of the data!
        </p>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss notice"
          className="shrink-0 rounded p-0.5 text-yellow-400 transition-colors hover:bg-yellow-500/20 hover:text-yellow-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScraperXLDisclaimer;
