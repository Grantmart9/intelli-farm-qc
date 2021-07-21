import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import Preloader from '../../components/Preloader';

import ApexChart from 'react-apexcharts';
import { pipe } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/Array';
import { toArray, fromArray } from 'fp-ts/lib/Set';
import { eqString } from 'fp-ts/lib/Eq';
import { ordString } from 'fp-ts/lib/Ord';
import moment from 'moment';
import LinearProgress from "@material-ui/core/LinearProgress";
import {withStyles} from "@material-ui/core/styles";
import './Dashboard.css';
import { API_URL } from "../../api";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#05ab24",
  },
}))(LinearProgress);

const IrrigationProgress = ({ data }) => 
  <div>
    <h1>Irrigation</h1>
    <h4>Cycle Progress</h4>
    <BorderLinearProgress variant="determinate" value={data.cycle_progress} />
  </div>


const IrrigationTimeLeft = ({data}) =>
  <div>
    <h1 className=".text-lg">Irrigation Time Left</h1>
    <h2>{data.irrigation_time_left}min left</h2>
  </div>

const IrrigationEC = ({ data }) =>
  <div>
    <h1>EC Average</h1>
    <h2>2.93 mS</h2>
    <h1>0.07 mS Below Target</h1>
  </div>

const Pump = ({ pump }) =>
  <div>
    <h1>Water Pump</h1>
    <h2>Status: {pump.status}</h2>
    <h2>Flow: {pump.main_flow}</h2>
  </div>

export const HomeFlowFertilizerBarChart = ({
  data,
}) => {
  const today = useMemo(() => new Date(), []);
  const dates = [-6, -5, -4, -3, -2, -1, 0].map((d) => {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    return date;
  });

  const days = dates.map(
    (date) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
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
                'YYYY-MM-DD ddd'
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
            endingShape: 'rounded',
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Fertilizer usage',
        },
      }}
    />
  );
};

export const HomeFlowFertilizerPieChart = ({ data }) => {
  const series = data.map(({ ratio }) => ratio);
  const labels = data.map(({ name }) => name);
  return (
    <ApexChart
      type="donut"
      height={300}
      series={series}
      options={{
        labels: labels,
        legend: {
          formatter: (label, { seriesIndex }) =>
            `${label} - ${data[seriesIndex].value} ${data[seriesIndex].unit}`,
          position: 'bottom',
        },
      }}
    />
  );
};

export const HomeFlowWaterUsage = ({ data }) => {
  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: data.name,
          data: data.sensor_total_flow_bar_graph.map(({ y }) => y),
        },
      ]}
      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        tooltip: {
          y: {
            formatter: (y) => {
              return `${y} ${data.unit}`;
            },
          },
        },
        xaxis: {
          categories: data.sensor_total_flow_bar_graph.map(({ x }) => x),
        },
        subtitle: {
          text: data.name,
          offsetX: 30,
        },
        title: {
          text: `${data.sensor_daily_total_flow} ${data.unit}`,
          offsetX: 30,
        },
      }}
    />
  );
};

export const Dashboard = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] 
    = useAxios(`${API_URL}/${farmId}/dashboard`);

  // useInterval(() => {
  //   refetch();
  // }, CHART_UPDATE_INTERVAL);

  if (loading) return <Preloader/>
  if (error) return "Error";
  

  return (
    <div className="m-4">
      <div className="grid grid-cols-5 p-2">
        <div className="col-span-2 bg-white rounded shadow-md m-4">
          <IrrigationProgress data={data.irrigation_data} />
        </div>
        <div className="col-span-1 bg-white rounded shadow-md m-4">
          <IrrigationTimeLeft data={data.irrigation_data} />
        </div>
        <div className="col-span-1 bg-white rounded shadow-md m-4">
          <IrrigationEC data={data.irrigation_data} />
        </div>
        {data.irrigation_data.pump_data.map((pump, i) =>
          <div className="col-span-1 bg-white rounded shadow-md m-4">
            <Pump key={i} pump={pump} />
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 p-2">
        {data.water_usage.map((waterUsageData, i) => (
          <div className="bg-white rounded shadow-md m-2 pt-4" key={i}>
            <HomeFlowWaterUsage data={waterUsageData} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="col-span-3 bg-white rounded shadow-md m-4">
          <div className="w-full h-full">
            <HomeFlowFertilizerBarChart
              data={data.fertilizer_usage.bar_graph}
            />
          </div>
        </div>
        <div className="col-span-2 bg-white rounded shadow-md flex-grow m-4 flex align-items">
          <div className="w-full">
            <HomeFlowFertilizerPieChart
              data={data.fertilizer_usage.pie_chart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
