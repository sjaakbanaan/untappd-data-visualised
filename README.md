# Untappd Data Visualised v2.3.2

## This is the repo for [tappd.online](https:///tappd.online), no need to install anymore!


### Checkout the releases page for update notes

![image](https://github.com/sjaakbanaan/untappd-data-visualised/assets/2773301/adff1ca7-4638-4de3-a585-c2fb8852e4b9)

## Overview
#### You need to be an _Untappd Insider_ to use this dashboard!

This little side project, "untappd-data-visualised," is designed to visualize Untappd data in various formats, such as charts, lists, and maps. It leverages React, Chart.js, MapBox, and some others to provide an interactive and insightful representation of your Untappd check-in history. Chat-GPT helped me a lot with creating this.

You start by setting a date range, and from there you can start filtering. For example filter by brewery name/city/country or venue name/city/country.
After setting filters, the following lists are presented in either a chart or list:
```
- Top 10 beer styles
- Top 10 breweries
- Top 10 brewery countries
- Top 10 brewery cities
- Top 10 flavor combinations
- Top 10 most drank beers
- Top 10 venues
- Top 10 venue cities
- Top 10 venue countries
- Top 10 venues purchased
- Top 10 rated beers (by you)
- Top 10 rated beers (global / you (diff))
- Top 10 strongest beers
- Top 10 toasts
- Top 10 comments
- Top flavour profiles
- Tagged friends
- Breweries by rating
- Beer types by rating
- Filter by breweries
- Filter by brewery cities
- Filter by brewery countries
- Filter by venues drank at
- Filter by countries drank at
- Filter by cities drank at
- Filter by tagged friends
- NEW: Filter by beer type
- Show checkins on a map
- Frequency: Beer ABV
- Frequency: Beers per year
- Frequency: Beers per month
- Frequency: Beers per day
- Frequency: Rating scores
- Frequency: Serving type
- displaying venues checked-in
- Map displaying brewery countries
- Cumulative beer count (year)
- Beer type apprecation list
- Basic statistics
- COMING SOON: 'wrapped' png export

```

## Want to contribute? 

### Prerequisites

- **Node.js**: and preferably **Yarn**.
- An export of your data from Untappd (https://untappd.com/user/xxxx/beers) as JSON.
- A [MapBox API key](https://account.mapbox.com/). It's free, you should be able to skip the setting up your payment card somehow.


![image](https://github.com/sjaakbanaan/untappd-data-visualised/assets/2773301/33e336c0-8539-4988-9388-1699bf1d3aea)

## Recent changes

- 12-05-2024: v2.0.1 And [we're live!](https://tappd.online)
- 04-05-2024: v2.0.2 Added sorting filters to the beer overview
- 04-05-2024: v2.1.0 Added a basic statistics block as first tile on the dashboard
- 15-06-2024: v2.2.0 Added the 'tagged_friends' filter to the overview + bug fixes
- 25-11-2024: v2.2.1 Add the option to filter by beer type, improved country overlay on MapBox maps + bug fixes
- 25-11-2024: v2.3.0 Fixed a date range bug + added sort option to Beer type chart, sortable by 'total results' and 'beer type'
- 25-11-2024: v2.3.1 Fixed the issue with only 3 items in the top 10 list and prep for the 'Wrappd' option that's coming soon +  cleanup
- 10-12-2024: v2.3.1 New default font + more prep for Wrappd

## Future wishes

- Make this into an actual web app so you don't have to run it yourself.

## Known bugs

- Resetting filters doesn't reset the select box values in UI

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

![image](https://github.com/sjaakbanaan/untappd-data-visualised/assets/2773301/389514dd-710d-4671-9195-cbb62189c191)

