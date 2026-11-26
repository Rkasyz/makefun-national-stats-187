// Page HTML for Indonesia in Numbers.
//
// Every page is built from the figures in data.js. Numbers that are
// derived — a province's share of the population, its density, the
// trade balance — are computed here from the published figures, so the
// page can never disagree with the data. Charts are <canvas> elements;
// main.js draws into them after the page is on screen.

import {
  AGE_STRUCTURE,
  ECONOMY_YEARS,
  FACTS,
  HEADLINE,
  META,
  PEOPLE,
  POPULATION_YEARS,
  PROVINCES,
  RELIGION,
  SECTORS,
  SOURCES,
  TRADE_YEARS,
} from './data.js';

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const oneDecimal = (n) => n.toFixed(1);
const money = (n) => `$${n.toLocaleString('en-US')}`;

function kpiCards() {
  return HEADLINE.map(
    (k) => `<a class="kpi" href="${k.page}">
  <span class="kpi-value">${escape(k.value)}</span>
  <span class="kpi-label">${escape(k.label)}</span>
  <span class="kpi-detail">${escape(k.detail)} · ${escape(k.source)}</span>
</a>`,
  ).join('');
}

function factList(facts) {
  return `<dl class="facts">${facts
    .map((f) => `<div><dt>${escape(f.label)}</dt><dd>${escape(f.value)}</dd></div>`)
    .join('')}</dl>`;
}

function yearTable(rows, columns) {
  const head = columns.map((c) => `<th>${escape(c.label)}</th>`).join('');
  const body = rows
    .map((r) => `<tr>${columns.map((c) => `<td>${escape(c.get(r))}</td>`).join('')}</tr>`)
    .join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

export function overview() {
  const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5);
  const rows = top
    .map(
      (p) => `<tr><td>${escape(p.name)}</td><td>${oneDecimal(p.population)} million</td>
  <td>${((p.population / 283.5) * 100).toFixed(1)}% of Indonesia</td></tr>`,
    )
    .join('');
  return `<h1>${escape(META.title)}</h1>
<p class="lede">${escape(META.tagline)}</p>
<section class="kpis" aria-label="Headline indicators">${kpiCards()}</section>
<section>
  <h2>Population, 2019–2024</h2>
  <p>Indonesia's population passed 283 million in 2024, growing about 0.8% a year.</p>
  <canvas id="chart-population" class="chart" data-chart="population" height="200" style="height:200px"></canvas>
  <p class="source">Source: World Bank, World Development Indicators. Millions of people.</p>
</section>
<section>
  <h2>Most populous provinces</h2>
  <table><thead><tr><th>Province</th><th>Population</th><th>Share</th></tr></thead>
  <tbody>${rows}</tbody></table>
  <p><a href="#/regions">See all ten provinces &rarr;</a></p>
  <p class="source">Source: BPS, mid-2024 estimates.</p>
</section>
<section>
  <h2>At a glance</h2>
  ${factList(FACTS)}
</section>
<p class="fine">${escape(META.note)}</p>`;
}

export function population() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
<h1>Population</h1>
<p class="lede">283.5 million people in 2024 — the world's fourth-largest population — spread over 17,508 islands.</p>
<section>
  <h2>Population by year</h2>
  <canvas id="chart-population" class="chart" data-chart="population" height="280"></canvas>
  <p class="source">Source: World Bank, World Development Indicators, 2019–2024.</p>
  ${yearTable(POPULATION_YEARS, [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'Population', get: (r) => `${oneDecimal(r.millions)} million` },
    {
      label: 'Growth on last year',
      get: (r) => {
        const i = POPULATION_YEARS.indexOf(r);
        if (i === 0) return '—';
        const prev = POPULATION_YEARS[i - 1].millions;
        return `+${(((r.millions - prev) / prev) * 100).toFixed(1)}%`;
      },
    },
  ])}
