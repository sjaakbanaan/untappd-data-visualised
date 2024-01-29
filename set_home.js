const fs = require('fs');

// the config file
const config = require('./public/home-config.json');
const newValues = config.newValues;

// Load your original JSON file
const originalData = require('./public/beers.json');

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
