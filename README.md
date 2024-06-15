# Untappd Data Visualised v2.2.0

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
- Filter by country drank at
- Filter by city drank at
- Filter by brewery
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
- NEW: beer type apprecation list
- NEW: basic statistics
and more!

```

## Want to contribute? 

### Prerequisites

- **Node.js**: and preferably **Yarn**.
- An export of your data from Untappd (https://untappd.com/user/xxxx/beers) as JSON.
- A [MapBox API key](https://account.mapbox.com/). It's free, you should be able to skip the setting up your payment card somehow.

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

![image](https://github.com/sjaakbanaan/untappd-data-visualised/assets/2773301/33e336c0-8539-4988-9388-1699bf1d3aea)

## Recent changes

- 12-05-2024: And we're live! https:///tappd.online
- 04-05-2024: Added sorting filters to the beer overview
- 04-05-2024: Added a basic statistics block as first tile on the dashboard

## Future wishes

- Make this into an actual web app so you don't have to run it yourself.

## Known bugs

- you tell me :)

## Contributing

Contributions are welcome via pull requests! Please make sure to adhere to the project's coding standards.

## License

This project is licensed under the MIT License.

![image](https://github.com/sjaakbanaan/untappd-data-visualised/assets/2773301/389514dd-710d-4671-9195-cbb62189c191)

