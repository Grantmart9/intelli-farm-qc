import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";
import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Array";
import { toArray, fromArray } from "fp-ts/lib/Set";
import { eqString } from "fp-ts/lib/Eq";
import { ordString } from "fp-ts/lib/Ord";
import moment from "moment";
export const HomeFlowFertilizerBarChart = ({ data }) => {
  const today = useMemo(() => new Date(), []);
  const dates = [-6, -5, -4, -3, -2, -1, 0].map((d) => {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    return date;
  });

  const days = dates.map(
    (date) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
  );

  const seriesNames = pipe(
    data,
    map(({ name }) => name),
    fromArray(eqString),
    toArray(ordString)
  );

  const series = seriesNames.map((seriesName) => ({
    name: seriesName,
    data: dates.map((date) => {
      const dayUsage = data.find(
        (dayUsage) =>
          new Date(dayUsage.date).getDay() === date.getDay() &&
          dayUsage.name === seriesName
      );
      return dayUsage ? dayUsage.value : 0;
    }),
  }));

  return (
    <ApexChart
      type="bar"
      height={300}
      series={series}
      options={{
        chart: {
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          x: {
            formatter: (_, { dataPointIndex }) => {
              const date = moment(dates[dataPointIndex]).format(
                "YYYY-MM-DD ddd"
              );
              return date;
            },
          },
          y: {
            formatter: (y, { dataPointIndex }) => {
              const unit = data[dataPointIndex].unit;
              return `${y} ${unit}`;
            },
          },
        },
        xaxis: {
          categories: days,
        },
        plotOptions: {
          bar: {
            endingShape: "rounded",
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Field Valve History",
          offsetX: 30,
        },
      }}
    />
  );
};