import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import Preloader from "../../components/Preloader";

import ApexChart from "react-apexcharts";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import "./Dashboard.css";
import { API_URL } from "../../api";
import drop from "./drop.svg";
import {HomeFlowFertilizerBarChart} from './HomeFlowFertilizerBarChart';

export const AppName = () => {
  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: "3rem",
          backgroundColor: "#293354",
          color: "white",
          width:"90%",
          border: "1px 1px solid #184ea3",
          position:"fixed",
        }}
      >
        Intelli-Farm <img src={drop} width={"50rem"} alt={drop} />
      </div>
    </div>
  );
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#05ab24"
  }
}))(LinearProgress);

const IrrigationProgress = ({ data }) => (
  <div style={{ padding: "1.5rem" }}>
    <h1>Irrigation</h1>
    <h4 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Cycle Progress</h4>
    <div style={{ marginTop: "1rem" }}>
      <BorderLinearProgress variant="determinate" value={data.cycle_progress} />
    </div>
  </div>
);

const IrrigationTimeLeft = ({ data }) => (
  <div
    style={{
      padding: "1.5rem",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center"
    }}
  >
    <h1 className=".text-lg">Irrigation Time Left</h1>
    <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      {data.irrigation_time_left}min left
    </h2>
  </div>
);

const IrrigationEC = ({ data }) => (
  <div style={{ padding: "1.5rem" }}>
    <h1>EC Average</h1>
    <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>2.93 mS</h2>
    <h1>0.07 mS Below Target</h1>
  </div>
);

const Pump = ({ pump }) => (
  <div style={{ padding: "1.5rem" }}>
    <h1>Water Pump</h1>
    <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      Status: {pump.status}
    </h2>
    <h2>{pump.main_flow}</h2>
  </div>
);

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
          position: "bottom"
        }
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
          data: data.sensor_total_flow_bar_graph.map(({ y }) => y)
        }
      ]}
      options={{
        chart: {
          sparkline: {
            enabled: true
          }
        },
        tooltip: {
          y: {
            formatter: (y) => {
              return `${y} ${data.unit}`;
            }
          }
        },
        xaxis: {
          categories: data.sensor_total_flow_bar_graph.map(({ x }) => x)
        },
        subtitle: {
          text: data.name,
          offsetX: 30
        },
        title: {
          text: `${data.sensor_daily_total_flow} ${data.unit}`,
          offsetX: 30
        }
      }}
    />
  );
};

export const Dashboard = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(`${API_URL}/${farmId}/dashboard`);

  if (loading) return <Preloader />;
  if (error) return "Error";
  return (
    <div style={{ display: "block", backgroundColor: "#cad3de" }}>
      <AppName />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          padding: "0.5rem",
        }}
      ></div>
      <div style={{ marginTop: "5rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 p-4 gap-4">
          <div className="bg-gray-400  rounded shadow-md">
            <IrrigationProgress data={data.irrigation_data} />
          </div>
          <div className="bg-gray-400  rounded shadow-md">
            <IrrigationTimeLeft data={data.irrigation_data} />
          </div>
          <div className="bg-gray-400  rounded shadow-md">
            <IrrigationEC data={data.irrigation_data} />
          </div>
          {data.irrigation_data.pump_data.map((pump, i) => (
            <div className="bg-gray-400  rounded shadow-md">
              <Pump key={i} pump={pump} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 p-2">
          {data.water_usage.map((waterUsageData, i) => (
            <div className="bg-gray-400  rounded shadow-md m-3 pt-4" key={i}>
              <HomeFlowWaterUsage data={waterUsageData} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="col-span-3 bg-gray-400 rounded shadow-md m-4">
            <div className="w-full h-full">
              <HomeFlowFertilizerBarChart
                data={data.fertilizer_usage.bar_graph}
              />
            </div>
          </div>
          <div className="col-span-2 bg-gray-400  rounded shadow-md flex-grow m-4 flex align-items">
            <div className="w-full">
              <HomeFlowFertilizerPieChart
                data={data.fertilizer_usage.pie_chart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
