import React from "react";
import { Table } from '@themesberg/react-bootstrap';
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AppName } from "./IrrigationSchedule";


const Fertilizer = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `${API_URL}/${farmId}/fertilizer`
  );

  if (loading) return <Preloader/>;
  if (error) return (
    <p>
      <FontAwesomeIcon icon={faExclamation} />
    </p>
  );

  console.log(data);

  return (
    <>
      <AppName />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          padding: "0.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontFamily: "Times New Roman",
            padding: "0.5rem",
            background: "#406a79",
            color: "white",
            border: "1px 1px solid #406a79",
            borderRadius: "0.2cm",
            marginTop: "1rem",
          }}
        >
          Fertilizer
        </h2>
      </div>
      <div
        style={{
          display: "block",
          background: "transparent",
          color: "#43464d",
          border: "1px solid #5b5c75",
          borderRadius: "0.09cm",
          padding: "0.5rem",
          boxShadow: "3px 3px grey",
        }}
      >
        <Table>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                Fertilizer
              </th>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                Requested Level
              </th>
              <th className="border-0" style={{ background: "#8fc99a" }}>
                Current Level
              </th>
              <th className="border-0" style={{ background: "#8fc99a" }}>
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
            <tr>
              <td className="border-0 fw-bold">Fertilizer A</td>
              <td className="border-0 fw-bold">160 l</td>
              <td className="border-0 fw-bold">16 l</td>
              <td className="border-0 fw-bold">123 m3/h</td>
            </tr>
            <tr>
              <td className="border-0 fw-bold">Fertilizer A</td>
              <td className="border-0 fw-bold">160 l</td>
              <td className="border-0 fw-bold">16 l</td>
              <td className="border-0 fw-bold">123 m3/h</td>
            </tr>
            <tr>
              <td className="border-0 fw-bold">Fertilizer A</td>
              <td className="border-0 fw-bold">160 l</td>
              <td className="border-0 fw-bold">16 l</td>
              <td className="border-0 fw-bold">123 m3/h</td>
            </tr>
            <tr>
              <td className="border-0 fw-bold">Fertilizer A</td>
              <td className="border-0 fw-bold">160 l</td>
              <td className="border-0 fw-bold">16 l</td>
              <td className="border-0 fw-bold">123 m3/h</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default Fertilizer;
