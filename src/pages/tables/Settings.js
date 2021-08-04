import React from "react";
import {AppName} from "./AppName";
import ErrorPage from "./ErrorPage.jpg";

export const Settings = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <img src={ErrorPage} alt={ErrorPage} width="100%" />
    </div>
  );
};