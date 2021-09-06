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
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import ApexChart from "react-apexcharts";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { API_URL, useApi } from "../../api";
import { HomeFlowFertilizerBarChart } from "../../components/Charts/HomeFlowFertilizerBarChart";
import { AppName } from "./AppName";
import ErrorGif from "../../images/ErrorGif.gif";
import { INTERVAL } from "../../components/Timer";

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
  const series = data.map(({ ratio }) => Number(ratio.toFixed(2)));
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
            return val + "%";
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

  useEffect(() => {
    const interval = setInterval(() => {
      //refetch();
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [refetch]);

  if (!data && loading) return <Preloader />;
  if (error)
    return (
      <div style={{ backgroundColor: "#cad3de" }}>
        <AppName />
        <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
          <img src={ErrorGif} alt={ErrorGif} width="100%" />
        </div>
      </div>
    );

  return (
    <div style={{ display: "block", backgroundColor: "#cad3de" }}>
      <AppName />
      <div
        key="1"
        className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1"
      >
        <div key="2" className="grid grid-cols-1 lg:grid-cols-4 p-4 gap-4">
          <div key="3" className="bg-gray-400 rounded shadow-md">
            <IrrigationProgress key="no1" data={data.irrigation_data} />
          </div>
          <div key="4" className="bg-gray-400 rounded shadow-md">
            <IrrigationTimeLeft key="no2" data={data.irrigation_data} />
          </div>
          <div key="5" className="bg-gray-400 rounded shadow-md">
            <IrrigationEC key="no3" data={data.irrigation_data} />
          </div>
          {data.irrigation_data.pump_data.map((pump, i) => (
            <div key="6" className="bg-gray-400 rounded shadow-md">
              <Pump key={i} pump={pump} />
            </div>
          ))}
        </div>
        <div key="7" className="grid grid-cols-1 lg:grid-cols-3 p-2">
          {data.water_usage.map((waterUsageData, i) => (
            <div className="bg-gray-400  rounded shadow-md m-3 pt-4" key={i}>
              <HomeFlowWaterUsage data={waterUsageData} />
            </div>
          ))}
        </div>
        <div key="9" className="grid grid-cols-1 lg:grid-cols-5">
          <div
            key="10"
            className="col-span-3 bg-gray-400 rounded shadow-md m-4"
          >
            <div key="11" className="w-full h-full">
              <HomeFlowFertilizerBarChart
                data={data.fertilizer_usage.bar_graph}
              />
            </div>
          </div>
          <div
            key="12"
            className="col-span-2 bg-gray-400 rounded shadow-md flex-grow m-4 flex align-items"
          >
            <div key="13" className="w-full">
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
