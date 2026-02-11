# WTWR (What to Wear?)

## Overview

**WTWR** is a React-based web application that recommends clothing to users based on real-time weather data. The app fetches current weather conditions from the OpenWeather API and displays a curated set of clothing cards appropriate for the temperature and conditions at the user's location.

This project is part of the TripleTen Software Engineering bootcamp, spanning multiple sprints that progressively build a full-stack application from a front-end foundation.

### Demo

[Watch the project demo video](https://www.loom.com/share/ef25934fb3164b2a94869be1a158f34c)

## Features

- **Real-time weather data** -- Fetches temperature, location, and weather conditions from the OpenWeather API
- **Dynamic weather display** -- WeatherCard background changes based on time of day (day/night) and current weather conditions (clear, clouds, rain, snow, fog, storm)
- **Temperature unit toggle** -- Switch between Fahrenheit and Celsius using a custom toggle switch, powered by React Context
- **Weather-based card filtering** -- Clothing cards on the main page are filtered by the current weather type (hot, warm, cold)
- **Clothing item management** -- Add new clothing items via a form modal and delete items with a confirmation modal
- **Profile page** -- View all clothing items and user info via a dedicated `/profile` route
- **Client-side routing** -- Navigation between the main page and profile page using React Router
- **Modal system** -- Reusable modal components for viewing item details, adding items, and confirming deletions
- **Responsive design** -- Adapts layout and navigation for mobile and desktop viewports
- **Mock API server** -- Uses `json-server` to simulate backend CRUD operations for clothing items

## Tech Stack

- **React** 18 (functional components, hooks, context)
- **React Router** v6 (client-side routing)
- **Vite** (build tool and dev server)
- **OpenWeather API** (weather data)
- **json-server** (mock REST API)
- **CSS** (BEM methodology, component-scoped stylesheets)
- **ESLint** (code quality)

## Project Structure

```
se_project_react/
├── db.json                          # Mock server data
├── src/
│   ├── main.jsx                     # App entry point
│   ├── index.css                    # Global styles
│   ├── assets/                      # Images and SVGs
│   │   ├── day/                     # Daytime weather icons
│   │   └── night/                   # Nighttime weather icons
│   ├── components/                  # React components (grouped by feature)
│   │   ├── App/                     # Root component, state management, routing
│   │   ├── Header/                  # Logo, date, location, nav, add-clothes button
│   │   ├── Main/                    # Weather card + filtered clothing cards
│   │   ├── WeatherCard/             # Dynamic weather display
│   │   ├── ItemCard/                # Individual clothing card
│   │   ├── Profile/                 # Profile page layout
│   │   ├── SideBar/                 # User avatar and name
│   │   ├── ClothesSection/          # All clothing items with add button
│   │   ├── Footer/                  # Copyright info
│   │   ├── ToggleSwitch/            # Fahrenheit/Celsius toggle
│   │   └── Modals/                  # AddItemModal, ItemModal, ConfirmDeleteModal, ModalWithForm
│   ├── contexts/                    # React Context definitions
│   │   └── CurrentTempUnitContext.js
│   ├── hooks/                       # Custom hooks
│   │   └── useForm.js
│   ├── utils/                       # API calls, constants, helpers
│   │   ├── api.js                   # CRUD operations (json-server)
│   │   ├── weatherApi.js            # OpenWeather API fetch and parsing
│   │   ├── constants.js             # API key, coordinates, weather images
│   │   └── defaultClothingItems.js  # Fallback clothing data
│   └── vendor/                      # Third-party assets
│       ├── normalize.css
│       └── cabinet-grotesk-webfont/ # Custom font files
└── vite.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jdijols/se_project_react.git
cd se_project_react
```

2. Install dependencies:

```bash
pnpm install
```

### Running the Application

You will need **two terminal windows** -- one for the React dev server and one for the mock API server.

**Terminal 1 -- Start the React dev server:**

```bash
pnpm run dev
```

The app will open automatically at [http://localhost:3000](http://localhost:3000).

**Terminal 2 -- Start the mock API server:**

```bash
pnpm run server
```

This runs `json-server` on [http://localhost:3001](http://localhost:3001), serving clothing item data from `db.json`.

## Deployment

The project is configured for GitHub Pages deployment:

```bash
pnpm run deploy
```

**Live site:** [https://jdijols.github.io/se_project_react/](https://jdijols.github.io/se_project_react/)
