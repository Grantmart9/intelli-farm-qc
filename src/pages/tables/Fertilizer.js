import React from "react";
import { Table } from "@themesberg/react-bootstrap";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AppName } from "./Dashboard";

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
    <div style={{ backgroundColor: "#cad3de"}}>
      <AppName />
        <h1>In progress</h1>
    </div>
  );
};
export default Fertilizer;