</section>
<section>
  <h2>Age structure, 2023</h2>
  <p>Two in three Indonesians are of working age. The 65-and-over group is still small, at 7.2%.</p>
  <canvas id="chart-age" class="chart" data-chart="age" height="180"></canvas>
  <p class="source">Source: World Bank, 2023. Shares of the total population.</p>
</section>
<section>
  <h2>Where people live</h2>
  <p>About 58% of Indonesians live in urban areas (World Bank, 2023), and Java alone holds more than half
  the population — over 150 million people on one island. The median age is about 30 years
  (UN World Population Prospects, 2024).</p>
  ${factList([
    { label: 'Density', value: '≈ 149 people per km²' },
    { label: 'Urban share', value: '58%' },
    { label: 'Median age', value: '≈ 30 years' },
  ])}
</section>`;
}

export function economy() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
<h1>Economy</h1>
<p class="lede">A $1.40 trillion economy in 2024 — the largest in Southeast Asia — growing 5.03% in real terms.</p>
<section>
  <h2>GDP and growth, 2019–2024</h2>
  <div class="toggle" role="group" aria-label="Choose what the chart shows">
    <button type="button" data-metric="gdp" class="active">GDP, US$ bn</button>
    <button type="button" data-metric="perCapita">GDP per capita, US$</button>
    <button type="button" data-metric="growth">Real growth, %</button>
  </div>
  <canvas id="chart-economy" class="chart" data-chart="economy" data-metric="gdp" height="280"></canvas>
  <p class="source" id="economy-caption">Source: World Bank, current US$. GDP in billions of US dollars.</p>
  ${yearTable(ECONOMY_YEARS, [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'GDP, US$ bn', get: (r) => money(r.gdp) },
    { label: 'GDP per capita', get: (r) => money(r.perCapita) },
    { label: 'Growth', get: (r) => `${r.growth.toFixed(2)}%` },
    { label: 'Inflation', get: (r) => `${r.inflation.toFixed(2)}%` },
  ])}
</section>
<section>
  <h2>Living standards</h2>
  <p>Poverty fell to 8.57% in September 2024 — the lowest on record — and open unemployment to 4.91% in
  August 2024. Inflation averaged 1.57% in 2024, inside Bank Indonesia's target range.</p>
  ${yearTable(ECONOMY_YEARS, [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'Poverty, %', get: (r) => r.poverty.toFixed(2) },
    { label: 'Unemployment, %', get: (r) => r.unemployment.toFixed(2) },
  ])}
  <p class="source">Source: BPS. Poverty is the September reading; unemployment is the August reading.</p>
</section>
<section>
  <h2>Trade</h2>
  <p>Exports reached $264.7 billion in 2024, against $233.7 billion of imports — a $31.0 billion surplus,
  the fifth straight yearly surplus.</p>
  ${yearTable(TRADE_YEARS, [
    { label: 'Year', get: (r) => String(r.year) },
    { label: 'Exports, US$ bn', get: (r) => money(r.exports) },
    { label: 'Imports, US$ bn', get: (r) => money(r.imports) },
    { label: 'Balance, US$ bn', get: (r) => `+${(r.exports - r.imports).toFixed(1)}` },
  ])}
  <p class="source">Source: BPS, 2019–2024.</p>
</section>
<section>
  <h2>Largest sectors, 2023</h2>
  <p>Manufacturing is the largest single sector, at 18.7% of GDP, ahead of trade and agriculture.</p>
  <canvas id="chart-sectors" class="chart" data-chart="sectors" height="220"></canvas>
  <p class="source">Source: BPS, 2023. Share of GDP, percent.</p>
</section>`;
}

export function people() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
<h1>People</h1>
<p class="lede">Life expectancy 73.6 years, a Human Development Index of 75.02, and 221.6 million people online.</p>
<section>
  <h2>Health and education</h2>
  <div class="cards">${PEOPLE.map(
    (p) => `<div class="card"><span class="card-value">${escape(p.value)}</span>
  <span class="card-label">${escape(p.label)}</span>
  <span class="card-detail">${escape(p.detail)} · ${escape(p.source)}</span></div>`,
  ).join('')}</div>
