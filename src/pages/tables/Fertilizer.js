import React from "react";
import { Table } from "@themesberg/react-bootstrap";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AppName } from "./Dashboard";

const FertilizerForm = () => {
  return (
    <div
        className="flex flex-col align-items-center align-content-center justify-content-center"
        style={{
          background: "white",
          border: "1px solid white",
          borderRadius: "0.09cm",
          padding: "1rem",
          fontFamily:"'Rubik', sans-serif",
          fontSize:"1.2rem",
          marginLeft:"1rem",
          color:"#4a5073",
        }}
      >
      <Table>
        <thead className="thead-d">
          <tr>
            <th
              className="border-0"
              style={{
                background: "#4f83ab",
                color: "white",
                fontFamily: "Times New Roman",
                fontSize: "1rem"
              }}
            >
              Fertilizer
            </th>
            <th
              className="border-0"
              style={{
                background: "#4f83ab",
                color: "white",
                fontFamily: "Times New Roman",
                fontSize: "1rem"
              }}
            >
              Requested Level
            </th>
            <th
              className="border-0"
              style={{
                background: "#4f83ab",
                color: "white",
                fontFamily: "Times New Roman",
                fontSize: "1rem"
              }}
            >
              Current Level
            </th>
            <th
              className="border-0"
              style={{
                background: "#4f83ab",
                color: "white",
                fontFamily: "Times New Roman",
                fontSize: "1rem"
              }}
            >
              Flow Rate
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-0 fw-bold">Fertilizer A</td>
            <td className="border-0 fw-bold">160 l</td>
            <td className="border-0 fw-bold">16 l</td>
            <td className="border-0 fw-bold">123 m3/h</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const Fertilizer = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `${API_URL}/${farmId}/fertilizer`
  );

  if (loading) return <Preloader />;
  if (error)
    return (
      <p>
        <FontAwesomeIcon icon={faExclamation} />
      </p>
    );

  console.log(data);
  return (
    <div style={{ display: "flex", backgroundColor: "#cad3de",marginTop:"5rem"}}>
      <AppName />
      <div>
        <FertilizerForm />
      </div>
    </div>
  );
};
export default Fertilizer;
