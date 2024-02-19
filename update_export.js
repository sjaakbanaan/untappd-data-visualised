const fs = require('fs');

// the config file
const config = require('./public/home-config.json');
const newValues = config.home;

// Load your original JSON file
const originalData = require('./public/beers.json');

// Create a Set to keep track of unique checkin_ids
const uniqueCheckinIds = new Set();

// Update the values in the original data based on the condition
const updatedData = originalData.map((item) => {
  let updatedItem = { ...item }; // Create a copy of the original item

  // Define the properties to check and update
  const propertiesToCheck = ['checkin_url', 'beer_url', 'brewery_url'];

  // Iterate over the properties
  propertiesToCheck.forEach((property) => {
    // Check if the property exists and contains "api.untappd", then replace it
    if (updatedItem[property] && updatedItem[property].includes('api.untappd')) {
      updatedItem[property] = updatedItem[property].replace('api.untappd', 'www.untappd');
    }
  });

  // Optionally, add additional conditions to update the item based on other criteria
  if (
    updatedItem.venue_name === 'Untappd at Home' ||
    updatedItem.venue_name === 'Untappd Virtual Festival' ||
    updatedItem.venue_name === 'Untappd 10th Anniversary Party'
  ) {
    // Add additional properties or update existing ones
    updatedItem = {
      ...updatedItem,
      ...newValues,
    };
  }

  return updatedItem;
});

// Filter out duplicates based on the 'checkin_id'
const filteredData = updatedData.filter((item) => {
  if (!uniqueCheckinIds.has(item.checkin_id)) {
    uniqueCheckinIds.add(item.checkin_id);
    return true;
  }
  return false;
});

// Save the updated and filtered data to a new JSON file
const outputFile = './public/beers-processed.json';
fs.writeFileSync(outputFile, JSON.stringify(filteredData, null, 2));
console.log('Values updated and duplicates removed. Updated data saved to', outputFile);
