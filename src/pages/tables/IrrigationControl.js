import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { AppName } from "./AppName";
import { BrushChart } from "../../components/BrushChart";
import { API_URL } from "../../api";
import { AxiosSpinner } from "../../components/AxiosSpinner";
import { HomeFlowFertilizerBarChart } from "./HomeFlowFertilizerBarChart";
import valve from "./Valve.jpg"

const EquipmentStatus = ({ data }) => {
  return (
    <div className="shadow-md border-1 rounded">
      <div className="shadow-md rounded p-3 bg-gray-400">
        <div className="font-bold text-2xl">{data.name}</div>
        <div className="font-bold text-3xl">{data.total_flow}</div>
        <div className="font-bold text-2xl">{data.real_time_flow}</div>
        <div className="font-bold text-md text-red-400">{data.alarm}</div>
        <div>
        <img src={valve} alt={valve} width="50%" height="50%"/>
      </div>
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
        <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(15rem, 1fr))",
              gridGap: "1rem",
              marginTop: "1rem",
              padding: "0.8rem"
            }}
          >
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
              renderData={({ data }) =>
                data.map((irrigation_valve) => (
                  <EquipmentStatus data={irrigation_valve} />
                ))
              }
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
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
