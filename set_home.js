const fs = require('fs');

// Load your original JSON file
const originalData = require('./public/beers.json');

// Create a Set to keep track of unique checkin_ids
const uniqueCheckinIds = new Set();

// Filter out duplicates based on the 'checkin_id'
const updatedData = originalData.filter((item) => {
  if (!uniqueCheckinIds.has(item.checkin_id)) {
    uniqueCheckinIds.add(item.checkin_id);
    return true;
  }
  return false;
});

// Save the updated data to a new JSON file
const outputFile = './public/beers-processed.json';
fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2));
console.log('Duplicates removed. Updated data saved to', outputFile);
