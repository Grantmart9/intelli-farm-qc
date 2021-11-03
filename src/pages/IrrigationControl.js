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
    <div className="px-2 pb-2">
      <div
        style={{ fontFamily: "Helvetica Neue" }}
        className="font-bold text-2xl mb-2"
      >
        {data.name}
      </div>
      <div className="grid grid-cols-2 -mb-2">
        <div className="grid grid-rows-3">
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            className="text-green-800 text-xl font-bold"
          >
            {data.status}
          </div>
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            className="text-green-800 text-lg font-bold"
          >
            {data.real_time_flow}
          </div>
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            className="text-green-800 text-lg font-bold text-md"
          >
            {data.total_flow}
          </div>
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            className="text-green-800 text-lg font-bold text-md"
          >
            {timeLeft}
          </div>
          <div
            style={{ fontFamily: "Helvetica Neue" }}
            className="font-bold text-sm text-red-400"
          >
            {data.alarm}
          </div>
        </div>
        <div className="ml-24 2xl:ml-28 md:ml-10">
          <img src={image} alt={image} width={70} height={70} />
        </div>
      </div>
    </div>
  );
};

const RenderFertilizer1 = ({ data }) =>
  data.map((irrigation_valve, i) => (
    <div key={i} className="bg-gray-300 shadow-md rounded flex mt-2">
      <EquipmentStatus data={irrigation_valve} />
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

const RenderFertilizer3 = ({ data }) => (
  <HomeFlowFertilizerBarChartV data={data} />
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
      <div className="p-2">
        <div className="xl:grid grid-cols-4 p-4 gap-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_1`)}
            renderData={RenderFertilizer1}
          />
        </div>
        <div className="bg-gray-300 rounded shadow-md ml-6 mr-6">
          <div className="w-full h-full">
            <AxiosSpinner
              callHook={(use) => use(`${API_URL}/${farmId}/irrigation_3`)}
              renderData={RenderFertilizer3}
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-300  rounded shadow-md m-4">
          <AxiosSpinner
            callHook={(use) => use(`${API_URL}/${farmId}/irrigation_2`)}
            renderData={RenderFertilizer2}
          />
        </div>
      </div>
    </div>
  );
};
