import React from "react";
import {AppName} from "./AppName";
import ErrorPage from "./ErrorPage.jpg";
import ErrorGif from "./ErrorGif.gif";
export const Settings = () => {
  return (
    <div style={{ backgroundColor: "#cad3de" }}>
      <AppName />
      <div className="sm-ml-0 md:ml-8 xl:ml-8 2xl:ml-8 sm:mt-0 md:mt-16 xl:mt-16 2xl:mt-16 sm:p-1 md:p-1 p-1">
        <img src={ErrorGif} alt={ErrorGif} width="100%" />
      </div>
    </div>
  );
};