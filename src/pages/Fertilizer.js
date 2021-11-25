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
import { useApi } from "api";
import greendrop from "images/greendrop.gif";
import { LineChart } from "components/charts/LineChart";
import fertilizer from "images/fertilizer.png";
import { useRefetch } from "../components/Timer";

const FertilizerValve = ({ valve }) => {
  var image = valve.status === "Opened" ? greendrop : fertilizer;
  return (
    <div className="px-2 pb-2">
      <div className="font-bold text-2xl mb-2">{valve.name}</div>
      <div className="grid grid-cols-2 mb-2">
        <div className="grid grid-rows-3">
          <div className="text-green-800 text-xl font-bold">{valve.status}</div>
          <div className="text-green-800 text-lg font-bold">
            {valve.real_time_flow}
          </div>
          <div className="text-green-800 text-lg font-bold text-md">
            {valve.total_flow}
          </div>
          <div className="text-red-400 font-bold text-sm">{valve.alarm}</div>
        </div>
        <div className="ml-24 2xl:ml-28 md:ml-10">
          <img width={70} height={70} src={image} alt={image} />
        </div>
      </div>
    </div>
  );
};

const ECValve = ({ ec }) => {
  return (
    <div className="p-2">
      <div className="text-2xl font-bold mb-2">{ec.name}</div>
      <div className="grid grid-cols-2">
        <div className="grid grid-rows-2">
          <div className="text-green-800 text-lg font-bold">
            Target: {ec.setpoint}
          </div>
          <div className="text-green-800 text-lg font-bold">
            Value: {ec.value}
          </div>
          <div className="text-red-400 font-bold text-sm">{ec.alarm}</div>
        </div>
        <div className="ml-24 2xl:ml-28 md:ml-10">
          <img src={fertilizerEc} alt={fertilizerEc} width={70} height={70} />
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
  const [{ data, loading, error }, refetch] = useApi(`/${farmId}/fertilizer`);

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div className="p-4">
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div className="p-4">
      <div className="grid xl:grid-cols-4 gap-3 p-2">
        {data.fertilizer_valves.map((valve, i) => (
          <div key={i} className="bg-gray-300 rounded shadow-md">
            <FertilizerValve valve={valve} />
          </div>
        ))}
      </div>
      <div className="p-2">
        <div className="grid xl:grid-cols-4 gap-3">
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
            data={data.ec_history.map(({ datetime, x, y, z }) => ({
              x: new Date(datetime + " " + x),
              y: Number(y),
              z: Number(z),
            }))}
          />
        </div>
      </div>
      <div className="xl:grid grid-cols-2 gap-2 p-2">
        <div className="bg-gray-300 rounded shadow-md mb-4">
          <FertilizerBarChart data={data.fertilizer_bargraph} />
        </div>
        <div className="bg-gray-300 rounded shadow-md mb-4">
          <FertilizerPieChart data={data.fertilizer_pie_chart} />
        </div>
      </div>
    </div>
  );
};
