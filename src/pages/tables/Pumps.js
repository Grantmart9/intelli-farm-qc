import React from "react";
import {AppName} from "./AppName";
import ErrorPage from "./ErrorPage.jpg";

export const Pumps = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div style={{ display: "flex", marginLeft: "10%", marginTop: "2%" }}>
        <img src={ErrorPage} alt={ErrorPage} width="90%" />
      </div>
    </div>
  );
};
