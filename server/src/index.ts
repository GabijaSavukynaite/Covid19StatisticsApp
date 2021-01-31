import axios from "axios";
import express from "express";
import { CovidData } from "./types";

const PORT = 8080;

const app = express();

let covidData: CovidData[] = [];

app.use(express.json());

app.get("/covidData", (_, res) => {
  axios
    .get("https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json")
    .then((response) => {
      covidData = response.data;
    })
    .catch((error) => {
      console.log("Error: " + error.code);
    })
    .then(() => res.send(covidData.length.toString()));
});

app.get("/covidData/:country", (req, res) => {
  const country = req.params.country;

  const filteredByCountry = covidData.filter(
    (data) => data.country === country
  );

  res.send(filteredByCountry);
});

app.listen(PORT);
