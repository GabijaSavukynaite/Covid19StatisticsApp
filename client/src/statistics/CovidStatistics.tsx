import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { CasesDeathsStatistics } from "@covid-statistics/shared";
import { LineChart } from "./LineChart";

const URL = "http://localhost:8080/";

export const CovidStatistics = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [getCountriesError, setGetCountriesError] = useState<boolean>(false);
  const [countryStatistics, setCountryStatistics] = useState<
    CasesDeathsStatistics[]
  >([]);
  const [
    getCountryStatisticsError,
    setGetCountryStatisticsError,
  ] = useState<boolean>(false);
  const [getCountriesLoading, setGetCountriesLoading] = useState<boolean>(
    false
  );
  const [
    getCountryStatisticsLoading,
    setGetCountryStatisticsLoading,
  ] = useState<boolean>(false);

  useEffect(() => {
    setGetCountriesLoading(true);
    axios
      .get(URL + "countries")
      .then((response) => {
        setCountries(response.data);
        if (getCountriesError) {
          setGetCountriesError(false);
        }
      })
      .catch(() => {
        setGetCountriesError(true);
      })
      .then(() => {
        setGetCountriesLoading(false);
      });
  }, []);

  const onSelectCountry = (country: string | null) => {
    if (country) {
      setGetCountryStatisticsLoading(true);
      setSelectedCountry(country);
      axios
        .get(URL + "covidStatistics/" + country)
        .then((response) => {
          setCountryStatistics(response.data);
          if (getCountryStatisticsError) {
            setGetCountryStatisticsError(false);
          }
        })
        .catch(() => {
          setGetCountryStatisticsError(true);
        })
        .then(() => {
          setGetCountryStatisticsLoading(false);
        });
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h6">Covid statistics</Typography>
      {getCountriesLoading ? (
        <CircularProgress />
      ) : getCountriesError ? (
        <Typography variant="body1">Could not get data</Typography>
      ) : (
        <Autocomplete
          value={selectedCountry}
          onChange={(_, country) => {
            onSelectCountry(country);
          }}
          options={countries}
          getOptionLabel={(c) => c}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              variant="outlined"
              style={{ fontSize: 5 }}
            />
          )}
        />
      )}

      {getCountryStatisticsLoading ? (
        <CircularProgress />
      ) : getCountryStatisticsError ? (
        <Typography variant="body1">Could not get data</Typography>
      ) : selectedCountry ? (
        <LineChart data={countryStatistics} country={selectedCountry} />
      ) : null}
    </Grid>
  );
};
