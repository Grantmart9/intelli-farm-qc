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
import fertilizer from "images/fertilizer.png";
import greendrop from "images/greendrop.gif";
import ErrorGif from "images/ErrorGif.gif";
import { Preloader } from "components/Preloader";
import { useRefetch } from "../components/Timer";
import {HomeFlowFertilizerBarChartV} from "components/charts/HomeFlowFertilizerBarChartV";

const EquipmentStatus = ({ data }) => {
  var image;
  var timeLeft = "";

  if (data.status === "Opened") {
    image = greendrop;
  } else {
    image = fertilizer;
  }

  if (data.time_left == null) {
    timeLeft = null;
  } else {
    timeLeft = data.time_left + " min left";
  }

  return (
    <div className="p-2">
      <div
        style={{ fontFamily: "'Raleway', sans-serif" }}
        className="font-bold text-2xl mb-2"
      >
        {data.name}
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="grid grid-rows-4">
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-xl font-bold"
          >
            {data.status}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-md font-bold"
          >
            {data.real_time_flow}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-md font-bold text-md"
          >
            {data.total_flow}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-green-800 text-md font-bold text-md"
          >
            {timeLeft}
          </div>
          <div
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="font-bold text-sm text-red-400"
          >
            {data.alarm}
          </div>
        </div>
        <div>
          <div className="flex align-center justify-center p-1">
          <img src={image} alt={image} width={70} height={70} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderFertilizer1 = ({ data }) =>
  data.map((irrigation_valve, i) => (
    <div className="mb-3">
    <div key={i} className="bg-gray-300 shadow-md rounded flex">
      <EquipmentStatus data={irrigation_valve} />
      </div>
    </div>
  ));

const RenderFertilizer2 = ({ data }) => (
  <BrushChart
    data={data.map(({ datetime, y, ...rest }) => ({
      ...rest,
      x: new Date(datetime),
      y: Number(y)
    }))}
  />
);

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
        <div className="p-4">
        <div className="xl:grid xl:grid-cols-4 gap-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
            renderData={RenderFertilizer1}
          />
        </div>
        <div className="bg-gray-300 rounded shadow-md mt-4">
          <div className="w-full h-full">
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_3`)}
              refresh={false}
              renderData={({ data }) => (
                <HomeFlowFertilizerBarChartV data={data} />
              )}
            />
          </div>
        </div>
        <div className="bg-gray-300 rounded shadow-md mt-4">
        <div className="w-full h-full">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_2`)}
            renderData={RenderFertilizer2}
          />
          </div>
        </div>
      </div>
      </div>
  );
};
