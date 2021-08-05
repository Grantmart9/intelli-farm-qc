import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { AppName } from "./AppName";
import ApexChart from "react-apexcharts";
import { FertilizerBarChart } from "./FertilizerBarChart";
import ErrorGif from "./ErrorGif.gif";
import {
  createContainer,
  VictoryAxis,
  VictoryBar,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const FertilizerValves = ({ valves }) => {
  return (
    <div>
      <div className="shadow-md border-1 rounded">
        <div
          style={{
            border: "1px 1px solid black",
            display: "flex",
            padding: "1rem",
            fontFamiliy: "Times New Roman",
            fontWeight: "bold",
            gap: "1rem",
          }}
        >
          <div>
            <h4 className="text-gray-800">Alarm Status: {valves.alarm}</h4>
            <h4 className="text-gray-800">Name: {valves.name}</h4>
            <h4 className="text-gray-800">Real Time Flow: {valves.real_time_flow}</h4>
            <h4 className="text-gray-800">Total Flow: {valves.total_flow}</h4>
            <h4 className="text-gray-800">Valve Type: {valves.valve_type}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
const ECValves = ({ ec }) => {
  return (
    <div>
      <div className="shadow-md border-1 rounded">
        <div
          style={{
            border: "1px 1px solid black",
            display: "flex",
            padding: "1rem",
            fontFamiliy: "Times New Roman",
            fontWeight: "bold",
            gap: "1rem",
          }}
        >
          <div>
            <h4 className="text-gray-800">Alarm Status: {ec.alarm}</h4>
            <h4 className="text-gray-800">Average: {ec.average}</h4>
            <h4 className="text-gray-800">Name: {ec.name}</h4>
            <h4 className="text-gray-800">Setpoint: {ec.setpoint}</h4>
            <h4 className="text-gray-800">Type: {ec.type}</h4>
            <h4 className="text-gray-800">Value: {ec.value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FertilizerPieChart = ({ data }) => {
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
          position: "bottom",
        },
        title: {
          text: "Fertilizer",
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

const Fertilizer = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `${API_URL}/${farmId}/fertilizer`
  );

  if (loading) return <Preloader />;
  if (error) return <img src={ErrorGif} alt={ErrorGif}/>;


  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="col-span-4 bg-gray-400 gap-3 rounded shadow-md flex xl:m-4 align-items p-4">
          {data.fertilizer_valves.map((valves, i) => (
            <div className="bg-gray-400 rounded shadow-md">
              <FertilizerValves key={i} valves={valves} />
            </div>
          ))}
        </div>
        <div className="col-span-4 bg-gray-400 gap-1 rounded shadow-md flex-grow m-4 flex align-items p-4">
          {data.ec_values.map((ec, i) => (
            <div className="bg-gray-400 rounded shadow-md">
              <ECValves key={i} ec={ec} />
            </div>
          ))}
        </div>
        <div className="bg-gray-400 rounded shadow-md m-4 p-1">
          <div style={{ width: "100%", height: "20rem" }}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "black" },
                  parent: { border: "4px solid black" },
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                  { x: 20, y: 10 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-gray-400 rounded shadow-md m-4 p-2">
          <div className="bg-gray-400 rounded shadow-md m-4">
            <FertilizerBarChart data={data.fertilizer_bargraph} />
          </div>
          <div className="bg-gray-400 rounded shadow-md m-4">
            <FertilizerPieChart data={data.fertilizer_pie_chart} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fertilizer;
