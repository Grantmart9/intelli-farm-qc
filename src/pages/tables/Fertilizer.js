import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { AppName } from "./AppName";
import ApexChart from "react-apexcharts";
import { FertilizerBarChart } from "./FertilizerBarChart";
import ErrorGif from "./ErrorGif.gif";
import ChartViewer from "./LineChart";

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
            gap: "1rem",
          }}
        >
          <div>
            <h4 className="text-gray-700 text-lg font-bold">{valves.name}</h4>
            <h4 className="text-red-800 font-bold">Alarm Status: {valves.alarm}</h4>
            <h4 className="text-green-800 text-xl font-bold">
              Flow: {valves.real_time_flow}
            </h4>
            <h4 className="text-gray-800 text-sm font-bold">
              Total Flow: {valves.total_flow}
            </h4>
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
            gap: "1rem",
          }}
        >
          <div>
            <h4 className="text-gray-800  text-lg font-bold">{ec.name}</h4>
            <h4 className="text-red-800 font-bold">Alarm status: {ec.alarm}</h4>
            <h4 className="text-gray-800 text-lg font-bold">
              Setpoint: {ec.setpoint}
            </h4>
            <h4 className="text-green-800 text-lg font-bold">
              Value: {ec.value}
            </h4>
            <h4 className="text-gray-800 text-sm font-bold">Average: {ec.average}</h4>
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

  var EcY = (data.ec_history.map(({y})=>y));
  var EcX = (data.ec_history.map(({ x }) => x));
  console.log(EcY);
  console.log(EcX);

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
        <div className="bg-gray-400 rounded shadow-md m-4 p-2">
          <ChartViewer/>
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
