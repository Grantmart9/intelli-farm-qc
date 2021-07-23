import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { Table } from "@themesberg/react-bootstrap";

export const IrrigationSchedule = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `https://lodicon-test-api.herokuapp.com/api/v1/-2147483551/schedule`
  );
  if (loading) return <h1 style={{display:'flex',alignItem:'center',alignContent:"center",justifyContent:'center'}}>Loading...</h1>;

  if (error) return <p>Error fetching data!</p>;

    const FarmNames = Object.keys(data).map(function (key) {
      const farm = data[key].name;

      return (
        <div
          style={{
            border: "1.5px solid #242540",
            borderRadius: "0.1cm",
            padding: "1rem",
            boxShadow: "3px 3px #5b5c75",
            marginTop: "1rem",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              background: "#bbbcbf",
              color: "#43464d",
              fontWeight: "bold",
              border: "1px solid #bbbcbf",
              borderRadius: "0.09cm",
            }}
          >
            {farm}
          </h3>
          <Table>
            <thead className="thead-light">
              <tr>
                <th className="border-0">Start Time</th>
                <th className="border-0">End Time</th>
                <th className="border-0">EC Setpoint</th>
                <th className="border-0">Run Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-0">
                  <a
                    href="#Unites States"
                    className="d-flex align-items-center"
                  >
                    <div>
                      <span className="border-0 fw-bold">
                        {data[key].start_time}
                      </span>
                    </div>
                  </a>
                </td>
                <td className="border-0 fw-bold">{data[key].end_time}</td>
                <td className="border-0 fw-bold">123</td>
                <td className="border-0">
                  <span className="fw-bold">{data[key].run_time} min</span>
                </td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead className="thead-light">
              <tr>
                <th className="border-0">Name</th>
                <th className="border-0">EC Setpoint</th>
                <th className="border-0">Flow Rate</th>
                <th className="border-0">Flow Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-0"></td>
                <td className="border-0 fw-bold">Tank</td>
                <td className="border-0 fw-bold">{data[key].end_time}</td>
                <td className="fw-bold">{data[key].run_time} min</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    },);
  return (
    <div style={{ marginLeft: "10rem", marginTop: "2rem" }}>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        Irrigation Schedule
      </h2>
      <div
        style={{
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          background: "white",
          border: "1px solid black",
          borderRadius: "0.09cm",
          padding: "1rem",
        }}
      >
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            background: "#b6b9bf",
            color: "#43464d",
            border: "1px solid #5b5c75",
            borderRadius: "0.09cm",
          }}
        >
          Rheebokskraal Nadorcott & Suurlemoen & Orri
        </h3>
        {FarmNames}
      </div>
    </div>
  );
};
