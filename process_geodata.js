const fs = require('fs');
const NodeGeocoder = require('node-geocoder');

// Load your original JSON file
const originalData = require('./public/beers-test.json');

// Function to create a new geocoder instance
function createGeocoder() {
  return NodeGeocoder({
    provider: 'openstreetmap', // You can choose a different provider if needed
    apiKey: '', // Add your API key if required by the provider
  });
}

// Function to find city and country based on venue_lng and venue_lat with a delay
async function findCityAndCountryWithDelay(geocoder, venue_lng, venue_lat, delay) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const result = await geocoder.reverse({ lat: venue_lat, lon: venue_lng });
        resolve(result);
      } catch (error) {
        console.error('Error:', error.message);
        resolve(null);
      }
    }, delay);
  });
}

// Create a set to track processed coordinates
const processedCoordinates = new Set();

// Process each item with location data
const processedData = originalData.map(async (item, index) => {
  const { checkin_id, venue_lng, venue_lat } = item;

  // Check if the coordinates have been processed before
  const coordinates = `${venue_lat}_${venue_lng}`;
  if (processedCoordinates.has(coordinates)) {
    console.log(`Skipping: Item ${checkin_id} already processed.`);
    return { checkin_id, city: null, country: null, success: false };
  }

  // Create a new geocoder instance for each request
  const geocoder = createGeocoder();

  // Process geocoding for unique coordinates with a delay of 500 milliseconds between requests
  const result = await findCityAndCountryWithDelay(
    geocoder,
    venue_lng,
    venue_lat,
    index * 200
  );
  processedCoordinates.add(coordinates);

  if (result && result[0]) {
    const { city, country } = result[0];
    console.log(`Success: Item ${checkin_id} added to the new JSON.`);
    return { checkin_id, city, country, success: true };
  } else {
    console.error(`Error: Geocoding result is empty for ${checkin_id}.`);
    return { checkin_id, city: null, country: null, success: false };
  }
});

// Wait for all promises to resolve
Promise.all(processedData)
  .then((result) => {
    // Write the results to a new JSON file
    const outputFile = './public/checkin_location.json';
    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
    console.log('Processing complete. Results saved to', outputFile);
  })
  .catch((error) => console.error('Error processing data:', error));
