/* eslint-disable no-console */
export const convertImageToBase64 = async (imageUrl) => {
  try {
    // Check if we already have the base64 version in localStorage
    const cachedBase64 = localStorage.getItem(`avatar_base64_${imageUrl}`);
    if (cachedBase64) {
      return cachedBase64;
    }

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Check if the image is too large (e.g., > 1MB)
    if (blob.size > 1024 * 1024) {
      console.warn('Avatar image is too large for base64 conversion');
      return imageUrl;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        // Cache the base64 version
        localStorage.setItem(`avatar_base64_${imageUrl}`, base64data);
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return imageUrl; // Fallback to original URL if conversion fails
  }
};
