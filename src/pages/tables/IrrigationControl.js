import React, { useMemo } from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./IrrigationControl.css";
import Preloader from "../../components/Preloader";
import { AppName } from "./Dashboard";
import ApexChart from "react-apexcharts";
import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Array";
import { toArray, fromArray } from "fp-ts/lib/Set";
import { eqString } from "fp-ts/lib/Eq";
import { ordString } from "fp-ts/lib/Ord";
import moment from "moment";
import Chart from "react-apexcharts";

export const HomeFlowFertilizerBarChart = ({ data }) => {
  const today = useMemo(() => new Date(), []);
  const dates = [-6, -5, -4, -3, -2, -1, 0].map((d) => {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    return date;
  });

  const days = dates.map(
    (date) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
  );

  const seriesNames = pipe(
    data,
    map(({ name }) => name),
    fromArray(eqString),
    toArray(ordString)
  );

  const series = seriesNames.map((seriesName) => ({
    name: seriesName,
    data: dates.map((date) => {
      const dayUsage = data.find(
        (dayUsage) =>
          new Date(dayUsage.date).getDay() === date.getDay() &&
          dayUsage.name === seriesName
      );
      return dayUsage ? dayUsage.value : 0;
    })
  }));

  return (
    <ApexChart
      type="bar"
      height={300}
      series={series}
      options={{
        chart: {
          toolbar: {
            show: false
          }
        },
        tooltip: {
          x: {
            formatter: (_, { dataPointIndex }) => {
              const date = moment(dates[dataPointIndex]).format(
                "YYYY-MM-DD ddd"
              );
              return date;
            }
          },
          y: {
            formatter: (y, { dataPointIndex }) => {
              const unit = data[dataPointIndex].unit;
              return `${y} ${unit}`;
            }
          }
        },
        xaxis: {
          categories: days
        },
        plotOptions: {
          bar: {
            endingShape: "rounded",
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: "Field Valve History",
          offsetX: 30
        }
      }}
    />
  );
};

const IrrigationControl = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `https://lodicon-test-api.herokuapp.com/api/v1/${farmId}/irrigation`
  );

  if (loading) return <Preloader />;
  if (error)
    return (
      <p>
        <FontAwesomeIcon icon={faExclamation} />
      </p>
    );
    var FakeData = {
      options: {
        chart: {
          id: "bar"
        },
        xaxis: {
          categories: [data.main_valve_history]
        },
        title: {
          text: `Main Valve History`,
          offsetX: 30
        },
      },
      series: [
        {
          name: "series-1",
          data: ['1991', 2992, 3993, 4994, 5995, 6996, 7997, 8998, 9999]
        },
      ]
    };

    const EquipmentStatus = () => {
      return (
        <div>
          <div
            style={{
              display: "flex",
              border: "2px 2px solid black",
              borderRadius: "0.09cm",
              background: "#dfe2e8",
              padding: "1rem",
              fontFamiliy: "Times New Roman",
              fontWeight: "bold",
              gap: "3rem",
              boxShadow: "2px 2px #aeb3bd"
            }}
          ><div style={{ padding: "1rem" }}>
          <FontAwesomeIcon
            style={{ color: "gray", fontSize: "2rem" }}
            icon={faChartLine}
          />
        </div>
            <div>
              <h4 style={{ color: "#4a5073",fontSize:"1rem" }}>Fertilizer</h4>
              <h2 style={{ color: "#4a5073",fontSize:"1.5rem" }}>Flow</h2>
              <h4 style={{ color: "red",fontSize:"0.8rem" }}>Alarm State</h4>
            </div>
          </div>
        </div>
      );
    };

  return (
    <div style={{backgroundColor:"#cad3de" }}>
      <AppName />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          padding: "0.5rem"
        }}
      >
      </div>
      <div style={{marginTop:"5rem"}}>
      <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(20rem, 1fr))",
          gridGap: "1rem",
          marginTop:"1rem",
          padding:"1rem",
          marginLeft:"1rem"
        }}
      >
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
        <EquipmentStatus />
      </div>
      </div>
      <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
        <div className="w-full h-full">
          <HomeFlowFertilizerBarChart data={data.field_valve_history} />
        </div>
      </div>
      <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
      <div style={{backgroundColor:"#dfe2e8"}}>
      <Chart
              options={FakeData.options}
              series={FakeData.series}
              type="bar"
              width="100%"
              height="300rem"
            />
            </div>
            </div>
    </div>
    </div>
  );
      };
export default IrrigationControl;
