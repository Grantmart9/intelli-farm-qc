import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { API_URL } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AppName } from "./AppName";
import ErrorPage from "./ErrorPage.jpg";

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
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div style={{ display: "flex", marginLeft: "10%", marginTop: "2%" }}>
        <img src={ErrorPage} alt={ErrorPage} width="90%" />
      </div>
    </div>
  );
};
export default Fertilizer;
