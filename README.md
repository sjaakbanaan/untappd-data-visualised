# Untappd Data Visualised v2.8.1

## This is the repository for [tappd.online](https:///tappd.online)

## Overview

Untappd Data Visualised is designed to visualize Untappd data in various formats, such as charts, lists, and maps. It leverages React, Chart.js, MapBox, and some others to provide an interactive and insightful representation of your Untappd check-in history. Chat-GPT helped me a lot with creating this.

## Prerequisites

- An export of your data from Untappd as JSON. If you're an Untappd Insider, you can get it [here](https://untappd.com/user/xxxx/beers). If you're not, you can use [Untappd Scraper XL](https://github.com/sjaakbanaan/untappd-scraper-xl) and follow the installation steps to create an export yourself.
- Optional: to see a world map with your checkins and check-in venues, a [MapBox API key](https://account.mapbox.com/). It's free, you should be able to skip the setting up your payment card somehow.
- Optional: To use the AI analyzer, a [Gemini API key]([https://account.mapbox.com/](https://ai.google.dev/gemini-api/docs/api-key)). Also free.
- for local development: **Node.js**: and preferably **Yarn**.


## How to use

Go to [tappd.online](https:///tappd.online) and upload your export. Set a date range, and start filtering. For example filter by brewery name/city/country or venue name/city/country.
After setting filters, the following lists are presented in either a chart or list:
| Category      | Subcategory | Items |
|----------------|-------------|------|
| **Beer** | Top lists | Top beers (rated / most drank / strongest), Top beer styles, Top flavor combinations / flavor profiles |
| | Analysis | Beer type appreciation list, Beer types by rating |
| | Filters | Filter by beer type |
| **Breweries** | Top lists | Top breweries, Top brewery countries, Top brewery cities |
| | Analysis | Breweries by rating |
| | Filters | Filter by breweries, Filter by brewery countries, Filter by brewery cities |
| **Venues** | Top lists | Top venues, Top venue countries, Top venue cities, Top venues purchased |
| | Filters | Filter by venues drank at, Filter by countries drank at, Filter by cities drank at |
| **Social** | Interaction | Tagged friends, Filter by tagged friends, Top toasts, Top comments |
| **Maps** | Visualization | Show check-ins on a map, Map displaying venues checked-in, Map displaying brewery countries |
| **Statistics** | Frequency | Beer ABV distribution, Rating score distribution, Serving type distribution, Beers per day / month / year |
| | General | Cumulative beer count (year), Basic statistics |
| **Achievements** | Overview | Badges overview |

## Screenshots

<img width="3600" height="5758" alt="screencapture-tappd-online-2026-03-07-17_36_52" src="https://github.com/user-attachments/assets/bc1765c2-67b4-43cf-a43f-9939c1cf46cc" />

<img width="3600" height="5646" alt="screencapture-tappd-online-2026-03-07-17_37_11" src="https://github.com/user-attachments/assets/adbc4a56-0300-46a4-a04a-9b18c6a4aed0" />

<img width="3600" height="3902" alt="screencapture-tappd-online-2026-03-07-17_37_34" src="https://github.com/user-attachments/assets/8874bc18-bf7e-4e73-a6e3-b466adfda9bd" />

<img width="677" alt="Screenshot 2025-04-21 at 21 47 01" src="https://github.com/user-attachments/assets/ea076421-28ba-472b-91b6-90f0468fc10f" />

## Change log

- 12-05-2024: v2.0.1 And [we're live!](https://tappd.online)
- 04-05-2024: v2.0.2 Added sorting filters to the beer overview
- 04-05-2024: v2.1.0 Added a basic statistics block as first tile on the dashboard
- 15-06-2024: v2.2.0 Added the 'tagged_friends' filter to the overview + bug fixes
- 25-11-2024: v2.2.1 Add the option to filter by beer type, improved country overlay on MapBox maps + bug fixes
- 25-11-2024: v2.3.0 Fixed a date range bug + added sort option to Beer type chart, sortable by 'total results' and 'beer type'
- 25-11-2024: v2.3.1 Fixed the issue with only 3 items in the top 10 list and prep for the 'Wrappd' option that's coming soon +  cleanup
- 10-12-2024: v2.3.1 New default font + more prep for Wrappd
- 10-12-2024: v2.4.0 v1 of Tappd Wrappd is done!
- 21-01-2025: v2.4.1 Added a yearly avg. (global) rating to the frequency bar chart
- 22-01-2025: v2.4.2 Disabled Tappd Wrapped because of CORS issues + New UI for the basic statistics
- 04-02-2025: v2.4.3 Performance improvement by grouping elements in tabbed content
- 14-03-2025: v2.4.4 Add an average rating to the basic stats overview
- 16-03-2025: v2.4.5 Better error handling with invalid filter options applied
- 18-03-2025: v2.4.6 Map Box key is now optional, the Map nav element will be hidden + some Wrappd leftovers cleanup.
- 18-03-2025: v2.4.7 Improved dashboard navigation
- 23-03-2025: v2.5 Cleanup of Dashboard.jsx + solved warnings + fixed issue where select box value didn't reset after filter reset + better ui for year buttons for long-time users + filters only defined in DataContext, no longer on 4 different places
- 23-03-2025: v2.5.1 Added brewery state and rating as a filter option
- 15-04-2025: v2.5.2 Fixed a bug where filtering on 'tagged friends' wouldn't return a complete list
- 21-04-2025: v2.6.0 Tappd Wrappd is back! Now as a sharable link!
- 22-04-2025: v2.6.1 Active filter(s) are now also visible on your Tappd Wrappd + cleanup
- 27-04-2025: v2.6.2 Big cleanup and better UX for Tappd Wrappd
- 28-04-2025: v2.6.3 More of the above
- 11-05-2025: v2.6.4 Moved Tappd Wrappd to the bottom and gave it some more styling and added totals to the maps
- 16-05-2025: v2.6.5 Added share button for Tappd Wrappd
- 01-08-2025: v2.6.6 Replaced the rating filter with the purchased venues filter
- 03-12-2025: v2.6.7 Added the option to see your monthly checkins divided over years to bar charts + mobile UI fix for charts
- 19-08-2025: v2.6.8 Added the option to set a custom title in your Tappd Wrappd
- 21-08-2025: v2.7.0 Added AI Beer Analysis (Beta) - Let Gemini AI analyze your Untappd check-ins and discover personalized insights about your beer drinking patterns, preferences, and trends for any selected time period (Gemini API key required).
- 27-08-2025: v2.7.1 Added a global rating vs. your rating comparison in the basic stats overview + fixed AI icon
- 04-10-2025: v2.7.2 Fixed the bug where 'years active' and 'days active' would show up on random date selections
- 04-11-2025: v2.7.3 Fixed broken AI analysis
- 04-03-2026: v2.8.0 Soft launch of the option to use the new Untappd Scraper XL, next to Untappd Insider export
- 06-03-2026: v2.8.1 Added badges when available from export (currently only Scraper XL export is supported) + showing most checked-in beer data to basic stats 
  
## Known bugs

- tell me

## Contributing

Contributions are welcome via pull requests! Please make sure to adhere to the project's coding standards.

### Installation:

```bash
# Clone the repository
git clone https://github.com/sjaakbanaan/untappd-data-visualised

# Change to the project directory
cd untappd-data-visualised

# Install dependencies
yarn install # npm install
```

### Usage

To start the server:

```bash
yarn start # npm run start
```

This will open the app on localhost:3000 in your default web browser. Fill in the form and upload your JSON export and set your home data (you can get these values via Google Maps for example).

## License

This project is licensed under the MIT License.

