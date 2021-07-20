import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import './Dashboard.css';

const rows = [
  {
    id: 1,
    Channel: "Input:1",
    Status: "OFF",
    Alarm: "TRUE",
  },
  {
    id: 2,
    Channel: "Input:2",
    Status: "ON",
    Alarm: "TRUE",
  },
];

const Dashboard = () => {
    const { farmId } = useParams();
    const [{ data, loading, error }] = useAxios(
      `https://lodicon-test-api.herokuapp.com/api/v1/${farmId}/dashboard`
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    console.log(data);
  return (
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        Dashboard
      </h1>
      <div style={{ display: "block", marginLeft: "10rem" }}>
        <div className="DigitalInputs2">
          <h1 style={{ color: "black" }}>Analog Input</h1>
          <h1 style={{ color: "black" }}>RTD Input</h1>
          <h1 style={{ color: "black" }}>Analog Output</h1>
        </div>
        <div className="DigitalInputs4">
          <CircularProgress
            size={`${10}%`}
            value={15}
            thickness={10}
            variant="static"
            color="secondary"
          />
          <CircularProgress
            size={`${10}%`}
            value={30}
            thickness={10}
            variant="static"
            color="primary"
          />
          <CircularProgress
            size={`${10}%`}
            value={80}
            thickness={10}
            variant="static"
            color="primary"
          />
        </div>
        <div className="DigitalInputs5">
          <div style={{ height: 250, width: 500 }}>
            <DataGrid
              columns={[
                {
                  field: "id",
                },
                {
                  field: "Channel",
                  width: 1,
                  flex: 1,
                },
                {
                  field: "Status",
                  flex: 1,
                },
                {
                  field: "Alarm",
                  flex: 1,
                },
              ]}
              rows={rows}
            />
          </div>
        </div>
        <div style={{ height: 250, width: 500 }}>
          <DataGrid
            columns={[
              {
                field: "id",
              },
              {
                field: "Channel",
                width: 1,
                flex: 1,
              },
              {
                field: "Status",
                flex: 1,
              },
              {
                field: "Alarm",
                flex: 1,
              },
            ]}
            rows={rows}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
