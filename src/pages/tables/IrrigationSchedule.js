import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@themesberg/react-bootstrap";

export const IrrigationSchedule = () => {
  const { farmId } = useParams();
  const [{ data, loading, error }] = useAxios(

    `${API_URL}/-${farmId}/schedule`
  );
  if (loading) return <h1>Loading...</h1>;

  if (loading) return <Preloader/>;
  if (error) return <p>Error!</p>;

  const SectionTable = ({ section }) => (
    <Table>
      <thead className="thead-light">
        <tr>
          <th className="border-0">Name</th>
          <th className="border-0">EC Setpoint</th>
          <th className="border-0">Runtime</th>
          <th className="border-0">Start time</th>
          <th className="border-0">End time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-0">{section.name}</td>
          <td className="border-0">{section.ec_setpoint}</td>
          <td className="border-0">{section.run_time}</td>
          <td className="border-0">{section.start_time}</td>
          <td className="border-0">{section.end_time}</td>
        </tr>
      </tbody>
    </Table>
  );

  const FertilizerRow = ({ fertilizer }) => (
    <tr>
      <td className="border-0">
        <h4>{fertilizer.name}</h4>
      </td>
      <td className="border-0 fw-bold">{fertilizer.ec_setpoint}</td>
      <td className="border-0 fw-bold">{fertilizer.flow_rate}</td>
    </tr>
  );

  const FertilizerTable = ({ fertilizers }) => (
    <>
      <h3
        style={{
          background: "#b6b9bf",
          color: "#43464d",
          border: "1px solid #5b5c75",
          borderRadius: "0.09cm",
          height: "3rem",
          padding: "0.5rem",
          fontWeight: "bold",
          display:"flex",
          justifyContent:"center",
          alignContent:"center",
          alignItems:"center",
        }}
      >
        Fertilizer
      </h3>
      <Table>
        <thead className="thead-light">
          <tr>
            <th className="border-0">Name</th>
            <th className="border-0">EC Setpoint</th>
            <th className="border-0">Flow Rate</th>
          </tr>
        </thead>
        <tbody>
          {fertilizers.map((fertilizer, key) => (
            <FertilizerRow key={key} fertilizer={fertilizer} />
          ))}
        </tbody>
      </Table>
    </>
  );

  const SectionRow = ({ section }) => (
    <div
      class="w-full"
      style={{
        border: "1.5px solid #242540",
        borderRadius: "0.1cm",
        padding: "1rem",
        boxShadow: "3px 3px #5b5c75",
        marginTop: "1rem",
      }}
    >
      <h3
        class="flex align-items-center align-content-center justify-content-center"
        style={{
          background: "#bbbcbf",
          color: "#43464d",
          fontWeight: "bold",
          border: "1px solid #bbbcbf",
          borderRadius: "0.09cm",
        }}
      >
        <h3
          style={{
            background: "#b6b9bf",
            color: "#43464d",
            height: "3rem",
            padding: "0.5rem",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {section.name}
        </h3>
      </h3>
      <SectionTable section={section} />
      <FertilizerTable fertilizers={section.fertilizer} />
    </div>
  );
  return (
    <div>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontFamily: "Times New Roman",
          padding:"1rem",
        }}
      >
        Irrigation Schedule
      </h2>
      <div
        class="flex flex-col align-items-center align-content-center justify-content-center"
        style={{
          background: "white",
          border: "1px solid black",
          borderRadius: "0.09cm",
          padding: "1rem",
        }}
      >
        <Button variant="light" className="m-0">
          <FontAwesomeIcon icon={faSave} /> Save
        </Button>
        {data.map((section, key) => (
          <SectionRow key={key} section={section} />
        ))}
      </div>
    </div>
  );
};
