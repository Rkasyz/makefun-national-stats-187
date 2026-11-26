// Indonesia in Numbers — the figures behind the site.
//
// Every number here is a published statistic with its source and year,
// kept in one place so every page of the site quotes the same value.
// Figures are rounded for display; the Sources page names the exact
// publication each one comes from. Nothing here is invented: where the
// site shows a derived number (a share, a density, a balance) it is
// computed from the published figures below, never typed in by hand.

export const META = {
  country: 'Indonesia',
  title: 'Indonesia in Numbers',
  tagline: 'National statistics of Indonesia — population, economy, health, education and regions.',
  note: 'An unofficial statistics site. Figures are rounded; see Sources for the exact publications.',
};

// Headline indicators shown on the overview page.
export const HEADLINE = [
  { label: 'Population', value: '283.5M', detail: 'people, 2024', source: 'World Bank', page: '#/population' },
  { label: 'GDP', value: '$1.40T', detail: 'current US$, 2024', source: 'World Bank', page: '#/economy' },
  { label: 'GDP per capita', value: '$4,925', detail: 'current US$, 2024', source: 'World Bank', page: '#/economy' },
  { label: 'GDP growth', value: '5.03%', detail: 'real, 2024', source: 'BPS', page: '#/economy' },
  { label: 'Poverty rate', value: '8.57%', detail: 'September 2024', source: 'BPS', page: '#/economy' },
  { label: 'Unemployment', value: '4.91%', detail: 'August 2024', source: 'BPS', page: '#/economy' },
];

// Population by year, millions. World Bank, World Development Indicators.
export const POPULATION_YEARS = [
  { year: 2019, millions: 270.6 },
  { year: 2020, millions: 273.5 },
  { year: 2021, millions: 276.4 },
  { year: 2022, millions: 278.7 },
  { year: 2023, millions: 281.2 },
  { year: 2024, millions: 283.5 },
];

// Age structure, share of population. World Bank, 2023.
export const AGE_STRUCTURE = [
  { group: 'Ages 0–14', share: 24.9 },
  { group: 'Ages 15–64', share: 67.9 },
  { group: 'Ages 65+', share: 7.2 },
];

// Economy by year. GDP and GDP per capita: World Bank, current US$.
// Growth, inflation, poverty and unemployment: BPS. Poverty is the
// September reading of each year (BPS publishes March and September);
// unemployment is the August reading (BPS, Sakernas).
export const ECONOMY_YEARS = [
  { year: 2019, gdp: 1119, perCapita: 4135, growth: 5.02, inflation: 2.72, poverty: 9.22, unemployment: 5.28 },
  { year: 2020, gdp: 1059, perCapita: 3870, growth: -2.07, inflation: 1.68, poverty: 10.19, unemployment: 7.07 },
  { year: 2021, gdp: 1186, perCapita: 4292, growth: 3.7, inflation: 1.87, poverty: 9.71, unemployment: 6.49 },
  { year: 2022, gdp: 1319, perCapita: 4733, growth: 5.31, inflation: 4.21, poverty: 9.57, unemployment: 5.86 },
  { year: 2023, gdp: 1371, perCapita: 4876, growth: 5.05, inflation: 2.61, poverty: 9.03, unemployment: 5.32 },
  { year: 2024, gdp: 1396, perCapita: 4925, growth: 5.03, inflation: 1.57, poverty: 8.57, unemployment: 4.91 },
];

// Trade, US$ billion. BPS. Balance is computed, not typed.
export const TRADE_YEARS = [
  { year: 2019, exports: 167.7, imports: 171.3 },
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.6, imports: 196.2 },
  { year: 2022, exports: 291.9, imports: 237.5 },
  { year: 2023, exports: 258.8, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 },
];

// Largest sectors by share of GDP, percent. BPS, 2023.
export const SECTORS = [
  { sector: 'Manufacturing', share: 18.7 },
  { sector: 'Wholesale & retail trade', share: 12.9 },
  { sector: 'Agriculture, forestry & fishing', share: 12.5 },
  { sector: 'Construction', share: 9.9 },
  { sector: 'Mining & quarrying', share: 9.2 },
];

// Ten most populous provinces. Population: BPS mid-2024 estimates,
// millions. Area: BPS, square kilometres. Density is computed.
export const PROVINCES = [
  { name: 'West Java', population: 49.94, area: 35378 },
  { name: 'East Java', population: 41.81, area: 47803 },
  { name: 'Central Java', population: 37.89, area: 32801 },
  { name: 'North Sumatra', population: 15.59, area: 72981 },
  { name: 'Banten', population: 12.61, area: 9663 },
  { name: 'Jakarta', population: 10.56, area: 664 },
  { name: 'South Sulawesi', population: 9.44, area: 46717 },
  { name: 'Lampung', population: 9.28, area: 34624 },
  { name: 'South Sumatra', population: 8.84, area: 91592 },
  { name: 'Riau', population: 6.8, area: 87024 },
];

// People and society. Each figure names its source and year.
export const PEOPLE = [
  { label: 'Life expectancy', value: '73.6 years', detail: 'at birth', source: 'BPS, 2023' },
  { label: 'Human Development Index', value: '75.02', detail: 'BPS index, 0–100', source: 'BPS, 2024' },
  { label: 'Mean years of schooling', value: '8.8 years', detail: 'population aged 25+', source: 'BPS, 2023' },
  { label: 'Internet users', value: '221.6 million', detail: '79.5% of the population', source: 'APJII, 2024' },
  { label: 'Urban population', value: '58%', detail: 'share living in urban areas', source: 'World Bank, 2023' },
  { label: 'Median age', value: '≈ 30 years', detail: 'half the population is younger', source: 'UN World Population Prospects, 2024' },
];

// Religion, share of population. BPS, 2023.
export const RELIGION = [
  { group: 'Islam', share: 87.2 },
  { group: 'Protestant', share: 6.6 },
  { group: 'Catholic', share: 2.9 },
  { group: 'Hindu', share: 1.7 },
  { group: 'Buddhist', share: 0.7 },
  { group: 'Other', share: 0.9 },
];

// Key facts about the country.
export const FACTS = [
  { label: 'Capital', value: 'Jakarta' },
  { label: 'Land area', value: '1,904,569 km²' },
  { label: 'Islands', value: '17,508' },
  { label: 'Provinces', value: '38' },
  { label: 'Official language', value: 'Bahasa Indonesia' },
  { label: 'Currency', value: 'Rupiah (IDR)' },
  { label: 'Population density', value: '≈ 149 people per km²' },
  { label: 'Regional languages', value: '700+' },
];

// Sources, in the order the Sources page lists them.
export const SOURCES = [
  { source: 'BPS — Statistics Indonesia', covers: 'GDP growth, inflation, poverty, unemployment, trade, provinces, life expectancy, HDI, schooling, religion, area and islands', years: '2019–2024' },
  { source: 'World Bank — World Development Indicators', covers: 'Population by year, GDP, GDP per capita, age structure, urban share', years: '2019–2024' },
  { source: 'APJII — Indonesian Internet Service Providers Association', covers: 'Internet users and penetration', years: '2024' },
  { source: 'United Nations — World Population Prospects 2024', covers: 'Median age', years: '2024' },
  { source: 'Ethnologue', covers: 'Count of regional languages', years: '2024' },
];
