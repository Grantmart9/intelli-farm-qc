/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 27/08/2021 - 15:23:53
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 27/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";
import moment from "moment";

export const FertilizerBarChart = ({ data }) => {
  const today = useMemo(() => new Date(), []);
  const dates = [-6, -5, -4, -3, -2, -1, 0].map((d) => {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    return date;
  });

  const getDayName = (date) =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  const days = dates.map((date) => getDayName(date));

  const seriesNames = Array.from(new Set(data.map(({ name }) => name)));
  const series = seriesNames.map((seriesName) => ({
    name: seriesName,
    data: dates.map((date) => {
      const datum = data.find(
        (dayUsage) =>
          new Date(dayUsage.date).getDay() === date.getDay() &&
          dayUsage.name === seriesName
      ) || { value: 0 };
      return {
        x: getDayName(date),
        y: datum.value,
        goals:
          datum.target != null
            ? [
                {
                  name: "Target",
                  value: datum.target,
                  strokeWidth: 8,
                  strokeHeight: 3,
                  strokeColor: "#775DD0",
                },
              ]
            : null,
      };
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
          style: { fontSize: "40px" },
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
          text: "Fertilizer Usage",
          offsetX: 30,
          offsetY: 10,
          style: {
            fontSize: "17px",
            fontWeight: "bold",
          },
        },
      }}
    />
  );
};
