# Flux

Flux is a streaming-platform front end built with **Angular 17** (standalone
components, the new `@if` / `@for` control-flow syntax, and lazy-loaded
routes) — a home for movies, series, anime and documentaries in one catalog.

> All titles, artwork and copy in this project are original placeholders
> created for this demo. Flux does not stream real content.

## Features

- **Hero banner** with an animated "flux waveform" signature graphic
- **Horizontally scrolling shelves** — Trending, New Releases, Anime,
  Movies, Series, Documentaries
- **Browse page** with category tabs (`Movie` / `Series` / `Anime` /
  `Documentary` / `All`) and live search
- **Detail modal** with synopsis, meta info and a "More like this" row
- Fully responsive, keyboard-accessible, and respects
  `prefers-reduced-motion`
- Dark, high-contrast visual identity: near-black surfaces with a
  violet → teal gradient signature and Space Grotesk / Inter type pairing

## Project structure

```
src/app/
├── components/
│   ├── navbar/            top navigation, search, mobile menu
│   ├── hero/               featured-title banner
│   ├── content-row/        horizontal scrolling shelf
│   ├── content-card/       poster card used in rows, grid & modal
│   ├── content-modal/      title detail overlay
│   └── footer/              site footer
├── pages/
│   ├── home/               "/" — hero + shelves
│   └── browse/              "/browse/:category" — filterable grid
├── models/content.model.ts  shared TypeScript interfaces
└── services/content.service.ts  in-memory catalog + query helpers
```

## Getting started

Requires Node.js 18+ and npm.

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

To build for production:

```bash
npm run build
```

Output is written to `dist/flux`.

## Swapping in real data

`ContentService` currently serves a static, in-memory catalog. To connect a
real backend, replace its methods with HTTP calls (Angular's `HttpClient`)
against your API, keeping the same `FluxContent` shape so the rest of the
app (cards, rows, modal, browse/search) keeps working unchanged.
