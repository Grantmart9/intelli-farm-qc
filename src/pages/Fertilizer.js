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
import { useParams } from "react-router-dom";
import { Preloader } from "components/Preloader";
import ApexChart from "react-apexcharts";
import { FertilizerBarChart } from "components/charts/FertilizerBarChart";
import ErrorGif from "images/ErrorGif.gif";
import fertilizerEc from "images/fertilizerEc.png";
import { API_URL, useApi } from "api";
import greendrop from "images/greendrop.gif";
import { LineChart } from "components/charts/LineChart";
import fertilizer from "images/fertilizer.png";
import { useRefetch } from "../components/Timer";

const FertilizerValve = ({ valve }) => {
  var image = valve.status === "Opened" ? greendrop : fertilizer;

  return (
    <div className="flex p-2">
      <div className="w-100">
        <div className="text-gray-800 text-2xl font-bold">{valve.name}</div>
        <div className="text-green-800 text-2xl font-bold">{valve.status}</div>
        <div className="text-green-800 text-lg font-bold">
          {valve.real_time_flow}
        </div>
        <div className="text-red-800 font-bold text-md">{valve.alarm}</div>
        <div className="text-gray-800 text-sm font-bold text-md">
          {valve.total_flow}
        </div>
      </div>
      <div className="ml-2 items-center flex flex-shrink-0 justify-center w-20">
        <img src={image} alt={image} />
      </div>
    </div>
  );
};

const ECValve = ({ ec }) => {
  return (
    <div className="flex p-2">
      <div className="p-2 w-100">
        <div className="text-gray-800 text-2xl font-bold">{ec.name}</div>
        <div className="text-green-800 text-md font-bold">
          Setpoint: {ec.setpoint}
        </div>
        <div className="text-green-800 text-md font-bold">
          Value: {ec.value}
        </div>
        <div className="text-red-800 font-bold text-md">{ec.alarm}</div>
      </div>
      <div className="ml-2 items-center flex flex-shrink-0 justify-center p-2 w-20">
        <img src={fertilizerEc} alt={fertilizerEc} />
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
          text: "Fertilizer Ratio",
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

export const Fertilizer = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${farmId}/fertilizer`
  );

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div className="p-4">
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div>
      <div className="p-4">
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.fertilizer_valves.map((valve, i) => (
            <div key={i} className="bg-gray-400 rounded shadow-md">
              <FertilizerValve valve={valve} />
            </div>
          ))}
        </div>
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.ec_values.map((ec, i) => (
            <div key={i} className="bg-gray-400 rounded shadow-md">
              <ECValve ec={ec} />
            </div>
          ))}
        </div>
        <div className="p-2">
          <div className="bg-gray-400 rounded shadow-md mb-4 p-2">
            <LineChart
              data={data.ec_history.map(({ datetime, x, y, ...rest }) => ({
                ...rest,
                x: new Date(datetime + " " + x),
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
