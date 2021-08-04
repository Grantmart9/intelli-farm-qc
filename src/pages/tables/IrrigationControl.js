import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./IrrigationControl.css";
import { AppName } from "./AppName";
import { BrushChart } from "../../components/BrushChart";
import { API_URL } from "../../api";
import { AxiosSpinner } from "../../components/AxiosSpinner";
import { HomeFlowFertilizerBarChart } from "./HomeFlowFertilizerBarChart";

const EquipmentStatus = ({ data }) => {
  return (
    <div>
      <div className="shadow-md border-1 rounded">
        <div
          style={{
            border: "1px 1px solid black",
            display: "flex",
            background: "#e3e5e8",
            padding: "1rem",
            fontFamiliy: "Times New Roman",
            fontWeight: "bold",
            gap: "1.5rem",
          }}
        >
          <div style={{ padding: "1rem" }}>
            <FontAwesomeIcon
              style={{ color: "gray", fontSize: "2rem" }}
              icon={faChartLine}
            />
          </div>
          <div>
            <h4 style={{ color: "#4a5073", fontSize: "1rem" }}>{data.name}</h4>
            <h2 style={{ color: "#4a5073", fontSize: "1.5rem" }}>
              {data.total_flow}
            </h2>
            <h2 style={{ color: "#4a5073", fontSize: "0.7rem" }}>
              {data.real_time_flow}
            </h2>
            <h4 style={{ color: "red", fontSize: "0.8rem" }}>{data.alarm}</h4>
          </div>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          padding: "0.5rem",
        }}
      ></div>
      <div style={{ marginTop: "5rem" }}>
        <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(15rem, 1fr))",
              gridGap: "1rem",
              marginTop: "1rem",
              padding: "0.8rem",
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
                    y: Number(y),
                  }))}
                />
              )}
            />
        </div>
      </div>
    </div>
  );
}

export default IrrigationControl;
