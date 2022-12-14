/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 14:40:38
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import { useParams } from "react-router-dom";
import { Preloader } from "components/Preloader";
import ApexChart from "react-apexcharts";
import { useApi } from "api";
import { FertilizerBarChart } from "components/charts/FertilizerBarChart";
import { FertilizerPieChart } from "components/charts/FertilizerPieChart";
import ErrorGif from "images/ErrorGif.gif";
import { useRefetch } from "components/Timer";
import { ProgressBar } from "@themesberg/react-bootstrap";

const IrrigationProgress = ({ data }) => (
  <div className="p-4 h-full">
    <div className="font-bold text-xl">Irrigation</div>
    <div className="font-bold text-3xl">Cycle Progress</div>
    <div className="mt-3">
      <ProgressBar variant="success" animated now={data.cycle_progress} />
    </div>
  </div>
);

const IrrigationTimeLeft = ({ data }) => (
  <div className="p-4 h-full">
    <div className="text-xl font-bold">Next Start Time</div>
    <div className="font-bold text-2xl">{data.next_start_time}</div>
  </div>
);

const IrrigationEC = ({ data }) => (
  <div className="p-4 h-full">
    <div className="text-xl font-bold">EC</div>
    <div className="text-2xl font-bold">Value: {data.ec_data.value} µS</div>
    <div className="font-bold">Target: {data.ec_data.setpoint} µS</div>
  </div>
);

const Pump = ({ pump }) => (
  <div className="p-4 h-full">
    <div className="font-bold text-xl">Water Pump</div>
    <div className="font-bold text-3xl">{pump.status}</div>
    <div className="font-bold">{pump.main_flow}</div>
  </div>
);

export const HomeFlowWaterUsage = ({ data, type }) => {
  return (
    <ApexChart
      type={type}
      series={[
        {
          name: data.name,
          data: data.sensor_total_flow_bar_graph.map(({ y }) => y),
        },
      ]}
      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        tooltip: {
          y: {
            formatter: (y) => {
              return `${y} ${data.unit}`;
            },
          },
        },
        xaxis: {
          categories: data.sensor_total_flow_bar_graph.map(({ x }) => x),
        },
        subtitle: {
          text: data.name,
          offsetX: 30,
        },
        title: {
          text: `${data.sensor_daily_total_flow} ${data.unit}`,
          offsetX: 30,
        },
      }}
    />
  );
};


export const Dashboard = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(`/-${farmId}/dashboard`);

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div>
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div className="p-1">
      <div className="grid grid-cols-1 lg:grid-cols-4 p-4 gap-4">
        <div className="bg-gray-300 rounded shadow-md">
          <IrrigationProgress data={data.irrigation_data} />
        </div>
        <div className="bg-gray-300 rounded shadow-md">
          <IrrigationTimeLeft data={data.irrigation_data} />
        </div>
        <div className="bg-gray-300 rounded shadow-md">
          <IrrigationEC data={data.irrigation_data} />
        </div>
        {data.irrigation_data.pump_data.map((pump, i) => (
          <div key={i} className="bg-gray-300 rounded shadow-md">
            <Pump pump={pump} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 p-2 pt-0">
        {data.water_usage.map((waterUsageData, i) => (
          <div
            key={i}
            className="bg-gray-300  rounded shadow-md m-3 pt-4 pb-2 overflow-hidden"
          >
            <HomeFlowWaterUsage
              data={waterUsageData}
              type={waterUsageData.name == "Water Usage Today" ? "area" : "bar"}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6">
        <div className="col-span-3 sm:col-span-6 bg-gray-300 rounded shadow-md m-3">
          <FertilizerBarChart
            title="Fertilizer Usage"
            data={data.fertilizer_usage.bar_graph}
          />
        </div>
        <div className="col-span-3 bg-gray-300 rounded shadow-md m-3">
          <FertilizerPieChart
            data={data.fertilizer_usage.pie_chart}
            title="Actual Ratio"
          />
        </div>
        <div className="col-span-3 bg-gray-300 rounded shadow-md m-3">
          <FertilizerPieChart
            data={data.fertilizer_usage.pie_chart_recommended}
            title="Recommended Ratio"
          />
        </div>
      </div>
    </div>
  );
};
