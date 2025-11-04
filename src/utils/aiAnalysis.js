/* eslint-disable no-console */
import { formatWrappdDates, getLocalStorageData } from '../utils';
import { initializeModel, preferredModels } from './aiModelDiscovery';
import { handleAIError } from './aiErrorHandler';
import { prepareAnalysisData, buildAnalysisPrompt } from './prepareAnalysisData';

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
    return response.text();
  } catch (error) {
    return handleAIError(error, prompt, apiKey, availableModels, preferredModels);
  }
};
