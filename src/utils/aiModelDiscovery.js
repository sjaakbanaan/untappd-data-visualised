/* eslint-disable no-console */
import { GoogleGenerativeAI } from '@google/generative-ai';

export const preferredModels = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
];

/**
 * Discovers available Gemini models from the API
 */
export const discoverAvailableModels = async (apiKey) => {
  try {
    const listResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1/models',
      { headers: { 'x-goog-api-key': apiKey } }
    );

    if (!listResponse.ok) {
      return [];
    }

    const listData = await listResponse.json();

    if (!listData.models || !Array.isArray(listData.models)) {
      return [];
    }

    return listData.models
      .filter((m) => {
        const supportsGenerateContent =
          m.supportedGenerationMethods?.includes('generateContent') ||
          m.supportedGenerationMethods?.includes('GENERATE_CONTENT');
        const modelName = m.name?.replace('models/', '') || m.name;
        return supportsGenerateContent && modelName;
      })
      .map((m) => m.name?.replace('models/', '') || m.name)
      .filter(Boolean);
  } catch (error) {
    console.log('Could not list models:', error.message);
    return [];
  }
};

/**
 * Selects the best available model from discovered models
 */
export const selectBestModel = (availableModels, genAI) => {
  // Walk the preference list so a newer pinned model wins over API list order
  const preferredModel = preferredModels.find((name) => availableModels.includes(name));
  const modelToUse = preferredModel || availableModels[0] || preferredModels[0];

  return genAI.getGenerativeModel({ model: modelToUse });
};

/**
 * Initializes and returns the best available Gemini model
 */
export const initializeModel = async (apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const availableModels = await discoverAvailableModels(apiKey);
  return {
    model: selectBestModel(availableModels, genAI),
    availableModels,
  };
};
