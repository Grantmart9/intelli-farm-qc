/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 26/08/2021 - 10:03:47
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 26/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useMemo } from "react";
import ApexChart from "react-apexcharts";
import moment from "moment";

export const HomeFlowFertilizerBarChartV = ({ data }) => {
  const today = useMemo(() => new Date(), []);
  const dates = [-6, -5, -4, -3, -2, -1, 0].map((d) => {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    return date;
  });

  const days = dates.map(
    (date) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
  );

  const seriesNames = Array.from(new Set(data.map(({ name }) => name)));
  const series = seriesNames.map((seriesName) => ({
    name: seriesName,
    data: dates.map((date) => {
      const dayUsage = data.find(
        (dayUsage) =>
          new Date(dayUsage.date).getDay() === date.getDay() &&
          dayUsage.name === seriesName
      );
      return dayUsage ? dayUsage.value : 0;
    })
  }));

  return (
    <ApexChart
      type="bar"
      height={300}
      series={series}
      options={{
        chart: {
          toolbar: {
            show: false
          }
        },
        tooltip: {
          x: {
            formatter: (_, { dataPointIndex }) => {
              const date = moment(dates[dataPointIndex]).format(
                "YYYY-MM-DD ddd"
              );
              return date;
            }
          },
          y: {
            formatter: (y, { dataPointIndex }) => {
              const unit = data[dataPointIndex].unit;
              return `${y} ${unit}`;
            }
          }
        },
        xaxis: {
          categories: days,
          style: { fontSize: "40px" }
        },
        plotOptions: {
          bar: {
            endingShape: "rounded",
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: "Field Water Usage",
          offsetX: 30,
          offsetY: 10,
          style: {
            fontSize: "17px",
            fontWeight: "bold",
            fontFamily: "'Raleway', sans-serif"
          }
        }
      }}
    />
  );
};
