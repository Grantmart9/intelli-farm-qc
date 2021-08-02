import React, { memo, useMemo } from "react";
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
import { BrushChart } from "../../components/BrushChart";

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

  // const data = {"field_valve_history":[{"date":"2021/08/02","day":"Mon","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/08/02","day":"Mon","name":"Valve_11","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/08/01","day":"Sun","name":"Valve_11","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/07/31","day":"Sat","name":"Valve_11","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/07/30","day":"Fri","name":"Valve_11","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/07/29","day":"Thu","name":"Valve_11","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/07/28","day":"Wed","name":"Valve_11","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/07/27","day":"Tue","name":"Valve_11","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_01","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_02","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_03","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_04","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_05","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_06","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_07","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_08","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_09","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Field_Valve_10","unit":"","value":0.0},{"date":"2021/07/26","day":"Mon","name":"Valve_11","unit":"","value":0.0}],"irrigation_valves":[{"alarm":"No Alarm","name":"Main_Valve_01","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3","type":"main valve"},{"alarm":"No Alarm","name":"Field_Valve_01","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_02","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_03","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_04","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_05","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_06","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_07","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_08","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_09","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"},{"alarm":"No Alarm","name":"Field_Valve_10","real_time_flow":"1.0 m\u00b3/h","total_flow":"1 m\u00b3/h","type":"field valve"}],"main_valve_history":[{"datetime":"2021/08/02","x":"23:59","y":"0.0"},{"datetime":"2021/08/01","x":"23:59","y":"0.0"},{"datetime":"2021/07/31","x":"23:59","y":"0.0"},{"datetime":"2021/07/30","x":"23:59","y":"0.0 m\u00b3"},{"datetime":"2021/07/29","x":"23:59","y":"55604.0 m\u00b3"},{"datetime":"2021/07/28","x":"23:59","y":"0.0"},{"datetime":"2021/07/27","x":"23:59","y":"0.0"},{"datetime":"2021/07/26","x":"23:59","y":"0.0"},{"datetime":"2021/07/25","x":"23:59","y":"0.0"},{"datetime":"2021/07/24","x":"23:59","y":"0.0"},{"datetime":"2021/07/23","x":"23:59","y":"123.0 m\u00b3"},{"datetime":"2021/07/22","x":"23:59","y":"0.0 m\u00b3"},{"datetime":"2021/07/21","x":"23:59","y":"34.0 m\u00b3"},{"datetime":"2021/07/20","x":"23:59","y":"123.0 m\u00b3"},{"datetime":"2021/07/19","x":"23:59","y":"0.0"},{"datetime":"2021/07/18","x":"23:59","y":"0.0"},{"datetime":"2021/07/17","x":"23:59","y":"0.0"},{"datetime":"2021/07/16","x":"23:59","y":"0.0"},{"datetime":"2021/07/15","x":"23:59","y":"0.0"},{"datetime":"2021/07/14","x":"23:59","y":"0.0"},{"datetime":"2021/07/13","x":"23:59","y":"0.0"},{"datetime":"2021/07/12","x":"23:59","y":"0.0"},{"datetime":"2021/07/11","x":"23:59","y":"0.0"},{"datetime":"2021/07/10","x":"23:59","y":"0.0"},{"datetime":"2021/07/09","x":"23:59","y":"0.0"},{"datetime":"2021/07/08","x":"23:59","y":"0.0"},{"datetime":"2021/07/07","x":"23:59","y":"0.0"},{"datetime":"2021/07/06","x":"23:59","y":"0.0"},{"datetime":"2021/07/05","x":"23:59","y":"0.0"},{"datetime":"2021/07/04","x":"23:59","y":"0.0"},{"datetime":"2021/07/03","x":"23:59","y":"0.0"},{"datetime":"2021/07/02","x":"23:59","y":"0.0"}]};
  // const loading = false;
  // const error = false;

  // Change main_valve_history to have y values that are numbers and not strings
  const fixMainValueHistoryUntilRenierFixesHisShit = data => data.map(({ datetime, y }) => ({ datetime, y: Number(y.split(" ")[0])}));

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

    const EquipmentStatus = ({ data }) => {
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
              <h4 style={{ color: "#4a5073",fontSize:"1rem" }}>{data.name}</h4>
              <h2 style={{ color: "#4a5073",fontSize:"1.5rem" }}>{data.real_time_flow}</h2>
              <h4 style={{ color: "red",fontSize:"0.8rem" }}>{data.alarm}</h4>
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
        { data.irrigation_valves.map(irrigation_valve => <EquipmentStatus data={irrigation_valve}/> ) }
      </div>
      </div>
      <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
        <div className="w-full h-full">
          <HomeFlowFertilizerBarChart data={data.field_valve_history} />
        </div>
      </div>
        <div className="col-span-3 bg-gray-400  rounded shadow-md m-4">
          <div style={{ backgroundColor: "#dfe2e8" }}>
            <BrushChart data={fixMainValueHistoryUntilRenierFixesHisShit(data.main_valve_history).map(({datetime, y}) => ({x: new Date(datetime), y}))}/>
          </div>
        </div>
      </div>
    </div>
  );
      };
export default IrrigationControl;