</section>
<section>
  <h2>Religion, 2023</h2>
  <p>Indonesia is the world's largest Muslim-majority country, with sizeable Protestant, Catholic and Hindu
  minorities and hundreds of local faith traditions.</p>
  <canvas id="chart-religion" class="chart" data-chart="religion" height="240"></canvas>
  <p class="source">Source: BPS, 2023. Share of the population, percent.</p>
</section>
<section>
  <h2>Languages</h2>
  <p>More than 700 regional languages are spoken across the archipelago (Ethnologue, 2024), alongside the
  national language, Bahasa Indonesia. Javanese is the most widely spoken regional language, followed by
  Sundanese and Malay varieties.</p>
</section>`;
}

function provinceRows(list) {
  return list
    .map((p) => {
      const density = (p.population * 1e6) / p.area;
      const share = (p.population / 283.5) * 100;
      return `<tr><td>${escape(p.name)}</td><td>${oneDecimal(p.population)}</td>
  <td>${share.toFixed(1)}%</td><td>${p.area.toLocaleString('en-US')}</td>
  <td>${Math.round(density).toLocaleString('en-US')}</td></tr>`;
    })
    .join('');
}

export function regions() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
<h1>Regions</h1>
<p class="lede">The ten most populous of Indonesia's 38 provinces. Together they hold 202.8 million people —
71.5% of the country.</p>
<section>
  <div class="controls">
    <label>Search <input id="province-search" type="search" placeholder="Type a province name…" autocomplete="off"></label>
    <div class="toggle" role="group" aria-label="Sort provinces">
      <button type="button" data-sort="population" class="active">By population</button>
      <button type="button" data-sort="name">By name</button>
      <button type="button" data-sort="density">By density</button>
    </div>
  </div>
  <table id="province-table"><thead><tr><th>Province</th><th>Population, M</th><th>Share</th>
  <th>Area, km²</th><th>Density, /km²</th></tr></thead>
  <tbody>${provinceRows(PROVINCES)}</tbody></table>
  <p id="province-count">Showing 10 of 10 provinces.</p>
  <p class="source">Source: BPS, mid-2024 population estimates; area: BPS. Shares are of the 2024 national
  total of 283.5 million; densities are computed from the two published figures.</p>
</section>
<section>
  <h2>Reading the table</h2>
  <p>Jakarta is by far the densest province — about 15,900 people per km² — while South Sumatra is the
  most spread out of the ten, at about 96 per km². West Java alone holds 49.9 million people, more than
  most countries.</p>
</section>`;
}

export function sources() {
  return `<p class="crumb"><a href="#/">&larr; Overview</a></p>
<h1>Sources &amp; method</h1>
<p class="lede">Every figure on this site comes from a published source. Nothing is estimated by this site
except the shares, densities and balances marked as computed.</p>
<section>
  <table><thead><tr><th>Source</th><th>What it covers</th><th>Years</th></tr></thead>
  <tbody>${SOURCES.map(
    (s) => `<tr><td>${escape(s.source)}</td><td>${escape(s.covers)}</td><td>${escape(s.years)}</td></tr>`,
  ).join('')}</tbody></table>
</section>
<section>
  <h2>Method</h2>
  <ul>
    <li>Figures are rounded for display — population to one decimal place in millions, money to whole
    billions of US dollars, rates to two decimals. The underlying published values are unchanged.</li>
    <li>Shares, densities and the trade balance are computed on this page from the published figures,
    so they always agree with the numbers shown.</li>
    <li>Poverty is the September reading of each year; unemployment is the August reading. GDP growth
    and inflation are the annual figures published by BPS.</li>
    <li>This site is unofficial and is not affiliated with BPS, the World Bank, APJII or the United Nations.</li>
  </ul>
</section>`;
}

export function missing() {
  return `<h1>Not found</h1>
<p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>`;
}
