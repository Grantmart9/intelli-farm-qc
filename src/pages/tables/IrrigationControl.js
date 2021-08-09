import React from "react";
import { useParams } from "react-router-dom";
import { AppName } from "./AppName";
import { BrushChart } from "../../components/BrushChart";
import { API_URL } from "../../api";
import { AxiosSpinner } from "../../components/AxiosSpinner";
import { HomeFlowFertilizerBarChart } from "./HomeFlowFertilizerBarChart";
import valve from "./Valve.jpg"

const EquipmentStatus = ({ data }) => {
  return (
    <div className="flex p-2">
      <div className="shadow-md rounded p-2 w-100">
        <div className="font-bold text-2xl">{data.name}</div>
        <div className="font-bold text-xl">Real Time Flow: {data.real_time_flow}</div>
        <div className="font-bold text-md text-red-400">Alarm Status: {data.alarm}</div>
        <div className="font-bold text-sm">Total Flow: {data.total_flow}</div>
      </div>
    <div className="bg-gray-400 rounded shadow-md ml-2 items-center flex justify-center w-25">
    <img src={valve} alt={valve} width="80%" height="80%"/>
  </div>
  </div>
  );
};

const IrrigationControl = () => {
  const { farmId } = useParams();
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <div className="xl:grid grid-cols-4 p-4 gap-4">
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
              renderData={({ data }) =>
                data.map((irrigation_valve) => (
                  <div className="bg-gray-400 shadow-md rounded mb-4">
                  <EquipmentStatus data={irrigation_valve} />
                  </div>
                ))
              }
            />
        </div>
        <div className="bg-gray-400  rounded shadow-md ml-6 mr-6">
          <div className="w-full h-full">
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_3`)}
              renderData={({ data }) => (
                <HomeFlowFertilizerBarChart data={data} />
              )}
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_2`)}
            renderData={({ data }) => (
              <BrushChart
                data={data.map(({ datetime, y, ...rest }) => ({
                  ...rest,
                  x: new Date(datetime),
                  y: Number(y)
                }))}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default IrrigationControl;
