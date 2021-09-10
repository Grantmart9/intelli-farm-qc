import React from "react";
import { useParams } from "react-router-dom";
import { BrushChart } from "components/charts/BrushChart";
import { API_URL, useApi } from "api";
import { AxiosSpinner } from "components/AxiosSpinner";
import { HomeFlowFertilizerBarChart } from "components/charts/HomeFlowFertilizerBarChart";
import fertilizer from "images/fertilizer.png";
import greendrop from "images/greendrop.gif";
import ErrorGif from "images/ErrorGif.gif";
import { Preloader } from "components/Preloader";

const EquipmentStatus = ({ data }) => {
  var image;

  if (data.status === "Opened") {
    image = greendrop;
  } else {
    image = fertilizer;
  }
  return (
    <div className="flex p-2">
      <div className="shadow-md rounded p-2 w-100">
        <div className="font-bold text-2xl">{data.name}</div>
        <div className="font-bold text-2xl">{data.status}</div>
        <div className="font-bold text-xl">{data.real_time_flow}</div>
        <div className="font-bold text-md text-red-400">{data.alarm}</div>
        <div className="font-bold text-sm">{data.total_flow}</div>
      </div>
      <div className="bg-gray-400 rounded shadow-md ml-2 items-center flex justify-center w-25">
        <img src={image} alt={image} width="80%" height="80%" />
      </div>
    </div>
  );
};

export const IrrigationControl = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${farmId}/irrigation_1`
  );
  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div style={{ backgroundColor: "#cad3de" }}>
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:p-1 md:p-1 p-1">
        <div className="xl:grid grid-cols-4 p-4 gap-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
            renderData={({ data }) =>
              data.map((irrigation_valve, i) => (
                <div key={i} className="bg-gray-400 shadow-md rounded mb-4">
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
