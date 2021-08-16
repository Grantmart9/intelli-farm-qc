/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 11/08/2021 - 15:03:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 11/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { AppName } from "./AppName";
import ApexChart from "react-apexcharts";
import { FertilizerBarChart } from "./FertilizerBarChart";
import ErrorGif from "./ErrorGif.gif";
import ChartViewer from "./LineChart";
import fertilizer from "./fertilizer.png";
import fertilizerEc from "./fertilizerEc.png";
import { LineChart } from "../../components/LineChart";
import { API_URL } from "../../api";
import { AxiosSpinner } from "../../components/AxiosSpinner";

const FertilizerValves = ({ valves }) => {
  return (
    <div className="flex p-2">
      <div className="shadow-md rounded p-2 w-100">
        <div className="text-gray-800 text-2xl font-bold">{valves.name}</div>
        <div className="text-green-800 text-2xl font-bold">{valves.status}</div>
        <div className="text-green-800 text-lg font-bold">
          {valves.real_time_flow}
        </div>
        <div className="text-red-800 font-bold text-md">{valves.alarm}</div>
        <div className="text-gray-800 text-sm font-bold text-md">
          {valves.total_flow}
        </div>
      </div>
      <div className="shadow-md rounded ml-2 items-center flex justify-center w-20">
        <img src={fertilizer} alt={fertilizer} width="80%" height="80%" />
      </div>
    </div>
  );
};

const ECValves = ({ ec }) => {
  return (
    <div className="flex p-2">
      <div className="shadow-md border-1 rounded p-2 w-100">
        <div className="text-gray-800 text-2xl font-bold">{ec.name}</div>
        <div className="text-green-800 text-md font-bold">
          Setpoint: {ec.setpoint}
        </div>
        <div className="text-green-800 text-md font-bold">
          Value: {ec.value}
        </div>
        <div className="text-red-800 font-bold text-md">{ec.alarm}</div>
        <div className="text-gray-800 text-sm font-bold">
          Average: {ec.average}
        </div>
      </div>
      <div className="shadow-md rounded ml-2 items-center flex justify-center p-2">
        <img
          src={fertilizerEc}
          alt={fertilizerEc}
          width="200rem"
          height="50rem"
        />
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
  if (error)
    return (
      <div
        style={{
          display: "flex",
          marginTop: "100px",
          minHeight: "600px",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img src={ErrorGif} alt={ErrorGif} />
      </div>
    );

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-4">
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.fertilizer_valves.map((valves, i) => (
            <div className=" bg-gray-400 rounded shadow-md">
              <FertilizerValves key={i} valves={valves} />
            </div>
          ))}
        </div>
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.ec_values.map((ec, i) => (
            <div className="bg-gray-400 rounded shadow-md">
              <ECValves key={i} ec={ec} />
            </div>
          ))}
        </div>
        <div className="p-2">
          <div className="bg-gray-400 rounded shadow-md mb-4 p-2">
            <LineChart
              data={data.ec_history.map(({ datetime, y, ...rest }) => ({
                ...rest,
                x: new Date(datetime),
                y: Number(y),
              }))}
            />
          </div>
        </div>
        <div className="bg-gray-400 rounded shadow-md mb-4"></div>
        <div className="xl:grid grid-cols-2 gap-2 p-2">
          <div className="bg-gray-400 rounded shadow-md mb-4">
            <FertilizerBarChart data={data.fertilizer_bargraph} />
          </div>
          <div className="bg-gray-400 rounded shadow-md mb-4">
            <FertilizerPieChart data={data.fertilizer_pie_chart} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fertilizer;
