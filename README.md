# Tappd (Untappd Data Visualised) v3.5.1

## This is the repository for [tappd.online](https:///tappd.online)

**Your uploaded data is stored online, so you don't need to have JSON ready to upload every time you visit the site. Just log in and your data will be there.**

## Overview

Tappd is designed to visualize Untappd data in various formats, such as charts, lists, and maps. It leverages React, Chart.js, MapBox, and some others to provide an interactive and insightful representation of your Untappd check-in history. Using LLM's made creating this a lot easier and faster.

## Prerequisites

- An export of your data from Untappd as JSON. If you're an Untappd Insider, you can get it [here](https://untappd.com/user/xxxx/beers). If you're not, you can use [Untappd Scraper XL](https://github.com/sjaakbanaan/untappd-scraper-xl) and follow the installation steps to create an export yourself.
- Optional: to see a world map with your checkins and check-in venues, a [MapBox API key](https://account.mapbox.com/). It's free, you should be able to skip the setting up your payment card somehow.
- Optional: To use the AI analyzer, a [Gemini API key](<[https://account.mapbox.com/](https://ai.google.dev/gemini-api/docs/api-key)>). Also free.
- for local development: **Node.js**: and preferably **Yarn**.

## How to use

Go to [tappd.online](https:///tappd.online), create an account and upload your export. Set a date range, and start filtering. For example filter by brewery name/city/country or venue name/city/country.
After setting filters, the following lists are presented in either a chart or list:
| Category         | Subcategory   | Items                                                                                                     |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| **Beer**         | Top lists     | Top beers (rated / most drank / strongest), Top beer styles, Top flavor combinations / flavor profiles    |
|                  | Analysis      | Beer type appreciation list, Beer types by rating                                                         |
|                  | Filters       | Filter by beer type                                                                                       |
| **Breweries**    | Top lists     | Top breweries, Top brewery countries, Top brewery cities                                                  |
|                  | Analysis      | Breweries by rating                                                                                       |
|                  | Filters       | Filter by breweries, Filter by brewery countries, Filter by brewery cities                                |
| **Venues**       | Top lists     | Top venues, Top venue countries, Top venue cities, Top venues purchased                                   |
|                  | Filters       | Filter by venues drank at, Filter by countries drank at, Filter by cities drank at                        |
| **Social**       | Interaction   | Tagged friends, Filter by tagged friends, Top toasts, Top comments                                        |
| **Maps**         | Visualization | Show check-ins on a map, Map displaying venues checked-in, Map displaying brewery countries               |
| **Statistics**   | Frequency     | Beer ABV distribution, Rating score distribution, Serving type distribution, Beers per day / month / year |
|                  | General       | Cumulative beer count (year), Basic statistics                                                            |
| **Achievements** | Overview      | Badges overview                                                                                           |

## Screenshots

<img width="1440" height="2374" alt="screencapture-tappd-online-2026-07-16-20_53_03" src="https://github.com/user-attachments/assets/2d50478c-8e70-41e5-984c-e96025693c1b" />

<img width="1440" height="2271" alt="screencapture-tappd-online-2026-07-16-20_51_42" src="https://github.com/user-attachments/assets/4e0f9969-2edd-4261-9aea-2fa7bf497b26" />

<img width="1440" height="1826" alt="screencapture-tappd-online-2026-07-16-20_52_29" src="https://github.com/user-attachments/assets/b3de901d-7631-480c-b39f-115350460d59" />

<img width="1440" height="1082" alt="screencapture-tappd-online-2026-07-16-20_53_54" src="https://github.com/user-attachments/assets/937c6250-8575-4b9d-96b4-84c9fd98cc4f" />

<img width="1440" height="2054" alt="screencapture-tappd-online-2026-07-16-20_54_09" src="https://github.com/user-attachments/assets/ff61d23c-5d12-46f0-86bb-e1596e52ad40" />

## Recent changelog

- 04-03-2026: v2.8.0 Soft launch of the option to use the new Untappd Scraper XL, next to Untappd Insider export
- 06-03-2026: v2.8.1 Added badges when available from export (currently only Scraper XL export is supported) + showing most checked-in beer data to basic stats
- 07-03-2026: v2.8.2 Added the option to group badges by level (steps of 10)
- 31-03-2026: v2.9.0 Your uploaded data is now stored online, so you don't need to have JSON ready to upload every time you visit the site. Just log in and your data will be there.
- 31-03-2026: v2.9.1 Fixed a bug where filtering on 'tagged friends' wouldn't return a complete list + improved mobile UX
- 08-04-2026: v3.0.0 Added a leaderboard functionality + rebranded to Tappd + improved (mobile) UX + fixed bug where you had to hard refresh after uploading a new json.
- 18-04-2026: v3.0.3 Fixed 'Top 10 rated beers (global / you (diff))' - hide when json was exported with the scraper XL, otherwise it will just show the global ratings
- 01-05-2026: v3.1.0 Refactored Wrappd UX, and added maps and more basic statistics + small bug fixes.
- 10-05-2026: v3.4.0 feat: update AIAnalysis component with enhanced analysis storage functionality and improved data handling
- 15-05-2026: v3.4.2 improved layout and functionality in sidebar + funny little effect on dashboard tab buttons
- 16-05-2026: v3.4.3 added Tappd Wrappd backlog so you don't have to recreate them
- 16-06-2026: v3.5.0 replaced the map inside Wrappd with an open-source one + added a new feature (in beta) to compare basic stats with other users for the current date range.
- 18-06-2026: v3.5.1 added bubble animation to dashboard nav button, implemented dynamic page titles in AppContent and refine UI styles across various components for consistency.
- 16-07-2026: v.3.6.0 added GitHub link to Footer, removed from Header and MobileMenu, and introduced new icons for Settings and Logout in Navigation
- 16-07-2026: v3.6.1 feat: pass beerData to DashboardHeader and update date range reset logic based on available beer creation dates

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

This will open the app on localhost:3000 in your default web browser. Log in with your existing account (or create one on [tappd.online](https://tappd.online)). Update your settings and upload your JSON to get started.

## License

This project is licensed under the MIT License.
