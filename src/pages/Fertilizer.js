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
import { useApi } from "api";
import { LineChart } from "components/charts/LineChart";
import { useRefetch } from "../components/Timer";
import { FertilizerPieChart } from "components/charts/FertilizerPieChart";
import fertilizer from "images/fertilizer.png";
import ec_valve from "images/ec_valve.png";
import greendrop from "images/greendrop.gif";

const FertilizerValve = ({ valve }) => {
  var image = valve.status === "Opened" ? greendrop : fertilizer;
  return (
    <div className="px-2 pb-2">
      <div className="font-bold text-2xl mb-2">{valve.name}</div>
      <div className="flex justify-between mb-2">
        <div className="flex flex-col justify-end">
          <div className="text-green-800 text-xl font-bold">{valve.status}</div>
          <div className="text-green-800 text-lg font-bold">
            Value: {valve.real_time_flow}
          </div>
          {
            (!valve.real_time_flow_target ? null : (
              <div className="text-green-800 text-lg font-bold">
                Target: {valve.real_time_flow_target}
              </div>
            ))
          }
          <div className="text-green-800 text-lg font-bold text-md">
            Total: {valve.total_flow}
          </div>
          <div className="text-red-400 font-bold text-sm">{valve.alarm}</div>
        </div>
        <div>
          <img width={70} src={image} />
        </div>
      </div>
    </div>
  );
};

const ECValve = ({ ec }) => {
  return (
    <div className="p-2">
      <div className="text-2xl font-bold mb-2">{ec.name}</div>
      <div className="flex justify-between mb-2">
        <div className="flex flex-col justify-end">
          <div className="text-green-800 text-lg font-bold">
            Target: {ec.setpoint}
          </div>
          <div className="text-green-800 text-lg font-bold">
            Value: {ec.value}
          </div>
          <div className="text-red-400 font-bold text-sm">{ec.alarm}</div>
        </div>
        <div>
          <img src={ec_valve} width={70} />
        </div>
      </div>
    </div>
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
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
        className="grid gap-4 p-2"
      >
        {data.fertilizer_valves.map((valve, i) => (
          <div key={i} className="bg-gray-300 rounded shadow-md">
            <FertilizerValve valve={valve} />
          </div>
        ))}
        {data.ec_values.map((ec, i) => (
          <div key={i} className="bg-gray-300 rounded shadow-md">
            <ECValve ec={ec} />
          </div>
        ))}
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
      <div className="grid grid-cols-3 sm:grid-cols-6">
        <div className="col-span-3 sm:col-span-6 bg-gray-300 rounded shadow-md m-3">
          <FertilizerBarChart data={data.fertilizer_bargraph} />
        </div>
        <div className="col-span-3 bg-gray-300 rounded shadow-md m-3">
          <FertilizerPieChart
            data={data.fertilizer_pie_chart}
            title="Actual Ratio"
          />
        </div>
        <div className="col-span-3 bg-gray-300 rounded shadow-md m-3">
          <FertilizerPieChart
            data={data.fertilizer_pie_chart_recommended}
            title="Recommended Ratio"
          />
        </div>
      </div>
    </div>
  );
};
