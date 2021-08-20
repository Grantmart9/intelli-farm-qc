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
import fertilizerEc from "./fertilizerEc.png";
import { API_URL } from "../../api";
import greendrop from "./greendrop.gif";
import { LineChart } from "./LineChart";

const FertilizerValves = ({ valves }) => {
  return (
    <div className="flex p-2">
      <div className="shadow-md rounded p-2 w-100">
        <div key="name" className="text-gray-800 text-2xl font-bold">
          {valves.name}
        </div>
        <div key="status" className="text-green-800 text-2xl font-bold">
          {valves.status}
        </div>
        <div key="realflow" className="text-green-800 text-lg font-bold">
          {valves.real_time_flow}
        </div>
        <div key="alarm" className="text-red-800 font-bold text-md">
          {valves.alarm}
        </div>
        <div
          key="totalflow"
          className="text-gray-800 text-sm font-bold text-md"
        >
          {valves.total_flow}
        </div>
      </div>
      <div
        key="icon"
        className="shadow-md rounded ml-2 items-center flex justify-center w-20"
      >
        <img src={greendrop} alt={greendrop} width="80%" height="80%" />
      </div>
    </div>
  );
};

const ECValves = ({ ec }) => {
  return (
    <div className="flex p-2">
      <div className="shadow-md border-1 rounded p-2 w-100">
        <div key="ecname" className="text-gray-800 text-2xl font-bold">
          {ec.name}
        </div>
        <div key="setpoint" className="text-green-800 text-md font-bold">
          Setpoint: {ec.setpoint}
        </div>
        <div key="value" className="text-green-800 text-md font-bold">
          Value: {ec.value}
        </div>
        <div key="ecalarm" className="text-red-800 font-bold text-md">
          {ec.alarm}
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
      <div style={{ backgroundColor: "#cad3de" }}>
        <AppName />
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-4">
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.fertilizer_valves.map((valves, e) => (
            <div key={e} className=" bg-gray-400 rounded shadow-md">
              <FertilizerValves valves={valves} />
            </div>
          ))}
        </div>
        <div className="grid xl:grid-cols-4 gap-3 p-2">
          {data.ec_values.map((ec, i) => (
            <div key={i} className="bg-gray-400 rounded shadow-md">
              <ECValves ec={ec} />
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
          <div key="9" className="bg-gray-400 rounded shadow-md mb-4">
            <FertilizerBarChart data={data.fertilizer_bargraph} />
          </div>
          <div key="10" className="bg-gray-400 rounded shadow-md mb-4">
            <FertilizerPieChart data={data.fertilizer_pie_chart} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fertilizer;
