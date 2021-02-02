import axios from "axios";
import express from "express";
import {
  CovidStatistics,
  CasesDeathsStatistics,
} from "@covid-statistics/shared";
import { groupBy } from "./helpers";

const PORT = 8080;

const app = express();

let covidData: CovidStatistics[] = [];

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/countries", (_, res) => {
  axios
    .get("https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json")
    .then((response) => {
      covidData = response.data;
      const countries = covidData
        .map((item) => item.country)
        .filter((country, index, self) => self.indexOf(country) === index);
      return res.send(countries);
    })
    .catch((error) => {
      console.log("Error: " + error.code);
      res.send([]);
    });
});

app.get("/covidStatistics/:country", (req, res) => {
  const country = req.params.country;

  const filteredByCountry = covidData.filter(
    (data) => data.country === country
  );
  const statisticsByIndicator = groupBy(
    filteredByCountry,
    (data: CovidStatistics) => data.indicator
  );

  const casesDeathsStatistics: CasesDeathsStatistics[] = statisticsByIndicator.cases.map(
    (data, index) => ({
      year_week: data.year_week,
      cases: data.weekly_count,
      deaths: statisticsByIndicator.deaths[index].weekly_count,
    })
  );
  res.send(casesDeathsStatistics);
});

app.listen(PORT);
