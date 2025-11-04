/* eslint-disable no-console */
import { formatWrappdDates, getLocalStorageData } from '../utils';
import { initializeModel, preferredModels } from './aiModelDiscovery';
import { handleAIError } from './aiErrorHandler';
import { prepareAnalysisData, buildAnalysisPrompt } from './prepareAnalysisData';
import { markdownToHtml } from './markdownToHtml';

export const analyzeBeerDataWithAI = async (beerData) => {
  if (!beerData || beerData.length === 0) {
    throw new Error('No beer data available for analysis');
  }

  const apiKey = getLocalStorageData('gemini_api_key');

  if (!apiKey) {
    throw new Error(
      'Gemini API key not found. Please add your Gemini API key in the upload form.'
    );
  }

  // Initialize model
  const { model, availableModels } = await initializeModel(apiKey);

  // Prepare data and build prompt
  const analysisData = prepareAnalysisData(beerData);
  const prompt = buildAnalysisPrompt(analysisData, beerData, formatWrappdDates);

  // Generate analysis
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Convert Markdown to HTML (e.g., **bold** to <strong>bold</strong>)
    return markdownToHtml(text);
  } catch (error) {
    const errorResult = await handleAIError(
      error,
      prompt,
      apiKey,
      availableModels,
      preferredModels
    );
    // Convert Markdown to HTML for fallback results too
    return markdownToHtml(errorResult);
  }
};
