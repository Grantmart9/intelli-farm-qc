import React from "react";
import {AppName} from "./AppName";
import PageError from "./PageError.svg";

export const Notifications = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <img src={PageError} alt={PageError}/>
    </div>
  );
};
