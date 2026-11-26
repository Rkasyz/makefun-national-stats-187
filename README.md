# Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Rkasyz/makefun-national-stats-187/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Rkasyz/makefun-national-stats-187/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: population, economy, health, education and regions — every figure with its source and year. An entry for [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) on make.fun.

## What it shows

- **Overview** — headline indicators (population, GDP, GDP per capita, growth, poverty, unemployment), a population chart for 2019–2024, the five most populous provinces, and key facts.
- **Population** — population by year with yearly growth, age structure, and where people live.
- **Economy** — GDP, GDP per capita and real growth on one switchable chart, living standards (poverty, unemployment), trade with a computed balance, and the largest sectors.
- **People** — life expectancy, Human Development Index, schooling, internet users, urban share, median age, and religion.
- **Regions** — the ten most populous provinces in a searchable, sortable table; shares and densities are computed from the published figures.
- **Sources & method** — every source, what it covers, and how the numbers were handled.

## How it works

The site is static files under `app/` with no build step and no network requests: `index.html` plus one stylesheet and four small modules. Pages are hash routes (`#/` … `#/sources`); charts are drawn on canvas by `app/charts.js` from the figures in `app/data.js`. Every control does what it says: the economy chart switches metric, the regions table searches and sorts.

Run it locally:

```sh
node serve.ts
```

then open http://localhost:8080 — and at a phone's width too.

## Screenshots

Four real renders of the site (see `shots.json` for the views):

1. `1-overview.jpg` — the overview at desktop size (the cover)
2. `2-economy.jpg` — the economy page at desktop size
3. `3-population.jpg` — the population page at desktop size
4. `4-overview-phone.jpg` — the overview at phone size (390 × 844)

## Files

- `main.ts` — the entrypoint: copies `app/` and `screenshots/` to the output directory and writes `dossier.json`
- `serve.ts` — a tiny static server for local development
- `app/index.html` — the page shell and navigation
- `app/style.css` — the design
- `app/main.js` — the router, chart wiring and table controls
- `app/views.js` — the HTML for each page
- `app/charts.js` — canvas bar-chart helpers
- `app/data.js` — every figure, with source and year
- `screenshots/` — real renders of the site (see `shots.json`)
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `LICENSE` — MIT
