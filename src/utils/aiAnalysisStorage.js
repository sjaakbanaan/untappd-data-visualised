/* eslint-disable no-console */

export const AI_ANALYSIS_STORAGE_KEY = 'untappd_ai_beer_analysis_v1';

const isStoredAnalysis = (value) =>
  value &&
  typeof value.content === 'string' &&
  typeof value.start === 'string' &&
  typeof value.end === 'string' &&
  typeof value.createdAt === 'string';

export const readStoredAnalysis = () => {
  try {
    const raw = localStorage.getItem(AI_ANALYSIS_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return isStoredAnalysis(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const writeStoredAnalysis = (payload) => {
  try {
    localStorage.setItem(AI_ANALYSIS_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to persist AI analysis:', err);
  }
};

export const removeStoredAnalysis = () => {
  try {
    localStorage.removeItem(AI_ANALYSIS_STORAGE_KEY);
  } catch (_) {
    /* ignore */
  }
};

export const buildStoredAnalysisPayload = (content, filterDateRange) => ({
  content,
  createdAt: new Date().toISOString(),
  start: filterDateRange.start,
  end: filterDateRange.end,
});

export const getAnalysisRange = (analysisForRange, analysis) => {
  if (analysisForRange) return analysisForRange;

  const stored = readStoredAnalysis();
  if (stored && stored.content === analysis) {
    return { start: stored.start, end: stored.end };
  }

  return null;
};

export const analysisMatchesRange = (analysis, analysisForRange, filterDateRange) => {
  if (!analysis) return false;

  const stored = readStoredAnalysis();
  const rangeMatches =
    analysisForRange &&
    analysisForRange.start === filterDateRange.start &&
    analysisForRange.end === filterDateRange.end;
  const storedMatches =
    stored &&
    stored.start === filterDateRange.start &&
    stored.end === filterDateRange.end &&
    stored.content === analysis;

  return Boolean(rangeMatches || storedMatches);
};

export const getAnalysisCreatedAt = (
  analysisCreatedAt,
  analysis,
  analysisForRange,
  filterDateRange
) => {
  if (analysisCreatedAt) return analysisCreatedAt;

  const stored = readStoredAnalysis();
  if (!stored || stored.content !== analysis) return null;

  const matchesAnalysisRange =
    analysisForRange &&
    stored.start === analysisForRange.start &&
    stored.end === analysisForRange.end;
  const matchesFilterRange =
    stored.start === filterDateRange.start && stored.end === filterDateRange.end;

  return matchesAnalysisRange || matchesFilterRange ? new Date(stored.createdAt) : null;
};

export const formatAnalysisTimestamp = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const serializeBeerDataForAnalysis = (beerData) =>
  beerData?.length > 0 ? JSON.stringify(beerData) : '';
