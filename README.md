# Untappd Data Visualised v1.0

## Overview
#### You need to be an _Untappd Insider_ to use this dashboard!

This little side project, "untappd-data-visualised," is designed to visualize Untappd data in various formats, such as charts, lists, and maps. It leverages React, Chart.js, Leaflet, and some others to provide an interactive and insightful representation of your Untappd check-in history (screenshots soon).

You start by setting a date range, and from there you can start filtering. After setting filters, the following lists are presented in either a chart or list:
- Top 10 breweries
- Top 10 beer Styles
- Top 10 most drank beers
- Top 10 venues purchased
- Top 10 venues
- Top 10 venue cities
- Top 10 venue countries
- Top 10 brewery country
- Top 10 brewery cities
- Top 10 rated beers (by you)
- Top 10 rated beers (global / you (diff))
- Top 10 strongest beers
- Top 10 toasts
- Top 10 comments
- Top 10 most drank beers
- Friends drank with

## Getting Started

### Prerequisites

- **Node.js**: and preferably **Yarn**.
- An export of your data from Untappd (https://untappd.com/user/xxxx/beers) as JSON.

### Installation:

```bash
# Clone the repository
git clone https://github.com/sjaakbanaan/untappd-data-visualised

# Change to the project directory
cd untappd-data-visualised

# Install dependencies
yarn install // npm run install
```

- Rename the exported file to `beers.json` and add the file to the `public` folder.
- _Importent step:_ By default Untappd sets the long/lat for 'Untappd at Home' and 'Untappd Virtual Festival' in the US, to change this follow these steps:
1. Copy `home-config-example.json` from the `public` folder to `home-config.json` 
2. Update `home-config.json` by setting your location data;
3. run: 
```bash
yarn set-home // node set-home.js
```

### Usage

To start the server:

```bash
yarn start  // npm run start
```

This will open the app on localhost:3000 in your default web browser.

## Future wishes

- Make this into an actual web app so you don't have to run it yourself.
- A sortable dashboard where you can toggle certain data.

## Contributing

Contributions are welcome via pull requests! Please make sure to adhere to the project's coding standards.

## License

This project is licensed under the MIT License.
