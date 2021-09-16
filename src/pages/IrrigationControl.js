/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/09/2021 - 14:07:52
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/09/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import { useParams } from "react-router-dom";
import { BrushChart } from "components/charts/BrushChart";
import { API_URL, useApi } from "api";
import { AxiosSpinner } from "components/AxiosSpinner";
import { HomeFlowFertilizerBarChartV } from "components/charts/HomeFlowFertilizerBarChartV";
import fertilizer from "images/fertilizer.png";
import greendrop from "images/greendrop.gif";
import ErrorGif from "images/ErrorGif.gif";
import { Preloader } from "components/Preloader";
import { useRefetch } from "../components/Timer";

const EquipmentStatus = ({ data }) => {
  var image;

  if (data.status === "Opened") {
    image = greendrop;
  } else {
    image = fertilizer;
  }
  return (
    <div className="flex p-2">
      <div className="w-100">
        <div className="font-bold text-2xl">{data.name}</div>
        <div className="font-bold text-2xl">{data.status}</div>
        <div className="font-bold text-xl">{data.real_time_flow}</div>
        <div className="font-bold text-md text-red-400">{data.alarm}</div>
        <div className="font-bold text-sm">{data.total_flow}</div>
      </div>
      <div className="ml-2 items-center flex justify-center w-25">
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
  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div>
        <div className="p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div>
      <div className="p-1">
        <div className="xl:grid grid-cols-4 p-4 gap-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
            renderData={({ data }) =>
              data.map((irrigation_valve, i) => (
                <div key={i} className="bg-gray-300 shadow-md rounded mb-4">
                  <EquipmentStatus data={irrigation_valve} />
                </div>
              ))
            }
          />
        </div>
        <div className="bg-gray-300 rounded shadow-md ml-6 mr-6">
          <div className="w-full h-full">
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_3`)}
              renderData={({ data }) => (
                <HomeFlowFertilizerBarChartV data={data} />
              )}
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-300  rounded shadow-md m-4">
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
