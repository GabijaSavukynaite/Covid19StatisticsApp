export type CovidStatistics = {
  country: string;
  country_code: string;
  continent: string;
  population: number;
  indicator: string;
  weekly_count: number;
  year_week: string;
  cumulative_count: number;
  source: string;
};

export type CasesDeathsStatistics = {
  year_week: string;
  cases: number;
  deaths: number;
};
