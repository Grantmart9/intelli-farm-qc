/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 13:41:01
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import { useParams } from "react-router-dom";
import { AppName } from "./AppName";
import { BrushChart } from "../../components/BrushChart";
import { API_URL } from "../../api";
import { AxiosSpinner } from "../../components/AxiosSpinner";
import { HomeFlowFertilizerBarChart } from "./HomeFlowFertilizerBarChart";
import fertilizer from "./fertilizer.png";

const EquipmentStatus = ({ data }) => {
  return (
    <div key="20" className="flex p-2">
      <div key="21" className="shadow-md rounded p-2 w-100">
        <div key="22" className="font-bold text-2xl">
          {data.name}
        </div>
        <div key="23" className="font-bold text-2xl">
          {data.status}
        </div>
        <div key="24" className="font-bold text-xl">
          {data.real_time_flow}
        </div>
        <div key="25" className="font-bold text-md text-red-400">
          {data.alarm}
        </div>
        <div key="26" className="font-bold text-sm">
          {data.total_flow}
        </div>
      </div>
      <div
        key="27"
        className="bg-gray-400 rounded shadow-md ml-2 items-center flex justify-center w-25"
      >
        <img
          key="28"
          src={fertilizer}
          alt={fertilizer}
          width="80%"
          height="80%"
        />
      </div>
    </div>
  );
};

const IrrigationControl = () => {
  const { farmId } = useParams();
  return (
    <div key="0" style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div
        key="1"
        className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1"
      >
        <div key="2" className="xl:grid grid-cols-4 p-4 gap-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
            renderData={({ data }) =>
              data.map((irrigation_valve, i) => (
                <div className="bg-gray-400 shadow-md rounded mb-4">
                  <EquipmentStatus key={i} data={irrigation_valve} />
                </div>
              ))
            }
          />
        </div>
        <div key="4" className="bg-gray-400  rounded shadow-md ml-6 mr-6">
          <div key="5" className="w-full h-full">
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_3`)}
              renderData={({ data }) => (
                <HomeFlowFertilizerBarChart key="13" data={data} />
              )}
            />
          </div>
        </div>
        <div key="6" className="col-span-3 bg-gray-400  rounded shadow-md m-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_2`)}
            renderData={({ data }) => (
              <BrushChart
                key="12"
                data={data.map(({ datetime, y, ...rest }) => ({
                  ...rest,
                  x: new Date(datetime),
                  y: Number(y),
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
