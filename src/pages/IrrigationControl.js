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
import { AxiosSpinner } from "components/AxiosSpinner";
import { FertilizerBarChart } from "components/charts/FertilizerBarChart";
import citrus from "images/citrus.png";
import greendrop from "images/greendrop.gif";
import valve from "images/valve.png";
import grapes from "images/grapes.png";

const images = {
  main_valve: valve,
  opened: greendrop,
  citrus: citrus,
  grape: grapes,
  unknown: null,
};

const getImageFor = (data) => {
  if (data.status === "Opened") {
    return images.opened;
  }

  if (data.type === "main valve") {
    return images.main_valve;
  }

  return images[data.cultivar];
};

const EquipmentStatus = ({ data }) => {
  const image = getImageFor(data);
  const timeLeft = data.time_left && data.time_left + " min left";

  return (
    <div className="p-2">
      <div className="font-bold text-2xl mb-2">{data.name}</div>
      <div className="flex justify-between mb-2">
        <div className="flex flex-col">
          <div className="text-green-800 text-xl font-bold">{data.status}</div>
          <div className="text-green-800 text-lg font-bold">
            {data.real_time_flow}
          </div>
          <div className="text-green-800 text-lg font-bold text-md">
            {data.total_flow}
          </div>
          <div className="text-green-800 text-lg font-bold text-md">
            {timeLeft}
          </div>
          <div className="font-bold text-sm text-red-400">{data.alarm}</div>
        </div>
        <div>
          <img src={image} width={70} />
        </div>
      </div>
    </div>
  );
};

export const IrrigationControl = () => {
  const { farmId } = useParams();
  return (
    <div>
      <div className="p-2">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
          className="grid p-4 gap-4"
        >
          <AxiosSpinner
            callHook={(use) => use(`/${farmId}/irrigation_1`)}
            renderData={({ data }) =>
              data.map((irrigation_valve, i) => (
                <div key={i} className="bg-gray-300 shadow-md rounded mt-2">
                  <EquipmentStatus data={irrigation_valve} />
                </div>
              ))
            }
          />
        </div>
        <div className="bg-gray-300 rounded shadow-md ml-6 mr-6">
          <div className="w-full h-full">
            <AxiosSpinner
              callHook={(use) => use(`/${farmId}/irrigation_3`)}
              refresh={false}
              renderData={({ data }) => (
                <FertilizerBarChart title="Field Water Usage" data={data} />
              )}
            />
          </div>
        </div>
        <div className="col-span-3 bg-gray-300  rounded shadow-md m-4">
          <AxiosSpinner
            callHook={(use) => use(`/${farmId}/irrigation_2`)}
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
