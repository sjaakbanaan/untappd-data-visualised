/* eslint-disable no-console */
import { useState, useEffect, useMemo, useRef } from 'react';
import {
  analysisMatchesRange,
  analyzeBeerDataWithAI,
  buildStoredAnalysisPayload,
  formatAnalysisHtml,
  formatAnalysisTimestamp,
  formatWrappdDates,
  getAnalysisCreatedAt,
  getAnalysisRange,
  readStoredAnalysis,
  removeStoredAnalysis,
  serializeBeerDataForAnalysis,
  useDashboardData,
  writeStoredAnalysis,
} from '../../utils/';

const AIAnalysis = ({
  beerData,
  analysis,
  setAnalysis,
  filterDateRange,
  geminiApiKey,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  /** Range (start/end) that the current `analysis` text belongs to; null if none */
  const [analysisForRange, setAnalysisForRange] = useState(null);
  const [analysisCreatedAt, setAnalysisCreatedAt] = useState(null);
  const { setIsFilterSidebarOpen, dataLoading } = useDashboardData();

  const prevFilterKeyRef = useRef(null);
  const prevBeerSerializedRef = useRef(null);
  /** After a date-range change, filtered beerData updates one render later — skip upload-style invalidation until resynced. */
  const resyncBeerAfterFilterChangeRef = useRef(false);

  // Drop persisted analysis when check-ins change but the date range filter did not (e.g. new upload)
  useEffect(() => {
    if (dataLoading) return;

    const filterKey = `${filterDateRange.start}|${filterDateRange.end}`;
    const prevFilterKey = prevFilterKeyRef.current;

    const filterJustChanged = prevFilterKey !== null && prevFilterKey !== filterKey;

    const serializedBeer = serializeBeerDataForAnalysis(beerData);

    if (prevFilterKeyRef.current === null) {
      prevFilterKeyRef.current = filterKey;
      prevBeerSerializedRef.current = serializedBeer;
      return;
    }

    if (filterJustChanged) {
      prevFilterKeyRef.current = filterKey;
      resyncBeerAfterFilterChangeRef.current = true;
      prevBeerSerializedRef.current = serializedBeer;
      return;
    }

    if (resyncBeerAfterFilterChangeRef.current) {
      prevBeerSerializedRef.current = serializedBeer;
      resyncBeerAfterFilterChangeRef.current = false;
      return;
    }

    const prevBeer = prevBeerSerializedRef.current;

    if (prevBeer !== null && prevBeer !== serializedBeer) {
      removeStoredAnalysis();
      setAnalysis('');
      setAnalysisForRange(null);
      setAnalysisCreatedAt(null);
    }

    prevBeerSerializedRef.current = serializedBeer;
  }, [beerData, dataLoading, filterDateRange.start, filterDateRange.end, setAnalysis]);

  // Restore saved analysis from localStorage whenever it exists (including after refresh).
  // Persisted start/end may differ from the current filter — mismatch UI explains that.
  useEffect(() => {
    const stored = readStoredAnalysis();
    if (!stored) return;

    setAnalysis(stored.content);
    setAnalysisForRange({ start: stored.start, end: stored.end });
    setAnalysisCreatedAt(new Date(stored.createdAt));
    setError('');
  }, [filterDateRange.start, filterDateRange.end, setAnalysis]);

  const analysisMatchesCurrentRange = useMemo(() => {
    return analysisMatchesRange(analysis, analysisForRange, filterDateRange);
  }, [analysis, analysisForRange, filterDateRange]);

  const displayCreatedAt = useMemo(() => {
    return getAnalysisCreatedAt(
      analysisCreatedAt,
      analysis,
      analysisForRange,
      filterDateRange
    );
  }, [analysisCreatedAt, analysis, analysisForRange, filterDateRange]);

  /** Range the visible analysis text was generated for (for headings when filter differs). */
  const displayedAnalysisRange = useMemo(() => {
    return getAnalysisRange(analysisForRange, analysis);
  }, [analysisForRange, analysis]);

  const analysisFilterMismatch = useMemo(() => {
    const r = displayedAnalysisRange;
    if (!r) return false;
    return r.start !== filterDateRange.start || r.end !== filterDateRange.end;
  }, [displayedAnalysisRange, filterDateRange.start, filterDateRange.end]);

  const hasBeerData = beerData?.length > 0;
  const showAnalyzeButton = !analysisMatchesCurrentRange;

  const analyzeBeerData = async () => {
    if (!hasBeerData) {
      setError('No beer data available for analysis.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await analyzeBeerDataWithAI(beerData, geminiApiKey);
      const storedAnalysis = buildStoredAnalysisPayload(result, filterDateRange);
      writeStoredAnalysis(storedAnalysis);
      setAnalysis(result);
      setAnalysisForRange({
        start: filterDateRange.start,
        end: filterDateRange.end,
      });
      setAnalysisCreatedAt(new Date(storedAnalysis.createdAt));
    } catch (err) {
      setError('Failed to analyze data. Please check your API key and try again.');
      console.error('AI Analysis Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto mb-6 xl:w-1/2">
        <h2 className="mb-4 text-2xl font-bold text-white">
          AI beer analysis
          <span className="ml-2 text-sm text-gray-500">BETA</span>
        </h2>

        <div className="block overflow-hidden border border-gray-600 px-6 py-10 shadow-lg md:rounded-lg">
          <div className="mb-4 text-center">
            <p className="mb-2 text-gray-300">
              Get AI-powered insights for:
              <button
                className="ml-2 cursor-pointer items-center gap-1 whitespace-nowrap rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm font-normal text-yellow-500 transition-colors hover:bg-yellow-500/20"
                onClick={() => setIsFilterSidebarOpen(true)}
              >
                {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
              </button>
            </p>
            {analysisFilterMismatch && (
              <p className="mt-6 text-sm text-amber-200/90">
                Run analyze to replace your last analysis with insights for the current
                range.
              </p>
            )}
          </div>

          {showAnalyzeButton && (
            <div className="my-10 flex justify-center">
              <button
                type="button"
                onClick={analyzeBeerData}
                disabled={isLoading || !hasBeerData}
                className={`rounded-full px-8 pb-4 pt-3 text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95
                  ${
                    isLoading || !hasBeerData
                      ? 'cursor-not-allowed border-gray-600 bg-gray-600 text-gray-400'
                      : 'border-yellow-500 bg-yellow-500 text-black'
                  }`}
              >
                {isLoading ? 'Analyzing...' : 'Analyze My Checkins'}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded border border-red-400 bg-red-900/50 p-3 text-red-300">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-6 block overflow-hidden bg-gray-700 p-6 shadow-lg md:rounded-lg">
              <h3 className="mb-1 text-xl font-semibold text-yellow-500">
                Your analysis for{' '}
                <span className="font-bold">
                  {formatWrappdDates(
                    (displayedAnalysisRange ?? filterDateRange).start,
                    (displayedAnalysisRange ?? filterDateRange).end
                  )}
                </span>
              </h3>
              {displayCreatedAt && (
                <p className="mb-4 text-sm text-gray-400">
                  Generated {formatAnalysisTimestamp(displayCreatedAt)}
                </p>
              )}
              <div
                className="prose prose-sm max-w-none text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: formatAnalysisHtml(analysis),
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
