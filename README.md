<div align="center">

# 🍻 Juomapeli

**A fast, browser-based drinking card game for Finnish game nights.**

[![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/styled--components-5-DB7093?logo=styledcomponents&logoColor=white)](https://styled-components.com/)

[Play online](https://juodaan.com) · [Report a bug](https://github.com/roqqq3/card-game/issues) · [Suggest a card](https://github.com/roqqq3/card-game/issues)

</div>

## About

Juomapeli draws randomized Finnish-language challenge cards for a group of players. Start a quick game immediately or add player names to track turns and ongoing card effects.

### Features

- **210 challenge cards** with different rarity levels
- **Quick play** without player setup
- **Player mode** with automatic turn tracking
- **Continuous effects** shown alongside the active card
- **No immediate repeats** from the recent card history
- **Keyboard controls** — press the space bar to draw the next card
- **Responsive browser UI** for both desktop and mobile play

## Getting started

### Requirements

- [Node.js](https://nodejs.org/)
- npm

### Installation

```bash
git clone https://github.com/roqqq3/card-game.git
cd card-game
npm ci
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads automatically when you edit the source files.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build in `build/` |
| `npm start` | Serve the existing production build |
| `npm test` | Run tests in interactive watch mode |

To run the production version locally:

```bash
npm run build
npm start
```

## Adding cards

Cards live in [`src/cards/cardsData.js`](src/cards/cardsData.js). Add a new object to `cardsDataWithoutIds`:

```js
{
  "name": "Example card",
  "description": "Describe the challenge here.",
  "rarity": 20,
  "continuous": false
}
```

| Field | Meaning |
| --- | --- |
| `name` | Short title displayed on the card |
| `description` | Instructions shown to the players |
| `rarity` | Draw threshold from `0` (common) to `100` (extremely rare) |
| `continuous` | Whether the effect remains active for the assigned player |

Card IDs are generated automatically from their position in the array, so they should not be added manually.

## Project structure

```text
src/
├── cards/          # Card data and card types
├── components/     # Game screens and reusable UI components
├── types/          # Shared TypeScript types
├── App.tsx         # Game state and card selection logic
└── index.tsx       # Application entry point
```

## Built with

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/)
- [styled-components](https://styled-components.com/)
- [Font Awesome](https://fontawesome.com/)

---

<div align="center">
  Made for game nights in Finland 🇫🇮
</div>
