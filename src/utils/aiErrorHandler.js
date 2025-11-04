/**
 * Handles errors and provides fallback to direct API calls
 */
export const handleAIError = async (
  error,
  prompt,
  apiKey,
  availableModels,
  preferredModels
) => {
  // If SDK fails, try direct API call with discovered models
  if (
    error.message &&
    (error.message.includes('not found for API version') ||
      error.message.includes('not supported for generateContent'))
  ) {
    const modelsToAttempt =
      availableModels.length > 0 ? availableModels : preferredModels;

    for (const modelName of modelsToAttempt) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data.candidates[0].content.parts[0].text;
        }
      } catch (fallbackError) {
        continue; // Try next model
      }
    }
  }

  // Provide helpful error messages
  if (error.message && error.message.includes('API key')) {
    throw new Error(
      `Invalid or missing Gemini API key. Please check your API key in the upload form. Original error: ${error.message}`
    );
  }

  throw new Error(
    `Failed to analyze data with Gemini AI: ${error.message || 'Unknown error'}`
  );
};
