// Indonesia in Numbers — the router and the controls.
//
// Hash routes: #/ overview, #/population, #/economy, #/people,
// #/regions, #/sources. After a page renders, main.js draws its
// charts and wires its controls, so every button and field on the
// page does what it says. window.__shotReady is false while a page
// renders and true once it is on screen, so a screenshot script
// knows when to capture.

import {
  AGE_STRUCTURE,
  ECONOMY_YEARS,
  POPULATION_YEARS,
  PROVINCES,
  RELIGION,
  SECTORS,
} from './data.js';
import { drawBars, drawHBars } from './charts.js';
import { economy, missing, overview, people, population, regions, sources } from './views.js';

const app = document.getElementById('app');
const TOTAL_POPULATION = 283.5;

const ROUTES = {
  '': overview,
  '/': overview,
  '/population': population,
  '/economy': economy,
  '/people': people,
  '/regions': regions,
  '/sources': sources,
};

const ECONOMY_CAPTIONS = {
  gdp: 'Source: World Bank, current US$. GDP in billions of US dollars.',
  perCapita: 'Source: World Bank, current US$. GDP per person, US dollars.',
  growth: 'Source: BPS. Real GDP growth, percent on the previous year.',
};

function drawPageCharts() {
  const pop = document.querySelector('[data-chart="population"]');
  if (pop) {
    drawBars(
      pop,
      POPULATION_YEARS.map((r) => ({ label: String(r.year), value: r.millions, hot: r.year === 2024 })),
      (v) => `${v.toFixed(0)}M`,
    );
  }
  const age = document.querySelector('[data-chart="age"]');
  if (age) {
    drawHBars(
      age,
      AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.share, hot: a.group === 'Ages 15–64' })),
      (v) => `${v.toFixed(1)}%`,
    );
  }
  const sectors = document.querySelector('[data-chart="sectors"]');
  if (sectors) {
    drawHBars(
      sectors,
      SECTORS.map((s) => ({ label: s.sector, value: s.share, hot: s.sector === 'Manufacturing' })),
      (v) => `${v.toFixed(1)}%`,
    );
  }
  const religion = document.querySelector('[data-chart="religion"]');
  if (religion) {
    drawHBars(
      religion,
      RELIGION.map((r) => ({ label: r.group, value: r.share, hot: r.group === 'Islam' })),
      (v) => `${v.toFixed(1)}%`,
    );
  }
  drawEconomyChart();
}

function drawEconomyChart(metric) {
  const canvas = document.querySelector('[data-chart="economy"]');
  if (!canvas) return;
  const chosen = metric || canvas.dataset.metric || 'gdp';
  const formats = {
    gdp: (v) => `$${v.toFixed(0)}B`,
    perCapita: (v) => `$${v.toFixed(0)}`,
    growth: (v) => `${v.toFixed(1)}%`,
  };
  drawBars(
    canvas,
    ECONOMY_YEARS.map((r) => ({ label: String(r.year), value: r[chosen], hot: r.year === 2024 })),
    formats[chosen],
  );
  const caption = document.getElementById('economy-caption');
  if (caption) caption.textContent = ECONOMY_CAPTIONS[chosen];
}

function wireEconomyToggle() {
  const buttons = document.querySelectorAll('[data-metric]');
  if (!buttons.length) return;
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const canvas = document.querySelector('[data-chart="economy"]');
      if (canvas) canvas.dataset.metric = button.dataset.metric;
      drawEconomyChart(button.dataset.metric);
    });
  });
}

function provinceDensity(p) {
  return (p.population * 1e6) / p.area;
}

function renderProvinceRows(list, query) {
  const body = document.querySelector('#province-table tbody');
  const count = document.getElementById('province-count');
  if (!body) return;
  const filtered = query
    ? list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : list;
  body.innerHTML = filtered
    .map((p) => {
      const density = provinceDensity(p);
      const share = (p.population / TOTAL_POPULATION) * 100;
      return `<tr><td>${p.name}</td><td>${p.population.toFixed(1)}</td>
  <td>${share.toFixed(1)}%</td><td>${p.area.toLocaleString('en-US')}</td>
  <td>${Math.round(density).toLocaleString('en-US')}</td></tr>`;
    })
    .join('');
  if (count) {
    count.textContent =
      filtered.length === list.length
        ? `Showing ${filtered.length} of ${list.length} provinces.`
        : `Showing ${filtered.length} of ${list.length} provinces matching "${query}".`;
  }
}

function wireRegions() {
  const search = document.getElementById('province-search');
  const buttons = document.querySelectorAll('[data-sort]');
  if (!search || !buttons.length) return;
  let sorted = [...PROVINCES].sort((a, b) => b.population - a.population);
  let sortKey = 'population';
  const sorts = {
    population: (a, b) => b.population - a.population,
    name: (a, b) => a.name.localeCompare(b.name),
    density: (a, b) => provinceDensity(b) - provinceDensity(a),
  };
  const apply = () => {
    sorted = [...PROVINCES].sort(sorts[sortKey]);
    renderProvinceRows(sorted, search.value.trim());
  };
  search.addEventListener('input', () => renderProvinceRows(sorted, search.value.trim()));
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      sortKey = button.dataset.sort;
      apply();
    });
  });
}

function render() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '') || '/';
  const page = ROUTES[path] || missing;
  document.title = `${page === overview ? META_TITLE : pageTitle(path)} | ${META_TITLE}`;
  app.innerHTML = page();
  drawPageCharts();
  wireEconomyToggle();
  wireRegions();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Declared before render() runs, so the title is set on the first page.
const META_TITLE = 'Indonesia in Numbers';

function pageTitle(path) {
  const titles = {
    '/population': 'Population',
    '/economy': 'Economy',
    '/people': 'People',
    '/regions': 'Regions',
    '/sources': 'Sources & method',
  };
  return titles[path] || 'Not found';
}

window.addEventListener('hashchange', render);
render();
