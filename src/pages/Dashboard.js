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
import { HomeFlowFertilizerBarChartD } from "components/charts/HomeFlowFertilizerBarChartD";
import ErrorGif from "images/ErrorGif.gif";
import { useRefetch } from "components/Timer";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 6
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "dark" ? 200 : 700]
  },
  bar: {
    borderRadius: 6,
    backgroundColor: "#05ab24"
  }
}))(LinearProgress);

const IrrigationProgress = ({ data }) => (
  <div className="p-4 h-full">
    <div style={{ fontFamily: "'Raleway', sans-serif" }} className="font-bold text-xl">
      Irrigation
    </div>
    <div
      style={{ fontFamily: "'Raleway', sans-serif" }}
      className="font-bold text-3xl"
    >
      Cycle Progress
    </div>
    <div className="mt-3">
      <BorderLinearProgress variant="determinate" value={data.cycle_progress} />
    </div>
  </div>
);

const IrrigationTimeLeft = ({ data }) => (
  <div className="p-4 h-full">
    <div style={{ fontFamily: "'Raleway', sans-serif" }} className="text-xl font-bold">
      Next Start Time
    </div>
    <div
      style={{ fontFamily: "'Raleway', sans-serif" }}
      className="font-bold text-3xl"
    >
      {data.next_start_time}
    </div>
  </div>
);

const IrrigationEC = ({ data }) => (
  <div className="p-4 h-full">
    <div style={{ fontFamily: "'Raleway', sans-serif" }} className="text-xl font-bold">
      EC
    </div>
    <div
      style={{ fontFamily: "'Raleway', sans-serif" }}
      className="font-bold text-3xl"
    >
      Value: {data.ec_data.value} µS
    </div>
    <div style={{ fontFamily: "'Raleway', sans-serif" }} className="font-bold">
      Target: {data.ec_data.setpoint} µS
    </div>
  </div>
);

const Pump = ({ pump }) => (
  <div className="p-4 h-full">
    <div style={{ fontFamily: "'Raleway', sans-serif" }} className="font-bold text-xl">
      Water Pump
    </div>
    <div
      style={{ fontFamily: "'Raleway', sans-serif" }}
      className="font-bold text-3xl"
    >
      {pump.status}
    </div>
    <div style={{ fontFamily: "'Raleway', sans-serif" }} className="font-bold">
      {pump.main_flow}
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
          }
        },
        labels: labels,
        legend: {
          formatter: (label, { seriesIndex }) =>
            `${label} - ${data[seriesIndex].value} ${data[seriesIndex].unit}`,
          position: "bottom"
        },
        title: {
          text: "Fertilizer Ratio",
          offsetX: 30,
          offsetY: 2,
          style: {
            fontSize: "17px",
            fontWeight: "bold",
            fontFamily: "'Raleway', sans-serif"
          }
        }
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
          data: data.sensor_total_flow_bar_graph.map(({ y }) => y)
        }
      ]}
      options={{
        chart: {
          sparkline: {
            enabled: true
          }
        },
        tooltip: {
          y: {
            formatter: (y) => {
              return `${y} ${data.unit}`;
            }
          }
        },
        xaxis: {
          categories: data.sensor_total_flow_bar_graph.map(({ x }) => x)
        },
        subtitle: {
          text: data.name,
          offsetX: 30,
          fontFamily: "'Raleway', sans-serif"
        },
        title: {
          text: `${data.sensor_daily_total_flow} ${data.unit}`,
          offsetX: 30
        }
      }}
    />
  );
};

export const Dashboard = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }, refetch] = useApi(
    `${API_URL}/-${farmId}/dashboard`
  );

  useRefetch(refetch);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div>
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    );

  return (
    <div>
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
      <div className="grid lg:grid-cols-3 grid-rows-1 p-2 -mt-4">
        {data.water_usage.map((waterUsageData, i) => (
          <div key={i} className="bg-gray-300  rounded shadow-md m-3 pt-4 pb-2">
            <HomeFlowWaterUsage data={waterUsageData} />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 grid-rows-1 gap-4 p-4 -mt-4">
        <div className="flex bg-gray-300 rounded shadow-md p-4 ">
          <div className="w-full h-full">
            <HomeFlowFertilizerBarChartD
              data={data.fertilizer_usage.bar_graph}
            />
            </div>
        </div>
        <div className="flex bg-gray-300 rounded shadow-md p-4 ">
          <div className="w-full h-full">
            <HomeFlowFertilizerPieChart
              data={data.fertilizer_usage.pie_chart}
            />
            </div>
        </div>
      </div>
    </div>
  );
};
