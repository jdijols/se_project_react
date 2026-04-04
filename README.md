# WTWR (What to Wear?)

## Overview

**WTWR** is a full-stack React web application that recommends clothing based on real-time weather data. The app fetches current weather conditions from the OpenWeather API and displays clothing cards filtered by temperature. Users can register, sign in, manage their wardrobe by adding and deleting clothing items, like other users' items, and update their profile -- all backed by a custom Express API with JWT authentication.

This project is part of the TripleTen Software Engineering bootcamp, spanning multiple sprints that progressively build a full-stack application from a front-end foundation.

### Demo

[Watch the project demo video](https://www.loom.com/share/ef25934fb3164b2a94869be1a158f34c)

## Backend

The backend Express API for this project can be found here: [se_project_express](https://github.com/jdijols/se_project_express)

## Features

- **User authentication** -- Register, sign in, and sign out with JWT-based authorization; token is persisted in localStorage and validated on page load
- **Profile management** -- View and edit user name and avatar via a dedicated profile page and modal
- **Protected routes** -- The `/profile` route is only accessible to authenticated users; unauthorized visitors are redirected to the main page
- **Clothing item management** -- Add new clothing items via a form modal and delete items with a confirmation modal (authenticated users only)
- **Likes** -- Authenticated users can like and unlike clothing items; like state persists across page loads
- **Real-time weather data** -- Fetches temperature, location, and weather conditions from the OpenWeather API
- **Dynamic weather display** -- WeatherCard background changes based on time of day (day/night) and current weather conditions (clear, clouds, rain, snow, fog, storm)
- **Temperature unit toggle** -- Switch between Fahrenheit and Celsius using a custom toggle switch, powered by React Context
- **Weather-based card filtering** -- Clothing cards on the main page are filtered by the current weather type (hot, warm, cold)
- **Responsive design** -- Adapts layout and navigation for mobile and desktop viewports
- **Modal system** -- Reusable modal components for registration, login, profile editing, viewing item details, adding items, and confirming deletions

## Tech Stack

- **React** 18 (functional components, hooks, context)
- **React Router** v6 (client-side routing, protected routes)
- **Vite** (build tool and dev server)
- **Express / MongoDB** (backend REST API with JWT auth)
- **OpenWeather API** (weather data)
- **CSS** (BEM methodology, component-scoped stylesheets)
- **ESLint** and **Prettier** (code quality and formatting)

## Project Structure

```
se_project_react/
├── src/
│   ├── main.jsx                     # App entry point
│   ├── index.css                    # Global styles
│   ├── assets/                      # Images and SVGs
│   │   ├── day/                     # Daytime weather icons
│   │   └── night/                   # Nighttime weather icons
│   ├── components/                  # React components (grouped by feature)
│   │   ├── App/                     # Root component, state management, routing
│   │   ├── Header/                  # Logo, date, location, nav, auth buttons
│   │   ├── Main/                    # Weather card + filtered clothing cards
│   │   ├── WeatherCard/             # Dynamic weather display
│   │   ├── ItemCard/                # Individual clothing card with like button
│   │   ├── Profile/                 # Profile page layout
│   │   ├── SideBar/                 # User avatar, name, logout, edit profile
│   │   ├── ClothesSection/          # Current user's clothing items with add button
│   │   ├── Footer/                  # Copyright info
│   │   ├── ToggleSwitch/            # Fahrenheit/Celsius toggle
│   │   ├── ProtectedRoute/          # Route guard for authenticated users
│   │   └── Modals/                  # RegisterModal, LoginModal, EditProfileModal,
│   │                                # AddItemModal, ItemModal, ConfirmDeleteModal,
│   │                                # ModalWithForm
│   ├── contexts/                    # React Context definitions
│   │   ├── CurrentTempUnitContext.js # Temperature unit context
│   │   └── CurrentUserContext.js    # Current user context
│   ├── hooks/                       # Custom hooks
│   │   └── useForm.js               # Form state and validation hook
│   ├── utils/                       # API calls, constants, helpers
│   │   ├── api.js                   # Clothing item CRUD and likes (Express backend)
│   │   ├── auth.js                  # Signup, signin, token validation, profile update
│   │   ├── weatherApi.js            # OpenWeather API fetch and parsing
│   │   ├── constants.js             # API key, coordinates, weather images
│   │   └── defaultClothingItems.js  # Fallback clothing data
│   └── vendor/                      # Third-party assets
│       ├── normalize.css
│       └── cabinet-grotesk-webfont/ # Custom font files and font-face declarations
└── vite.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) package manager
- MongoDB running locally (for the backend)

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

You will need **two terminal windows** -- one for the React frontend and one for the Express backend.

**Terminal 1 -- Start the React dev server:**

```bash
pnpm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

**Terminal 2 -- Start the Express backend:**

Make sure MongoDB is running (`mongod`), then start the backend server from the [se_project_express](https://github.com/jdijols/se_project_express) repository. The backend runs on `http://localhost:3000` by default -- ensure the frontend and backend are configured on separate ports.

## Deployment

The project is configured for GitHub Pages deployment:

```bash
pnpm run deploy
```

**Live site:** [https://jdijols.github.io/se_project_react/](https://jdijols.github.io/se_project_react/)

## Backend

The server-side code for this project lives in a separate repository:

**Backend repo:** [https://github.com/jdijols/se_project_express](https://github.com/jdijols/se_project_express)
