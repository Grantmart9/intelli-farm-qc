import React from "react";
import { Table } from '@themesberg/react-bootstrap';
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";


const Fertilizer = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(
    `${API_URL}/${farmId}/fertilizer`
  );

  if (loading) return <Preloader/>;
  if (error) return <p>Error!</p>;

  console.log(data);

  return (
    <>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
        }}
      >
        Fertilizer
      </h2>
      <Table>
        <thead className="thead-light">
          <tr>
            <th className="border-0">Fertilizer</th>
            <th className="border-0">Requested Level</th>
            <th className="border-0">Current Level</th>
            <th className="border-0">Flow Rate</th>
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
      </>
  );
};
export default Fertilizer;
