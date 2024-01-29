# Untappd Data Visualised v1.0

## Overview

#### You need to be an _Untappd Insider_ to use this dashboard!
This little side project, "untappd-data-visualised," is designed to visualize Untappd data in various formats, such as charts, lists, and maps. It leverages React, Chart.js, Leaflet, and other technologies to provide an interactive and insightful representation of your Untappd check-in history (screenshots soon).

## Getting Started

### Prerequisites

- **Node.js**: and **Yarn**.

### Configuration

See following steps.

### Installation:

```bash
# Clone the repository
git clone https://github.com/sjaakbanaan/untappd-data-visualised

# Change to the project directory
cd untappd-data-visualised

# Install dependencies
yarn install
```

- Export your data from Untappd (https://untappd.com/user/xxxx/beers) as JSON.

- Rename the file to `beers.json` and add the file to the `public` folder.

- _Importent step:_ By default Untappd sets the long/lat for 'Untappd at Home' in the US, replace it with own home address by copying `home-config-example.json` from the  `public` folder to `home-config.json` and then from root run:
```bash
yarn set-home
```

### Usage

To start the server:

```bash
yarn run start
```

This will open the app in your default web browser.

## Contributing

Contributions are welcome via pull requests! Please make sure to adhere to the project's coding standards.

## License

This project is licensed under the MIT License.
