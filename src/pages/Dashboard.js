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
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { API_URL, useApi } from "api";
import { HomeFlowFertilizerBarChart } from "components/charts/HomeFlowFertilizerBarChart";
import ErrorGif from "images/ErrorGif.gif";
import { useRefetch } from "components/Timer";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 6,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "dark" ? 200 : 700],
  },
  bar: {
    borderRadius: 6,
    backgroundColor: "#05ab24",
  },
}))(LinearProgress);

const IrrigationProgress = ({ data }) => (
  <div className="p-2">
    <div className="bg-gray-400 rounded p-3 shadow-md h-full">
      <div className="font-bold text-xl">Irrigation</div>
      <div className="font-bold text-3xl">Cycle Progress</div>
      <div className="mt-2">
        <BorderLinearProgress
          variant="determinate"
          value={data.cycle_progress}
        />
      </div>
    </div>
  </div>
);

const IrrigationTimeLeft = ({ data }) => (
  <div className="p-2">
    <div className="bg-gray-400 rounded p-3 shadow-md h-full">
      <div className="text-xl font-bold">Irrigation Time Left</div>
      <div className="font-bold text-3xl">{data.irrigation_time_left} min</div>
    </div>
  </div>
);

const IrrigationEC = ({ data }) => (
  <div className="p-2">
    <div className="bg-gray-400 rounded p-3 shadow-md h-full">
      <div className="font-bold text-xl">
        EC Average: {data.ec_data.average}
      </div>
      <div className="text-3xl font-bold">Value: {data.ec_data.value} mS</div>
      <div className="font-bold">Setpoint: {data.ec_data.setpoint} mS</div>
    </div>
  </div>
);

const Pump = ({ pump }) => (
  <div className="p-2">
    <div className="bg-gray-400 rounded p-2 shadow-md h-full">
      <div className="font-bold text-xl">Water Pump</div>
      <div className="font-bold text-3xl">{pump.status}</div>
      <div className="font-bold">{pump.main_flow}</div>
    </div>
  </div>
);

export const HomeFlowFertilizerPieChart = ({ data }) => {
  const series = data.map(({ ratio }) => Number(ratio));
  const labels = data.map(({ name }) => name);
  return (
    <ApexChart
      type="donut"
      height={300}
      series={series}
      options={{
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
        },
        labels: labels,
        legend: {
          formatter: (label, { seriesIndex }) =>
            `${label} - ${data[seriesIndex].value} ${data[seriesIndex].unit}`,
          position: "bottom",
        },
        title: {
          text: "Fertilizer Ratio",
          offsetX: 30,
          offsetY: 10,
          style: {
            fontSize: "17px",
            fontWeight: "bold",
          },
        },
      }}
    />
  );
};

export const HomeFlowWaterUsage = ({ data }) => {
  return (
    <ApexChart
      type="bar"
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
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/${farmId}/dashboard`
  );

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div style={{ backgroundColor: "#cad3de" }}>
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div style={{ display: "block", backgroundColor: "#cad3de" }}>
      <div className="p-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 p-4 gap-4">
          <div className="bg-gray-400 rounded shadow-md">
            <IrrigationProgress data={data.irrigation_data} />
          </div>
          <div className="bg-gray-400 rounded shadow-md">
            <IrrigationTimeLeft data={data.irrigation_data} />
          </div>
          <div className="bg-gray-400 rounded shadow-md">
            <IrrigationEC data={data.irrigation_data} />
          </div>
          {data.irrigation_data.pump_data.map((pump, i) => (
            <div key={i} className="bg-gray-400 rounded shadow-md">
              <Pump pump={pump} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 p-2">
          {data.water_usage.map((waterUsageData, i) => (
            <div key={i} className="bg-gray-400  rounded shadow-md m-3 pt-4">
              <HomeFlowWaterUsage data={waterUsageData} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="col-span-3 bg-gray-400 rounded shadow-md m-4">
            <div className="w-full h-full">
              <HomeFlowFertilizerBarChart
                data={data.fertilizer_usage.bar_graph}
              />
            </div>
          </div>
          <div className="col-span-2 bg-gray-400 rounded shadow-md flex-grow m-4 flex align-items">
            <div className="w-full">
              <HomeFlowFertilizerPieChart
                data={data.fertilizer_usage.pie_chart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
