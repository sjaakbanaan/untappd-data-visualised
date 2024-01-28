const fs = require('fs');
const readline = require('readline');

// Load your original JSON file
const originalData = require('./public/beers.json');

// Create an interface for reading from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for new latitude and longitude values
rl.question('Enter new latitude: ', (newLat) => {
  rl.question('Enter new longitude: ', (newLng) => {
    // Update the values in the original data based on the condition
    const updatedData = originalData.map((item) => {
      if (item.venue_name === 'Untappd at Home') {
        return {
          ...item,
          venue_lat: newLat,
          venue_lng: newLng,
        };
      }
      return item;
    });

    // Close the readline interface
    rl.close();

    // Save the updated data to a new JSON file
    const outputFile = './public/beers-processed.json';
    fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2));
    console.log('Values updated. Updated data saved to', outputFile);
  });
});
