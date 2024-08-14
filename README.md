# Real Estate Property Data Generator

This project is a real estate property data generator that integrates a map search feature using Leaflet.js. Users can enter a city and state to generate property descriptions or use a map search to select a region, and the app will generate descriptions based on that selection.

## Features

- **City and State Input**: Users can enter a city and state to generate property descriptions using AI.
- **Map Search**: Users can click on a map to select a region for generating property data.
- **Geocoding**: Users can search for specific locations on the map, which will center the map and allow for region selection.
- **Property Data Display**: The generated property data is displayed as cards with images and descriptions.

## Project Structure

- src/
  - layouts/
    - Layout.astro
  - pages/
    - index.astro
  - styles/
    - global.css
  - scripts/
    - theme.js
  - api/
    - properties.json.ts

## Layout File

### src/layouts/Layout.astro

The layout file includes the basic HTML structure for the application, including global styles and navigation.

## Main Page

### src/pages/index.astro

This is the main file that handles the property search form, map popup, and display of generated property data.

- **Form Input**: The form allows users to input a city and state.
- **Map Search**: Includes a "map search" link that opens a map popup where users can select a region.
- **Property Display**: Displays the generated property data as cards with images and descriptions.

## Global Styles

### src/styles/global.css

This file includes global styles for the project, handling things like font styles, colors, and layout adjustments.

## Theme Script

### src/scripts/theme.js

This script manages theme toggling between light and dark modes.

## API for Property Data

### src/api/properties.json.ts

This file handles requests to generate property data using AI and returns the data in JSON format.

## Installation and Usage

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm start`.
4. Open your browser and navigate to `http://localhost:4321` to use the application.

## Map Search Integration

The project uses Leaflet.js for map functionalities and Leaflet Control Geocoder for geocoding.

1. When the "map search" link is clicked, a popup with a map is displayed, allowing users to select a region.
2. The selected region's coordinates are used to generate property data when the "Generate Based on Region" button is clicked.

## Conclusion

This project demonstrates how to integrate a map-based search feature into a real estate property data generator, offering users an interactive way to search for properties.

## License

This project is licensed under the [MIT License](LICENSE).