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
    <div className="p-2">
      <div
        style={{ fontFamily: "'Raleway', sans-serif" }}
        className="font-bold text-2xl mb-2"
      >
        {valve.name}
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-3">
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-xl font-bold"
          >
            {valve.status}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-lg font-bold"
          >
            {valve.real_time_flow}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-lg font-bold text-md"
          >
            {valve.total_flow}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-red-400 font-bold text-sm"
          >
            {valve.alarm}
          </div>
        </div>
        <div>
          <div className="flex align-center justify-center p-1">
            <img width={70} height={70} src={image} alt={image} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ECValve = ({ ec }) => {
  return (
    <div className="p-2">
      <div
        style={{ fontFamily: "'Raleway', sans-serif" }}
        className="text-2xl font-bold mb-2"
      >
        {ec.name}
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-2">
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-md font-bold"
          >
            Target: {ec.setpoint}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-md font-bold"
          >
            Value: {ec.value}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-red-400 font-bold text-sm"
          >
            {ec.alarm}
          </div>
        </div>
        <div>
          <div className="flex align-center justify-center bg-gra-400 p-2">
          <img src={fertilizerEc} alt={fertilizerEc} width={70} height={70} />
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
          position: "bottom"
        },
        title: {
          text: "Fertilizer Ratio",
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
  var ec = data.ec_history;
  console.log(ec);

  return (
    <div className="p-3">
      <div className="grid xl:grid-cols-4 gap-4 p-2">
        {data.fertilizer_valves.map((valve, i) => (
          <div key={i} className="bg-gray-300 rounded shadow-md">
            <FertilizerValve valve={valve} />
          </div>
        ))}
      </div>
      <div className="p-2 mt-2">
        <div className="grid xl:grid-cols-4 gap-4">
          {data.ec_values.map((ec, i) => (
            <div key={i} className="bg-gray-300 rounded shadow-md">
              <ECValve ec={ec} />
            </div>
          ))}
        </div>
      </div>
      <div className="p-2 mt-2">
        <div className="bg-gray-300 rounded shadow-md mb-4 p-2">
          <LineChart
            data={data.ec_history.map(({ datetime, x, y, ...rest }) => ({
              ...rest,
              x: new Date(datetime + " " + x),
              y: Number(y)
            }))}
          />
        </div>
      </div>
      <div className="-mt-4">
      <div className="xl:grid grid-cols-2 gap-4 p-2">
        <div className="bg-gray-300 rounded shadow-md mb-4">
          <FertilizerBarChart data={data.fertilizer_bargraph} />
        </div>
        <div className="bg-gray-300 rounded shadow-md mb-4">
          <FertilizerPieChart data={data.fertilizer_pie_chart} />
        </div>
      </div>
      </div>
    </div>
  );
};
