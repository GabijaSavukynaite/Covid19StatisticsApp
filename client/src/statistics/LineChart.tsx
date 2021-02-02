import {
  ArgumentAxis,
  Chart,
  LineSeries,
  ValueAxis,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import { CasesDeathsStatistics } from "@covid-statistics/shared";

type LineChartProps = {
  data: CasesDeathsStatistics[];
  country: string;
};

export const LineChart = ({ data, country }: LineChartProps) => {
  const splitDate = (date: string): string[] => {
    const yearWeek = date.split("-");
    yearWeek[1] = (+yearWeek[1]).toString();
    return yearWeek;
  };
  const dateFrom = splitDate(data[0].year_week);
  const dateTo = splitDate(data[data.length - 1].year_week);

  return (
    <Paper style={{ width: "90%" }}>
      <Chart data={data}>
        <ArgumentAxis showLabels={false} />
        <ValueAxis />
        <LineSeries name="Cases" valueField="cases" argumentField="year_week" />
        <LineSeries
          name="Deaths"
          valueField="deaths"
          argumentField="year_week"
        />
        <Legend position="right" />
        <Title
          text={
            "Cases and deaths in " +
            country +
            " from " +
            dateFrom[0] +
            " week " +
            dateFrom[1] +
            " to " +
            dateTo[0] +
            " week " +
            dateTo[1]
          }
        />
      </Chart>
    </Paper>
  );
};
