import React from "react";
import {AppName} from "./AppName";
import PageError from "./PageError.svg";

export const Pumps = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <img src={PageError} alt={PageError}/>
    </div>
  );
};
