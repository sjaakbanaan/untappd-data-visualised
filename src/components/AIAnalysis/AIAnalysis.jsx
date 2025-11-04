/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';
import { analyzeBeerDataWithAI, formatWrappdDates } from '../../utils/';

const AIAnalysis = ({ beerData, analysis, setAnalysis, filterDateRange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const prevBeerDataRef = useRef();

  // Reset analysis when beerData changes
  useEffect(() => {
    const prevBeerData = prevBeerDataRef.current;

    // Only reset if beerData has actually changed (not just re-render)
    if (
      prevBeerData !== undefined &&
      (prevBeerData?.length !== beerData?.length ||
        JSON.stringify(prevBeerData) !== JSON.stringify(beerData))
    ) {
      setAnalysis('');
      setError('');
    }

    prevBeerDataRef.current = beerData;
  }, [beerData, setAnalysis]);

  const analyzeBeerData = async () => {
    if (!beerData || beerData.length === 0) {
      setError('No beer data available for analysis.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await analyzeBeerDataWithAI(beerData);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze data. Please check your API key and try again.');
      console.error('AI Analysis Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 mx-auto xl:w-1/2">
        <h2 className="mb-4 text-2xl font-bold text-white">
          AI beer analysis
          <span className="text-gray-500 text-sm ml-2">BETA</span>
        </h2>

        <div className="block overflow-hidden border border-white p-6 shadow-lg md:rounded-lg">
          <div className="mb-4 text-center">
            <p className="text-gray-300">
              Get AI-powered insights for{' '}
              <span className="font-bold">
                {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
              </span>
              .
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={analyzeBeerData}
              disabled={isLoading || !beerData || beerData.length === 0}
              className={`mx-2 mb-0 flex items-center rounded border px-6 py-3 shadow transition-colors duration-300
                ${
                  isLoading || !beerData || beerData.length === 0
                    ? 'cursor-not-allowed border-gray-600 bg-gray-600 text-gray-400'
                    : 'border-yellow-500 bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                }`}
            >
              {isLoading ? 'Analyzing...' : 'Analyze my checkins'}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded border border-red-400 bg-red-900/50 p-3 text-red-300">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-6 block overflow-hidden bg-gray-700 p-6 shadow-lg md:rounded-lg">
              <h3 className="mb-4 text-xl font-semibold text-yellow-500">
                Your analysis for{' '}
                <span className="font-bold">
                  {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
                </span>
                .
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: analysis
                    .split('\n')
                    .filter((p) => p.trim())
                    .map((paragraph) => `<p class="mb-3">${paragraph.trim()}</p>`)
                    .join(''),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
