import { GoogleGenerativeAI } from '@google/generative-ai';

export const preferredModels = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro',
];

/**
 * Discovers available Gemini models from the API
 */
export const discoverAvailableModels = async (apiKey) => {
  try {
    const listResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
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
  // Use preferred model if available, otherwise use first available
  const preferredModel = availableModels.find((name) => preferredModels.includes(name));
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
