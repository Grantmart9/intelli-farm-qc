/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 20/08/2021 - 11:41:30
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 20/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useMediaQuery } from "@react-hook/media-query";
import "./HomePieChart.css";

const ALARM_STATE_COLORS = {
  Good: ["#63b3ed", "#e2e8f0"],
  Low: ["#f6e05e", "#e2e8f0"],
  High: ["#f98080", "#e2e8f0"],
};

const determineChartColor = (alarmState) => {
  return ALARM_STATE_COLORS[alarmState];
};

export const HomePieChart = ({ data }) => {
  const minSmall = useMediaQuery("(min-width : 320px)");
  const minMedium = useMediaQuery("(min-width: 768px)");
  return (
    <div className="pie-chart-container w-full h-full flex flex-col place-items-center">
      <div className="pie-chart relative w-full">
        <div className="absolute inset-0">
          <ResponsivePie
            data={formatData(data)}
            innerRadius={0.5}
            margin={{ top: 10, bottom: 10 }}
            padAngle={0}
            cornerRadius={0}
            colors={determineChartColor(data.sensor_alarm_state)}
            borderWidth={1}
            enableRadialLabels={false}
            enableSlicesLabels={false}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
            style={{
              fontSize: minSmall ? (minMedium ? 14 : 10) : 8,
            }}
          >
            <span className="text-black">
              {data.sensor_current_value} {data.unit || "C"}
            </span>
          </div>
        </div>
      </div>
      <div className="text-black text-center w-full">{data.name}</div>
    </div>
  );
};

const formatData = (data) => {
  return [
    {
      id: 0,
      label: "Full",
      value: data.sensor_percentage_value.toFixed(2),
    },
    {
      id: 1,
      label: "Capacity remaining",
      value: 100 - data.sensor_percentage_value,
    },
  ];
};
