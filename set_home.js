const fs = require('fs');

// Load your original JSON file
const originalData = require('./public/beers.json');

// Define the new values
const newValues = {
  venue_lat: '52.089941',
  venue_lng: '5.0812333',
  venue_city: 'Utrecht',
  venue_state: 'Utrecht',
  venue_country: 'Nederland',
};

// Update the values in the original data based on the condition
const updatedData = originalData.map((item) => {
  if (item.venue_name === 'Untappd at Home') {
    return {
      ...item,
      ...newValues,
    };
  }
  return item;
});

// Save the updated data to a new JSON file
const outputFile = './public/beers-processed.json';
fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2));
console.log('Values updated. Updated data saved to', outputFile);
